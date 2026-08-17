import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const certificateImage = "/certificate.webp";

export default function AbtCertificate() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#2A1635] py-24 w-full relative overflow-hidden">
      <div className="w-full max-w-[1320px] mx-auto px-[6vw]">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-16"
        >
          <p className="m-0 mb-3 font-['Poppins'] italic text-[18px] text-[#D9B56A]">
            Recognized &amp; Certified
          </p>
          <h2 className="m-0 font-['Poppins'] text-[clamp(32px,4.5vw,48px)] font-normal leading-[1.2] text-[#F4F0EA]">
            Our Certifications
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >

          {/* Certificate Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-[480px] aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#D9B56A]/30 shadow-[0_20px_60px_-15px_rgba(217,181,106,0.25)]">
              <img
                src={certificateImage}
                alt="Certificate of Recognition"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

          {/* Certificate Content */}
          <div className="w-full lg:w-1/2">
            <h3 className="m-0 mb-4 font-['Poppins'] text-[28px] font-normal text-[#F4F0EA]">
              Certified Tarot Reader &amp; Spiritual Guide
            </h3>
            <p className="m-0 mb-6 font-['Poppins'] font-light text-[15px] leading-[1.75] text-[#D1C4D9]">
              With over a decade of experience in tarot reading and spiritual guidance,
              our certifications reflect the dedication and authenticity we bring to every session.
              Recognized by leading spiritual and wellness organizations, we are committed to
              providing accurate and insightful readings.
            </p>
            <p className="m-0 mb-8 font-['Poppins'] font-light text-[15px] leading-[1.75] text-[#D1C4D9]">
              Our credentials are a testament to our expertise in Vedic astrology,
              numerology, and intuitive card readings that have helped thousands of
              individuals find clarity and direction in their lives.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="bg-[#F4F0EA]/5 border border-[#D9B56A]/20 rounded-lg px-6 py-4 text-center min-w-[130px]">
                <p className="m-0 font-['Poppins'] text-[28px] font-semibold text-[#D9B56A]">10+</p>
                <p className="m-0 mt-1 font-['Poppins'] text-[13px] text-[#D1C4D9] uppercase tracking-wider">Years Exp.</p>
              </div>
              <div className="bg-[#F4F0EA]/5 border border-[#D9B56A]/20 rounded-lg px-6 py-4 text-center min-w-[130px]">
                <p className="m-0 font-['Poppins'] text-[28px] font-semibold text-[#D9B56A]">5K+</p>
                <p className="m-0 mt-1 font-['Poppins'] text-[13px] text-[#D1C4D9] uppercase tracking-wider">Readings</p>
              </div>
              <div className="bg-[#F4F0EA]/5 border border-[#D9B56A]/20 rounded-lg px-6 py-4 text-center min-w-[130px]">
                <p className="m-0 font-['Poppins'] text-[28px] font-semibold text-[#D9B56A]">3+</p>
                <p className="m-0 mt-1 font-['Poppins'] text-[13px] text-[#D1C4D9] uppercase tracking-wider">Certified</p>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
