import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslatedList } from '../../utils/translator';
import ProductDetailModal from '../../components/ProductDetailModal';
import WelfareTrust from '../../components/WelfareTrust';

const FALLBACK_IMAGE = '/card-1.jpg';

export default function MurugarCards({ cart = [], setCart, setIsCartOpen }) {
  const { locale, t } = useLanguage();
  const [expressChecked, setExpressChecked] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [items, setItems] = useState([]);
  const translatedItems = useTranslatedList(items, locale);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products?category=Murugar Cards`);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch Murugar Cards products. Using fallback.', err);
        setItems(t('murugarCards.items'));
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    if (!setCart) return;

    let finalPrice = item.price;
    let nameSuffix = '';

    if (expressChecked) {
      finalPrice += 1000;
      nameSuffix = t('categoryCommon.express24h');
    }

    const cartItemId = expressChecked ? `${item.id}-express` : item.id;
    const existingItem = cart.find((c) => c.id === cartItemId);

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === cartItemId
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: cartItemId,
          name: `${item.name}${nameSuffix}`,
          price: finalPrice,
          image: item.image || FALLBACK_IMAGE,
          quantity: 1
        }
      ]);
    }

    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-[#F8F6FF] text-[#2A1635] font-sans pt-16 pb-24 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="mb-10 text-[13px] tracking-[0.5px]">
          <Link to="/" className="text-sara-muted no-underline">{t('categoryCommon.home')}</Link>
          <span className="text-[rgba(207,207,207,0.3)] mx-2">/</span>
          <span className="text-[#000000]">{t('murugarCards.title')}</span>
        </div>

        {/* Header Section */}
        <div className="mb-16 border-b border-[rgba(214,178,106,0.15)] pb-10 bg-white -mx-4 sm:-mx-8 px-4 sm:px-8 pt-16 pb-10 bg-[radial-gradient(ellipse_at_center,rgba(161,61,142,0.06)_0%,transparent_70%)] flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-[1_1_400px]">
            <span className="text-sara-gold tracking-[2px] text-xs font-semibold uppercase">
              {t('murugarCards.badge')}
            </span>
            <h1 className="text-[#000000] font-serif text-[2.8rem] font-semibold mt-2 mb-6 uppercase tracking-[1px] leading-tight">
              {t('murugarCards.title')}
            </h1>
            <p className="text-sara-muted text-[1.05rem] leading-7 max-w-[800px] m-0">
             {t('murugarCards.description')}
            </p>
            <p className="text-[#000000] font-semibold text-[0.95rem] leading-7 max-w-[800px] mt-4">
              {t('murugarCards.note')}
            </p>
          </div>
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-[rgba(214,178,106,0.3)] flex-shrink-0 shadow-[0_0_30px_rgba(214,178,106,0.15)]">
            <img 
              src={FALLBACK_IMAGE} 
              alt={t('murugarCards.imageAlt')} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/saraa-logo.jpeg'; }}
            />
          </div>
        </div>

        <div className="flex flex-row gap-12 flex-wrap">
          
          {/* Items Listing Column */}
          <div className="flex-[2_1_600px]">
            <h3 className="text-sara-gold font-serif text-1.5rem mb-8 border-b border-[rgba(214,178,106,0.1)] pb-2 tracking-[1.5px] uppercase">
              {t('categoryCommon.availableBookings')}
            </h3>

            {/* Express Booking Toggle */}
            <div 
              className="bg-[rgba(214,178,106,0.05)] border border-[rgba(214,178,106,0.3)] rounded p-5 mb-8 flex items-center gap-3 cursor-pointer"
              onClick={() => setExpressChecked(!expressChecked)}
            >
              <input 
                type="checkbox" 
                checked={expressChecked}
                onChange={() => {}}
                className="cursor-pointer w-[18px] h-[18px] accent-sara-gold" 
              />
              <div>
                <div className="font-semibold text-sara-gold text-sm tracking-[0.5px]">
                  {t('categoryCommon.expressLabel')}
                </div>
                <div className="text-xs text-sara-muted mt-0.5">
                  {t('categoryCommon.expressDesc')}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {loading ? (
                <div className="text-center py-12 text-sara-gold">
                  {t('categoryCommon.loading')}
                </div>
              ) : translatedItems.length === 0 ? (
                <div className="text-center py-12 text-sara-muted">
                  {t('categoryCommon.empty')}
                </div>
              ) : (
                translatedItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveProduct(item)}
                    className="bg-gradient-to-br from-[#1E0F2B] to-[#0C0614] border border-[rgba(214,178,106,0.2)] rounded p-8 flex flex-row gap-6 flex-wrap items-center justify-between transition-all duration-300 hover:border-sara-gold hover:shadow-[0_4px_25px_rgba(161,61,142,0.15)] cursor-pointer"
                  >
                    {(item.image || FALLBACK_IMAGE) && (
                      <div className="w-[120px] h-[120px] rounded overflow-hidden border border-[rgba(214,178,106,0.2)] bg-[#12071C] flex-shrink-0">
                        <img 
                          src={item.image || FALLBACK_IMAGE} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                        />
                      </div>
                    )}

                    <div className="flex-[1_1_280px]">
                      <div className="text-sara-gold text-[11px] uppercase tracking-[1px] font-semibold">
                        {item.type}
                      </div>
                      <h4 className="text-white text-[1.35rem] mt-1 mb-2 font-bold">
                        {item.name}
                      </h4>
                      <p className="text-[#D3C7DC] text-[0.9rem] leading-5 m-0">
                        {item.desc}
                      </p>
                      {item.stock !== null && item.stock !== undefined && (
                        <div className="text-[11px] font-medium mt-2 font-sans">
                          {item.stock === 0 ? (
                            <span className="text-[#ef5350] font-bold uppercase tracking-[0.5px]">● Out of Stock</span>
                          ) : item.stock <= 5 ? (
                            <span className="text-amber-500 font-bold text-[15px] animate-pulse block">⚠️ Only {item.stock} left!</span>
                          ) : null}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-center gap-3 min-w-[150px]">
                      <div className="text-sara-gold text-[1.75rem] font-semibold">
                        ₹{(item.price + (expressChecked ? 1000 : 0)).toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                        disabled={item.stock === 0}
                        className={`rounded-sm py-3 px-6 text-xs font-bold uppercase tracking-[1px] cursor-pointer transition-all w-full ${
                          item.stock === 0
                            ? 'bg-gray-700 text-gray-500 border border-gray-600 cursor-not-allowed opacity-60'
                            : 'bg-transparent text-sara-gold border border-[rgba(214,178,106,0.4)] hover:bg-sara-gold hover:text-[#1E0F2B] hover:border-sara-gold'
                        }`}
                      >
                        {item.stock === 0 ? (locale === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock') : t('categoryCommon.bookAdd')}
                      </button>
                    </div>
                  </div>
                ))
            )}
            </div>
          </div>

          {/* Guidelines Sidebar Column */}
          <div className="flex-[1_1_300px]">
            <div className="bg-white border border-[rgba(214,178,106,0.25)] rounded-md p-8 sticky top-[120px] bg-gradient-to-b from-[rgba(214,178,106,0.02)] to-transparent">
              <h4 className="text-sara-gold font-serif text-[1.25rem] mb-5 border-b border-[rgba(214,178,106,0.1)] pb-2 tracking-[1px] uppercase">
                {t('categoryCommon.importantNotes')}
              </h4>
              <p className="text-sara-muted text-[0.95rem] leading-6 mb-6">
                {t('murugarCards.policyIntro')}
              </p>
              
              <ul className="pl-5 m-0 text-sara-muted leading-7 text-[0.9rem]">
                  <li className="mb-3 list-square">{t('murugarCards.policy1')}</li>
                  <li className="mb-3 list-square">{t('murugarCards.policy2')}</li>
              </ul>

              <div className="border-t border-[rgba(214,178,106,0.15)] mt-8 pt-6 text-center">
                <span className="text-xs text-sara-muted block mb-4">
                  {t('categoryCommon.prePayment')}
                </span>
                <Link 
                  to="/checkout" 
                  className="block bg-transparent text-sara-gold border border-[rgba(214,178,106,0.5)] py-3 no-underline text-xs font-semibold uppercase tracking-[1px] transition-all hover:bg-[rgba(214,178,106,0.1)] hover:border-sara-gold"
                >
                  {t('categoryCommon.viewCart')}
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

      {activeProduct && (
        <ProductDetailModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={(item) => handleAddToCart(item)}
        />
      )}

      <WelfareTrust />
    </>
  );
}
