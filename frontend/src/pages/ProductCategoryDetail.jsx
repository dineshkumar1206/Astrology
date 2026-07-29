import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useLanguage } from '../context/LanguageContext';
import ProductDetailModal from '../components/ProductDetailModal';

import TarotConsultation from '../components/categories/TarotConsultation';
import SpiritualHealing from '../components/categories/SpiritualHealing';
import Crystals from '../components/categories/Crystals';
import MurugarCards from '../components/categories/MurugarCards';
import TarotClasses from '../components/categories/TarotClasses';
import CounselingClasses from '../components/categories/CounselingClasses';
import KaliPooja from '../components/categories/KaliPooja';

export default function ProductCategoryDetail({ cart = [], setCart, setIsCartOpen }) {
  const { t } = useLanguage();
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [dynamicCat, setDynamicCat] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      setLoading(true);
      try {
        const catRes = await axios.get(`${API_BASE_URL}/api/categories`);
        const catData = Array.isArray(catRes.data) ? catRes.data : [];
        setCategories(catData);

        const matched = catData.find(c => c.slug === category);
        if (matched) {
          setDynamicCat(matched);
          const prodRes = await axios.get(`${API_BASE_URL}/api/products`);
          const prodData = Array.isArray(prodRes.data) ? prodRes.data : [];
          const filtered = prodData.filter(p => p.category && p.category.toLowerCase() === matched.name.toLowerCase());
          setProducts(filtered);
        } else {
          setDynamicCat(null);
        }
      } catch (err) {
        console.error('Failed to fetch categories / products in detail view:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [category]);

  const handleAddToCart = (item) => {
    if (!setCart) return;

    const qty = item._quantity || 1;
    const size = item._selectedSize || null;
    const cartItemId = size ? `${item.id}-${size}` : item.id;
    const cartName = size ? `${item.name} (${size})` : item.name;

    const existingItem = cart.find((c) => c.id === cartItemId);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === cartItemId
            ? { ...c, quantity: c.quantity + qty }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: cartItemId,
          name: cartName,
          price: item.price,
          image: item.image || '/saraa-logo.jpeg',
          quantity: qty
        }
      ]);
    }

    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  switch (category) {
    case 'tarot-consultation':
      return <TarotConsultation cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'spiritual-healing':
      return <SpiritualHealing cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'crystals':
      return <Crystals cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'murugar-cards':
      return <MurugarCards cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'tarot-classes':
      return <TarotClasses cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'counseling-classes':
      return <CounselingClasses cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    case 'kali-pooja':
      return <KaliPooja cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
    default:
      if (loading) {
        return (
          <div className="bg-[#F8F6FF] min-h-screen flex justify-center items-center text-sara-gold">
            <p className="font-[Cinzel] text-[1.5rem] tracking-[1px]">{t('productCategoryDetail.loading')}</p>
          </div>
        );
      }

      if (dynamicCat) {
        return (
          <>
          <div className="bg-[#F8F6FF] min-h-screen text-[#2A1635] font-sans pt-16 pb-24 px-8 max-lg:py-8 max-lg:px-4">
            <div className="max-w-[1200px] mx-auto">

              <div className="mb-10 text-[13px] tracking-[0.5px]">
                <Link to="/" className="text-sara-muted no-underline hover:text-sara-gold transition-colors">{t('productCategoryDetail.home')}</Link>
                <span className="text-[rgba(42,22,53,0.2)] mx-2">/</span>
                <span className="text-sara-gold">{dynamicCat.name}</span>
              </div>

              <div className="mb-16 border-b border-[rgba(214,178,106,0.15)] pb-10 bg-[linear-gradient(135deg,#FFFFFF_0%,#F5EEFF_60%,rgba(161,61,142,0.08)_100%)] rounded-lg p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(161,61,142,0.08)_0%,transparent_70%)] pointer-events-none" />
                <span className="text-sara-muted tracking-[2px] text-[12px] font-semibold uppercase">
                  {dynamicCat.type === 'crystal' ? t('productCategoryDetail.crystalType') : t('productCategoryDetail.divineType')}
                </span>
                <h1 className="text-[#000000] font-[Cinzel] text-[2.8rem] font-normal my-2 mb-6 uppercase tracking-[1px] leading-[1.2]">
                  {dynamicCat.name}
                </h1>
                <p className="text-sara-muted text-[1.05rem] leading-[1.7] max-w-[800px] m-0">
                  {dynamicCat.desc || t('productCategoryDetail.fallbackDesc')}
                </p>
              </div>

              <div className="flex flex-row gap-12 flex-wrap">
                <div className="flex-[2_1_600px]">
                  <h3 className="text-sara-gold font-[Cinzel] text-[1.5rem] mb-8 border-b border-[rgba(214,178,106,0.1)] pb-2 tracking-[1.5px] uppercase">
                    {t('productCategoryDetail.availableBookings')}
                  </h3>

                  <div className="flex flex-col gap-6">
                    {products.length === 0 ? (
                      <div className="text-center py-12 text-sara-muted">
                        No offerings available at the moment. Please check back later.
                      </div>
                    ) : (
                      products.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setActiveProduct(item)}
                          className="bg-white border border-[rgba(214,178,106,0.15)] rounded p-8 flex flex-row gap-6 flex-wrap items-center justify-between transition-all duration-300 hover:border-[rgba(214,178,106,0.35)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer"
                        >
                          {item.image && (
                            <div className="w-[120px] h-[120px] rounded overflow-hidden border border-[rgba(214,178,106,0.15)] bg-[#F5F0FF] flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-[1_1_280px]">
                            <div className="text-sara-gold text-[11px] uppercase tracking-[1px] font-semibold">
                              {item.type}
                            </div>
                            <h4 className="text-[#2A1635] text-[1.35rem] my-1 mb-2 font-medium">
                              {item.name}
                            </h4>
                            <p className="text-sara-muted text-[0.9rem] leading-[1.5] m-0">
                              {item.desc}
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-center gap-3 min-w-[150px]">
                            <div className="text-sara-gold text-[1.75rem] font-semibold">
                              ₹{item.price.toLocaleString('en-IN')}
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                              className="bg-white text-sara-gold border border-[rgba(214,178,106,0.3)] py-[0.6rem] px-6 rounded text-[12px] font-semibold cursor-pointer transition-all duration-300 uppercase tracking-[0.5px] hover:bg-sara-gold hover:text-sara-textDark hover:border-sara-gold"
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Product Detail Modal */}
          {activeProduct && (
            <ProductDetailModal
              product={activeProduct}
              onClose={() => setActiveProduct(null)}
              onAddToCart={(p) => handleAddToCart(p)}
            />
          )}
        </>
        );
      }

      return (
        <div className="bg-[#F8F6FF] min-h-[80vh] flex flex-col items-center justify-center text-[#2A1635] font-sans">
          <h2 className="text-sara-gold font-[Cinzel] text-[2rem] mb-4">Category Not Found</h2>
          <Link to="/" className="text-sara-gold no-underline border border-sara-gold py-3 px-6 rounded hover:bg-sara-gold hover:text-sara-textDark transition-colors">Back to Home</Link>
        </div>
      );
  }
}
