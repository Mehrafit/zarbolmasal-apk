import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Persian-style time representation
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-stone-950 flex items-center justify-center p-0 sm:p-4 md:p-6">
      {/* Mobile Frame Container */}
      <div className="w-full sm:max-w-[430px] h-[100dvh] sm:h-[880px] sm:max-h-[92vh] bg-stone-900 sm:rounded-[42px] shadow-2xl sm:ring-8 sm:ring-stone-800/80 flex flex-col relative overflow-hidden text-slate-100 border-0 sm:border-4 sm:border-amber-600/30">
        
        {/* Android Status Bar */}
        <div className="h-8 bg-black/40 backdrop-blur-sm px-5 flex items-center justify-between text-xs text-stone-300 shrink-0 z-40 select-none">
          <span className="font-semibold tracking-wide font-mono">{time || '12:00'}</span>
          
          {/* Subtle Camera Notch Indicator */}
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800 border border-stone-700 mx-auto hidden sm:block opacity-60"></div>

          <div className="flex items-center gap-2">
            <Signal className="w-3.5 h-3.5 opacity-80" />
            <Wifi className="w-3.5 h-3.5 opacity-80" />
            <div className="flex items-center gap-1 font-mono text-[10px]">
              <span>85%</span>
              <BatteryMedium className="w-4 h-4 opacity-80" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {children}
        </div>

        {/* Android Gesture Bar */}
        <div className="h-4 bg-stone-950/60 shrink-0 flex items-center justify-center pb-1">
          <div className="w-28 h-1 bg-stone-500/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
