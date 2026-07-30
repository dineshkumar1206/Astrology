import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Images 
const cardImages = [
  "/crystal.jpg", // Crystal
  "/Lucky.jpg", // Bracelet/Charms
  "/tarot.jpg", // Tarot
  "/meditation.jpg"  // Meditation
];

export default function CosmicInsights() {
  const { t } = useLanguage();
  const cards = [
    {
      title: t('cosmicInsights.cards.0.title'),
      img: cardImages[0],
      desc: t('cosmicInsights.cards.0.desc')
    },
    {
      title: t('cosmicInsights.cards.1.title'),
      img: cardImages[1],
      desc: t('cosmicInsights.cards.1.desc')
    },
    {
      title: t('cosmicInsights.cards.2.title'),
      img: cardImages[2],
      desc: t('cosmicInsights.cards.2.desc'),
    },
    {
      title: t('cosmicInsights.cards.3.title'),
      img: cardImages[3],
      desc: t('cosmicInsights.cards.3.desc')
    }
  ];

  return (
    <section className="relative bg-[#F8F6FF] text-[#2A1635] py-36 w-full overflow-hidden box-border">
      


      {/* Top Curve SVG Divider */}
      <div className="absolute top-[-1px] left-0 w-full z-10 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 100" className="w-full h-[100px] block fill-[#F8F6FF]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 Q720,100 1440,0 V-10 H0 Z"></path>
        </svg>
      </div>

      {/* Background Zodiac Wheel Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-[0.12] pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#D9B56A] stroke-[0.35]">
          <circle cx="50" cy="50" r="48" />
          <circle cx="50" cy="50" r="38" strokeDasharray="1 1" />
          <circle cx="50" cy="50" r="25" />
          <line x1="50" y1="2" x2="50" y2="98" />
          <line x1="2" y1="50" x2="98" y2="50" />
          <line x1="16" y1="16" x2="84" y2="84" />
          <line x1="16" y1="84" x2="84" y2="16" />
        </svg>
      </div>

      {/* Centered Headers */}
      <div className="text-center relative z-20 mb-16 px-5">
        <p className="m-0 mb-2 font-serif italic text-[18px] text-[#D9B56A]">
          {t('cosmicInsights.badge')}
        </p>
        <h2 className="m-0 font-serif text-[clamp(36px,4.5vw,54px)] font-normal text-[#2A1635]">
          {t('cosmicInsights.title')}
        </h2>
      </div>

      {/* 4-Column Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12 w-full max-w-[1320px] mx-auto px-[4vw] relative z-20 box-border">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col transition-transform duration-300 hover:-translate-y-[5px] group cursor-pointer">
            
            <div className="w-full aspect-[4/3] overflow-hidden mb-6">
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            <h3 className="m-0 mb-4 font-serif text-[22px] font-normal text-[#2A1635]">
              {card.title}
            </h3>

            <p className="m-0 mb-4 font-sans font-light text-[14px] leading-[1.7] text-[#3E2F48]">
              {card.desc}
            </p>

            <a 
              href={`#${card.title.toLowerCase().replace(' ', '-')}`} 
              className="font-sans font-medium text-[13px] text-[#2A1635] no-underline uppercase tracking-[1px] mt-auto pt-4 transition-colors duration-300 inline-block group-hover:text-[#D9B56A]"
            >
              {t('cosmicInsights.readMore')}
            </a>

          </div>
        ))}
      </div>

      {/* Bottom Curve SVG Divider */}
      <div className="absolute bottom-[-1px] left-0 w-full z-10 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 100" className="w-full h-[100px] block fill-[#F8F6FF]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 Q720,100 1440,0 V-10 H0 Z"></path>
        </svg>
      </div>

    </section>
  );
}