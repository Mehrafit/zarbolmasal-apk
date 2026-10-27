import React, { useState } from 'react';
import { X, Lock, Star, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import { PROVERBS_DATA } from '../data/proverbs';
import { FOOTBALL_LEVELS, CINEMA_LEVELS, CATEGORIES_LIST } from '../data/themesAndCategories';
import { UserProgress } from '../types';
import { sounds } from '../utils/sound';

interface LevelSelectorModalProps {
  progress: UserProgress;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

export const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({
  progress,
  onSelectLevel,
  onClose,
}) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'unlocked'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Determine current category levels & progress
  const levelsData = 
    progress.activeCategory === 'proverbs'
      ? PROVERBS_DATA
      : progress.activeCategory === 'football'
      ? FOOTBALL_LEVELS
      : CINEMA_LEVELS;

  const unlockedIds = 
    progress.activeCategory === 'proverbs'
      ? progress.unlockedLevels
      : progress.activeCategory === 'football'
      ? progress.footballUnlockedLevels
      : progress.cinemaUnlockedLevels;

  const completedMap = 
    progress.activeCategory === 'proverbs'
      ? progress.completedLevels
      : progress.activeCategory === 'football'
      ? progress.footballCompletedLevels
      : progress.cinemaCompletedLevels;

  const currentLevelId = 
    progress.activeCategory === 'proverbs'
      ? progress.currentLevel
      : progress.activeCategory === 'football'
      ? progress.footballCurrentLevel
      : progress.cinemaCurrentLevel;

  const currentCategoryTitle = CATEGORIES_LIST.find((c) => c.id === progress.activeCategory)?.title || 'مراحل بازی';

  const filteredLevels = levelsData.filter((lvl) => {
    const isCompleted = !!completedMap[lvl.id];
    const isUnlocked = unlockedIds.includes(lvl.id);

    if (filter === 'completed' && !isCompleted) return false;
    if (filter === 'unlocked' && !isUnlocked) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      return (
        lvl.id.toString().includes(q) ||
        lvl.proverb.includes(q) ||
        lvl.category.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md h-[90vh] sm:h-[780px] bg-stone-900 border-t sm:border border-amber-600/40 rounded-t-3xl sm:rounded-3xl flex flex-col text-slate-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between shrink-0 bg-stone-950/40">
          <div>
            <h2 className="text-lg font-bold text-amber-200">فهرست مراحل: {currentCategoryTitle}</h2>
            <div className="text-xs text-stone-400 mt-0.5">
              <span>تکمیل‌شده: </span>
              <span className="text-amber-400 font-bold">{Object.keys(completedMap).length}</span>
              <span> از {levelsData.length}</span>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 border-b border-stone-800/80 bg-stone-950/20 space-y-2.5 shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی مرحله یا کلمه..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-800/80 border border-stone-700 text-xs rounded-xl py-2 pl-3 pr-9 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-950/60 rounded-xl">
            <button
              onClick={() => {
                sounds.playClick();
                setFilter('all');
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              همه ({levelsData.length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilter('unlocked');
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'unlocked'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              باز شده ({unlockedIds.length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilter('completed');
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'completed'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              پاسخ داده ({Object.keys(completedMap).length})
            </button>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredLevels.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-sm">
              هیچ مرحله‌ای با این مشخصات یافت نشد
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
              {filteredLevels.map((lvl) => {
                const isCompleted = !!completedMap[lvl.id];
                const isUnlocked = unlockedIds.includes(lvl.id);
                const isCurrent = currentLevelId === lvl.id;
                const stars = completedMap[lvl.id]?.stars || 0;

                return (
                  <button
                    key={lvl.id}
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (isUnlocked) {
                        sounds.playClick();
                        onSelectLevel(lvl.id);
                        onClose();
                      }
                    }}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-1 transition-all active:scale-95 ${
                      isCurrent
                        ? 'ring-2 ring-amber-400 bg-gradient-to-br from-amber-600 to-amber-700 shadow-lg shadow-amber-500/20'
                        : isCompleted
                        ? 'bg-stone-800 border border-emerald-500/40 hover:bg-stone-750'
                        : isUnlocked
                        ? 'bg-stone-800 border border-stone-700 hover:border-amber-500/50 hover:bg-stone-750'
                        : 'bg-stone-900/60 border border-stone-800/80 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {/* Locked State */}
                    {!isUnlocked ? (
                      <div className="flex flex-col items-center gap-1">
                        <Lock className="w-4 h-4 text-stone-500" />
                        <span className="text-[11px] font-mono text-stone-500">{lvl.id}</span>
                      </div>
                    ) : (
                      <>
                        <span className={`text-sm font-bold font-mono ${
                          isCurrent ? 'text-white' : isCompleted ? 'text-emerald-300' : 'text-stone-200'
                        }`}>
                          {lvl.id}
                        </span>

                        {/* Stars or Completion Badge */}
                        {isCompleted && (
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-2.5 h-2.5 ${
                                  s <= stars
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-stone-600'
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {isCurrent && (
                          <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded-full mt-0.5">
                            فعلی
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-stone-950/60 border-t border-stone-800 text-center text-xs text-stone-400 shrink-0">
          برای باز شدن مرحله بعدی، باید مرحله قبل با موفقیت حل شود
        </div>
      </div>
    </div>
  );
};
