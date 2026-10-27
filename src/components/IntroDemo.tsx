import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface IntroDemoProps {
  onComplete: () => void;
}

export const IntroDemo: React.FC<IntroDemoProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    sounds.playIntroSplash();

    const startTime = Date.now();
    const duration = 2000; // Exact 2.0 seconds demo

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        onComplete();
      }
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 bg-gradient-to-b from-stone-950 via-amber-950 to-stone-900 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Decorative Persian Mandala Ring */}
      <div className="relative mb-8">
        <div className="w-36 h-36 rounded-full border-2 border-amber-500/40 animate-spin [animation-duration:12s] flex items-center justify-center p-2">
          <div className="w-full h-full rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-stone-950/80 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Ring Accents */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-ping opacity-75"></div>
      </div>

      {/* Title Lockup */}
      <h1 className="text-3xl font-extrabold text-amber-100 tracking-wide mb-2 drop-shadow-md">
        ضرب‌المثل‌های ایرانی
      </h1>
      <p className="text-amber-200/70 text-sm max-w-xs mb-8">
        سفر به گنجینه حکمت، ادب و ضرب‌المثل‌های کهن پارسی
      </p>

      {/* 2-Second Demo Progress Meter */}
      <div className="w-48 bg-stone-800/80 rounded-full h-2 overflow-hidden border border-amber-600/30 p-0.5 mb-3">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-amber-400/80">
        <span>بارگذاری دمو</span>
        <span>·</span>
        <span>۲ ثانیه</span>
      </div>
    </div>
  );
};
