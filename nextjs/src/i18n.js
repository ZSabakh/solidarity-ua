import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./resources/locales/en/translation.json";
import translationKA from "./resources/locales/ka/translation.json";
import translationUA from "./resources/locales/ua/translation.json";

const defaultLanguage = typeof window !== "undefined" ? window.localStorage.getItem("user_culture") || "en" : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ka: {
      translation: translationKA,
    },
    ua: {
      translation: translationUA,
    },
  },
  lng: defaultLanguage,
  returnObjects: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
