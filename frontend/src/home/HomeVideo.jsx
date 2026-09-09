import React, { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function HomeVideo() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  
  const videos = ['ie0KDqhoBJM', 'LWKBDHhiphE', 'xE36u_RnZE4'];

  const openVideo = (id) => {
    setActiveVideoId(id);
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setTimeout(() => setActiveVideoId(null), 300); // Clear after fade out
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative py-24 px-0 overflow-hidden bg-[radial-gradient(ellipse_80%_100%_at_100%_50%,rgba(161,61,142,0.10)_0%,rgba(161,61,142,0.04)_40%,transparent_70%),linear-gradient(135deg,#FFFFFF_0%,#FDFCFF_40%,#F5EEFF_70%,#EAD6FA_100%)] border-y border-[#D9B56A]/10">
      
      {/* Decorative background elements matching AbtSara */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(161,61,142,0.08)_0%,transparent_70%)] blur-[50px] animate-[floatGlowPurple_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(214,178,106,0.10)_0%,transparent_70%)] blur-[60px] animate-[floatGlowGold_6s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6">
        
        <p 
          data-aos="fade-up"
          className="font-sans font-semibold text-[13px] md:text-[15px] uppercase tracking-[4px] text-[#D9B56A] m-0 mb-4"
        >
          {t('homeVideo.subtitle')}
        </p>

        <h2 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="font-serif text-[clamp(32px,5vw,56px)] font-bold tracking-[1px] m-0 mb-12 text-[#2A1635] max-w-3xl leading-tight"
        >
          {t('homeVideo.title')}
        </h2>
      </div>

      {/* Single Video Centered Slider */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6">
        <div 
          data-aos="zoom-in-up"
          data-aos-delay="200"
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(161,61,142,0.2)] border border-[#D9B56A]/30 group"
        >
          {videos.map((vid, idx) => (
            <div 
              key={vid}
              className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              {/* Thumbnail Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${vid}/maxresdefault.jpg)` }}
                onClick={() => openVideo(vid)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1225]/80 via-[#0B1225]/30 to-transparent group-hover:bg-[#0B1225]/40 transition-colors duration-500" />
              </div>

              {/* Premium Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_40px_rgba(217,181,106,0.5)] flex items-center justify-center relative z-10 pointer-events-auto cursor-pointer"
                  onClick={() => openVideo(vid)}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-[#D9B56A] animate-ping opacity-30 duration-1000"></div>
                  <Play className="text-white ml-1.5 md:ml-2" size={32} fill="currentColor" />
                </motion.div>
                <span className="text-white mt-4 md:mt-6 font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase opacity-90 group-hover:opacity-100 transition-opacity">
                  {t('homeVideo.watchBtn')}
                </span>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-black/40 hover:bg-[#D9B56A]/90 text-white hover:text-black rounded-full backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors shadow-lg"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-black/40 hover:bg-[#D9B56A]/90 text-white hover:text-black rounded-full backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors shadow-lg"
          >
            <ChevronRight size={28} />
          </button>

          {/* Dots Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#D9B56A] w-8' : 'bg-white/50 hover:bg-white w-2.5'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && activeVideoId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-pointer"
            onClick={closeVideo}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              
              <button 
                onClick={closeVideo}
                className="absolute top-4 right-4 z-50 bg-black/50 text-white hover:bg-[#D9B56A] hover:text-[#0B1225] p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X size={24} />
              </button>

              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`} 
                title="Saraa Tarot Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
