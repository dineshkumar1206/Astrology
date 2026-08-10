import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslatedList } from '../../utils/translator';
import ProductDetailModal from '../../components/ProductDetailModal';
import WelfareTrust from '../../components/WelfareTrust';

export default function TarotConsultation({ cart = [], setCart, setIsCartOpen }) {
  const { locale, t } = useLanguage();
  const [expressChecked, setExpressChecked] = useState(false);
  const [items, setItems] = useState([]);
  const translatedItems = useTranslatedList(items, locale);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products?category=Tarot Private Consultation`);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch Tarot consultation products. Using fallback.', err);
        setItems(t('tarotConsultation.items'));
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
          image: item.image || '/saraa-logo.jpeg',
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
          <span className="text-[#000000]">{t('tarotConsultation.title')}</span>
        </div>

        {/* Header Section */}
        <div className="mb-16 border-b border-[rgba(214,178,106,0.15)] pb-10 bg-white -mx-4 sm:-mx-8 px-4 sm:px-8 pt-16 pb-10 bg-[radial-gradient(ellipse_at_center,rgba(161,61,142,0.06)_0%,transparent_70%)]">
          <span className="text-sara-gold tracking-[2px] text-xs font-semibold uppercase">
            {t('tarotConsultation.badge')}
          </span>
          <h1 className="text-[#000000] font-serif text-[2.8rem] font-semibold mt-2 mb-6 uppercase tracking-[1px] leading-tight">
            {t('tarotConsultation.title')}
          </h1>
          <p className="text-sara-muted text-[1.05rem] leading-7 max-w-[800px] m-0">
            {t('tarotConsultation.description')}
          </p>
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
                    {item.image && (
                      <div className="w-[70px] h-[70px] shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain rounded-lg border border-[rgba(214,178,106,0.2)] bg-black/40 p-1"
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
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
                    </div>

                    <div className="flex flex-col items-end justify-center gap-3 min-w-[150px]">
                      <div className="text-sara-gold text-[1.75rem] font-semibold">
                        ₹{(item.price + (expressChecked ? 1000 : 0)).toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                        className="bg-transparent text-sara-gold border border-[rgba(214,178,106,0.4)] rounded-sm py-3 px-6 text-xs font-bold uppercase tracking-[1px] cursor-pointer transition-all w-full hover:bg-sara-gold hover:text-[#1E0F2B] hover:border-sara-gold"
                      >
                        {t('categoryCommon.bookAdd')}
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
                {t('tarotConsultation.policyIntro')}
              </p>
              
              <ul className="pl-5 m-0 text-sara-muted leading-7 text-[0.9rem]">
                  <li className="mb-3 list-square">{t('tarotConsultation.policy1')}</li>
                  <li className="mb-3 list-square">{t('tarotConsultation.policy2')}</li>
                  <li className="mb-3 list-square">{t('tarotConsultation.policy3')}</li>
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
