import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTranslatedTestimonials, useTranslatedText } from "../utils/translator";
import api from "../api/client";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 1, 0.5, 1]
    }
  })
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#DFBA6B" stroke="#DFBA6B" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[rgba(161,61,142,0.2)] to-[rgba(214,178,106,0.15)] flex items-center justify-center border border-[rgba(214,178,106,0.2)] shrink-0">
      <span className="text-[13px] font-semibold text-[#000000] font-sans">
        {initials}
      </span>
    </div>
  );
}

export default function Testimonial() {
  const sectionRef = useRef(null);
  const { t, locale } = useLanguage(); 
  
  const [dbTestimonials, setDbTestimonials] = useState([]);
  const translatedTestimonials = useTranslatedTestimonials(dbTestimonials, locale);

  const translatedSubtitle = useTranslatedText('Client Experiences', locale);
  const translatedTitle = useTranslatedText('What Our Clients Say', locale);
  const translatedDesc = useTranslatedText("Real words from real people who have experienced the transformative power of Sara's spiritual services.", locale);
  const translatedViewAll = useTranslatedText('View All Testimonials', locale);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchTestis = async () => {
      try {
        const res = await api.get('/api/testimonials');
        setDbTestimonials(res.data);
      } catch (err) {
        console.error('Error fetching testimonials', err);
      }
    };
    fetchTestis();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  useEffect(() => {
    const updateCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 6 : window.innerWidth >= 640 ? 4 : 2);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const displayed = translatedTestimonials.slice(0, visibleCount);

  return (
    <div
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 px-6 overflow-hidden bg-[radial-gradient(ellipse_80%_100%_at_0%_50%,rgba(161,61,142,0.10)_0%,rgba(161,61,142,0.04)_40%,transparent_70%),linear-gradient(135deg,#FFFFFF_0%,#FDFCFF_40%,#F5EEFF_70%,#EAD6FA_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute -top-[15%] -left-[8%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(161,61,142,0.10)_0%,transparent_70%)] blur-[60px]"
        />
        <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(214,178,106,0.08)_0%,transparent_70%)] blur-[50px]" />
      </div>

      <div
        className="relative z-10 max-w-[1240px] mx-auto"
      >
        <p
          data-aos="fade-up"
          className="text-center font-sans font-normal text-[14px] uppercase tracking-[3px] text-[#000000] m-0 mb-2"
        >
          {translatedSubtitle}
        </p>

        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center font-serif text-[clamp(36px,5.5vw,60px)] font-semibold tracking-[0.5px] m-0 mb-4 text-black"
        >
          {translatedTitle}
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-center font-sans text-[15px] leading-relaxed text-black/60 max-w-[600px] mx-auto mb-14"
        >
          {translatedDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((item, index) => (
            <motion.div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 100}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-white/70 backdrop-blur-sm border border-[rgba(214,178,106,0.2)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(161,61,142,0.06)] hover:shadow-[0_12px_40px_rgba(161,61,142,0.12)] transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={item.name} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans text-[14px] font-semibold text-black m-0 leading-tight truncate">
                    {item.name}
                  </h4>
                  <p className="font-sans text-[11px] uppercase tracking-[1px] text-[rgba(0,0,0,0.5)] m-0 mt-0.5">
                    {item.role}
                  </p>
                </div>
                <StarRating rating={item.rating} />
              </div>

              <div className="relative flex-1">
                <span className="absolute -top-1 -left-0.5 text-[28px] leading-none text-[rgba(214,178,106,0.25)] font-serif select-none">
                  "
                </span>
                <p className="font-sans text-[13.5px] leading-relaxed text-black/70 m-0 pl-5 pt-2">
                  {item.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {translatedTestimonials.length > visibleCount && (
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center mt-10"
          >
            <button
              onClick={() => setVisibleCount(translatedTestimonials.length)}
              className="font-sans text-[12px] font-semibold tracking-[2px] uppercase bg-gradient-to-r from-sara-gold to-sara-goldSoft text-black py-3.5 px-8 cursor-pointer rounded transition-all duration-300 hover:shadow-[0_8px_24px_rgba(214,178,106,0.35)] hover:-translate-y-0.5"
            >
              {translatedViewAll}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
