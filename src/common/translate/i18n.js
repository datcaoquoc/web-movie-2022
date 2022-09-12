import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'vi'];


i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step

  .use(LanguageDetector) // detect user language

  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    fallbackLng: 'en', // ngôn ngữ mặc định khi máy không hỗ trợ ngôn ngữ được chọn
    debug: true,
    whitelist: availableLanguages,
    // detection: options,

    interpolation: {
      escapeValue: false
    },
  });

export default i18n;