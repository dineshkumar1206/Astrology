import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cross, Sparkles, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SERVICES = [
  { 
    key: 'medical', 
    icon: Cross, 
    titleKey: 'welfareTrust.medicalTitle', 
    descKey: 'welfareTrust.medicalDesc', 
    image: '/welfare/medical.png' 
  },
  { 
    key: 'spiritual', 
    icon: Sparkles, 
    titleKey: 'welfareTrust.spiritualTitle', 
    descKey: 'welfareTrust.spiritualDesc', 
    image: '/welfare/spiritual.png' 
  },
  { 
    key: 'temple', 
    icon: Landmark, 
    titleKey: 'welfareTrust.templeTitle', 
    descKey: 'welfareTrust.templeDesc', 
    image: '/welfare/temple.png' 
  }
];

export default function WelfareTrust() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SERVICES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const goPrev = () => setIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length);
  const goNext = () => setIndex((i) => (i + 1) % SERVICES.length);

  const currentService = SERVICES[index];
  const Icon = currentService.icon;

  return (
    <section className="relative bg-[#F8F6FF] py-20 px-4 sm:px-8 overflow-hidden">
      <div className="absolute top-[-120px] right-[-80px] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(214,178,106,0.10)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-120px] left-[-80px] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(161,61,142,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
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

        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1E0F2B] to-[#0C0614] border border-[rgba(214,178,106,0.2)] shadow-[0_20px_50px_rgba(161,61,142,0.15)] flex flex-col md:flex-row min-h-[450px]">
          
          <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-full overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.img
                key={index}
                src={currentService.image}
                alt={t(currentService.titleKey)}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0614]/70 via-[#0C0614]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#0C0614]/30 md:to-[#0C0614] pointer-events-none" />
          </div>

          <div className="relative w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center items-start z-10 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(214,178,106,0.15)] border border-[rgba(214,178,106,0.4)] mb-6 shadow-[0_0_20px_rgba(214,178,106,0.2)]">
                  <Icon size={26} className="text-sara-gold" />
                </div>
                <h3 className="m-0 mb-4 text-white font-serif text-[1.8rem] font-semibold uppercase tracking-[1px]">
                  {t(currentService.titleKey)}
                </h3>
                <p className="m-0 text-[#D3C7DC] text-[1.05rem] leading-relaxed">
                  {t(currentService.descKey)}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-12">
              <button
                onClick={goPrev}
                aria-label="Previous service"
                className="bg-[rgba(255,255,255,0.05)] hover:bg-sara-gold hover:text-[#1E0F2B] text-white border border-[rgba(214,178,106,0.3)] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next service"
                className="bg-[rgba(255,255,255,0.05)] hover:bg-sara-gold hover:text-[#1E0F2B] text-white border border-[rgba(214,178,106,0.3)] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

        </div>
        
        <div className="flex justify-center gap-3 mt-10">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to service ${i + 1}`}
              className={`p-0 rounded-full border-none cursor-pointer transition-all duration-300 ${
                i === index ? 'w-10 h-2.5 bg-sara-gold shadow-[0_0_10px_rgba(214,178,106,0.5)]' : 'w-2.5 h-2.5 bg-[rgba(214,178,106,0.3)] hover:bg-[rgba(214,178,106,0.6)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
