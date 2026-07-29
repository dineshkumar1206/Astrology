import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FALLBACK_IMAGES = {
  'crystal': '/crystal.jpg',
  'murugar cards': '/card-1.jpg',
  'tarot private consultation': '/tarot.jpg',
  'spiritual healing': '/meditation.jpg',
  'kali pooja': '/card-3.jpg',
  'tarot card reading': '/tarot.jpg',
  'spiritual counseling': '/meditation.jpg',
};

function getImgSrc(product) {
  if (product.image) return product.image;
  const catLower = (product.category || '').toLowerCase();
  return FALLBACK_IMAGES[catLower] || '/saraa-logo.jpeg';
}

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    const cartItem = {
      ...product,
      _selectedSize: selectedSize,
      _quantity: quantity,
    };
    onAddToCart(cartItem);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-[6px] flex items-center justify-center z-[2000] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-[rgba(214,178,106,0.25)] rounded-lg max-w-[900px] w-full max-h-[90vh] overflow-y-auto relative p-10 shadow-[0_20px_40px_rgba(42,22,53,0.12)]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 bg-transparent border-none text-sara-gold text-2xl font-light cursor-pointer leading-none p-1 transition-transform hover:scale-[1.15] z-10"
        >
          &times;
        </button>

        <div className="flex flex-row gap-10 flex-wrap mt-2">
          {/* Image */}
          <div className="flex-[1_1_350px]">
            <img
              src={getImgSrc(product)}
              alt={product.name}
              className="w-full rounded border border-[rgba(214,178,106,0.15)] object-cover h-full min-h-[300px] max-h-[400px]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMAGES[(product.category || '').toLowerCase()] || '/saraa-logo.jpeg';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-[1_2_400px] flex flex-col justify-between">
            <div>
              <span className="text-sara-gold uppercase text-[0.8rem] tracking-[2px] font-semibold">
                {product.type}
              </span>
              <h2 className="text-[#2A1635] text-[1.8rem] font-light mt-2 mb-3 leading-snug">
                {product.name}
              </h2>
              <div className="text-sara-gold text-[1.75rem] font-semibold mb-5">
                Rs. {product.price.toLocaleString('en-IN')}
              </div>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="text-[11px] text-[#3E2F48] uppercase tracking-[1.5px] font-semibold mb-2">
                    {t('productDetailModal.selectSize')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(size)}
                        className={
                          selectedSize === size
                            ? 'bg-sara-gold text-sara-textDark border border-sara-gold py-1.5 px-4 rounded-2xl text-xs font-semibold cursor-pointer transition-all'
                            : 'bg-[#F5F0FF] text-[#3E2F48] border border-[rgba(214,178,106,0.3)] py-1.5 px-4 rounded-2xl text-xs font-semibold cursor-pointer transition-all'
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-5">
                <div className="text-[11px] text-[#3E2F48] uppercase tracking-[1.5px] font-semibold mb-2">
                  {t('productDetailModal.quantity')}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded border border-[rgba(214,178,106,0.3)] bg-[#F5F0FF] text-sara-gold text-lg flex items-center justify-center cursor-pointer transition-all hover:border-sara-gold"
                  >
                    -
                  </button>
                  <span className="text-[#2A1635] text-sm font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded border border-[rgba(214,178,106,0.3)] bg-[#F5F0FF] text-sara-gold text-lg flex items-center justify-center cursor-pointer transition-all hover:border-sara-gold"
                  >
                    +
                  </button>
                </div>
              </div>

              <hr className="border-none border-t border-[rgba(214,178,106,0.15)] my-4" />

              <p className="text-sara-muted leading-6 text-[0.95rem] mb-6">
                {product.desc}
              </p>

              {/* Inclusions */}
              {product.inclusions && product.inclusions.length > 0 && (
                <>
                  <h4 className="text-sara-gold uppercase text-[0.85rem] tracking-[1px] mb-2">
                    {t('productDetailModal.whatsIncluded')}
                  </h4>
                  <ul className="pl-5 m-0 mb-8 text-sara-muted leading-7 text-[0.9rem]">
                    {product.inclusions.map((inc, index) => (
                      <li key={index} className="mb-1.5">{inc}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Policy & Shipping Notice */}
            <div className="my-6 p-4 rounded-lg bg-[rgba(214,178,106,0.08)] border border-[rgba(214,178,106,0.25)] text-xs text-[#2A1635] leading-relaxed">
              <div className="font-semibold text-sara-gold uppercase tracking-[1px] mb-1.5">{t('productDetailModal.policyTitle')}</div>
              <ul className="list-disc pl-4 m-0 flex flex-col gap-1 text-[#3E2F48]">
                <li>{t('productDetailModal.policyNoRefund')}</li>
                <li>{t('productDetailModal.policyTimeline')}</li>
              </ul>
            </div>

            <button
              onClick={handleAdd}
              className={`border-none py-4 px-8 text-[0.95rem] font-semibold uppercase tracking-[1.5px] cursor-pointer w-full rounded-sm transition-all ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-gradient-to-r from-sara-gold to-sara-goldSoft text-sara-textDark hover:opacity-90'
              }`}
            >
              {added ? t('productDetailModal.addedToCart') : t('productDetailModal.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
