import { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '../../constants';

const LanguageProviderContext = createContext({
  language: 'ru',
  setLanguage: () => null,
});

i18n.use(initReactI18next).init({
  resources: translations,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b'],
  },
});

export const LanguageProvider = ({
  children,
  defaultLanguage = 'ru',
  storageKey = 'vite-ui-language',
}) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem(storageKey) || defaultLanguage
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const value = {
    language,
    setLanguage: (language) => {
      localStorage.setItem(storageKey, language);
      setLanguage(language);
    },
  };

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error('useLanguage must be used within a LanguageProvider');

  return context;
};
