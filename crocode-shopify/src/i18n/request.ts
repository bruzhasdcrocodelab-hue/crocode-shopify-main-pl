import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  const lang = process.env.NEXT_PUBLIC_LOCALE || 'en'
 
  return {
    locale: lang,
    messages: (await import(`../../public/locales/${lang}.json`)).default
  };
});