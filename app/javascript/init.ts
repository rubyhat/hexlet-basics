import 'dayjs/locale/ru';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales.json';

// import { gon } from "@/lib/gon";

const resources = locales;
const defaultNS = 'web';

i18next.use(initReactI18next);
i18next.init({
  resources,
  defaultNS,
  ns: Object.keys(resources.ru),
  // lng: locale,
  interpolation: {
    prefix: '%{',
    suffix: '}',
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});
