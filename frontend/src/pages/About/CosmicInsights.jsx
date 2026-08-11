import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Gallery images
const galleryImages = [
  "/2.jpg",
  "/meeting.jpg",
  "/news-1.jpeg",
  "/news-2.jpeg"
];

export default function CosmicInsights() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#F8F6FF] text-[#2A1635] py-24 w-full overflow-hidden box-border">
      

      <div className="w-full max-w-[1000px] mx-auto px-[4vw] relative z-20 mt-12 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="m-0 mb-2 font-serif italic text-[18px] text-[#D9B56A]"
        >
          Spiritual Guidance & Rasi Reading
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="m-0 mb-8 font-serif text-[clamp(32px,4vw,48px)] font-normal text-[#2A1635]"
        >
          Discover Your Cosmic Path
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans font-light text-[16px] leading-[1.8] text-[#3E2F48] max-w-[800px] mx-auto mb-8 space-y-6 text-justify md:text-center"
        >
          <p>
            With years of profound experience in ancient wisdom, Saraa Tarot offers deep insights through Tamil Rasi readings, 
            bridging traditional astrological knowledge with modern spiritual needs. Her accurate predictions and remedies 
            have brought clarity to countless individuals seeking direction in their lives.
          </p>
          <p>
            Recognized for her expertise, she has made numerous appearances on popular television shows, 
            sharing her spiritual knowledge and guiding the masses. Her insights are frequently featured 
            in leading magazines, especially her profound interpretations of the Murugar messages, 
            which hold a special place in the hearts of many devotees.
          </p>
        </motion.div>
      </div>

      {/* Image Gallery */}
      <div className="w-full max-w-[1100px] mx-auto px-[4vw] relative z-20 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 items-start">
          {galleryImages.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-full overflow-hidden rounded-lg shadow-md bg-white flex items-center justify-center"
            >
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}