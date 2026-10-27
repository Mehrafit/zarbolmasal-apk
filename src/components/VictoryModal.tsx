import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, ChevronLeft, Zap, Coins, BookOpen, Star } from 'lucide-react';
import { ProverbLevel } from '../types';
import { sounds } from '../utils/sound';

interface VictoryModalProps {
  level: ProverbLevel;
  solvedTimeSeconds: number; // Elapsed seconds (e.g. 14s)
  isSpeedBonusEarned: boolean; // Under 20 seconds!
  baseCoins: number;
  bonusCoins: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onHome: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  solvedTimeSeconds,
  isSpeedBonusEarned,
  baseCoins,
  bonusCoins,
  isLastLevel,
  onNextLevel,
  onHome,
}) => {
  const totalEarned = baseCoins + (isSpeedBonusEarned ? bonusCoins : 0);

  useEffect(() => {
    sounds.playSuccess();

    // Fire fireworks confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 text-slate-100 shadow-2xl relative flex flex-col items-center text-center animate-in zoom-in-90 duration-200">
        
        {/* Floating Trophy Badge */}
        <div className="relative -mt-12 mb-3">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 p-1 shadow-xl shadow-amber-500/30 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform">
            <div className="w-full h-full rounded-[22px] bg-stone-900 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-amber-400" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-stone-950 p-1 rounded-full border-2 border-stone-900">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>

        {/* Victory Header */}
        <h2 className="text-2xl font-black text-amber-300 mb-1">
          آفرین! درست است
        </h2>
        <p className="text-xs text-stone-300 font-medium mb-4">
          مرحله {level.id} با موفقیت به پایان رسید
        </p>

        {/* Proverb Spotlight */}
        <div className="w-full p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 mb-4">
          <span className="text-[11px] text-amber-300 font-medium block mb-1">ضرب‌المثل:</span>
          <div className="text-base font-bold text-amber-100 leading-relaxed">
            «{level.proverb}»
          </div>
        </div>

        {/* Proverb Meaning & Cultural Story */}
        <div className="w-full p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-right mb-4 max-h-48 overflow-y-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-300 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>ریشه و مفهوم ضرب‌المثل:</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            {level.meaning}
          </p>
        </div>

        {/* Rewards Breakdown */}
        <div className="w-full grid grid-cols-2 gap-2 mb-5">
          {/* Base Coins */}
          <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/80 flex flex-col items-center">
            <span className="text-[10px] text-stone-400">جایزه مرحله</span>
            <div className="flex items-center gap-1 text-sm font-bold font-mono text-amber-400 mt-0.5">
              <Coins className="w-4 h-4" />
              <span>+{baseCoins} سکه</span>
            </div>
          </div>

          {/* Speed Bonus */}
          <div className={`p-2.5 rounded-xl border flex flex-col items-center ${
            isSpeedBonusEarned
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-stone-800/40 border-stone-800 text-stone-400'
          }`}>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px]">بونوس سرعت ({solvedTimeSeconds}ث)</span>
            </div>
            <div className="text-sm font-bold font-mono mt-0.5">
              {isSpeedBonusEarned ? `+${bonusCoins} سکه` : 'معمولی'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2">
          {!isLastLevel ? (
            <button
              onClick={() => {
                sounds.playClick();
                onNextLevel();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-105 text-stone-950 font-black text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>مرحله بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-center py-2 text-amber-400 text-xs font-bold">
              🎉 تبریک! شما تمام ۱۰۰ مرحله بازی را به پایان رساندید!
            </div>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onHome();
            }}
            className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
          >
            بازگشت به صفحه شروع
          </button>
        </div>

      </div>
    </div>
  );
};
