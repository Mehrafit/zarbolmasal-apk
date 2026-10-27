import React from 'react';
import { 
  Play, 
  Settings, 
  Flame, 
  Heart, 
  Coins, 
  Grid, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Trophy,
  ChevronLeft,
  ShoppingBag,
  Layers,
  Palette
} from 'lucide-react';
import { UserProgress } from '../types';
import { THEMES_LIST, CATEGORIES_LIST } from '../data/themesAndCategories';
import { sounds } from '../utils/sound';
import iranHeroImg from '../assets/images/iran_heritage_backdrop_1793114156243.jpg';

interface HomeScreenProps {
  progress: UserProgress;
  onStartGame: () => void;
  onOpenLevelSelector: () => void;
  onOpenSettings: () => void;
  onOpenShop: () => void;
  onRefillLives: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onStartGame,
  onOpenLevelSelector,
  onOpenSettings,
  onOpenShop,
  onRefillLives,
}) => {
  const currentCategoryConfig = CATEGORIES_LIST.find((c) => c.id === progress.activeCategory) || CATEGORIES_LIST[0];
  const currentThemeConfig = THEMES_LIST.find((t) => t.id === progress.activeTheme) || THEMES_LIST[0];

  const currentLevelId = 
    progress.activeCategory === 'proverbs'
      ? progress.currentLevel
      : progress.activeCategory === 'football'
      ? progress.footballCurrentLevel
      : progress.cinemaCurrentLevel;

  const completedMap = 
    progress.activeCategory === 'proverbs'
      ? progress.completedLevels
      : progress.activeCategory === 'football'
      ? progress.footballCompletedLevels
      : progress.cinemaCompletedLevels;

  const totalLevels = currentCategoryConfig.levelsCount;
  const completedCount = Object.keys(completedMap).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLevels) * 100));

  return (
    <div className={`flex-1 flex flex-col justify-between p-4 overflow-y-auto select-none text-slate-100 bg-gradient-to-b ${currentThemeConfig.primaryBg}`}>
      
      {/* Top Header Bar: Stats Clusters */}
      <div className="flex items-center justify-between gap-1.5 pt-1 pb-3 shrink-0">
        
        {/* Lives / Hearts */}
        <button
          onClick={() => {
            sounds.playClick();
            if (progress.lives < progress.maxLives) {
              onRefillLives();
            }
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 hover:border-rose-500/40 transition-colors shadow-sm"
          title="تعداد جان‌ها (برای پر کردن کلیک کنید)"
        >
          <div className="flex items-center gap-0.5 text-rose-500">
            {Array.from({ length: progress.maxLives }).map((_, i) => (
              <Heart
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < progress.lives ? 'fill-rose-500 text-rose-500' : 'text-stone-700'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold font-mono text-rose-300 mr-0.5">
            {progress.lives}/{progress.maxLives}
          </span>
        </button>

        {/* Coins Counter (Click opens Shop) */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenShop();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 hover:bg-stone-850 shadow-sm cursor-pointer"
          title="فروشگاه سکه‌ای"
        >
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold font-mono text-amber-300">
            {progress.coins}
          </span>
        </button>

        {/* Streak Counter */}
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-amber-950/40 border border-amber-600/30 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
          <span className="text-xs font-bold font-mono text-orange-300">
            {progress.streakDays}
          </span>
        </div>

        {/* Shop Icon CTA */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenShop();
          }}
          className="w-9 h-9 rounded-full bg-amber-600/20 border border-amber-500/50 hover:bg-amber-600/30 flex items-center justify-center text-amber-300 transition-colors shadow-sm"
          aria-label="فروشگاه"
          title="فروشگاه تم‌ها و دسته‌ها"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        {/* Settings Icon */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenSettings();
          }}
          className="w-9 h-9 rounded-full bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 flex items-center justify-center text-stone-300 hover:text-amber-300 transition-colors shadow-sm"
          aria-label="تنظیمات"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Active Category Selector Strip */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-stone-900/80 border border-stone-800 mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-stone-300">دسته فعال:</span>
          <span className="text-xs font-bold text-amber-200">{currentCategoryConfig.title}</span>
        </div>
        <button
          onClick={() => {
            sounds.playClick();
            onOpenShop();
          }}
          className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5"
        >
          <span>تغییر دسته</span>
          <ChevronLeft className="w-3 h-3" />
        </button>
      </div>

      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-600/30 shadow-xl group my-1 shrink-0">
        <div className="aspect-[16/9] w-full relative">
          <img
            src={currentCategoryConfig.imageSrc}
            alt={currentCategoryConfig.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 font-medium mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>پوسته فعال: {currentThemeConfig.name}</span>
            </div>
            <h2 className="text-base font-black text-white drop-shadow">
              {currentCategoryConfig.title}
            </h2>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenLevelSelector();
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 backdrop-blur-sm text-xs font-semibold text-amber-200 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>مشاهده مراحل</span>
          </button>
        </div>
      </div>

      {/* Progress Streak Card */}
      <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800/80 my-2 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-stone-300 font-medium">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>استریک پیشرفت {currentCategoryConfig.title}</span>
          </div>
          <span className="font-mono text-amber-400 font-bold">
            {completedCount} از {totalLevels} مرحله ({progressPercent}٪)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Bottom Central Action Zone: Prominent Play Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4 space-y-3">
        
        {/* Play Icon Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onStartGame();
          }}
          className="relative group w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-1.5 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="شروع بازی"
        >
          {/* Subtle Outer Pulsing Wave */}
          <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping [animation-duration:2.5s] pointer-events-none"></div>

          <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center group-hover:bg-stone-900 transition-colors">
            <Play className="w-10 h-10 text-amber-400 fill-amber-400 mr-1 group-hover:scale-110 transition-transform" />
          </div>
        </button>

        {/* Level Indicator under Play Button */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-amber-200">
            شروع مرحله {currentLevelId}
          </span>
          <span className="text-[11px] text-stone-400">
            {currentCategoryConfig.title}
          </span>
        </div>

      </div>

      {/* Bottom Nav / Menu Affordance */}
      <div className="pt-2 border-t border-stone-800/80 flex items-center justify-around text-xs text-stone-400">
        <button
          onClick={() => {
            sounds.playClick();
            onOpenLevelSelector();
          }}
          className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:text-amber-300 transition-colors"
        >
          <Grid className="w-4 h-4" />
          <span>منوی مراحل</span>
        </button>

        <span className="text-stone-700">·</span>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenShop();
          }}
          className="flex items-center gap-1.5 py-1 px-3 rounded-lg text-amber-300 font-bold hover:text-amber-200 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>فروشگاه سکه‌ای</span>
        </button>

        <span className="text-stone-700">·</span>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenSettings();
          }}
          className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:text-amber-300 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>تنظیمات</span>
        </button>
      </div>

    </div>
  );
};
