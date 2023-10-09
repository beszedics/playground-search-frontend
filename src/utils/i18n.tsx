import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

type MissingKeys = {
  [key: string]: boolean;
};

const missingKeys: MissingKeys = {};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    react: {
      useSuspense: false,
    },
    fallbackLng: 'en',
    // debug: true,
    keySeparator: '.',
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      const hash = `${key}/${ns}/${lng}`;
      if (missingKeys[hash]) {
        return;
      }
      missingKeys[hash] = true;
      console.warn(
        `Translation key is missing! [key]='${key}', lng='${lng}', ns='${ns}']`,
      );
    },
    interpolation: {
      escapeValue: false, // react already safeguards against XSS
    },
  });

export default i18n;
