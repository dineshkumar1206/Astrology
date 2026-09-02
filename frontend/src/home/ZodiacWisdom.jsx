import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// Brand tokens — Saraa Tarot Theme
// ============================================================
const COLORS = {
  ink: '#120B1F',        
  inkDeep: '#0A0713',    
  panel: '#1D1430',      
  gold: '#D9B56A',       
  goldSoft: '#F0DFB0',   
  magenta: '#B8467A',    
  ink200: '#B7AFC7',     
  cream: '#F4F0EA',      
};

// ============================================================
// SVG Zodiac Icons (Clean, white vector silhouettes)
// ============================================================
const Icons = {
  Libra: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 16h14" />
      <path d="M12 16V9" />
      <path d="M8 9a4 4 0 1 1 8 0" />
      <path d="M3 16v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
      <circle cx="12" cy="7" r="2" fill="white" />
      <path d="M7 16v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" />
    </svg>
  ),
  Capricorn: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 9s-2-3-4-2c-1.5.75-2 3 0 5s4 1 4 1" />
      <path d="M17 9s2-3 4-2c1.5.75 2 3 0 5s-4 1-4 1" />
      <path d="M7 9c0 3 5 10 5 10s5-7 5-10-2-5-5-5-5 2-5 5z" />
      <circle cx="9.5" cy="10.5" r="1" fill="white" />
      <circle cx="14.5" cy="10.5" r="1" fill="white" />
    </svg>
  ),
  Aquarius: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12h8" />
      <path d="M10 16h4" />
      <path d="M12 8v10" />
      <path d="M16 6a4 4 0 0 0-8 0v2h8V6z" />
      <path d="M19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7" />
      <path d="M14.5 21a2.5 2.5 0 0 1-5 0" />
    </svg>
  ),
  Pisces: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8c3 0 6-3 6-3s3 3 6 3 4-1 4-1-1 4-1 4-3 3-6 3-6-3-6-3-3-3-3-3 1-4 1-4z" />
      <path d="M19 16c-3 0-6 3-6 3s-3-3-6-3-4 1-4 1 1-4 1-4 3-3 6-3 6 3 6 3 3 3 3 3-1 4-1 4z" />
      <circle cx="8" cy="8" r="1" fill="white" />
      <circle cx="16" cy="16" r="1" fill="white" />
    </svg>
  ),
  Taurus: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="5" />
      <path d="M5 8c0 3 3 5 7 5s7-2 7-5" />
      <path d="M5 8s-1-3 1-4 3 0 3 0" />
      <path d="M19 8s1-3-1-4-3 0-3 0" />
    </svg>
  ),
  Aries: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21V9" />
      <path d="M12 9c0-3 2-5 5-5s4 2 4 5-2 5-4 5-3-2-3-2" />
      <path d="M12 9c0-3-2-5-5-5S3 6 3 9s2 5 4 5 3-2 3-2" />
    </svg>
  ),
  Cancer: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="17" cy="8" r="3" />
      <circle cx="7" cy="16" r="3" />
      <path d="M14 6c-3 0-5 2-5 5" />
      <path d="M10 18c3 0 5-2 5-5" />
      <path d="M19.5 10.5 21 12" />
      <path d="M4.5 13.5 3 12" />
    </svg>
  ),
  Gemini: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10" />
      <path d="M7 20h10" />
      <path d="M9 4v16" />
      <path d="M15 4v16" />
    </svg>
  )
};

// ============================================================
// Content & Gradient Data (Matched to references)
// ============================================================
const ZODIAC_DATA = [
  { name: 'Libra', dates: 'SEPT 23 – OCT 22', gradient: 'linear-gradient(145deg, #1A4441 0%, #4FA399 100%)', Icon: Icons.Libra },
  { name: 'Capricorn', dates: 'DEC 22 – JAN 19', gradient: 'linear-gradient(145deg, #A82522 0%, #E9754B 100%)', Icon: Icons.Capricorn },
  { name: 'Aquarius', dates: 'JAN 20 – FEB 18', gradient: 'linear-gradient(145deg, #2E6566 0%, #D8C395 100%)', Icon: Icons.Aquarius },
  { name: 'Pisces', dates: 'FEB 19 – MAR 20', gradient: 'linear-gradient(145deg, #A06DE7 0%, #76A5F7 100%)', Icon: Icons.Pisces },
  { name: 'Taurus', dates: 'APR 20 – MAY 20', gradient: 'linear-gradient(145deg, #A31940 0%, #D34375 100%)', Icon: Icons.Taurus },
  { name: 'Aries', dates: 'MAR 21 – APR 19', gradient: 'linear-gradient(145deg, #232B25 0%, #7B6850 100%)', Icon: Icons.Aries },
  { name: 'Cancer', dates: 'JUNE 21 – JULY 22', gradient: 'linear-gradient(145deg, #7C51F6 0%, #B892FF 100%)', Icon: Icons.Cancer },
  { name: 'Gemini', dates: 'MAY 21 – JUNE 20', gradient: 'linear-gradient(145deg, #99D9B7 0%, #E7A977 100%)', Icon: Icons.Gemini },
];

export default function ZodiacWisdom() {
  const { t } = useLanguage();
  // Animation sequences
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  // Base64 SVG Noise for that premium grainy texture overlay on gradients
  const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <section style={styles.section} data-aos="fade-up">
      {/* Import standard fonts and the specific cursive font for "By" */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        .zw-card {
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
        }
        .zw-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
        .zw-learn-more {
          position: relative;
          display: inline-block;
        }
        .zw-learn-more::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2A1635;
          transition: width 0.3s ease;
        }
        .zw-card:hover .zw-learn-more::after {
          width: 100%;
        }

        /* Responsive Grid adjustments */
        @media (max-width: 1200px) {
          .zw-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .zw-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .zw-heading { font-size: clamp(32px, 6vw, 48px) !important; }
        }
        @media (max-width: 600px) {
          .zw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={styles.container}>
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <p style={styles.eyebrow}>{t('zodiac.subtitle')}</p>
          <h2 className="zw-heading" style={styles.heading}>
            {t('zodiac.titleFirst')}<br />
            {t('zodiac.titleSecond')}<span style={styles.cursiveWord}>{t('zodiac.titleThird')}</span>{t('zodiac.titleFourth')}
          </h2>
        </motion.div>

        {/* Grid Block */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="zw-grid" 
          style={styles.grid}
        >
          {ZODIAC_DATA.map((zodiac, index) => (
            <motion.div key={index} variants={itemVariants} className="zw-card" style={styles.card}>
              
              {/* Text Area */}
              <div style={styles.cardText}>
                <h3 style={styles.cardTitle}>{t('zodiac.signs.' + zodiac.name.toLowerCase())}</h3>
                <p style={styles.cardDates}>{t('zodiac.dates.' + zodiac.name.toLowerCase())}</p>
                <span className="zw-learn-more" style={styles.learnMore}>{t('zodiac.learnMore')}</span>
              </div>

              {/* Gradient & Icon Block */}
              <div style={{
                ...styles.gradientBox,
                background: `${noisePattern}, ${zodiac.gradient}`,
                backgroundBlendMode: 'overlay, normal',
              }}>
                <zodiac.Icon />
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* ---------------------------------- styles ---------------------------------- */
const styles = {
  section: {
    backgroundColor: '#F8F6FF',
    padding: '100px 4vw 140px',
    minHeight: '100vh',
    color: '#2A1635',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1360px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '80px',
    textAlign: 'left', // Matches reference layout
  },
  eyebrow: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'italic',
    fontSize: '20px',
    color: COLORS.gold,
    marginBottom: '8px',
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '64px',
    fontWeight: 400,
    lineHeight: 1.1,
    textTransform: 'uppercase',
    color: '#2A1635',
    letterSpacing: '-1px',
    margin: 0,
  },
  cursiveWord: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.4em',
    textTransform: 'none',
    fontWeight: 400,
    verticalAlign: 'middle',
    position: 'relative',
    top: '4px',
    margin: '0 8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    padding: '16px', // Padding holds the gradient box inward
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  cardText: {
    textAlign: 'center',
    padding: '32px 10px 40px', // Spacing above the gradient box
  },
  cardTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '44px',
    fontWeight: 400,
    color: '#2A1635',
    margin: '0 0 4px 0',
    letterSpacing: '-0.5px',
  },
  cardDates: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#3E2F48',
    opacity: 0.8,
    margin: '0 0 24px 0',
  },
  learnMore: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#2A1635',
  },
  gradientBox: {
    width: '100%',
    height: '260px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)',
  }
};