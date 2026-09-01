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
  const { locale, t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [healing, setHealing] = useState(false);

  if (!product) return null;

  const CRYSTAL_CATEGORIES = ["rasi", "bracelet", "pyrite", "rings", "pendants", "tumbles", "crystal balls", "pyrite frames", "crystal mala", "crystal tower", "crystal"];
  const isCrystal = product.category && CRYSTAL_CATEGORIES.includes(product.category.toLowerCase());

  const handleAdd = () => {
    const cartItem = {
      ...product,
      _selectedSize: selectedSize,
      _quantity: quantity,
      _healing: isCrystal ? healing : false,
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
      className="fixed inset-0 bg-[rgba(11,18,37,0.85)] backdrop-blur-[6px] flex items-center justify-center z-[2000] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1E0F2B] to-[#0C0614] border border-[rgba(214,178,106,0.25)] rounded-lg max-w-[900px] w-full max-h-[90vh] overflow-y-auto relative p-10 shadow-[0_20px_50px_rgba(161,61,142,0.15)]"
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
              className="w-full rounded border border-[rgba(214,178,106,0.15)] object-contain bg-black/40 h-full min-h-[300px] max-h-[400px]"
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
              <h2 className="text-white text-[1.8rem] font-medium mt-2 mb-3 leading-snug">
                {product.name}
              </h2>
              <div className="text-sara-gold text-[1.75rem] font-semibold mb-5">
                Rs. {(product.price + (isCrystal && healing ? 1000 : 0)).toLocaleString('en-IN')}
              </div>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="text-[11px] text-[#D3C7DC] uppercase tracking-[1.5px] font-semibold mb-2">
                    {t('productDetailModal.selectSize')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        disabled={product.stock === 0}
                        onClick={() => setSelectedSize(size)}
                        className={
                          product.stock === 0
                            ? 'bg-gray-800 text-gray-500 border border-gray-700 py-1.5 px-4 rounded-2xl text-xs font-semibold line-through cursor-not-allowed opacity-50'
                            : selectedSize === size
                              ? 'bg-sara-gold text-[#1E0F2B] border border-sara-gold py-1.5 px-4 rounded-2xl text-xs font-semibold cursor-pointer transition-all'
                              : 'bg-transparent text-[#D3C7DC] border border-[rgba(214,178,106,0.3)] py-1.5 px-4 rounded-2xl text-xs font-semibold cursor-pointer transition-all hover:border-sara-gold'
                        }
                      >
                        {size} {product.stock === 0 && `(${locale === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock'})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Healing Option for Crystals */}
              {isCrystal && (
                <div className="mb-5">
                  <div className="text-[11px] text-[#D3C7DC] uppercase tracking-[1.5px] font-semibold mb-2">
                    {locale === 'ta' ? 'குணப்படுத்துதல் விருப்பம்:' : 'Healing Option:'}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm text-[#D3C7DC] cursor-pointer">
                      <input 
                        type="radio" 
                        name="modal-detail-healing" 
                        checked={!healing}
                        onChange={() => setHealing(false)}
                        className="w-4 h-4 accent-sara-gold cursor-pointer"
                      />
                      <span>{locale === 'ta' ? 'இல்லை' : 'Without Healing'}</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-sara-gold font-semibold cursor-pointer">
                      <input 
                        type="radio" 
                        name="modal-detail-healing" 
                        checked={healing}
                        onChange={() => setHealing(true)}
                        className="w-4 h-4 accent-sara-gold cursor-pointer"
                      />
                      <span>{locale === 'ta' ? 'குணப்படுத்துதலுடன் (+ ரூ. 1,000)' : 'With Healing (+ ₹1,000)'}</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-5">
                <div className="text-[11px] text-[#D3C7DC] uppercase tracking-[1.5px] font-semibold mb-2">
                  {t('productDetailModal.quantity')}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded border border-[rgba(214,178,106,0.35)] bg-transparent text-sara-gold text-lg flex items-center justify-center cursor-pointer transition-all hover:border-sara-gold"
                  >
                    -
                  </button>
                  <span className="text-white text-sm font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded border border-[rgba(214,178,106,0.35)] bg-transparent text-sara-gold text-lg flex items-center justify-center cursor-pointer transition-all hover:border-sara-gold"
                  >
                    +
                  </button>
                </div>
              </div>

              <hr className="border-none border-t border-[rgba(214,178,106,0.15)] my-4" />

              {product.desc && (
                <ul className="pl-5 m-0 mb-8 text-[#D3C7DC] leading-7 text-[0.95rem] list-disc">
                  {product.desc.split('\n').map((point, index) => point.trim() && (
                    <li key={index} className="mb-1.5">{point.trim()}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Policy & Shipping Notice */}
            <div className="my-6 p-4 rounded-lg bg-[rgba(214,178,106,0.04)] border border-[rgba(214,178,106,0.2)] text-xs text-[#D3C7DC] leading-relaxed">
              <div className="font-semibold text-sara-gold uppercase tracking-[1px] mb-1.5">{t('productDetailModal.policyTitle')}</div>
              <ul className="list-disc pl-4 m-0 flex flex-col gap-1 text-[#D3C7DC]">
                <li>{t('productDetailModal.policyNoRefund')}</li>
                <li>{t('productDetailModal.policyTimeline')}</li>
              </ul>
            </div>

            {/* Stock Alerts */}
            {product.stock !== null && product.stock !== undefined && (
              <div className="mb-4 font-sans text-[14px]">
                {product.stock === 0 ? (
                  <div className="text-[#ef5350] font-bold uppercase tracking-[1px] flex items-center gap-1.5">
                    ● Out of Stock
                  </div>
                ) : product.stock <= 5 ? (
                  <div className="text-amber-500 font-bold text-[18px] tracking-[0.5px] flex items-center gap-1.5 animate-pulse">
                    ⚠️ Only {product.stock} left in stock!
                  </div>
                ) : null}
              </div>
            )}

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`border-none py-4 px-8 text-[0.95rem] font-semibold uppercase tracking-[1.5px] cursor-pointer w-full rounded-sm transition-all ${
                product.stock === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60 border border-gray-600'
                  : added
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-sara-gold to-sara-goldSoft text-[#1E0F2B] hover:opacity-90'
              }`}
            >
              {product.stock === 0 
                ? (locale === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock') 
                : (added ? t('productDetailModal.addedToCart') : t('productDetailModal.addToCart'))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
