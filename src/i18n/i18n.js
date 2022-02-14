import i18n from 'i18n-js';
import * as RNLocalize from "react-native-localize";
import en from './locales/en';
import fr from './locales/fr';

i18n.fallbacks = true; // When a value is missing from a language it'll fallback to another language with the key present.
i18n.translations = { fr, en }; // Set the languages supported
i18n.locale = RNLocalize.getLocales()[0].languageCode; // Set the locale once at the beginning of your app.

export default i18n;