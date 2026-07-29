import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const heroBg = "https://images.unsplash.com/photo-1632386221545-c1fc23ffcefb?auto=format&fit=crop&w=1920&q=80";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function Contact() {
  const { t } = useLanguage();
  const accordionItems = [
    t('contactPage.accordionItems.0'),
    t('contactPage.accordionItems.1'),
    t('contactPage.accordionItems.2')
  ];

  return (
    <>
      <section className="relative w-full h-[450px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-[url('https://images.unsplash.com/photo-1632386221545-c1fc23ffcefb?auto=format&fit=crop&w=1920&q=80')]"
        ></div>
        <div className="absolute inset-0 bg-[#2A1635]/80 z-10"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1
            variants={fadeInUpVariants}
            className="font-serif text-[clamp(54px,8vw,84px)] text-[#F4F0EA] m-0 mb-2 font-normal"
          >
            {t('contactPage.title')}
          </motion.h1>
          <motion.p
            variants={fadeInUpVariants}
            className="font-sans text-[14px] text-sara-gold uppercase tracking-[2px] m-0"
          >
            {t('contactPage.subtitle')}
          </motion.p>
        </motion.div>

        <div className="absolute bottom-[-1px] left-0 w-full z-30 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[80px] block fill-sara-cream">
            <path d="M0,100 Q720,0 1440,100 V110 H0 Z"></path>
          </svg>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-sara-cream to-[#FDFBF7]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
          className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row flex-wrap gap-16 px-6 md:px-12 py-24 box-border"
        >

          <div className="flex-1 w-full lg:min-w-[500px] lg:max-w-[600px] z-10">

            <motion.p variants={fadeInUpVariants} className="m-0 mb-4 font-serif italic text-[18px] text-sara-gold">
              {t('contactPage.sectionTitle')}
            </motion.p>

            <motion.h2 variants={fadeInUpVariants} className="m-0 mb-10 font-serif text-[clamp(36px,4.5vw,48px)] font-normal leading-[1.2] text-[#2A1635]">
              {t('contactPage.heading')}
            </motion.h2>

            <motion.div variants={fadeInUpVariants} className="mb-10">
              {accordionItems.map((item, index) => (
                <div key={index} className="flex items-center py-5 border-b border-sara-gold/20 font-sans text-[15px] text-[#2A1635] cursor-pointer transition-colors duration-300 hover:text-sara-gold">
                  <span className="mr-4 text-sara-gold text-[12px]">▼</span>
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 font-sans">
              <div>
                <h4 className="text-sara-gold text-[15px] font-semibold uppercase tracking-[1.5px] mb-3">{t('contactPage.officeAddress')}</h4>
                <p className="text-[#3E2F48] text-[14px] leading-relaxed m-0 font-light">
                  {t('contactPage.address')}
                </p>
              </div>
              <div>
                <h4 className="text-sara-gold text-[15px] font-semibold uppercase tracking-[1.5px] mb-3">{t('contactPage.getInTouch')}</h4>
                <p className="text-[#3E2F48] text-[14px] leading-relaxed m-0 font-light">
                  <span className="font-semibold text-sara-gold">{t('contactPage.phone')}</span> {t('contactPage.phoneVal')}<br />
                  <span className="font-semibold text-sara-gold">{t('contactPage.email')}</span> {t('contactPage.emailVal')}
                </p>
              </div>
            </motion.div>

            <motion.button variants={fadeInUpVariants} className="bg-transparent text-sara-gold border border-sara-gold px-8 py-3 font-sans text-[12px] font-medium uppercase tracking-[1.5px] cursor-pointer transition-all duration-300 inline-block hover:bg-sara-gold hover:text-[#2A1635]">
              {t('contactPage.quoteBtn')}
            </motion.button>
          </div>

          <motion.div
            variants={fadeInUpVariants}
            className="flex-1 w-full lg:min-w-[500px] min-h-[400px] md:min-h-[450px] relative z-10"
          >
            <div className="w-full h-full min-h-[400px] md:min-h-[450px] bg-white border border-sara-gold/20 rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(29,11,46,0.08)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.871032155608!2d80.05739097585098!3d12.825740487476839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f70d6eb8bcbb%3A0x7d6c6e7a2b9a7102!2sGuduvanchery%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1708450123456!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                title={t('contactPage.mapTitle')}
              ></iframe>
            </div>
          </motion.div>

        </motion.div>
      </section>

    </>
  );
}
