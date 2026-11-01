// Site-wide constants. Change these when turning the demo into a real client site.

export type Lang = 'en' | 'ar';

export const site = {
  /** Set to false for a real client: removes the noindex tag and the demo line in the footer. */
  isDemo: true,
  brand: { en: 'Bait Al Nakhla', ar: 'بيت النخلة' },
  /** WhatsApp number in international format, digits only. Placeholder. */
  whatsapp: '971500000000',
  whatsappMessage: {
    en: "Hello, I'd like to reserve a table.",
    ar: 'مرحبًا، أود حجز طاولة.',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Majaz+Sharjah',
  address: { locality: 'Sharjah', area: 'Al Majaz', country: 'AE' },
  openingHours: 'Mo-Su 12:00-24:00',
  themeColor: '#0A0908',
} as const;

export const whatsappLink = (lang: Lang) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage[lang])}`;

export const pathFor = (lang: Lang) => (lang === 'ar' ? '/ar/' : '/');
