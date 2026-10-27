import React, { useState, useEffect } from 'react';
import { AndroidFrame } from './components/AndroidFrame';
import { IntroDemo } from './components/IntroDemo';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { LevelSelectorModal } from './components/LevelSelectorModal';
import { SettingsModal } from './components/SettingsModal';
import { ShopModal } from './components/ShopModal';
import { PROVERBS_DATA } from './data/proverbs';
import { THEMES_LIST, CATEGORIES_LIST, FOOTBALL_LEVELS, CINEMA_LEVELS } from './data/themesAndCategories';
import { ScreenState, UserProgress, ThemeId, GameCategoryId } from './types';
import { sounds } from './utils/sound';
import { Sparkles, Play, ShieldCheck } from 'lucide-react';
import iranHeroImg from './assets/images/iran_heritage_backdrop_1793114156243.jpg';

const STORAGE_KEY = 'persian_proverbs_progress_v2';

const DEFAULT_PROGRESS: UserProgress = {
  coins: 180, // generous start so user can try out hints and save up for football & themes
  lives: 5,
  maxLives: 5,
  currentLevel: 1,
  unlockedLevels: [1],
  completedLevels: {},
  streakDays: 4,
  lastPlayedDate: new Date().toISOString().split('T')[0],
  soundVolume: 0.7,
  isMuted: false,

  // Theme & Categories Customization
  activeTheme: 'autumn',
  unlockedThemes: ['autumn'],
  activeCategory: 'proverbs',
  unlockedCategories: ['proverbs'],

  footballCompletedLevels: {},
  footballCurrentLevel: 1,
  footballUnlockedLevels: [1],

  cinemaCompletedLevels: {},
  cinemaCurrentLevel: 1,
  cinemaUnlockedLevels: [1],
};

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('INITIAL_LAUNCH');
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROGRESS, ...parsed };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROGRESS;
  });

  const [isLevelSelectorOpen, setIsLevelSelectorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  // Sync sound volume
  useEffect(() => {
    sounds.setVolume(progress.soundVolume);
    sounds.setMuted(progress.isMuted);
  }, [progress.soundVolume, progress.isMuted]);

  // Persist progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage safety
    }
  }, [progress]);

  // Regenerate lives periodically (every 10 minutes gives +1 life if < maxLives)
  useEffect(() => {
    const lifeTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev.lives < prev.maxLives) {
          return { ...prev, lives: prev.lives + 1 };
        }
        return prev;
      });
    }, 600000); // 10 minutes

    return () => clearInterval(lifeTimer);
  }, []);

  // Update streak if played today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastPlayedDate !== today) {
      setProgress((prev) => ({
        ...prev,
        lastPlayedDate: today,
        streakDays: prev.streakDays + 1,
      }));
    }
  }, []);

  // Handle Triggering the 2-second Demo
  const handleLaunchInitialDemo = () => {
    sounds.playClick();
    setScreen('DEMO_SPLASH');
  };

  const handleDemoComplete = () => {
    setScreen('HOME');
  };

  // Start current level game
  const handleStartGame = () => {
    setScreen('GAME');
  };

  const handleSelectLevel = (levelId: number) => {
    setProgress((prev) => {
      if (prev.activeCategory === 'proverbs') {
        return { ...prev, currentLevel: levelId };
      } else if (prev.activeCategory === 'football') {
        return { ...prev, footballCurrentLevel: levelId };
      } else {
        return { ...prev, cinemaCurrentLevel: levelId };
      }
    });
    setScreen('GAME');
  };

  const handleLevelComplete = (
    levelId: number,
    stars: number,
    solvedSeconds: number,
    speedBonus: boolean
  ) => {
    setProgress((prev) => {
      const earnedCoins = 30 + (speedBonus ? 20 : 0);

      if (prev.activeCategory === 'proverbs') {
        const nextId = Math.min(100, levelId + 1);
        const newUnlocked = prev.unlockedLevels.includes(nextId)
          ? prev.unlockedLevels
          : [...prev.unlockedLevels, nextId];

        return {
          ...prev,
          coins: prev.coins + earnedCoins,
          currentLevel: nextId,
          unlockedLevels: newUnlocked,
          completedLevels: {
            ...prev.completedLevels,
            [levelId]: {
              stars,
              solvedTimeSeconds: solvedSeconds,
              answeredAt: new Date().toISOString(),
            },
          },
        };
      } else if (prev.activeCategory === 'football') {
        const nextId = Math.min(FOOTBALL_LEVELS.length, levelId + 1);
        const newUnlocked = prev.footballUnlockedLevels.includes(nextId)
          ? prev.footballUnlockedLevels
          : [...prev.footballUnlockedLevels, nextId];

        return {
          ...prev,
          coins: prev.coins + earnedCoins,
          footballCurrentLevel: nextId,
          footballUnlockedLevels: newUnlocked,
          footballCompletedLevels: {
            ...prev.footballCompletedLevels,
            [levelId]: {
              stars,
              solvedTimeSeconds: solvedSeconds,
            },
          },
        };
      } else {
        const nextId = Math.min(CINEMA_LEVELS.length, levelId + 1);
        const newUnlocked = prev.cinemaUnlockedLevels.includes(nextId)
          ? prev.cinemaUnlockedLevels
          : [...prev.cinemaUnlockedLevels, nextId];

        return {
          ...prev,
          coins: prev.coins + earnedCoins,
          cinemaCurrentLevel: nextId,
          cinemaUnlockedLevels: newUnlocked,
          cinemaCompletedLevels: {
            ...prev.cinemaCompletedLevels,
            [levelId]: {
              stars,
              solvedTimeSeconds: solvedSeconds,
            },
          },
        };
      }
    });
  };

  // Shop Handlers
  const handleBuyTheme = (themeId: ThemeId, price: number) => {
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins - price,
      unlockedThemes: [...prev.unlockedThemes, themeId],
      activeTheme: themeId,
    }));
  };

  const handleEquipTheme = (themeId: ThemeId) => {
    setProgress((prev) => ({
      ...prev,
      activeTheme: themeId,
    }));
  };

  const handleBuyCategory = (categoryId: GameCategoryId, price: number) => {
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins - price,
      unlockedCategories: [...prev.unlockedCategories, categoryId],
      activeCategory: categoryId,
    }));
  };

  const handleSelectCategory = (categoryId: GameCategoryId) => {
    setProgress((prev) => ({
      ...prev,
      activeCategory: categoryId,
    }));
  };

  const handleLoseLife = () => {
    setProgress((prev) => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
    }));
  };

  const handleRefillLives = () => {
    setProgress((prev) => ({
      ...prev,
      lives: prev.maxLives,
    }));
  };

  const handleUpdateCoins = (newCoins: number) => {
    setProgress((prev) => ({
      ...prev,
      coins: Math.max(0, newCoins),
    }));
  };

  const handleNextLevel = () => {
    setScreen('GAME');
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setScreen('HOME');
  };

  // Current level data based on active category
  const activeLevelList =
    progress.activeCategory === 'proverbs'
      ? PROVERBS_DATA
      : progress.activeCategory === 'football'
      ? FOOTBALL_LEVELS
      : CINEMA_LEVELS;

  const currentLevelNumber =
    progress.activeCategory === 'proverbs'
      ? progress.currentLevel
      : progress.activeCategory === 'football'
      ? progress.footballCurrentLevel
      : progress.cinemaCurrentLevel;

  const currentLevelData =
    activeLevelList.find((l) => l.id === currentLevelNumber) || activeLevelList[0];

  return (
    <AndroidFrame>
      {/* 1. INITIAL LAUNCH SCREEN (Before Clicking Start for the 2-second Demo) */}
      {screen === 'INITIAL_LAUNCH' && (
        <div className="flex-1 flex flex-col items-center justify-between p-6 text-center select-none bg-gradient-to-b from-stone-950 via-amber-950 to-stone-900 relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Badge */}
          <div className="pt-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>بازی معمایی و سرگرمی اندروید</span>
            </div>
          </div>

          {/* Central Artwork & Title Lockup */}
          <div className="flex flex-col items-center my-auto">
            <div className="w-44 h-44 rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl mb-5 relative group">
              <img
                src={iranHeroImg}
                alt="ایران کهن"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-amber-200 font-mono">
                ضرب‌المثل · فوتبال · سینما
              </div>
            </div>

            <h1 className="text-3xl font-black text-amber-100 tracking-wide mb-2 drop-shadow-md">
              ضرب‌المثل‌های ایرانی
            </h1>
            <p className="text-xs text-amber-200/70 max-w-xs leading-relaxed">
              هوش و حافظه خود را با مثل‌های شیرین پارسی، دانستنی‌های فوتبال و سینما بسنجید
            </p>
          </div>

          {/* Launch Trigger Button (Clicking starts the 2-second demo) */}
          <div className="w-full pb-6 flex flex-col items-center space-y-3">
            <button
              onClick={handleLaunchInitialDemo}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-105 active:scale-95 text-stone-950 font-black text-base shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>شروع بازی (دموی ۲ ثانیه‌ای)</span>
            </button>

            <span className="text-[11px] text-stone-400">
              با کلیک روی شروع، دموی ویژه بازی پخش می‌شود
            </span>
          </div>
        </div>
      )}

      {/* 2. THE 2-SECOND DEMO SPLASH SCREEN */}
      {screen === 'DEMO_SPLASH' && (
        <IntroDemo onComplete={handleDemoComplete} />
      )}

      {/* 3. HOME / START SCREEN */}
      {screen === 'HOME' && (
        <HomeScreen
          progress={progress}
          onStartGame={handleStartGame}
          onOpenLevelSelector={() => setIsLevelSelectorOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenShop={() => setIsShopOpen(true)}
          onRefillLives={handleRefillLives}
        />
      )}

      {/* 4. ACTIVE GAME SCREEN */}
      {screen === 'GAME' && (
        <GameScreen
          level={currentLevelData}
          progress={progress}
          onHome={() => setScreen('HOME')}
          onNextLevel={handleNextLevel}
          onUpdateCoins={handleUpdateCoins}
          onLoseLife={handleLoseLife}
          onLevelComplete={handleLevelComplete}
          onRefillLives={handleRefillLives}
        />
      )}

      {/* Level Selector Modal */}
      {isLevelSelectorOpen && (
        <LevelSelectorModal
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onClose={() => setIsLevelSelectorOpen(false)}
        />
      )}

      {/* Shop Modal */}
      {isShopOpen && (
        <ShopModal
          progress={progress}
          onBuyTheme={handleBuyTheme}
          onEquipTheme={handleEquipTheme}
          onBuyCategory={handleBuyCategory}
          onSelectCategory={handleSelectCategory}
          onClose={() => setIsShopOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          volume={progress.soundVolume}
          isMuted={progress.isMuted}
          onVolumeChange={(vol) =>
            setProgress((prev) => ({ ...prev, soundVolume: vol }))
          }
          onMuteToggle={() =>
            setProgress((prev) => ({ ...prev, isMuted: !prev.isMuted }))
          }
          onResetProgress={handleResetProgress}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </AndroidFrame>
  );
}
