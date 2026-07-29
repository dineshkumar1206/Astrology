import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const IMAGES = {
  mainPortrait: "/abt-1.png",
  moonCircle: "/moon.png",
  cardSpread: "/abt.jpeg",
};

export default function AbtSara() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [-200, 80]);
  const moonRotate = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cardSpreadY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <div
      ref={sectionRef}
      id="about"
      className="relative py-24 px-6 pb-40 overflow-hidden min-h-[700px] bg-[radial-gradient(ellipse_60%_50%_at_25%_80%,rgba(161,61,142,0.06)_0%,rgba(91,46,120,0.03)_40%,transparent_70%),radial-gradient(ellipse_40%_35%_at_80%_30%,rgba(214,178,106,0.04)_0%,transparent_60%),linear-gradient(135deg,#FFFFFF_0%,#FDFCFF_40%,#F5EEFF_70%,#EAD6FA_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-[10%] -right-[8%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(161,61,142,0.10)_0%,transparent_70%)] blur-[60px] animate-[floatGlowPurple_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(214,178,106,0.08)_0%,transparent_70%)] blur-[50px] animate-[floatGlowGold_8s_ease-in-out_infinite]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.12 }}
        className="relative z-10 max-w-[1240px] mx-auto"
      >
        <motion.p
          variants={fadeInUpVariants}
          className="text-center font-sans font-normal text-[14px] uppercase tracking-[3px] text-black m-0 mb-2"
        >
          The Founder
        </motion.p>

        <motion.h2
          variants={fadeInUpVariants}
          className="text-center font-serif text-[clamp(44px,6.5vw,72px)] font-normal tracking-[0.5px] m-0 mb-16 text-black"
        >
          The Story of Saraa Tarot
        </motion.h2>

        <motion.div
          style={{ y: moonY, rotate: moonRotate }}
          whileHover={{ scale: 1.08 }}
          className="absolute right-4 top-[80px] lg:right-10 lg:top-[100px] w-[75px] h-[75px] md:w-[90px] md:h-[90px] overflow-hidden rounded-full border border-[rgba(214,178,106,0.25)] shadow-[0_15px_40px_rgba(161,61,142,0.15)] bg-white z-20 hidden md:block"
        >
          <img
            src={IMAGES.moonCircle}
            alt="Esoteric moon dynamic illustration"
            className="w-full h-full object-cover block scale-[1.33]"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1.1fr] gap-12 items-center">

          <motion.div
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.015, transition: { duration: 0.4 } }}
            className="w-full aspect-[4/6] overflow-hidden rounded-2xl border border-[rgba(214,178,106,0.2)] shadow-[0_25px_50px_rgba(161,61,142,0.10)] bg-white"
          >
            <img
              src={IMAGES.mainPortrait}
              alt="Portrait of Saraa - Founder of Saraa Tarot"
              className="w-full h-full object-cover block"
            />
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-col justify-center py-5"
          >
            <p className="font-sans font-light text-[15px] leading-[1.8] text-black m-0 mb-6">
              Saraa's journey into the mystical realm of Tarot and spiritual healing began as a deeply personal calling to help others find alignment. Guided by decades of study and intuitive practice, she founded Saraa Tarot to bridge the gap between the material world and divine wisdom.
            </p>
            <p className="font-sans font-light text-[15px] leading-[1.8] text-black m-0 mb-6">
              Through personalized consultations and spiritual classes, Saraa provides a compassionate, empowering space. Every reading and session is crafted to decode life's complexities and guide your spirit toward absolute clarity.
            </p>

            <div className="flex items-center gap-11 mt-4 flex-wrap py-5">
              <button
                onClick={() => navigate('/contact')}
                className="font-sans text-[12px] font-medium tracking-[2px] uppercase bg-gradient-to-r from-sara-gold to-sara-goldSoft text-sara-dark py-4 px-8 cursor-pointer rounded transition-all duration-300 hover:shadow-[0_8px_24px_rgba(214,178,106,0.35)] hover:-translate-y-0.5"
              >
                Connect With Me
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              style={{ y: cardSpreadY }}
              whileHover={{ scale: 1.02 }}
              className="w-[95%] mx-auto aspect-[6/5] min-h-[360px] overflow-hidden rounded-2xl rounded-br-[80px] border border-[rgba(214,178,106,0.2)] shadow-[0_20px_45px_rgba(161,61,142,0.10)] bg-white"
            >
              <img
                src={IMAGES.cardSpread}
                alt="Tarot cards dynamic ritual spread layout"
                className="w-full h-full object-cover block"
              />
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
