import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Feather, 
  Droplet, 
  Fish, 
  Hammer, 
  Wind, 
  Moon, 
  Clock, 
  Users, 
  Mountain, 
  Zap, 
  Compass, 
  Sun, 
  AlertTriangle, 
  Scale, 
  Heart, 
  Award,
  Scissors
} from 'lucide-react';
import { ProverbLevel } from '../types';

interface ProverbVisualCardProps {
  level: ProverbLevel;
  clueRevealed: boolean;
}

export const ProverbVisualCard: React.FC<ProverbVisualCardProps> = ({
  level,
  clueRevealed,
}) => {
  // If dedicated photographic asset exists
  if (level.imageSrc) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-amber-600/30 shadow-lg bg-stone-900 group">
        <img
          src={level.imageSrc}
          alt={level.illustrationTheme.symbolName || level.proverb}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none"></div>

        {/* Floating Category and Level Tag */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-amber-500/30 text-[11px] font-medium text-amber-300">
          {level.category}
        </div>

        {/* Clue Banner if unlocked */}
        {clueRevealed && (
          <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-amber-950/90 border border-amber-500/50 backdrop-blur-sm text-xs text-amber-200 text-center animate-in fade-in duration-200">
            💡 سرنخ: {level.hint}
          </div>
        )}
      </div>
    );
  }

  // Procedural Art Component for Levels
  return (
    <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-amber-600/30 shadow-lg bg-gradient-to-br ${level.illustrationTheme.primaryColor} p-4 flex flex-col justify-between text-white relative`}>
      {/* Persian Arch / Geometric Motif Frame */}
      <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none"></div>
      
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] font-mono uppercase bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/90">
          مرحله {level.id} · {level.difficulty}
        </span>
        <span className="text-xs bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full text-amber-200">
          {level.category}
        </span>
      </div>

      {/* Center Symbolic Artwork */}
      <div className="flex flex-col items-center justify-center my-auto text-center z-10 px-2">
        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center mb-3 shadow-inner">
          <Sparkles className="w-8 h-8 text-amber-200 animate-pulse" />
        </div>
        <h3 className="text-base font-bold text-white drop-shadow-md mb-1">
          {level.illustrationTheme.symbolName}
        </h3>
        <p className="text-xs text-white/80 max-w-xs drop-shadow leading-relaxed">
          {level.illustrationTheme.sceneDescription}
        </p>
      </div>

      {/* Bottom Clue or Tip */}
      <div className="z-10 text-center">
        {clueRevealed ? (
          <div className="p-2 rounded-xl bg-black/60 backdrop-blur-sm border border-amber-400/40 text-xs text-amber-200 animate-in fade-in">
            💡 سرنخ: {level.hint}
          </div>
        ) : (
          <div className="text-[11px] text-white/70">
            تصویر مفهومی ضرب‌المثل
          </div>
        )}
      </div>
    </div>
  );
};
