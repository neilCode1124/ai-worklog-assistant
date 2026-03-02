// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const fallbackLng = "zh";
const supportedLngs = ["en", "zh"];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng,
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/common.json",
    },
    ns: ["common"],
    defaultNS: "common",
  });

export default i18n;
