import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Heart, 
  Coins, 
  Clock, 
  HelpCircle, 
  Check, 
  Delete, 
  RotateCcw,
  Zap,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { ProverbLevel, UserProgress } from '../types';
import { ProverbVisualCard } from './ProverbVisualCard';
import { HintModal } from './HintModal';
import { RewardedAdModal } from './RewardedAdModal';
import { VictoryModal } from './VictoryModal';
import { checkAnswerMatch, normalizePersianText } from '../data/proverbs';
import { sounds } from '../utils/sound';

interface GameScreenProps {
  level: ProverbLevel;
  progress: UserProgress;
  onHome: () => void;
  onNextLevel: () => void;
  onUpdateCoins: (newCoins: number) => void;
  onLoseLife: () => void;
  onLevelComplete: (levelId: number, stars: number, solvedSeconds: number, speedBonus: boolean) => void;
  onRefillLives: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  level,
  progress,
  onHome,
  onNextLevel,
  onUpdateCoins,
  onLoseLife,
  onLevelComplete,
  onRefillLives,
}) => {
  const [userInput, setUserInput] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(50); // Total 50 seconds per level
  const [isShake, setIsShake] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Hint states
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [isAdOpen, setIsAdOpen] = useState<boolean>(false);
  const [clueRevealed, setClueRevealed] = useState<boolean>(false);
  const [removedLetters, setRemovedLetters] = useState<string[]>([]);
  
  // Victory state
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [isSpeedBonus, setIsSpeedBonus] = useState<boolean>(false);
  const [solvedDuration, setSolvedDuration] = useState<number>(0);

  // Timer countdown
  useEffect(() => {
    setTimeLeft(50);
    setUserInput('');
    setClueRevealed(false);
    setRemovedLetters([]);
    setIsVictoryOpen(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          sounds.playHeartLoss();
          onLoseLife();
          setErrorMessage('زمان شما به پایان رسید! یک جان کسر شد.');
          return 50; // reset for another try
        }
        if (prev <= 6) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [level.id]);

  // Standard Persian letters to complement scrambled tiles
  const keyboardLetters = React.useMemo(() => {
    const scrambled = [...level.scrambledLetters];
    // Remove letters that were eliminated via hint
    return scrambled.filter((letter) => !removedLetters.includes(letter));
  }, [level.scrambledLetters, removedLetters]);

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVictoryOpen || isHintOpen || isAdOpen) return;

      if (e.key === 'Backspace') {
        sounds.playClick();
        setUserInput((prev) => prev.slice(0, -1));
      } else if (e.key === 'Enter') {
        handleCheckAnswer();
      } else if (e.key === ' ') {
        sounds.playClick();
        setUserInput((prev) => prev + ' ');
      } else if (e.key.length === 1 && /^[\u0600-\u06FF\s]+$/.test(e.key)) {
        sounds.playClick();
        setUserInput((prev) => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userInput, isVictoryOpen, isHintOpen, isAdOpen]);

  // Handle Answer Verification (دکمه حله)
  const handleCheckAnswer = () => {
    if (!userInput.trim()) {
      setErrorMessage('لطفاً ابتدا پاسخ خود را تایپ کنید');
      return;
    }

    const isCorrect = checkAnswerMatch(userInput, level);

    if (isCorrect) {
      const elapsed = 50 - timeLeft;
      setSolvedDuration(elapsed);
      // Under 20 seconds speed bonus condition: elapsed <= 20 (or timeLeft >= 30)
      const earnedBonus = elapsed <= 20;
      setIsSpeedBonus(earnedBonus);

      const stars = elapsed <= 20 ? 3 : elapsed <= 35 ? 2 : 1;
      onLevelComplete(level.id, stars, elapsed, earnedBonus);
      setIsVictoryOpen(true);
    } else {
      // Wrong answer
      sounds.playError();
      sounds.playHeartLoss();
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);

      onLoseLife();
      setErrorMessage('پاسخ نادرست است! یک جان از دست رفت');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // Hint Actions
  const handleRevealLetter = () => {
    onUpdateCoins(progress.coins - 15);
    // Find next missing letter in targetAnswer
    const normTarget = level.targetAnswer.replace(/\s+/g, '');
    const normUser = userInput.replace(/\s+/g, '');
    const nextCharIndex = normUser.length;

    if (nextCharIndex < normTarget.length) {
      const nextChar = normTarget[nextCharIndex];
      setUserInput((prev) => prev + nextChar);
    } else {
      setUserInput(level.targetAnswer);
    }
  };

  const handleRemoveExtraLetters = () => {
    onUpdateCoins(progress.coins - 20);
    const neededLetters = new Set(level.targetAnswer.split(''));
    const extras = level.scrambledLetters.filter((l) => !neededLetters.has(l));
    // Remove half of extras
    const toRemove = extras.slice(0, Math.ceil(extras.length / 2));
    setRemovedLetters((prev) => [...prev, ...toRemove]);
  };

  const handleShowClue = () => {
    onUpdateCoins(progress.coins - 10);
    setClueRevealed(true);
  };

  const handleRewardClaimed = (bonus: number) => {
    onUpdateCoins(progress.coins + bonus);
    setIsAdOpen(false);
  };

  // Speed Bonus badge condition (<= 20s elapsed)
  const isEligibleForSpeedBonus = 50 - timeLeft <= 20;

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-4 overflow-y-auto select-none bg-stone-950 text-slate-100 relative">
      
      {/* Top HUD Cluster */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-800/80 shrink-0">
        
        {/* Back to Home CTA */}
        <button
          onClick={() => {
            sounds.playClick();
            onHome();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-white transition-colors"
          title="بازگشت به خانه"
        >
          <Home className="w-4 h-4" />
          <span className="text-xs font-medium">خانه</span>
        </button>

        {/* Level & Category */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-black text-amber-300 font-mono">
            مرحله {level.id}
          </span>
          <span className="text-[10px] text-stone-400">
            {level.category}
          </span>
        </div>

        {/* 50-Second Countdown Timer with Speed indicator */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800">
          <Clock className={`w-3.5 h-3.5 ${timeLeft <= 10 ? 'text-rose-500 animate-spin' : 'text-amber-400'}`} />
          <span className={`text-xs font-mono font-bold ${
            timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-stone-200'
          }`}>
            {timeLeft}s
          </span>
          {isEligibleForSpeedBonus && (
            <span title="شانس بونوس سرعت (زیر ۲۰ ثانیه)">
              <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400 ml-0.5" />
            </span>
          )}
        </div>

        {/* Lives Counter */}
        <div className="flex items-center gap-1 text-rose-500">
          <Heart className="w-4 h-4 fill-rose-500" />
          <span className="text-xs font-mono font-bold text-rose-300">
            {progress.lives}
          </span>
        </div>

        {/* Coins Counter */}
        <div className="flex items-center gap-1 text-amber-400">
          <Coins className="w-4 h-4" />
          <span className="text-xs font-mono font-bold text-amber-300">
            {progress.coins}
          </span>
        </div>
      </div>

      {/* Out of Lives Warning Banner */}
      {progress.lives <= 0 && (
        <div className="my-2 p-2.5 rounded-2xl bg-rose-950/80 border border-rose-600/50 flex items-center justify-between text-xs text-rose-200 animate-in fade-in">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>جان‌های شما تمام شد!</span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              setIsAdOpen(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
          >
            پر کردن با ویدیو
          </button>
        </div>
      )}

      {/* Error Message Toast */}
      {errorMessage && (
        <div className="my-1.5 p-2 rounded-xl bg-rose-950/70 border border-rose-800 text-center text-xs text-rose-300 animate-in fade-in">
          {errorMessage}
        </div>
      )}

      {/* Middle Zone: Proverb Conceptual Image Card */}
      <div className="my-2 shrink-0">
        <ProverbVisualCard level={level} clueRevealed={clueRevealed} />
      </div>

      {/* Answer Input Textbox */}
      <div className="my-1.5 shrink-0">
        <div className={`relative flex items-center bg-stone-900 border-2 rounded-2xl p-2.5 shadow-inner transition-colors ${
          isShake 
            ? 'border-rose-500 bg-rose-950/20 translate-x-1 duration-75' 
            : 'border-amber-500/50 focus-within:border-amber-400'
        }`}>
          {/* Display User Typed Text */}
          <div className="flex-1 text-center font-bold text-base text-amber-200 min-h-[28px] overflow-x-auto whitespace-nowrap px-2">
            {userInput || (
              <span className="text-stone-500 text-xs font-normal">
                پاسخ یا ضرب‌المثل را تایپ کنید...
              </span>
            )}
            <span className="inline-block w-0.5 h-4 bg-amber-400 mr-1 animate-pulse align-middle"></span>
          </div>

          {/* Clear & Backspace Buttons */}
          {userInput.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserInput('');
                }}
                className="p-1.5 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors"
                title="پاک کردن همه"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserInput((prev) => prev.slice(0, -1));
                }}
                className="p-1.5 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors"
                title="حذف حرف آخر"
              >
                <Delete className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* On-Screen Persian Keyboard / Letter Tiles */}
      <div className="bg-stone-900/90 rounded-2xl border border-stone-800/80 p-2 my-1 shrink-0">
        <div className="grid grid-cols-8 gap-1.5 justify-items-center">
          {keyboardLetters.map((char, index) => (
            <button
              key={`${char}-${index}`}
              onClick={() => {
                sounds.playClick();
                setUserInput((prev) => prev + char);
              }}
              className="w-8 h-9 sm:w-9 sm:h-10 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 border border-stone-700/80 text-amber-100 font-bold text-sm shadow-sm flex items-center justify-center transition-all cursor-pointer"
            >
              {char}
            </button>
          ))}
        </div>

        {/* Space Bar & Extra Keys */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-800">
          <button
            onClick={() => {
              sounds.playClick();
              setUserInput((prev) => prev + ' ');
            }}
            className="flex-1 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-98 border border-stone-700 text-stone-300 font-medium text-xs flex items-center justify-center transition-all cursor-pointer"
          >
            فاصله (Space)
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setUserInput((prev) => prev + '‌'); // Half space (نیم‌فاصله)
            }}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-98 border border-stone-700 text-stone-300 font-medium text-xs flex items-center justify-center transition-all cursor-pointer"
          >
            نیم‌فاصله
          </button>
        </div>
      </div>

      {/* Bottom Main Action Bar: "حله" & "راهنمایی" */}
      <div className="flex items-center gap-2.5 pt-1 pb-1 shrink-0">
        
        {/* Hint Button */}
        <button
          onClick={() => {
            sounds.playClick();
            setIsHintOpen(true);
          }}
          className="flex-1 py-3 px-3 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>راهنمایی</span>
        </button>

        {/* Primary "حله" (Check) Button */}
        <button
          onClick={() => {
            sounds.playClick();
            handleCheckAnswer();
          }}
          disabled={progress.lives <= 0}
          className={`flex-[2] py-3 px-4 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
            progress.lives <= 0
              ? 'bg-stone-800 text-stone-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 shadow-amber-500/20 hover:brightness-105 cursor-pointer'
          }`}
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>حله (بررسی پاسخ)</span>
        </button>
      </div>

      {/* Hint Modal */}
      {isHintOpen && (
        <HintModal
          level={level}
          userCoins={progress.coins}
          onRevealLetter={handleRevealLetter}
          onRemoveExtraLetters={handleRemoveExtraLetters}
          onShowClue={handleShowClue}
          onWatchVideoAd={() => {
            setIsHintOpen(false);
            setIsAdOpen(true);
          }}
          onClose={() => setIsHintOpen(false)}
        />
      )}

      {/* Rewarded Video Ad Modal */}
      {isAdOpen && (
        <RewardedAdModal
          onRewardClaimed={(bonus) => {
            handleRewardClaimed(bonus);
            onRefillLives();
          }}
          onClose={() => setIsAdOpen(false)}
        />
      )}

      {/* Victory Celebration Modal */}
      {isVictoryOpen && (
        <VictoryModal
          level={level}
          solvedTimeSeconds={solvedDuration}
          isSpeedBonusEarned={isSpeedBonus}
          baseCoins={30}
          bonusCoins={20}
          isLastLevel={level.id === 100}
          onNextLevel={onNextLevel}
          onHome={onHome}
        />
      )}

    </div>
  );
};
