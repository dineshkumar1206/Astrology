import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations';

const savedLang = localStorage.getItem('sara_lang_v2');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: translations,
    fallbackLng: 'ta',
    lng: savedLang || 'ta',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'sara_lang_v2',
      caches: ['localStorage'],
    },
  });

export default i18n;
