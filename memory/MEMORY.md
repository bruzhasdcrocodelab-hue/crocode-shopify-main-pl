# PL Crocode Shopify Project Memory

## Project Info
- Polish version of crocode site (shopifydeveloper.pl)
- Located at: E:\work\crocode-shopify-main-2-pl\crocode-shopify-main\crocode-shopify
- English reference: E:\work\crocode-shopify-main-2-en\crocode-shopify-main\crocode-shopify
- Translations in: public/locales/pl.json (static data for pages)

## Completed Features (Task 2026-03-04)
1. **Privacy Policy page** (`/privacy-policy`) - Polish text from Privacy_Policy_and_Coockies.txt
2. **Cookie Policy page** (`/cookie-policy`) - Polish text from Privacy_Policy_and_Coockies.txt
3. **Cookie Banner** - CookieBanner component in layout, uses localStorage
4. **Form API integration** - /api/submit-form → MailerLite + Zoho CRM
5. **Marketing checkbox** - in contact form, with Polish label from the privacy doc
6. **Privacy text under form** - with links to /privacy-policy and /cookie-policy

## Key Files
- `src/components/ui/CookieBanner/` - cookie consent banner
- `src/components/pages/privacy-policy/` - Privacy Policy page component
- `src/components/pages/cookie-policy/` - Cookie Policy page component
- `src/app/privacy-policy/page.tsx` - route
- `src/app/cookie-policy/page.tsx` - route
- `src/app/api/submit-form/route.ts` - MailerLite + Zoho CRM API
- `src/app/api/cookie-consent/route.ts` - cookie consent API
- `src/app/layout.tsx` - has CookieBanner added

## Architecture Notes
- Uses next-intl for translations (useTranslations hook)
- Translations in public/locales/pl.json (NOT en.json)
- SCSS modules with fluid-size() and media-down/up mixins
- Background images in public/images/background/
- useDarkThemeForHeader hook available in useHeaderTheme.tsx
- No BlurIn/Fade/StaggeredFade in PL version (EN has them, PL doesn't)
- Env vars needed: MAILERLITE_API_KEY, MAILERLITE_GROUP_ID, ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_URL, ZOHO_API_URL
