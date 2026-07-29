import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const ZODIAC_ICONS = {
  Aries: (
    <>
      <path d="M20 30 C20 24 15 25 13 20 C11 16 14 11 18 12" />
      <path d="M20 30 C20 24 25 25 27 20 C29 16 26 11 22 12" />
    </>
  ),
  Taurus: (
    <>
      <circle cx="20" cy="26" r="6" />
      <path d="M14 22 C8 20 7 12 12 9" />
      <path d="M26 22 C32 20 33 12 28 9" />
    </>
  ),
  Gemini: (
    <>
      <line x1="14" y1="10" x2="14" y2="30" />
      <line x1="26" y1="10" x2="26" y2="30" />
      <line x1="10" y1="10" x2="18" y2="10" />
      <line x1="10" y1="30" x2="18" y2="30" />
      <line x1="22" y1="10" x2="30" y2="10" />
      <line x1="22" y1="30" x2="30" y2="30" />
    </>
  ),
  Cancer: (
    <>
      <circle cx="15" cy="14" r="3.5" />
      <path d="M15,17.5 C15,24 25,24 25,18" />
      <circle cx="25" cy="26" r="3.5" />
      <path d="M25,22.5 C25,16 15,16 15,22" />
    </>
  ),
  Leo: (
    <>
      <circle cx="16" cy="14" r="5" />
      <path d="M16,19 C16,26 24,24 24,30 C24,34 30,33 30,28" />
    </>
  ),
  Virgo: (
    <>
      <path d="M11,11 V28" />
      <path d="M19,11 V24" />
      <path d="M19,24 C19,29 25,30 27,26 C28,23 25,21 23,24" />
    </>
  ),
  Libra: (
    <>
      <line x1="20" y1="9" x2="20" y2="14" />
      <line x1="10" y1="15" x2="30" y2="15" />
      <path d="M6,15 C6,21 14,21 14,15" />
      <path d="M26,15 C26,21 34,21 34,15" />
      <line x1="20" y1="15" x2="20" y2="27" />
      <line x1="13" y1="30" x2="27" y2="30" />
    </>
  ),
  Scorpio: (
    <>
      <path d="M9,11 V28" />
      <path d="M17,11 V28" />
      <path d="M17,28 H27" />
      <path d="M27,28 V20" />
      <path d="M27,20 L23,22" />
      <path d="M27,20 L31,24" />
    </>
  ),
  Sagittarius: (
    <>
      <line x1="10" y1="30" x2="30" y2="10" />
      <path d="M30,10 L24,12" />
      <path d="M30,10 L28,16" />
      <line x1="14" y1="24" x2="19" y2="29" />
    </>
  ),
  Capricorn: (
    <>
      <path d="M9,12 L15,26 L20,13" />
      <path d="M20,13 C20,20 27,19 27,26 C27,31 33,31 33,26" />
    </>
  ),
  Aquarius: (
    <>
      <path d="M7,16 C10,12 13,20 16,16 C19,12 22,20 25,16 C28,12 31,20 33,16" />
      <path d="M7,25 C10,21 13,29 16,25 C19,21 22,29 25,25 C28,21 31,29 33,25" />
    </>
  ),
  Pisces: (
    <>
      <path d="M13,10 C7,14 7,26 13,30" />
      <path d="M27,10 C33,14 33,26 27,30" />
      <line x1="13" y1="20" x2="27" y2="20" />
    </>
  ),
};

const ZODIAC_SIGNS = [
  { name: 'Aries', dates: 'Mar 21 – Apr 19', glyph: '♈', element: 'fire', gender: 'm' },
  { name: 'Taurus', dates: 'Apr 20 – May 20', glyph: '♉', element: 'earth', gender: 'f' },
  { name: 'Gemini', dates: 'May 21 – Jun 21', glyph: '♊', element: 'air', gender: 'm' },
  { name: 'Cancer', dates: 'Jun 22 – Jul 22', glyph: '♋', element: 'water', gender: 'f' },
  { name: 'Leo', dates: 'Jul 23 – Aug 22', glyph: '♌', element: 'fire', gender: 'm' },
  { name: 'Virgo', dates: 'Aug 23 – Sep 22', glyph: '♍', element: 'earth', gender: 'f' },
  { name: 'Libra', dates: 'Sep 23 – Oct 23', glyph: '♎', element: 'air', gender: 'm' },
  { name: 'Scorpio', dates: 'Oct 24 – Nov 21', glyph: '♏', element: 'water', gender: 'f' },
  { name: 'Sagittarius', dates: 'Nov 22 – Dec 21', glyph: '♐', element: 'fire', gender: 'm' },
  { name: 'Capricorn', dates: 'Dec 22 – Jan 19', glyph: '♑', element: 'earth', gender: 'f' },
  { name: 'Aquarius', dates: 'Jan 20 – Feb 18', glyph: '♒', element: 'air', gender: 'm' },
  { name: 'Pisces', dates: 'Feb 19 – Mar 20', glyph: '♓', element: 'water', gender: 'f' },
];

const WHEEL_R = {
  outer: 240,
  nameOuter: 235,
  nameInner: 195,
  iconOuter: 195,
  iconInner: 145,
  mfR: 130,
  mfDiv: 118,
  glyphR: 98,
  glyphDiv: 80,
  elR: 66,
  elDiv: 52,
  numR: 40,
  centerR: 32,
};

function polar(r, deg, cx = 250, cy = 250) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
}

function ZodiacWheel({ size = 620, gold = '#D6B26A', dim = '#CFCFCF' }) {
  const cx = 250;
  const cy = 250;

  return (
    <svg viewBox="0 0 500 500" width={size} height={size} className="block">
      <g fill="none" stroke={gold} strokeLinecap="round" strokeLinejoin="round">
        {[WHEEL_R.outer, WHEEL_R.nameInner, WHEEL_R.iconInner, WHEEL_R.centerR].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} strokeWidth="1" opacity="0.85" />
        ))}
        {[WHEEL_R.mfDiv, WHEEL_R.glyphDiv, WHEEL_R.elDiv].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} strokeWidth="0.6" opacity="0.45" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => {
          const b = 15 + 30 * i;
          const [x1, y1] = polar(WHEEL_R.outer, b);
          const [x2, y2] = polar(WHEEL_R.elDiv, b);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.6" opacity="0.35" />;
        })}
      </g>

      {ZODIAC_SIGNS.map((s, k) => {
        const clockAngle = (360 - 30 * k) % 360;
        let rot = clockAngle;
        if (rot > 90 && rot < 270) rot += 180;

        const [nx, ny] = polar((WHEEL_R.nameOuter + WHEEL_R.nameInner) / 2, clockAngle);
        const [ix, iy] = polar((WHEEL_R.iconOuter + WHEEL_R.iconInner) / 2, clockAngle);
        const [gx, gy] = polar(WHEEL_R.mfR, clockAngle);
        const [zx, zy] = polar(WHEEL_R.glyphR, clockAngle);
        const [ex, ey] = polar(WHEEL_R.elR, clockAngle);
        const [numx, numy] = polar(WHEEL_R.numR, clockAngle);

        const up = s.element === 'fire' || s.element === 'air';
        const tri = up ? 'M0,-5 L5,4 L-5,4 Z' : 'M0,5 L5,-4 L-5,-4 Z';
        const barY = up ? 1.3 : -1.3;

        return (
          <g key={s.name}>
            <g transform={`translate(${nx},${ny}) rotate(${rot})`}>
              <text textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" fontWeight="700" fill={gold} letterSpacing="1">
                {s.name.toUpperCase()}
              </text>
              <text y="14" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="7" fill={dim}>
                {s.dates}
              </text>
            </g>

            <g transform={`translate(${ix},${iy}) rotate(${rot}) scale(1.25) translate(-20,-20)`}>
              <g stroke={gold} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {ZODIAC_ICONS[s.name]}
              </g>
            </g>

            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={dim}>
              {s.gender === 'm' ? '♂' : '♀'}
            </text>

            <text x={zx} y={zy} textAnchor="middle" dominantBaseline="middle" fontSize="20" fill={gold}>
              {s.glyph}
            </text>

            <g transform={`translate(${ex},${ey})`}>
              <path d={tri} stroke={dim} strokeWidth="1" fill="none" />
              {(s.element === 'air' || s.element === 'earth') && (
                <line x1="-4" y1={barY} x2="4" y2={barY} stroke={dim} strokeWidth="1" />
              )}
            </g>

            <text x={numx} y={numy} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={dim}>
              {k + 1}
            </text>
          </g>
        );
      })}

      <text x={cx} y={cy - 5} textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="10" letterSpacing="2" fill={gold}>
        SIGNS OF THE
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" letterSpacing="2" fill={gold}>
        ZODIAC
      </text>
    </svg>
  );
}

export default function Hero() {
  const navigate = useNavigate();
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
      className="relative overflow-hidden w-full min-h-[95vh] flex items-center box-border bg-[linear-gradient(135deg,#F9F5FE_0%,#E3CAFA_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-[10%] -right-[8%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(196,165,232,0.25)_0%,transparent_70%)] blur-[60px] pointer-events-none z-0 animate-[floatGlowPurple_8s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[5%] left-[15%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(214,178,106,0.15)_0%,transparent_70%)] blur-[50px] pointer-events-none z-0 animate-[floatGlowGold_10s_ease-in-out_infinite]"
      />

      <div className="absolute -left-[190px] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none z-[1]">
        <ZodiacWheel size={640} gold={COLORS.gold} dim={COLORS.muted} />
      </div>

      <div className="w-full max-w-[1320px] mx-auto flex flex-row flex-nowrap justify-between items-center gap-8 relative z-[5] px-[6vw] box-border max-lg:flex-col-reverse max-lg:flex-wrap max-lg:items-center max-lg:pt-24 max-lg:pb-12 max-lg:gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="flex-[0_1_60%] max-w-[680px] box-border"
        >
          <motion.h1
            variants={fadeInUpVariants}
            className="m-0 mb-8 font-['Playfair_Display',Georgia,serif] font-normal leading-[1.15] tracking-[-0.5px]"
          >
            <div className="block whitespace-nowrap">
              <span className="text-[clamp(42px,5.5vw,92px)] text-[#2A1635] mr-5">
                Unlock
              </span>
              <span className="text-[clamp(42px,5.5vw,92px)] text-[#2A1635] tracking-[0.5px]">
                The Best
              </span>
            </div>
            <span className="block font-normal text-[clamp(60px,8vw,100px)] leading-[1.05] text-sara-gold mt-2">
              Future
            </span>
          </motion.h1>

          <motion.div
            variants={fadeInUpVariants}
            className="text-[#3E2F48] font-['Poppins',sans-serif] font-light text-base leading-[1.75] flex flex-col gap-3 max-w-[480px]"
          >
            <p className="m-0">
              Discover insights, guidance, and clarity through personalized tarot readings.
              Gain clarity and direction with every card you draw.
            </p>
            <p className="m-0">Explore the path ahead with confidence.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.025,
            boxShadow: '0 40px 80px rgba(42, 22, 53, 0.15)',
            transition: { duration: 0.4, ease: 'easeOut' }
          }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="flex-[0_0_400px] max-w-[460px] relative rounded-[22px] overflow-hidden border border-[rgba(214,178,106,0.35)] bg-white shadow-[0_30px_60px_rgba(42,22,53,0.12)] cursor-pointer max-lg:w-full max-lg:max-w-[320px] max-lg:flex-none max-lg:ml-0"
        >
          <img
            src="/hero-1.png"
            alt="Personalized tarot reading session"
            className="w-full h-full aspect-[4/5] object-cover block"
          />

          <button
            onClick={() => navigate('/products/tarot-consultation')}
            className="absolute bottom-0 right-0 border-none py-[1.2rem] px-[2.5rem] font-['Poppins',sans-serif] text-[13px] font-medium uppercase tracking-[2px] cursor-pointer z-[15] bg-gradient-to-br from-sara-gold to-sara-goldSoft text-[#2A1635] transition-[transform,box-shadow,filter] duration-[350ms] ease-in-out hover:brightness-90 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(214,178,106,0.35)]"
          >
            Book A Reading
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
