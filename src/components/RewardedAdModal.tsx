import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, X, Award, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface RewardedAdModalProps {
  onRewardClaimed: (coinsBonus: number) => void;
  onClose: () => void;
}

export const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  onRewardClaimed,
  onClose,
}) => {
  const [countdown, setCountdown] = useState(5);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCompleted(true);
          sounds.playSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    sounds.playCoin();
    onRewardClaimed(50);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-stone-900 border border-amber-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl relative flex flex-col items-center text-center">
        
        {/* Ad Video Simulation Frame */}
        <div className="w-full aspect-video bg-gradient-to-tr from-stone-950 via-amber-950 to-stone-900 rounded-2xl border border-stone-800 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-5">
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-amber-300 border border-amber-500/30">
            {completed ? 'پایان تبلیغ' : `تبلیغ ویدیویی: ${countdown} ثانیه`}
          </div>

          <div className="w-14 h-14 rounded-full bg-amber-600/30 border border-amber-500/50 flex items-center justify-center mb-2 animate-pulse">
            <Sparkles className="w-7 h-7 text-amber-400" />
          </div>

          <span className="text-sm font-bold text-amber-100">فروشگاه صنایع دستی ایران</span>
          <span className="text-[11px] text-stone-400 mt-1">حامی میراث و فرهنگ کهن پارسی</span>

          {/* Ad Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-800">
            <div 
              className="h-full bg-amber-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Claim or Status */}
        {completed ? (
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>جایزه تماشای تبلیغ آماده است!</span>
            </div>
            <p className="text-xs text-stone-300">
              ۵۰ سکه طلایی رایگان و احیای جان به حساب شما واریز می‌شود.
            </p>
            <button
              onClick={handleClaim}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>دریافت ۵۰ سکه هدیه</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-stone-400">
              لطفاً تا پایان شمارش معکوس صبور باشید...
            </p>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {countdown}
            </div>
          </div>
        )}

        {/* Cancel button if needed */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="mt-4 text-xs text-stone-500 hover:text-stone-300 transition-colors"
        >
          انصراف و بستن
        </button>
      </div>
    </div>
  );
};
