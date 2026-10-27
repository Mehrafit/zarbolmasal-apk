import React from 'react';
import { X, HelpCircle, Eye, Eraser, Film, Coins, Sparkles } from 'lucide-react';
import { ProverbLevel } from '../types';
import { sounds } from '../utils/sound';

interface HintModalProps {
  level: ProverbLevel;
  userCoins: number;
  onRevealLetter: () => void;
  onRemoveExtraLetters: () => void;
  onShowClue: () => void;
  onWatchVideoAd: () => void;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  level,
  userCoins,
  onRevealLetter,
  onRemoveExtraLetters,
  onShowClue,
  onWatchVideoAd,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-stone-900 border border-amber-600/40 rounded-3xl p-6 text-slate-100 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-amber-200">راهنمایی بازی</h2>
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

        {/* Current Coins display */}
        <div className="my-4 py-2 px-3 rounded-2xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-between text-xs">
          <span className="text-stone-300">موجودی سکه‌های شما:</span>
          <div className="flex items-center gap-1 font-bold font-mono text-amber-400">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{userCoins} سکه</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          
          {/* Option 1: Reveal Letter */}
          <button
            onClick={() => {
              if (userCoins >= 15) {
                sounds.playCoin();
                onRevealLetter();
                onClose();
              } else {
                sounds.playError();
                alert('سکه کافی ندارید! می‌توانید تبلیغ ویدیویی ببینید.');
              }
            }}
            className="w-full p-3.5 rounded-2xl bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/40 flex items-center justify-between transition-all active:scale-98 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200">نمایان کردن یک حرف</div>
                <div className="text-[11px] text-stone-400">یک حرف درست در جای مناسب درج می‌شود</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono bg-stone-900 px-2 py-1 rounded-lg shrink-0">
              <span>۱۵</span>
              <Coins className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option 2: Remove extra letters */}
          <button
            onClick={() => {
              if (userCoins >= 20) {
                sounds.playCoin();
                onRemoveExtraLetters();
                onClose();
              } else {
                sounds.playError();
                alert('سکه کافی ندارید! می‌توانید ویدیو تبلیغاتی ببینید.');
              }
            }}
            className="w-full p-3.5 rounded-2xl bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/40 flex items-center justify-between transition-all active:scale-98 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40 flex items-center justify-center shrink-0">
                <Eraser className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200">حذف حروف نامربوط</div>
                <div className="text-[11px] text-stone-400">حروف اضافی از کیبورد پاک می‌شوند</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono bg-stone-900 px-2 py-1 rounded-lg shrink-0">
              <span>۲۰</span>
              <Coins className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option 3: Clue */}
          <button
            onClick={() => {
              if (userCoins >= 10) {
                sounds.playCoin();
                onShowClue();
                onClose();
              } else {
                sounds.playError();
                alert('سکه کافی ندارید!');
              }
            }}
            className="w-full p-3.5 rounded-2xl bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/40 flex items-center justify-between transition-all active:scale-98 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200">سرنخ مفهومی و نشانه</div>
                <div className="text-[11px] text-stone-400">نمایش راهنمای داستانی ضرب‌المثل</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono bg-stone-900 px-2 py-1 rounded-lg shrink-0">
              <span>۱۰</span>
              <Coins className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option 4: Watch Video Ad (Free Coins) */}
          <button
            onClick={() => {
              sounds.playClick();
              onWatchVideoAd();
            }}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-900/50 to-teal-900/50 hover:from-emerald-900/70 hover:to-teal-900/70 border border-emerald-500/40 flex items-center justify-between transition-all active:scale-98 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-200">تماشای ویدیو تبلیغاتی</div>
                <div className="text-[11px] text-emerald-400/80">۵ ثانیه تماشا = ۵۰ سکه رایگان!</div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              رایگان
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
