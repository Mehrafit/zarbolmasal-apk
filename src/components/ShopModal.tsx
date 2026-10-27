import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Coins, 
  Palette, 
  Grid, 
  Check, 
  Lock, 
  Sparkles, 
  Trophy, 
  Film, 
  BookOpen, 
  Layers,
  ChevronLeft
} from 'lucide-react';
import { ThemeId, GameCategoryId, UserProgress } from '../types';
import { THEMES_LIST, CATEGORIES_LIST } from '../data/themesAndCategories';
import { sounds } from '../utils/sound';

interface ShopModalProps {
  progress: UserProgress;
  onBuyTheme: (themeId: ThemeId, price: number) => void;
  onEquipTheme: (themeId: ThemeId) => void;
  onBuyCategory: (categoryId: GameCategoryId, price: number) => void;
  onSelectCategory: (categoryId: GameCategoryId) => void;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  progress,
  onBuyTheme,
  onEquipTheme,
  onBuyCategory,
  onSelectCategory,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'categories'>('themes');
  const [subFilter, setSubFilter] = useState<'all' | 'seasons' | 'locations'>('all');

  const filteredThemes = THEMES_LIST.filter((theme) => {
    if (subFilter === 'seasons') return theme.category === 'فصل‌ها';
    if (subFilter === 'locations') return theme.category === 'مکان‌های ایران';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md h-[92vh] sm:h-[820px] bg-stone-900 border-t sm:border border-amber-600/40 rounded-t-3xl sm:rounded-3xl flex flex-col text-slate-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-200">فروشگاه سکه‌ای بازی</h2>
              <p className="text-[11px] text-stone-400">صرف سکه‌های درون‌بازی برای تم‌ها و دسته‌ها</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-inner">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{progress.coins}</span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary 2 Tabs */}
        <div className="p-3 border-b border-stone-800 bg-stone-950/30 shrink-0">
          <div className="grid grid-cols-2 gap-2 p-1 bg-stone-950 rounded-2xl border border-stone-800">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('themes');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'themes'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>فروشگاه تم‌ها و فصول</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('categories');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'categories'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>دسته‌بندی‌های بازی</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* TAB 1: THEMES SHOP */}
          {activeTab === 'themes' && (
            <div className="space-y-3">
              {/* Filter pills: Seasons vs Locations */}
              <div className="flex items-center gap-2 pb-1">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSubFilter('all');
                  }}
                  className={`text-xs px-3 py-1 rounded-full transition-all ${
                    subFilter === 'all'
                      ? 'bg-stone-800 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  همه پوسته‌ها
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSubFilter('seasons');
                  }}
                  className={`text-xs px-3 py-1 rounded-full transition-all ${
                    subFilter === 'seasons'
                      ? 'bg-stone-800 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  فصل‌های مختلف
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSubFilter('locations');
                  }}
                  className={`text-xs px-3 py-1 rounded-full transition-all ${
                    subFilter === 'locations'
                      ? 'bg-stone-800 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  مکان‌های ایران
                </button>
              </div>

              {/* Theme Cards Grid */}
              <div className="space-y-2.5">
                {filteredThemes.map((theme) => {
                  const isUnlocked = progress.unlockedThemes.includes(theme.id);
                  const isEquipped = progress.activeTheme === theme.id;
                  const canAfford = progress.coins >= theme.price;

                  return (
                    <div
                      key={theme.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        isEquipped
                          ? 'bg-stone-800/90 border-amber-500 ring-1 ring-amber-500/50 shadow-md'
                          : isUnlocked
                          ? 'bg-stone-900 border-stone-800 hover:border-stone-700'
                          : 'bg-stone-950/60 border-stone-800/80 opacity-90'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        {/* Theme Palette Swatch & Info */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shrink-0 border border-white/20"
                            style={{ backgroundColor: theme.previewColor }}
                          >
                            <Sparkles className="w-5 h-5 text-white/90 drop-shadow" />
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-stone-100">{theme.name}</span>
                              <span className="text-[10px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full">
                                {theme.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                              {theme.description}
                            </p>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="shrink-0">
                          {isEquipped ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>فعال</span>
                            </span>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => {
                                sounds.playClick();
                                onEquipTheme(theme.id);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 text-xs font-semibold border border-stone-700 transition-all cursor-pointer"
                            >
                              فعال‌سازی
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (canAfford) {
                                  sounds.playCoin();
                                  onBuyTheme(theme.id, theme.price);
                                } else {
                                  sounds.playError();
                                  alert(`سکه کافی ندارید! برای این پوسته نیاز به ${theme.price} سکه دارید.`);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 ${
                                canAfford
                                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-sm cursor-pointer'
                                  : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                              }`}
                            >
                              <Coins className="w-3.5 h-3.5" />
                              <span>{theme.price} سکه</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: GAME CATEGORIES SHOP */}
          {activeTab === 'categories' && (
            <div className="space-y-3.5">
              <div className="text-xs text-stone-400 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                با جمع‌آوری سکه در بازی می‌توانید دسته‌های جدید را بازگشایی کنید و به مراحل جدید دسترسی پیدا کنید!
              </div>

              {CATEGORIES_LIST.map((cat) => {
                const isUnlocked = progress.unlockedCategories.includes(cat.id);
                const isActive = progress.activeCategory === cat.id;
                const canAfford = progress.coins >= cat.price;

                return (
                  <div
                    key={cat.id}
                    className={`rounded-2xl border overflow-hidden shadow-lg transition-all ${
                      isActive
                        ? 'border-amber-500 bg-stone-900 ring-2 ring-amber-500/40'
                        : isUnlocked
                        ? 'border-stone-800 bg-stone-900'
                        : 'border-stone-800/80 bg-stone-950/70'
                    }`}
                  >
                    {/* Visual Banner */}
                    <div className="relative aspect-[16/7] w-full overflow-hidden bg-stone-950">
                      <img
                        src={cat.imageSrc}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-amber-500/30 text-[10px] font-bold text-amber-300">
                        {cat.badgeText}
                      </div>

                      {/* Locked Overlay Badge */}
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center gap-2 text-white font-bold text-sm">
                          <Lock className="w-5 h-5 text-amber-400" />
                          <span>قفل · بازگشایی با {cat.price} سکه</span>
                        </div>
                      )}
                    </div>

                    {/* Info & Action Strip */}
                    <div className="p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          {cat.id === 'proverbs' && <BookOpen className="w-4 h-4 text-amber-400" />}
                          {cat.id === 'football' && <Trophy className="w-4 h-4 text-emerald-400" />}
                          {cat.id === 'cinema' && <Film className="w-4 h-4 text-rose-400" />}
                          <h3 className="text-sm font-bold text-stone-100">{cat.title}</h3>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                          {cat.description}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="shrink-0">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>دسته فعلی</span>
                          </span>
                        ) : isUnlocked ? (
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onSelectCategory(cat.id);
                              onClose();
                            }}
                            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-stone-950 font-black text-xs shadow-md transition-all cursor-pointer"
                          >
                            بازی این دسته
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (canAfford) {
                                sounds.playSuccess();
                                onBuyCategory(cat.id, cat.price);
                              } else {
                                sounds.playError();
                                alert(`برای باز کردن دسته ${cat.title} به ${cat.price} سکه نیاز دارید. با حل مراحل یا تماشای ویدیو سکه بیشتری جمع کنید!`);
                              }
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                              canAfford
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black shadow-lg shadow-amber-500/30 cursor-pointer'
                                : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                            }`}
                          >
                            <Coins className="w-4 h-4" />
                            <span>خرید ({cat.price} سکه)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer info note */}
        <div className="p-3 bg-stone-950/80 border-t border-stone-800 text-center text-[11px] text-stone-400 shrink-0">
          تمام آیتم‌ها کاملاً آفلاین و با سکه‌های حاصل از حل معماها قابل دریافت هستند
        </div>
      </div>
    </div>
  );
};
