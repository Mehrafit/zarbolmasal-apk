import React from 'react';
import { Volume2, VolumeX, X, RotateCcw, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/sound';

interface SettingsModalProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (vol: number) => void;
  onMuteToggle: () => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
  onResetProgress,
  onClose,
}) => {
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onVolumeChange(val);
    sounds.setVolume(val);
  };

  const handleTestChime = () => {
    sounds.playCoin();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-stone-900 border border-amber-600/40 rounded-3xl p-6 text-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <h2 className="text-xl font-bold text-amber-200">تنظیمات بازی</h2>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Controls */}
        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-300">میزان صدای بازی</span>
              <span className="text-xs font-mono text-amber-400 bg-stone-800 px-2.5 py-1 rounded-md">
                {isMuted ? 'بی‌صدا' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onMuteToggle();
                }}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                  isMuted 
                    ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40' 
                    : 'bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600/30'
                }`}
                title={isMuted ? 'روشن کردن صدا' : 'قطع صدا'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleSlider}
                className="flex-1 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Test Sound button */}
          <button
            onClick={handleTestChime}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700/80 border border-stone-700 text-xs font-medium text-amber-300 flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>تست پخش صدای جلوه‌ها</span>
          </button>

          {/* Game Info */}
          <div className="bg-stone-950/70 rounded-2xl p-4 border border-stone-800 text-xs space-y-2 text-stone-400">
            <div className="flex items-center justify-between">
              <span>تعداد کل مراحل:</span>
              <span className="font-mono text-stone-200">۱۰۰ مرحله</span>
            </div>
            <div className="flex items-center justify-between">
              <span>زمان هر مرحله:</span>
              <span className="font-mono text-stone-200">۵۰ ثانیه</span>
            </div>
            <div className="flex items-center justify-between">
              <span>بونوس سرعت:</span>
              <span className="text-emerald-400">زیر ۲۰ ثانیه (+۲۰ سکه)</span>
            </div>
          </div>

          {/* Reset progress */}
          <div className="pt-2 border-t border-stone-800">
            <button
              onClick={() => {
                if (window.confirm('آیا از ریست کردن کامل پیشرفت مراحل و سکه‌ها اطمینان دارید؟')) {
                  sounds.playClick();
                  onResetProgress();
                  onClose();
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/40 text-xs text-rose-400 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>شروع مجدد و بازنشانی مراحل بازی</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>ضرب‌المثل‌های اصیل فارسی · نسخه ۱.۰</span>
        </div>
      </div>
    </div>
  );
};
