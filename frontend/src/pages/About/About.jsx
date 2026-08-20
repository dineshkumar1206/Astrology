import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CosmicInsights from './CosmicInsights';
import AbtCertificate from './AbtCertificate';
import Team from './Team';
import { useLanguage } from '../../context/LanguageContext';


// High-quality relevant founder photography for the right-hand container
const aboutImage = "/4-1.webp";

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative w-full h-[450px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1632386221545-c1fc23ffcefb?auto=format&fit=crop&w=1920&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-[#2A1635]/80 z-10"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
            }}
            className="font-serif text-[clamp(54px,8vw,84px)] text-[#F4F0EA] m-0 mb-2 font-normal"
          >
            {t('aboutPage.heroTitle')}
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
            }}
            className="font-sans text-[14px] text-sara-gold uppercase tracking-[2px] m-0"
          >
            {t('aboutPage.heroSubtitle')}
          </motion.p>
        </motion.div>

        <div className="absolute bottom-[-1px] left-0 w-full z-30 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[80px] block fill-[#F8F6FF]">
            <path d="M0,100 Q720,0 1440,100 V110 H0 Z"></path>
          </svg>
        </div>
      </section>

      <section className="bg-[#F8F6FF] text-[#2A1635] py-24 w-full flex items-center relative overflow-hidden box-border">

        <div className="w-full max-w-[1320px] mx-auto flex flex-wrap items-center gap-[4.5rem] px-[6vw]">

          {/* Left Column Container: Branding copy, sub-features grid, button */}
          <div className="w-full lg:flex-1 lg:basis-[540px] lg:max-w-[620px]">

            {/* Small upper serif label */}
            <p className="m-0 mb-3 font-['Poppins'] italic text-[18px] text-[#D9B56A]">
              {t('aboutPage.label')}
            </p>

            {/* Main Title Header */}
            <h2 className="m-0 mb-6 font-['Poppins'] text-[clamp(32px,4.5vw,48px)] font-normal leading-[1.2] text-[#2A1635]">
              {t('aboutPage.heading')}
            </h2>

            {/* Description Copy */}
            <p className="m-0 mb-6 font-['Poppins'] font-light text-[15px] leading-[1.75] text-[#3E2F48]">
              {t('aboutPage.p1')}
            </p>
            <p className="m-0 mb-12 font-['Poppins'] font-light text-[15px] leading-[1.75] text-[#3E2F48]">
              {t('aboutPage.p2')}
            </p>

            {/* Action button */}
            <Link
              to="/contact"
              className="inline-block bg-transparent text-[#D9B56A] border border-dashed border-[#D9B56A]/40 py-4 px-8 font-['Poppins'] text-[13px] font-medium uppercase tracking-[1.5px] cursor-pointer transition-all duration-300 mt-2 hover:border-solid hover:border-[#D9B56A] hover:bg-[#D9B56A]/5"
            >
              {t('aboutPage.connectBtn')}
            </Link>

          </div>

          {/* Right Column Container: Asymmetric visual presentation layout window */}
          <div className="w-full lg:flex-1 lg:basis-[420px] lg:max-w-[560px] flex justify-center lg:justify-end relative mt-12 lg:mt-0">

            <div className="w-full aspect-[4/3.8] rounded-tl-[120px] rounded-br-[120px] overflow-hidden border border-[#D9B56A]/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative">
              <img
                src={aboutImage}
                alt={t('aboutPage.founderAlt')}
                className="w-full h-full object-cover block"
              />
            </div>

          </div>

        </div>
      </section>
      <AbtCertificate />
      
      <CosmicInsights />
    </>
  );
}