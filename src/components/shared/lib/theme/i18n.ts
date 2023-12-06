import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import resources from "./resources";

i18n
	.use(I18nextBrowserLanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		resources,
		fallbackLng: "en",
		returnNull: false,

		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
