export type GameCategoryId = 'proverbs' | 'football' | 'cinema';

export type ThemeId = 
  | 'autumn' 
  | 'spring' 
  | 'summer' 
  | 'winter' 
  | 'isfahan' 
  | 'shiraz' 
  | 'persepolis' 
  | 'yazd';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  category: 'فصل‌ها' | 'مکان‌های ایران';
  price: number;
  description: string;
  badge: string;
  primaryBg: string; // Tailwind class
  accentColor: string; // Tailwind class
  headerBg: string;
  cardBg: string;
  buttonGradient: string;
  previewColor: string;
}

export interface GameCategoryConfig {
  id: GameCategoryId;
  title: string;
  description: string;
  price: number; // 0 for free, 500 for football, 1000 for cinema
  badgeText: string;
  imageSrc: string;
  levelsCount: number;
  iconName: string;
}

export interface ProverbLevel {
  id: number;
  proverb: string; // Complete text: e.g. "جوجه را آخر پاییز می‌شمارند"
  targetAnswer: string; // Canonical answer for validation
  alternativeAnswers?: string[]; // Variants with or without نیم‌فاصله, colloquial, etc.
  category: string;
  meaning: string; // Origin and cultural explanation
  hint: string; // Short clue
  difficulty: 'آسان' | 'متوسط' | 'چالش‌برانگیز' | 'سخت';
  imageSrc?: string;
  illustrationTheme: {
    iconName: string;
    primaryColor: string;
    secondaryColor: string;
    symbolName: string;
    sceneDescription: string;
  };
  scrambledLetters: string[]; // Scrambled letter tiles tailored for this puzzle
}

export interface UserProgress {
  coins: number;
  lives: number;
  maxLives: number;
  currentLevel: number; // 1 to 100
  unlockedLevels: number[];
  completedLevels: Record<number, { stars: number; solvedTimeSeconds: number; answeredAt: string }>;
  streakDays: number;
  lastPlayedDate: string;
  soundVolume: number; // 0 to 1
  isMuted: boolean;
  
  // Customization & Shop System
  activeTheme: ThemeId;
  unlockedThemes: ThemeId[];
  activeCategory: GameCategoryId;
  unlockedCategories: GameCategoryId[];
  
  // Progress per category
  footballCompletedLevels: Record<number, { stars: number; solvedTimeSeconds: number }>;
  footballCurrentLevel: number;
  footballUnlockedLevels: number[];

  cinemaCompletedLevels: Record<number, { stars: number; solvedTimeSeconds: number }>;
  cinemaCurrentLevel: number;
  cinemaUnlockedLevels: number[];
}

export type ScreenState = 'INITIAL_LAUNCH' | 'DEMO_SPLASH' | 'HOME' | 'GAME' | 'LEVEL_SELECT' | 'SHOP';
