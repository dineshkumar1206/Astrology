import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import ProductDetailModal from '../components/ProductDetailModal';
import { useLanguage } from '../context/LanguageContext';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
  }
};

const CATEGORY_SECTIONS = [
  { title: 'Crystals', viewAllPath: '/products/crystals', filterType: 'crystal' },
  { title: 'Murugar Card Deck', viewAllPath: '/products/murugar-cards', categoryName: 'Murugar Cards' },
  { title: 'Tarot Private Consultation', viewAllPath: '/products/tarot-consultation', categoryName: 'Tarot Private Consultation' },
  { title: 'Spiritual Healing', viewAllPath: '/products/spiritual-healing', categoryName: 'Spiritual Healing' },
  { title: 'Kali Pooja', viewAllPath: '/products/kali-pooja', categoryName: 'Kali Pooja' },
  { title: 'Tarot Card Reading', viewAllPath: '/products/tarot-classes', categoryName: 'Tarot Card Reading' },
  { title: 'Spiritual Counseling', viewAllPath: '/products/counseling-classes', categoryName: 'Spiritual Counseling' },
];

const FALLBACK_IMAGES = {
  'crystal': '/crystal.jpg',
  'murugar cards': '/card-1.jpg',
  'tarot private consultation': '/tarot.jpg',
  'spiritual healing': '/meditation.jpg',
  'kali pooja': '/card-3.jpg',
  'tarot card reading': '/tarot.jpg',
  'spiritual counseling': '/meditation.jpg',
};

function ScrollableCarousel({ children }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
}

function getProductImage(product, categoryFallbacks) {
  if (product.image && !product.image.startsWith('/') && !product.image.endsWith('.png')) {
    return product.image;
  }
  if (product.image) {
    return product.image;
  }
  const catLower = (product.category || '').toLowerCase();
  return categoryFallbacks[catLower] || '/saraa-logo.jpeg';
}

export default function Products({ cart = [], setCart, setIsCartOpen }) {
  const { t } = useLanguage();
  const [allProducts, setAllProducts] = useState([]);
  const [crystalCategoryNames, setCrystalCategoryNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/products`),
          axios.get(`${API_BASE_URL}/api/categories`)
        ]);
        const products = Array.isArray(prodRes.data) ? prodRes.data : [];
        const categories = Array.isArray(catRes.data) ? catRes.data : [];
        setAllProducts(products);
        const crystalNames = categories
          .filter(c => c.type === 'crystal')
          .map(c => c.name.toLowerCase());
        setCrystalCategoryNames(crystalNames);
      } catch (err) {
        console.error('Failed to fetch products for homepage:', err);
        setAllProducts([]);
        setCrystalCategoryNames([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getProductsForSection = (section) => {
    if (section.filterType === 'crystal') {
      return allProducts.filter(p =>
        p.category && crystalCategoryNames.includes(p.category.toLowerCase())
      );
    }
    return allProducts.filter(p =>
      p.category && p.category.toLowerCase() === (section.categoryName || '').toLowerCase()
    );
  };

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    if (!setCart) return;

    const qty = product._quantity || 1;
    const size = product._selectedSize || null;
    const cartItemId = size ? `${product.id}-${size}` : product.id;
    const cartName = size ? `${product.name} (${size})` : product.name;

    const existingItem = cart.find((item) => item.id === cartItemId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: cartItemId,
          name: cartName,
          price: product.price,
          image: getProductImage(product, FALLBACK_IMAGES),
          quantity: qty
        }
      ]);
    }
    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  return (
    <div id="products-section" className="relative font-sans py-20 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(161,61,142,0.05)_0%,transparent_70%),linear-gradient(180deg,#FDFCFF_0%,#F8F6FF_50%,#F5EEFF_100%)]">

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="max-w-[1240px] mx-auto px-8 mb-14 text-center"
      >
        <h1 className="text-sara-gold text-4xl font-bold uppercase tracking-[2px] mb-2 font-serif">
          {t('products.title')}
        </h1>
        <p className="text-sara-muted text-base tracking-[0.5px]">
          {t('products.description')}
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20 text-sara-gold text-sm tracking-wider">
          {t('products.loading')}
        </div>
      ) : (
        CATEGORY_SECTIONS.map((section, sIdx) => {
          const sectionProducts = getProductsForSection(section);
          if (sectionProducts.length === 0) return null;

          return (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={fadeInUpVariants}
              className="max-w-[1240px] mx-auto px-8 mb-14"
            >
              <div className="flex items-end justify-between mb-6 border-b border-[rgba(214,178,106,0.15)] pb-4">
                <h2 className="text-black text-2xl font-light uppercase tracking-[1.5px] m-0 font-serif">
                  {section.title}
                </h2>
                <Link
                  to={section.viewAllPath}
                  className="text-sara-gold text-[11px] font-semibold uppercase tracking-[1.5px] no-underline border border-[rgba(214,178,106,0.3)] px-4 py-2 rounded-sm transition-all duration-300 hover:bg-[rgba(214,178,106,0.1)] hover:border-sara-gold"
                >
                  {t('products.viewAll')}
                </Link>
              </div>

              <ScrollableCarousel>
                {sectionProducts.map((product, idx) => {
                  const imgSrc = getProductImage(product, FALLBACK_IMAGES);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.25, 1, 0.5, 1] }}
                      onClick={() => setActiveProduct(product)}
                      className="min-w-[260px] max-w-[260px] bg-sara-panel border border-[rgba(214,178,106,0.12)] rounded-lg overflow-hidden flex flex-col flex-shrink-0 transition-all duration-300 hover:border-[rgba(214,178,106,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] select-none cursor-pointer"
                    >
                      <div className="w-full h-[180px] overflow-hidden relative bg-[#F5F0FF]">
                        <img
                          src={imgSrc}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_IMAGES[(product.category || '').toLowerCase()] || '/saraa-logo.jpeg';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
                        <div className="absolute top-3 right-3 bg-[rgba(255,255,255,0.85)] border border-[rgba(214,178,106,0.25)] px-2.5 py-1 rounded text-[10px] text-sara-gold font-bold uppercase tracking-wider backdrop-blur-sm">
                          {product.type}
                        </div>
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-[#2A1635] text-[15px] font-medium leading-tight m-0 mb-1 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-sara-muted text-[12px] m-0 mb-3 line-clamp-2 leading-relaxed">
                            {product.desc}
                          </p>
                        </div>

                        <div>
                          <div className="text-sara-gold text-xl font-semibold my-3">
                            Rs. {product.price.toLocaleString('en-IN')}
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className="w-full bg-sara-panel text-sara-gold border border-[rgba(214,178,106,0.3)] py-2.5 text-[11px] font-semibold uppercase tracking-[1px] cursor-pointer transition-all duration-200 hover:bg-sara-gold hover:text-sara-dark hover:border-sara-gold rounded-sm flex items-center justify-center gap-1.5"
                          >
                            <span>{t('products.addToCart')}</span>
                            <span className="text-[13px] font-normal leading-none">→</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </ScrollableCarousel>
            </motion.div>
          );
        })
      )}

      {/* Product Detail Modal */}
      {activeProduct && (
        <ProductDetailModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={(p) => handleAddToCart(p)}
        />
      )}
    </div>
  );
}
