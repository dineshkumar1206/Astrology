import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageProvider({ children }) {
  return <>{children}</>;
}

export function useLanguage() {
  const { t, i18n } = useTranslation();

  const setLocale = (lang) => {
    i18n.changeLanguage(lang);
  };

  // Ensure it returns a consistent language code (e.g., 'en' or 'ta')
  const locale = (i18n.language || 'ta').split('-')[0];

  return {
    locale,
    setLocale,
    t
  };
}
