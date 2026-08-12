import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const COLORS = {
  bg: '#F9F5FE',
  bgDeep: '#E3CAFA',
  panel: '#EDE0F7',
  gold: '#D6B26A',
  goldSoft: '#E8C985',
  text: '#2A1635',
  muted: '#3E2F48',
  purple: '#C4A5E8',
  accentPurple: '#B891E0',
};



export default function Hero() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full min-h-[95vh] flex items-center box-border bg-[radial-gradient(ellipse_80%_100%_at_100%_50%,rgba(161,61,142,0.10)_0%,rgba(161,61,142,0.04)_40%,transparent_70%),linear-gradient(135deg,#FFFFFF_0%,#FDFCFF_40%,#F5EEFF_70%,#EAD6FA_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-[10%] -right-[8%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(196,165,232,0.25)_0%,transparent_70%)] blur-[60px] pointer-events-none z-0 animate-[floatGlowPurple_8s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[5%] left-[15%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(214,178,106,0.15)_0%,transparent_70%)] blur-[50px] pointer-events-none z-0 animate-[floatGlowGold_10s_ease-in-out_infinite]"
      />

      <div className="absolute -left-[190px] top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none z-[1] w-[640px]">
        <img
          src="/home-2.webp"
          alt="Zodiac background alignment watermark"
          className="w-full h-auto object-contain block"
        />
      </div>

      <div className="w-full max-w-[1320px] mx-auto flex flex-row flex-nowrap justify-between items-center gap-6 relative z-[5] px-[6vw] box-border max-lg:flex-col-reverse max-lg:flex-wrap max-lg:items-center max-lg:pt-24 max-lg:pb-12 max-lg:gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          className="absolute left-[42%] top-[65%] w-[80px] md:w-[110px] z-20 hidden lg:block drop-shadow-[0_15px_30px_rgba(161,61,142,0.3)]"
        >
          <motion.img
            src="/crystal.webp"
            alt="Crystal floating"
            className="w-full h-auto object-contain"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="flex-[0_1_60%] max-w-[680px] box-border"
        >
          <motion.h1
            variants={fadeInUpVariants}
            className="m-0 mb-8 font-semibold leading-[1.05] tracking-[-0.03em] text-start"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif" }}
          >
            <span className="block text-[clamp(50px,6vw,80px)]">
              <span className="text-black">{t('hero.titleFirst')}</span>
              <span className="text-sara-gold">{t('hero.titleSecond')}</span>
            </span>
          </motion.h1>

          <motion.div
            variants={fadeInUpVariants}
            className="text-[#3E2F48] font-['Poppins',sans-serif] font-light text-base leading-[1.75] flex flex-col gap-3 max-w-[480px] text-start"
          >
            <p className="m-0">
              {t('hero.description')}
            </p>
            <p className="m-0">{t('hero.tagline')}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -6,
            transition: { duration: 0.4, ease: 'easeOut' }
          }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="group flex-[0_0_500px] max-w-[560px] relative rounded-[22px] overflow-hidden border border-[rgba(214,178,106,0.35)] bg-white shadow-[0_30px_60px_rgba(42,22,53,0.12)] cursor-pointer transition-[border-color,box-shadow] duration-500 ease-out group-hover:border-[rgba(214,178,106,0.8)] group-hover:shadow-[0_45px_90px_rgba(214,178,106,0.35)] max-lg:w-full max-lg:max-w-[320px] max-lg:flex-none max-lg:ml-0"
        >
          <img
            src="/home-abt-2.webp"
            alt="Personalized tarot reading session"
            className="w-full h-full aspect-square object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />

          {/* Shine sweep across the image on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[12] -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[130%]"
          />

          {/* Soft gold glow overlay on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[11] bg-gradient-to-t from-sara-gold/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />

          <button
            onClick={() => navigate('/products/tarot-consultation')}
            className="absolute bottom-0 right-0 border-none py-[1.2rem] px-[2.5rem] font-['Poppins',sans-serif] text-[13px] font-medium uppercase tracking-[2px] cursor-pointer z-[15] bg-gradient-to-br from-sara-gold to-sara-goldSoft text-[#2A1635] transition-[transform,box-shadow,filter] duration-[350ms] ease-in-out hover:brightness-90 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(214,178,106,0.35)]"
          >
            {t('hero.bookBtn')}
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-[10px] z-[6]">
        <span className="w-[7px] h-[7px] rounded-full bg-sara-gold transition-[background-color,transform] duration-300 ease-in-out" />
        <span className="w-[7px] h-[7px] rounded-full bg-[rgba(42,22,53,0.15)] transition-[background-color,transform] duration-300 ease-in-out" />
      </div>
    </section>
  );
}
