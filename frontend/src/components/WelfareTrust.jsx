import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cross, Sparkles, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const IMAGE_FALLBACK = '/saraa-logo.jpeg';

const MEDICAL_IMAGES = [
  '/welfare/medical-1.jpg',
  '/welfare/medical-2.jpg',
  '/welfare/medical-3.jpg'
];

const SPIRITUAL_IMAGES = [
  '/welfare/spiritual-1.jpg',
  '/welfare/spiritual-2.jpg',
  '/welfare/spiritual-3.jpg'
];

const TEMPLE_IMAGES = [
  '/welfare/temple-1.jpg',
  '/welfare/temple-2.jpg',
  '/welfare/temple-3.jpg'
];

function ServiceCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full h-[220px] overflow-hidden bg-[#12071C] group">
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = IMAGE_FALLBACK;
          }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0614]/80 via-transparent to-transparent pointer-events-none" />

      <button
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sara-gold hover:text-[#1E0F2B] text-white border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-200"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sara-gold hover:text-[#1E0F2B] text-white border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-200"
      >
        <ChevronRight size={16} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`p-0 rounded-full border-none cursor-pointer transition-all duration-300 ${
              i === index ? 'w-5 h-1.5 bg-sara-gold' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, images }) {
  return (
    <div className="bg-gradient-to-br from-[#1E0F2B] to-[#0C0614] border border-[rgba(214,178,106,0.2)] rounded-lg overflow-hidden transition-all duration-300 hover:border-sara-gold hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(161,61,142,0.18)]">
      <ServiceCarousel images={images} alt={title} />

      <div className="p-7 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(214,178,106,0.12)] border border-[rgba(214,178,106,0.3)] mb-5">
          <Icon size={20} className="text-sara-gold" />
        </div>
        <h3 className="m-0 mb-3 text-white font-serif text-[1.4rem] font-semibold uppercase tracking-[1px]">
          {title}
        </h3>
        <p className="m-0 text-[#D3C7DC] text-[0.9rem] leading-6">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WelfareTrust() {
  const { t } = useLanguage();

  const services = [
    { key: 'medical', icon: Cross, title: t('welfareTrust.medicalTitle'), description: t('welfareTrust.medicalDesc'), images: MEDICAL_IMAGES },
    { key: 'spiritual', icon: Sparkles, title: t('welfareTrust.spiritualTitle'), description: t('welfareTrust.spiritualDesc'), images: SPIRITUAL_IMAGES },
    { key: 'temple', icon: Landmark, title: t('welfareTrust.templeTitle'), description: t('welfareTrust.templeDesc'), images: TEMPLE_IMAGES }
  ];

  return (
    <section className="relative bg-[#F8F6FF] py-20 px-4 sm:px-8 overflow-hidden">
      <div className="absolute top-[-120px] right-[-80px] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(214,178,106,0.10)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-120px] left-[-80px] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(161,61,142,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <span className="text-sara-gold tracking-[2px] text-xs font-semibold uppercase">
            {t('welfareTrust.badge')}
          </span>
          <h2 className="text-[#2A1635] font-serif text-[2.2rem] sm:text-[2.8rem] font-semibold mt-3 mb-4 uppercase tracking-[1px]">
            {t('welfareTrust.title')}
          </h2>
          <p className="text-sara-muted text-[1.05rem] leading-7 max-w-[760px] mx-auto">
            {t('welfareTrust.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              icon={service.icon}
              title={service.title}
              description={service.description}
              images={service.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
