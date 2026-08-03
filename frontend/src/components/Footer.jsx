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
              <a href="#facebook" className="text-sara-gold opacity-80 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#instagram" className="text-sara-gold opacity-80 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#x" className="text-sara-gold opacity-80 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
