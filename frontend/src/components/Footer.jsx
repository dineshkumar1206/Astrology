import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[rgba(214,178,106,0.15)] bg-sara-darkFooter text-white font-sans py-20 px-8 box-border bg-[radial-gradient(circle_at_center,rgba(214,178,106,0.03)_0%,transparent_70%)]"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27none%27 stroke=%27white%27 stroke-width=%270.5%27/%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2738%27 fill=%27none%27 stroke=%27white%27 stroke-width=%270.5%27/%3E%3Cpath d=%27M50 5 L50 95 M5 50 L95 50 M18.18 18.18 L81.82 81.82 M18.18 81.82 L81.82 18.18%27 stroke=%27white%27 stroke-width=%270.25%27/%3E%3C/svg%3E')] bg-contain bg-no-repeat"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto">
        <div className="grid grid-cols-[1.2fr_1.6fr_1.2fr] max-md:grid-cols-1 max-md:gap-10 max-md:text-center mb-16">
          <div>
            <h4 className="text-sara-gold text-[15px] uppercase tracking-[1px] font-semibold mb-6 border-b border-[rgba(214,178,106,0.1)] pb-2">
              {t('footer.address')}
            </h4>
            <ul className="list-none p-0 m-0 text-sm text-[#CFCFCF] leading-8 max-md:flex max-md:flex-col max-md:items-center">
              <li className="mb-2"><span className="text-sara-gold font-medium">{t('footer.centre')}</span> {t('footer.saraHealing')}</li>
              <li className="mb-2"><span className="text-sara-gold font-medium">{t('footer.addressLabel')}</span> {t('footer.addressLine')}</li>
              <li className="mb-2"><span className="text-sara-gold font-medium">{t('footer.locationLabel')}</span> {t('footer.locationLine')}</li>
            </ul>
          </div>

          <div className="text-center flex flex-col items-center justify-center">
            <div className="font-serif text-[2.5rem] text-sara-gold tracking-[3px] uppercase font-light mb-4">
              {t('footer.brand')}
            </div>
            <p className="text-[13px] leading-7 text-[#CFCFCF] max-w-[440px] mx-auto mb-8">
              {t('footer.desc')}
            </p>
            <div className="flex gap-6 justify-center">
              <a 
                href="https://www.youtube.com/@saratarot7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sara-gold opacity-80 hover:opacity-100 transition-opacity"
                title="Sara Tarot YouTube"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.54 12 3.54 12 3.54s-7.53 0-9.388.515A3.003 3.003 0 0 0 .502 6.163C0 8.02 0 12 0 12s0 3.98.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.46 12 20.46 12 20.46s7.53 0 9.388-.515a3.003 3.003 0 0 0 2.11-2.108C24 15.98 24 12 24 12s0-3.98-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/saraa_tarot?utm_source=qr&igshid=NGExMmI2YTkyZg%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sara-gold opacity-80 hover:opacity-100 transition-opacity"
                title="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a 
                href="https://chat.whatsapp.com/J57YgXo0B1yCmlA66g2GgC" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sara-gold opacity-80 hover:opacity-100 transition-opacity"
                title="WhatsApp Group"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.45L0 24zm6.59-3.593c1.72.996 3.42 1.503 5.4 1.504 5.514 0 10.002-4.48 10.006-9.992.002-2.67-1.03-5.18-2.906-7.06C17.269 3.003 14.773 1.97 12.01 1.97c-5.52 0-10.01 4.48-10.014 9.993-.001 2.012.529 3.979 1.536 5.71L2.511 21.5l3.96-.993c-.015.008-.01.006.176.1zM17.51 14.5c-.3-.15-1.771-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.175-.175.2-.35.225-.65.075-1.002-.5-2.209-1.075-3.056-1.875-.776-.69-1.341-1.519-1.492-1.782-.15-.262-.016-.404.118-.538.12-.12.276-.324.415-.487.14-.162.18-.275.27-.46.09-.184.04-.348-.02-.497-.06-.15-.477-1.15-.654-1.575-.172-.416-.36-.36-.492-.366-.127-.006-.273-.008-.42-.008-.147 0-.387.054-.589.274-.202.219-.77.752-.77 1.834 0 1.08.788 2.124.898 2.274.11.15 1.547 2.36 3.75 3.313 2.2 1.054 2.2.702 2.6.666.4-.036 1.772-.724 2.022-1.424.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@saraahealing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sara-gold opacity-80 hover:opacity-100 transition-opacity"
                title="Saraa Healing YouTube"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.54 12 3.54 12 3.54s-7.53 0-9.388.515A3.003 3.003 0 0 0 .502 6.163C0 8.02 0 12 0 12s0 3.98.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.46 12 20.46 12 20.46s7.53 0 9.388-.515a3.003 3.003 0 0 0 2.11-2.108C24 15.98 24 12 24 12s0-3.98-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sara-gold text-[15px] uppercase tracking-[1px] font-semibold mb-6 border-b border-[rgba(214,178,106,0.1)] pb-2">
              {t('footer.info')}
            </h4>
            <ul className="list-none p-0 m-0 text-sm text-[#CFCFCF] leading-8 max-md:flex max-md:flex-col max-md:items-center">
              <li className="mb-2"><span className="text-sara-gold font-medium">{t('footer.emailLabel')}</span> {t('footer.emailVal')}</li>
              <li className="mb-2"><span className="text-sara-gold font-medium">{t('footer.phoneLabel')}</span> {t('footer.phoneVal')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(214,178,106,0.15)] pt-8 flex justify-center items-center flex-wrap gap-6 max-md:flex-col max-md:text-center">
          <div className="flex gap-4 text-[13px] text-[#CFCFCF] font-serif italic">
            <span>{t('footer.cardReading')}</span>
            <span>•</span>
            <span>{t('footer.chakraBalancing')}</span>
            <span>•</span>
            <span>{t('footer.mineralotherapy')}</span>
          </div>
        </div>

        <div className="text-center mt-12 text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.5px]">
          {t('footer.copyright').replace('{year}', new Date().getFullYear())}{' '}
          | Designed & Developed by{' '}
          <a 
            href="https://amigowebster.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sara-gold hover:underline transition-colors no-underline"
          >
            amigowebster
          </a>
        </div>
      </div>
    </footer>
  );
}
