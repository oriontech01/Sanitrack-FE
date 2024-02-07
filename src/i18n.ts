import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import translationEn from "./locales/en/translation.json";
import translationFr from "./locales/fr/translation.json";
import translationSp from "./locales/sp/translation.json";
import translationGr from "./locales/gr/translation.json";
import translationRs from './locales/rs/translation.json'
// the translations
const resources = {
  es: {
    translation: translationSp,
  },
  en: {
    translation: translationEn,
  },
  fr: {
    translation: translationFr,
  },
  gr: {
    translation: translationGr
  }, 
  rs:{ 
    translation: translationRs
  }
};

const language = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "en");
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: "en", // use en if detected lng is not available
    detection: {
        order: ['cookie', 'localStorage', 'path', 'subdomain']
    },

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    
  });

export default i18n;