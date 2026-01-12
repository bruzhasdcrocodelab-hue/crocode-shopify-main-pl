import {defineRouting} from 'next-intl/routing';

const lang: string = process.env.NEXT_PUBLIC_LOCALE || 'en'

export const routing = defineRouting({
  locales: [lang],
  defaultLocale: lang
});