// All page copy. English and Arabic share one shape so components stay language-agnostic.
import type { Lang } from './site';

const en = {
  meta: {
    title: 'Bait Al Nakhla · Emirati Kitchen in Sharjah',
    description:
      'Slow-cooked Emirati dishes, fresh bread and coffee poured the old way, in the heart of Al Majaz, Sharjah. Reserve your table on WhatsApp.',
  },
  nav: {
    label: 'Main',
    links: [
      { href: '#story', label: 'Story' },
      { href: '#plates', label: 'Plates' },
      { href: '#rooms', label: 'Rooms' },
      { href: '#reserve', label: 'Reserve' },
    ],
    switchLabel: 'العربية',
    switchLang: 'ar' as Lang,
    skip: 'Skip to content',
    home: 'Bait Al Nakhla, home',
  },
  cta: {
    reserve: 'Reserve a table',
    reserveShort: 'Reserve',
    whatsapp: 'Reserve on WhatsApp',
  },
  hero: {
    eyebrow: 'Emirati kitchen · Sharjah',
    lines: ['Come in.', 'The table is', 'already set.'],
    sub: 'Slow-cooked rice, fresh-baked khubz, and coffee poured the old way. Come hungry, stay for the majlis.',
    scroll: 'Scroll',
    imageAlt:
      'A brass dallah pouring Arabic coffee into a small gold-rimmed cup, with cardamom pods and dates on dark stone.',
  },
  story: {
    eyebrow: 'Our story',
    statement:
      'Every dish here began at a family table. We kept the recipes, the slow fires, and the habit of always making a little extra for whoever walks in.',
    facts: [
      { num: '01', text: 'Six hours, low fire' },
      { num: '02', text: 'Spices ground daily' },
      { num: '03', text: 'Coffee poured first' },
    ],
    imageAlt: 'Weathered hands grinding cardamom, cinnamon and saffron in a brass mortar beside an open fire.',
  },
  plates: {
    title: 'Signature plates',
    intro: "Four dishes we'd serve our own family.",
    hungry: 'Hungry yet?',
    items: [
      {
        num: '01',
        image: 'dish-machboos',
        name: 'Lamb Machboos',
        desc: 'Tender lamb over saffron basmati, dried lime, and a slow-roasted spice blend.',
        price: 'AED 85',
        alt: 'Lamb machboos: golden spiced rice with lamb, fried onions, cashews and a dried lime on a dark plate.',
      },
      {
        num: '02',
        image: 'dish-harees',
        name: 'Royal Harees',
        desc: 'Wheat and lamb simmered overnight until silk, finished with ghee and cinnamon.',
        price: 'AED 62',
        alt: 'A dark stoneware bowl of harees with a pool of golden ghee and a dusting of cinnamon, steam rising.',
      },
      {
        num: '03',
        image: 'dish-hammour',
        name: 'Grilled Hammour',
        desc: 'Gulf hammour, charcoal-grilled, with tomato daqoos and crisp onion rice.',
        price: 'AED 98',
        alt: 'Charcoal-grilled hammour on slate with a brass bowl of tomato daqoos, charred lemon and onion rice.',
      },
      {
        num: '04',
        image: 'dish-luqaimat',
        name: 'Luqaimat',
        desc: 'Golden dumplings, warm date syrup, a pinch of sea salt.',
        price: 'AED 34',
        alt: 'A pyramid of golden luqaimat on a brass plate, date syrup drizzling over them, sesame scattered around.',
      },
    ],
  },
  rooms: {
    eyebrow: 'The house',
    title: 'Rooms to linger in',
    items: [
      {
        image: 'room-majlis',
        name: 'The Majlis',
        line: 'Low seating, brass trays, long evenings.',
        alt: 'A lantern-lit majlis with low charcoal sofas, gold-embroidered cushions and a brass coffee tray.',
      },
      {
        image: 'room-courtyard',
        name: 'The Courtyard',
        line: 'Open sky, lantern light, the sound of water.',
        alt: 'A stone courtyard of carved arches at night, a star-shaped fountain and a date palm under a deep blue sky.',
      },
      {
        image: 'room-oud',
        name: 'The Oud Room',
        line: 'Private dining wrapped in incense and carved wood.',
        alt: 'A candlelit private dining table in a carved wooden room, smoke rising from a brass incense burner.',
      },
    ],
  },
  reserve: {
    eyebrow: 'Reservations',
    title: 'Your seat is waiting.',
    sub: "Message us on WhatsApp and we'll confirm within the hour.",
    hoursLabel: 'Hours',
    hours: 'Daily, 12 pm – 12 am',
    locationLabel: 'Location',
    location: 'Al Majaz, Sharjah, UAE',
  },
  footer: {
    copyright: '© 2026 Bait Al Nakhla',
    demo: 'Website concept, not a real restaurant.',
    top: 'Back to top',
  },
};

export type Content = typeof en;

const ar: Content = {
  meta: {
    title: 'بيت النخلة · مطبخ إماراتي في الشارقة',
    description:
      'أطباق إماراتية على نار هادئة، وخبز طازج، وقهوة تُسكب على أصولها، في قلب المجاز بالشارقة. احجز طاولتك عبر واتساب.',
  },
  nav: {
    label: 'القائمة الرئيسية',
    links: [
      { href: '#story', label: 'حكايتنا' },
      { href: '#plates', label: 'الأطباق' },
      { href: '#rooms', label: 'الأجواء' },
      { href: '#reserve', label: 'احجز' },
    ],
    switchLabel: 'English',
    switchLang: 'en',
    skip: 'انتقل إلى المحتوى',
    home: 'بيت النخلة، الصفحة الرئيسية',
  },
  cta: {
    reserve: 'احجز طاولة',
    reserveShort: 'احجز',
    whatsapp: 'احجز عبر واتساب',
  },
  hero: {
    eyebrow: 'مطبخ إماراتي · الشارقة',
    lines: ['تفضّل،', 'السُّفرة', 'جاهزة.'],
    sub: 'رزّ على نار هادئة، وخبز طازج، وقهوة تُسكب على أصولها. تعال جائعًا، وابقَ لمجلسنا.',
    scroll: 'مرّر',
    imageAlt: 'دلّة نحاسية تسكب القهوة العربية في فنجان مذهّب، مع حبّات الهيل والتمر على حجر داكن.',
  },
  story: {
    eyebrow: 'حكايتنا',
    statement:
      'كل طبق هنا بدأ على سفرة العائلة. حافظنا على الوصفات، والنار الهادئة، وعادة أن نطبخ دائمًا أكثر قليلًا لمن يطرق الباب.',
    facts: [
      { num: '٠١', text: 'ست ساعات على نار هادئة' },
      { num: '٠٢', text: 'بهارات تُطحن يوميًا' },
      { num: '٠٣', text: 'القهوة أولًا' },
    ],
    imageAlt: 'يدان تطحنان الهيل والقرفة والزعفران في هاون نحاسي بجانب نار مشتعلة.',
  },
  plates: {
    title: 'أطباقنا المميزة',
    intro: 'أربعة أطباق نقدّمها لأهلنا قبل ضيوفنا.',
    hungry: 'جاهز للأكل؟',
    items: [
      {
        num: '٠١',
        image: 'dish-machboos',
        name: 'مجبوس لحم',
        desc: 'لحم طري على أرز بسمتي بالزعفران، مع اللومي المجفف وخلطة بهارات محمّصة ببطء.',
        price: '٨٥ د.إ',
        alt: 'مجبوس لحم: أرز ذهبي متبّل مع اللحم والبصل المقرمش والكاجو واللومي في طبق داكن.',
      },
      {
        num: '٠٢',
        image: 'dish-harees',
        name: 'هريس ملكي',
        desc: 'قمح ولحم يُطهيان طوال الليل حتى يصيرا حريريًا، مع السمن والقرفة.',
        price: '٦٢ د.إ',
        alt: 'صحن هريس في وعاء فخاري داكن مع السمن الذهبي ورشّة قرفة، والبخار يتصاعد.',
      },
      {
        num: '٠٣',
        image: 'dish-hammour',
        name: 'هامور مشوي',
        desc: 'هامور خليجي مشوي على الفحم مع دقوس الطماطم وأرز بالبصل المقرمش.',
        price: '٩٨ د.إ',
        alt: 'هامور مشوي على الفحم فوق لوح حجري، مع دقوس الطماطم في وعاء نحاسي وليمون مشوي وأرز بالبصل.',
      },
      {
        num: '٠٤',
        image: 'dish-luqaimat',
        name: 'لقيمات',
        desc: 'كرات ذهبية مقرمشة مع دبس التمر الدافئ ورشّة ملح بحري.',
        price: '٣٤ د.إ',
        alt: 'هرم من اللقيمات الذهبية على صحن نحاسي، ودبس التمر ينساب فوقها مع السمسم.',
      },
    ],
  },
  rooms: {
    eyebrow: 'البيت',
    title: 'أجواء تستحق أن تبقى فيها',
    items: [
      {
        image: 'room-majlis',
        name: 'المجلس',
        line: 'جلسات أرضية، صواني نحاسية، وسهرات طويلة.',
        alt: 'مجلس مضاء بالفوانيس، فيه أرائك داكنة ووسائد مطرّزة بالذهب وصينية قهوة نحاسية.',
      },
      {
        image: 'room-courtyard',
        name: 'الحوش',
        line: 'سماء مفتوحة، ضوء الفوانيس، وصوت الماء.',
        alt: 'حوش حجري بأقواس منقوشة ليلًا، ونافورة على شكل نجمة ونخلة تحت سماء زرقاء داكنة.',
      },
      {
        image: 'room-oud',
        name: 'غرفة العود',
        line: 'جلسة خاصة يلفّها البخور والخشب المنقوش.',
        alt: 'طاولة عشاء خاصة على ضوء الشموع في غرفة خشبية منقوشة، ودخان يتصاعد من مبخرة نحاسية.',
      },
    ],
  },
  reserve: {
    eyebrow: 'الحجوزات',
    title: 'مقعدك بانتظارك.',
    sub: 'راسلنا على واتساب وسنؤكد حجزك خلال ساعة.',
    hoursLabel: 'المواعيد',
    hours: 'يوميًا، ١٢ ظهرًا – ١٢ منتصف الليل',
    locationLabel: 'الموقع',
    location: 'المجاز، الشارقة، الإمارات',
  },
  footer: {
    copyright: '© ٢٠٢٦ بيت النخلة',
    demo: 'تصميم تجريبي، وليس مطعمًا حقيقيًا.',
    top: 'العودة للأعلى',
  },
};

export const content: Record<Lang, Content> = { en, ar };
