import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const certificates = [
  {
    id: 0,
    image: "/certificate-1.webp",
    title: "Certified Tarot Master & Spiritual Guide",
    instructor: "Wargachuk Academy (IPHM Approved)",
    date: "March 6, 2024",
    duration: "Comprehensive",
    description: "Sara Tarot has successfully pursued rigorous studies and completed all requirements to become a highly qualified Tarot Master through the prestigious Wargachuk Academy. This certification is a testament to the dedication, accuracy, and spiritual authenticity brought to every reading and consultation."
  },
  {
    id: 1,
    image: "/certificate-11.webp",
    title: "Master Life Coach & Practitioner | INTERNATIONALLY ACCREDITED",
    instructor: "Sufani Garza, Place of Bliss Academy",
    date: "March 6, 2024",
    duration: "5 total hours",
    description: "Earned an internationally recognized accreditation in life coaching and transformational practice. This program equips practitioners with high-level coaching methodologies, emotional alignment tools, and strategic frameworks to guide individuals toward personal empowerment, mindset mastery, and purposeful living."
  },
  {
    id: 2,
    image: "/certificate-12.webp",
    title: "Certified Spiritual Healing Advisor & Medium | ACCREDITED",
    instructor: "Sufani Garza, Place of Bliss Academy",
    date: "March 6, 2024",
    duration: "4.5 total hours",
    description: "Formally accredited in spiritual energy guidance, intuitive channel connection, and holistic healing methodologies. This certification validates expertise in facilitating deep energetic release, mediumship alignment, and compassionate spiritual care for clients navigating profound life journeys."
  },
  {
    id: 3,
    image: "/certificate-13.webp",
    title: "Symbols I: Ancient Egyptian Symbols in Mythology & Religion",
    instructor: "Peggy Zogbaum",
    date: "March 6, 2024",
    duration: "1.5 total hours",
    description: "A specialized study into the sacred geometry, esoteric meanings, and religious iconography of ancient Egypt. This training deepens symbolic intuition, allowing for a richer, highly nuanced interpretation of archetypal energies during spiritual readings and consultations."
  },
  {
    id: 4,
    image: "/certificate-14.webp",
    title: "Personality Disorders: Master the Psychology of All 10 Types",
    instructor: "Dr. Day",
    date: "July 15, 2024",
    duration: "2 total hours",
    description: "An intensive psychological examination of human personality structures, behavioral patterns, and mental health archetypes. This clinical foundation enhances client communication, grounded empathy, and a professional, psychologically informed approach to holistic spiritual advisory."
  }
];

export default function AbtCertificate() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play the carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextCert = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const currentCert = certificates[currentIndex];

  return (
    <section className="bg-[#1A0B2E] py-16 lg:py-24 w-full relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-0 left-[-10%] w-[40%] h-[60%] rounded-full bg-[#D9B56A] opacity-5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[30%] h-[50%] rounded-full bg-[#9B6AD9] opacity-5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1320px] mx-auto px-5 lg:px-[6vw] relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-16"
        >
          <p className="m-0 mb-3 font-['Poppins'] tracking-[0.2em] uppercase text-[14px] text-[#D9B56A]">
            RECOGNIZED &amp; CERTIFIED
          </p>
          <h2 className="m-0 font-['Poppins'] text-[clamp(36px,5vw,56px)] font-light leading-[1.2] text-[#F4F0EA]">
            Our <span className="font-semibold text-[#D9B56A]">Certifications</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          
          {/* Left Column: Certificate Image & Controls */}
          <div className="w-full lg:w-[60%] flex flex-col items-center">
            
            <div className="w-full relative min-h-[250px] sm:min-h-[450px] flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCert.id}
                  initial={{ opacity: 0, scale: 0.95, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: 20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full max-w-[800px] bg-white rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(217,181,106,0.2)] border border-[#D9B56A]/30 relative z-10 p-2"
                >
                  <img
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="w-full h-auto object-contain rounded-xl"
                    onError={(e) => { e.target.src = "https://placehold.co/800x600/ffffff/D9B56A?text=Certificate+" + currentCert.id }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6 mt-8">
              <button 
                onClick={prevCert}
                className="w-10 h-10 rounded-full border border-[#D9B56A]/50 flex items-center justify-center text-[#D9B56A] hover:bg-[#D9B56A] hover:text-[#1A0B2E] transition-colors duration-300 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="flex gap-3">
                {certificates.map((cert, idx) => (
                  <button
                    key={cert.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-[#D9B56A] w-8' : 'bg-[#D9B56A]/30 w-2.5 hover:bg-[#D9B56A]/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextCert}
                className="w-10 h-10 rounded-full border border-[#D9B56A]/50 flex items-center justify-center text-[#D9B56A] hover:bg-[#D9B56A] hover:text-[#1A0B2E] transition-colors duration-300 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic Content Area */}
          <div className="w-full lg:w-[40%] relative z-30 pt-4 lg:pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="pl-0 lg:pl-8 lg:border-l-2 lg:border-[#D9B56A]/30"
              >
                <h3 className="m-0 mb-6 font-['Poppins'] text-[22px] sm:text-[24px] font-medium text-[#D9B56A] leading-tight">
                  {currentCert.title}
                </h3>
                
                <p className="m-0 mb-8 font-['Poppins'] font-light text-[14px] leading-[1.8] text-[#D1C4D9]">
                  {currentCert.description}
                </p>
                
                <div className="bg-[#2A1635]/50 rounded-xl p-6 border border-[#D9B56A]/10 backdrop-blur-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="m-0 text-[12px] font-['Poppins'] text-[#A897B3] uppercase tracking-wider mb-1">Instructor</p>
                      <p className="m-0 font-['Poppins'] text-[14px] text-[#F4F0EA]">{currentCert.instructor}</p>
                    </div>
                    <div>
                      <p className="m-0 text-[12px] font-['Poppins'] text-[#A897B3] uppercase tracking-wider mb-1">Date</p>
                      <p className="m-0 font-['Poppins'] text-[14px] text-[#F4F0EA]">{currentCert.date}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="m-0 text-[12px] font-['Poppins'] text-[#A897B3] uppercase tracking-wider mb-1">Duration</p>
                      <p className="m-0 font-['Poppins'] text-[14px] text-[#F4F0EA]">{currentCert.duration}</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
