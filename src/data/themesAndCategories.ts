import { ThemeConfig, GameCategoryConfig, ProverbLevel } from '../types';
import footballImg from '../assets/images/category_football_iran_1793114948267.jpg';
import cinemaImg from '../assets/images/category_cinema_iran_1793114948835.jpg';
import iranHeroImg from '../assets/images/iran_heritage_backdrop_1793114156243.jpg';

export const THEMES_LIST: ThemeConfig[] = [
  // فصول مختلف
  {
    id: 'autumn',
    name: 'پاییز طلایی',
    category: 'فصل‌ها',
    price: 0, // رایگان و پیش‌فرض
    description: 'رنگ‌های گرم کهربایی و برگ‌های زرین پاییز دل‌انگیز ایران',
    badge: 'پیش‌فرض',
    primaryBg: 'from-stone-950 via-amber-950 to-stone-900',
    accentColor: 'text-amber-400',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-amber-600/30',
    buttonGradient: 'from-amber-500 via-amber-400 to-amber-500 text-stone-950',
    previewColor: '#f59e0b',
  },
  {
    id: 'spring',
    name: 'بهار شکوفه‌ها',
    category: 'فصل‌ها',
    price: 120,
    description: 'شکوفه‌های عطرآگین بهاری و سرسبزی دشت‌های لاله',
    badge: '۱۲۰ سکه',
    primaryBg: 'from-stone-950 via-emerald-950 to-stone-900',
    accentColor: 'text-emerald-400',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-emerald-600/30',
    buttonGradient: 'from-emerald-500 via-teal-400 to-emerald-500 text-stone-950',
    previewColor: '#10b981',
  },
  {
    id: 'summer',
    name: 'تابستان آفتابی',
    category: 'فصل‌ها',
    price: 150,
    description: 'درخشش طلایی خورشید و گرمای دلنشین روزهای تابستان',
    badge: '۱۵۰ سکه',
    primaryBg: 'from-stone-950 via-orange-950 to-stone-900',
    accentColor: 'text-orange-400',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-orange-600/30',
    buttonGradient: 'from-orange-500 via-amber-400 to-orange-500 text-stone-950',
    previewColor: '#f97316',
  },
  {
    id: 'winter',
    name: 'زمستان سپید دماوند',
    category: 'فصل‌ها',
    price: 200,
    description: 'قله‌های سپیدپوش البرز و بلورهای درخشان برف',
    badge: '۲۰۰ سکه',
    primaryBg: 'from-stone-950 via-slate-900 to-cyan-950',
    accentColor: 'text-cyan-300',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-cyan-500/30',
    buttonGradient: 'from-cyan-500 via-sky-400 to-blue-500 text-stone-950',
    previewColor: '#06b6d4',
  },

  // مکان‌های مختلف ایران
  {
    id: 'isfahan',
    name: 'اصفهان فیروزه‌ای',
    category: 'مکان‌های ایران',
    price: 250,
    description: 'کاشی‌کاری‌های لاجوردی میدان نقش جهان و پل‌های زاینده‌رود',
    badge: '۲۵۰ سکه',
    primaryBg: 'from-stone-950 via-teal-950 to-blue-950',
    accentColor: 'text-teal-300',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-teal-500/30',
    buttonGradient: 'from-teal-500 via-cyan-400 to-teal-500 text-stone-950',
    previewColor: '#14b8a6',
  },
  {
    id: 'shiraz',
    name: 'شیراز بهارنارنج',
    category: 'مکان‌های ایران',
    price: 280,
    description: 'عطر شکوفه‌های باغ ارم و یادمان حافظ و سعدی شیراز',
    badge: '۲۸۰ سکه',
    primaryBg: 'from-stone-950 via-purple-950 to-rose-950',
    accentColor: 'text-rose-400',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-rose-500/30',
    buttonGradient: 'from-rose-500 via-pink-400 to-rose-500 text-stone-950',
    previewColor: '#f43f5e',
  },
  {
    id: 'persepolis',
    name: 'تخت جمشید باستان',
    category: 'مکان‌های ایران',
    price: 350,
    description: 'ستون‌های مرمرین پرسپولیس و شکوه ۲۵۰۰ ساله تمدن پارس',
    badge: '۳۵۰ سکه',
    primaryBg: 'from-stone-950 via-amber-950 to-stone-950',
    accentColor: 'text-yellow-400',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-yellow-500/40',
    buttonGradient: 'from-yellow-500 via-amber-300 to-yellow-500 text-stone-950',
    previewColor: '#eab308',
  },
  {
    id: 'yazd',
    name: 'یزد کهن و بادگیرها',
    category: 'مکان‌های ایران',
    price: 300,
    description: 'کوچه‌های کاهگلی، سکوت قنات‌ها و بادگیرهای تاریخی کویر',
    badge: '۳۰۰ سکه',
    primaryBg: 'from-stone-950 via-stone-900 to-amber-950',
    accentColor: 'text-amber-300',
    headerBg: 'bg-stone-950/90',
    cardBg: 'bg-stone-900/90 border-stone-600/40',
    buttonGradient: 'from-amber-600 via-stone-400 to-amber-600 text-stone-950',
    previewColor: '#d97706',
  },
];

export const CATEGORIES_LIST: GameCategoryConfig[] = [
  {
    id: 'proverbs',
    title: 'ضرب‌المثل‌های ایرانی',
    description: 'گنجینه ۱۰۰ ضرب‌المثل اصیل و پندآموز پارسی با تصاویر مفهومی',
    price: 0,
    badgeText: 'رایگان برای همه',
    imageSrc: iranHeroImg,
    levelsCount: 100,
    iconName: 'BookOpen',
  },
  {
    id: 'football',
    title: 'اسطوره‌ها و دانستنی‌های فوتبال',
    description: 'حدس ستاره‌ها، القاب، قهرمانی‌ها و گل‌های تاریخی فوتبال ایران و جهان',
    price: 500, // 500 coins as requested
    badgeText: '۵۰۰ سکه',
    imageSrc: footballImg,
    levelsCount: 25,
    iconName: 'Trophy',
  },
  {
    id: 'cinema',
    title: 'سینما و فیلم‌های ماندگار',
    description: 'حدس فیلم‌های شاهکار سینمای ایران، دیالوگ‌های طلایی و بازیگران نامدار',
    price: 1000, // 1000 coins as requested
    badgeText: '۱۰۰۰ سکه',
    imageSrc: cinemaImg,
    levelsCount: 25,
    iconName: 'Film',
  },
];

// Special Football Category Levels
export const FOOTBALL_LEVELS: ProverbLevel[] = [
  {
    id: 1,
    proverb: "شهریار فوتبال ایران و آقای گل تاریخ",
    targetAnswer: "علی دایی",
    alternativeAnswers: ["علی دایی", "شهریار", "دایی"],
    category: "اسطوره‌های فوتبال",
    meaning: "علی دایی با ثبت ۱۰۹ گل ملی سال‌ها عنوان بهترین گلزن ملی تاریخ جهان را در اختیار داشت و اسطوره بی‌بدیل فوتبال آسیاست.",
    hint: "شماره ۱۰ تاریخی تیم ملی که با سر بانداژشده گل می‌زد!",
    difficulty: "آسان",
    illustrationTheme: {
      iconName: "Trophy",
      primaryColor: "from-emerald-700 to-green-800",
      secondaryColor: "text-emerald-100",
      symbolName: "پیراهن شماره ۱۰ تیم ملی ایران",
      sceneDescription: "توپ طلای درخشان و پرچم سه رنگ ایران با افتخار در استادیوم آزادی"
    },
    scrambledLetters: ["ع", "ل", "ی", "د", "ا", "ی", "ی", "ش", "ه", "ر", "ی", "ا", "ر", "ت", "و", "پ"]
  },
  {
    id: 2,
    proverb: "عقاب آسیا و دروازه‌بان حماسه ملبورن",
    targetAnswer: "احمدرضا عابدزاده",
    alternativeAnswers: ["عابدزاده", "احمدرضا عابدزاده", "عقاب اسیا"],
    category: "دروازه‌بانان ماندگار",
    meaning: "احمدرضا عابدزاده، کاپیتان و دروازه‌بان فراموش‌نشدنی تیم ملی در بازی دراماتیک مقابل استرالیا با خنده‌های روحیه‌بخش خود زمینه صعود ایران به جام جهانی ۱۹۹۸ را ساخت.",
    hint: "سنگربان خندان با پرش‌های تماشایی و مهار توپ با یک دست!",
    difficulty: "متوسط",
    illustrationTheme: {
      iconName: "Shield",
      primaryColor: "from-blue-700 to-cyan-800",
      secondaryColor: "text-blue-100",
      symbolName: "دستکش‌های دروازه‌بانی طلایی",
      sceneDescription: "دستکش‌های سنگربانی بر تیرک دروازه و تور لرزان در ملبورن"
    },
    scrambledLetters: ["ا", "ح", "م", "د", "ر", "ض", "ا", "ع", "ا", "ب", "د", "ز", "ا", "د", "ه", "ع", "ق", "ا", "ب"]
  },
  {
    id: 3,
    proverb: "جادوگر فوتبال آسیا با دریبل‌های سحرآمیز",
    targetAnswer: "علی کریمی",
    alternativeAnswers: ["علی کریمی", "جادوگر", "کریمی"],
    category: "تکنیک و مهارت",
    meaning: "علی کریمی، مرد سال فوتبال آسیا در سال ۲۰۰۴ و ستاره پیشین بایرن مونیخ و پرسپولیس که با حرکات تکنیکی منحصربه‌فردش لرزه بر تن مدافعان می‌انداخت.",
    hint: "شماره ۸ محبوب که به مارادونای آسیا نیز شهرت داشت!",
    difficulty: "آسان",
    illustrationTheme: {
      iconName: "Sparkles",
      primaryColor: "from-red-700 to-rose-800",
      secondaryColor: "text-rose-100",
      symbolName: "کفش طلایی با دریبل مارپیچ",
      sceneDescription: "توپ فوتبال آمیخته با جرقه‌های نورانی بر روی چمن سبز استادیوم"
    },
    scrambledLetters: ["ع", "ل", "ی", "ک", "ر", "ی", "م", "ی", "ج", "ا", "د", "و", "گ", "ر", "س", "ت"]
  },
  {
    id: 4,
    proverb: "غزال تیزپای آسیا و زننده گل صعود به ملبورن",
    targetAnswer: "خداداد عزیزی",
    alternativeAnswers: ["خداداد عزیزی", "خداداد", "غزال تیزپا"],
    category: "گل‌های تاریخی",
    meaning: "خداداد عزیزی، ستاره سرعتی تیم ملی که در هشتم آذر ۱۳۷۶ با فرار تاریخی و ضربه نوک پا دروازه مارک بوسنیچ استرالیا را باز کرد.",
    hint: "مهاجم مشهدی با شادی پس از گل دویدن دور زمین ملبورن!",
    difficulty: "متوسط",
    illustrationTheme: {
      iconName: "Zap",
      primaryColor: "from-amber-600 to-yellow-700",
      secondaryColor: "text-amber-100",
      symbolName: "رد پای سرعت باد بر چمن ملبورن",
      sceneDescription: "توپ عبور کرده از خط دروازه استرالیا و فریاد شادی هشتاد میلیون ایرانی"
    },
    scrambledLetters: ["خ", "د", "ا", "د", "ا", "د", "ع", "ز", "ی", "ز", "ی", "غ", "ز", "ا", "ل", "ت", "ی", "ز"]
  },
  {
    id: 5,
    proverb: "مهندس خط میانی و کاپیتان پاس‌های طلایی تیم ملی",
    targetAnswer: "جواد نکونام",
    alternativeAnswers: ["جواد نکونام", "نکونام"],
    category: "کاپیتان‌ها",
    meaning: "جواد نکونام با بیش از ۱۵۰ بازی ملی رکورددار بیشترین بازی در تاریخ تیم ملی ایران و ستاره سال‌های درخشان اوساسونا در لالیگا اسپانیاست.",
    hint: "کاپیتانی که به رئال مادرید در لالیگا گل زد!",
    difficulty: "متوسط",
    illustrationTheme: {
      iconName: "Compass",
      primaryColor: "from-indigo-700 to-blue-800",
      secondaryColor: "text-indigo-100",
      symbolName: "بازوبند کاپیتانی تیم ملی",
      sceneDescription: "بازوبند سپید کاپیتانی در کنار پرچم لالیگا و پیراهن شماره ۶"
    },
    scrambledLetters: ["ج", "و", "ا", "د", "ن", "ک", "و", "ن", "ا", "م", "ک", "ا", "پ", "ی", "ت", "ا", "ن"]
  }
];

// Special Cinema Category Levels
export const CINEMA_LEVELS: ProverbLevel[] = [
  {
    id: 1,
    proverb: "تنها صداست که می‌ماند / دیالوگ ماندگار فیلم سوته‌دلان",
    targetAnswer: "سوته دلان",
    alternativeAnswers: ["سوته دلان", "سوته‌دلان", "فیلم سوته دلان"],
    category: "شاهکارهای علی حاتمی",
    meaning: "شاهکار شاعر سینمای ایران، زنده‌یاد علی حاتمی با هنرنمایی بهروز وثوقی و جمشید مشایخی با دیالوگ‌های پر از احساس و ادبیات ناب.",
    hint: "«همه عمر دیر رسیدیم...» اثری با حضور حبیب ظروفچی!",
    difficulty: "آسان",
    illustrationTheme: {
      iconName: "Film",
      primaryColor: "from-amber-800 to-stone-900",
      secondaryColor: "text-amber-100",
      symbolName: "ساعت زنجیردار قدیمی و کلاه مخملی",
      sceneDescription: "کوچه‌باغ‌های طهران قدیم با چراغ موشی و صدای ساز سنتور در پس‌زمینه"
    },
    scrambledLetters: ["س", "و", "ت", "ه", "د", "ل", "ا", "ن", "ح", "ا", "ت", "م", "ی", "ف", "ی", "ل", "م"]
  },
  {
    id: 2,
    proverb: "نخستین اسکار تاریخ سینمای ایران",
    targetAnswer: "جدایی نادر از سیمین",
    alternativeAnswers: ["جدایی نادر از سیمین", "جدایی", "نادر از سیمین"],
    category: "سینمای بین‌المللی",
    meaning: "فیلم تحسین‌شده اصغر فرهادی برنده جایزه اسکار بهترین فیلم خارجی سال ۲۰۱۲ و خرس طلایی جشنواره برلین که روایتی دقیق از قضاوت و اخلاق بود.",
    hint: "فیلمی با بازی پیمان معادی و لیلا حاتمی درباره یک چالش خانوادگی!",
    difficulty: "متوسط",
    illustrationTheme: {
      iconName: "Award",
      primaryColor: "from-yellow-600 to-amber-700",
      secondaryColor: "text-yellow-100",
      symbolName: "مجسمه طلایی اسکار و دادگاه خانواده",
      sceneDescription: "دوربین متحرک در سالن دادگاه و آینه روبه‌رو با دو چهره متفکر"
    },
    scrambledLetters: ["ج", "د", "ا", "ی", "ی", "ن", "ا", "د", "ر", "ا", "ز", "س", "ی", "م", "ی", "ن", "ف", "ر", "ه", "ا", "د"]
  },
  {
    id: 3,
    proverb: "شاهکار جنگ و صلح در شمال ایران با کلاغ‌ها و زبان محلی",
    targetAnswer: "باشو غریبه کوچک",
    alternativeAnswers: ["باشو غریبه کوچک", "باشو", "باشو غریبه ی کوچک"],
    category: "سینمای بهرام بیضایی",
    meaning: "اثر جاودان بهرام بیضایی با بازی فراموش‌نشدنی سوسن تسلیمی که روایت پناه آوردن پسربچه‌ای جنگ‌زده از جنوب به شالیزارهای گیلان است.",
    hint: "داستان پیوند عاطفی نایی جان و پسرک جنوبی میان شالیزارها!",
    difficulty: "متوسط",
    illustrationTheme: {
      iconName: "Heart",
      primaryColor: "from-emerald-800 to-teal-900",
      secondaryColor: "text-emerald-100",
      symbolName: "شالیزار بارانی و مترسک مزرعه",
      sceneDescription: "شالیزار مه‌آلود شمال ایران با باران ملایم و زنی که دست کودک را گرفته است"
    },
    scrambledLetters: ["ب", "ا", "ش", "و", "غ", "ر", "ی", "ب", "ه", "ک", "و", "چ", "ک", "ب", "ی", "ض", "ا", "ی", "ی"]
  },
  {
    id: 4,
    proverb: "فیلم ماندگار کمدی و نقد اجتماعی با لباس روحانیت",
    targetAnswer: "مارمولک",
    alternativeAnswers: ["مارمولک", "فیلم مارمولک", "رضا مارمولک"],
    category: "کمدی شاهکار",
    meaning: "«به تعداد آدم‌ها راه است برای رسیدن به خدا»؛ شاهکار کمدی کمال تبریزی با فیلمنامه پیمان قاسم‌خانی و درخشش تاریخی پرویز پرستویی.",
    hint: "«به اندازه تمام آدم‌ها راه هست برای رسیدن به خدا...»!",
    difficulty: "آسان",
    illustrationTheme: {
      iconName: "Sun",
      primaryColor: "from-sky-700 to-amber-700",
      secondaryColor: "text-sky-100",
      symbolName: "قطار در حال حرکت و راه بی‌پایان به آسمان",
      sceneDescription: "کویر آفتابی و قطاری که به سوی افق دوردست در حرکت است"
    },
    scrambledLetters: ["م", "ا", "ر", "م", "و", "ل", "ک", "پ", "ر", "س", "ت", "و", "ی", "ی", "خ", "د", "ا"]
  },
  {
    id: 5,
    proverb: "اثر کلاسیک مسعود کیمیایی با دیالوگ فرمان و چاقوی زنجان",
    targetAnswer: "قیصر",
    alternativeAnswers: ["قیصر", "فیلم قیصر", "قیصر کجایی که داش فرمونت رو کشتن"],
    category: "موج نوی سینمای ایران",
    meaning: "فیلم ساختارشکن سال ۱۳۴۸ به کارگردانی مسعود کیمیایی با موسیقی اسفندیار منفردزاده و بازی اسطوره‌ای بهروز وثوقی که تاریخ سینمای ایران را دگرگون کرد.",
    hint: "«احترامت واجبه خان‌دایی، اما حرف از مردونگی نزن...»!",
    difficulty: "آسان",
    illustrationTheme: {
      iconName: "Flame",
      primaryColor: "from-stone-900 to-red-950",
      secondaryColor: "text-stone-100",
      symbolName: "پاشنه‌خوابیده کفش چرمی و دستمال یزدی",
      sceneDescription: "گرمابه سنتی نواب در محله پامنار و سایه کلاه شاپو در غروب طهران"
    },
    scrambledLetters: ["ق", "ی", "ص", "ر", "ک", "ی", "م", "ی", "ا", "ی", "ی", "ب", "ه", "r", "و", "ز"]
  }
];
