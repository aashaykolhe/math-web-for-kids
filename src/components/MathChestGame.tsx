import React, { useState, useEffect } from 'react';
import { DepthZone, GradeLevel, MathProblem, SeaCreature } from '../types/game';
import { generateMathProblem } from '../utils/mathGenerator';
import { sound } from '../utils/sound';
import { VisualMathCounter } from './VisualMathCounter';
import { ZONE_CONFIGS } from '../data/marineCreatures';
import { Sparkles, HelpCircle, Trophy, Volume2, VolumeX, Eye, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface MathChestGameProps {
  currentZone: DepthZone;
  gradeLevel: GradeLevel;
  availableCreatures: SeaCreature[];
  onCreatureUnlocked: (creature: SeaCreature) => void;
  onPearlsEarned: (count: number) => void;
  pearls: number;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
}

export const MathChestGame: React.FC<MathChestGameProps> = ({
  currentZone,
  gradeLevel,
  availableCreatures,
  onCreatureUnlocked,
  onPearlsEarned,
  pearls,
  streak,
  setStreak,
}) => {
  const [problem, setProblem] = useState<MathProblem>(() => generateMathProblem(gradeLevel));
  const [chestKeys, setChestKeys] = useState<number>(0);
  const requiredKeys = 3; // 3 correct equations to unlock a chest
  const [showVisualAid, setShowVisualAid] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isChestOpening, setIsChestOpening] = useState<boolean>(false);
  const [unlockedCreature, setUnlockedCreature] = useState<SeaCreature | null>(null);
  const [soundMuted, setSoundMuted] = useState<boolean>(sound.getMuted());
  const [chestShake, setChestShake] = useState<boolean>(false);

  const zoneConfig = ZONE_CONFIGS[currentZone] || ZONE_CONFIGS.sunlight;

  // Generate new problem when grade level changes
  useEffect(() => {
    setProblem(generateMathProblem(gradeLevel));
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
  }, [gradeLevel]);

  const handleToggleSound = () => {
    const next = !soundMuted;
    sound.setMuted(next);
    setSoundMuted(next);
    if (!next) {
      sound.playBubblePop();
    }
  };

  const handleAnswerSelect = (option: number) => {
    if (selectedAnswer !== null || isChestOpening) return; // prevent spamming

    setSelectedAnswer(option);

    // Haptic feedback for mobile
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(option === problem.answer ? [40, 60, 40] : 150);
      } catch {
        // Safe fallback for browsers blocking vibration
      }
    }

    if (option === problem.answer) {
      // Correct!
      setIsCorrect(true);
      sound.playBubblePop();
      sound.playCorrectFanfare();
      const newStreak = streak + 1;
      setStreak(newStreak);

      const earnedPearls = 5 + (newStreak > 3 ? 5 : 0);
      onPearlsEarned(earnedPearls);

      const nextKeys = chestKeys + 1;
      setChestKeys(nextKeys);

      // Trigger chest wobble
      setChestShake(true);
      setTimeout(() => setChestShake(false), 500);

      if (nextKeys >= requiredKeys) {
        // Unlock chest!
        setTimeout(() => {
          setIsChestOpening(true);
          sound.playChestUnlock();

          // Find an unlocked creature for this zone, or random available
          const zonePool = availableCreatures.filter((c) => c.depthZone === currentZone && !c.unlockedAt);
          const picked = zonePool.length > 0
            ? zonePool[Math.floor(Math.random() * zonePool.length)]
            : availableCreatures[Math.floor(Math.random() * availableCreatures.length)];

          setUnlockedCreature(picked);
          onCreatureUnlocked(picked);
          onPearlsEarned(50); // Big treasure chest bonus
        }, 600);
      } else {
        // Load next problem
        setTimeout(() => {
          setProblem(generateMathProblem(gradeLevel));
          setSelectedAnswer(null);
          setIsCorrect(null);
          setShowHint(false);
        }, 1200);
      }
    } else {
      // Incorrect
      setIsCorrect(false);
      sound.playWrongBoing();
      setStreak(0);
      setShowHint(true); // Automatically offer friendly hint

      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1500);
    }
  };

  const handleNextChest = () => {
    setIsChestOpening(false);
    setUnlockedCreature(null);
    setChestKeys(0);
    setProblem(generateMathProblem(gradeLevel));
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full px-3 sm:px-4 py-2 sm:py-4">
      {/* Top HUD: Zone Badge, Keys Progress, Streak & Sound */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/85 backdrop-blur-md px-3 sm:px-5 py-2.5 rounded-2xl border border-cyan-500/30 shadow-lg mb-4">
        {/* Depth Zone Pill */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <div className="text-xs sm:text-sm font-bold text-white font-game flex items-center gap-1.5">
              <span>{zoneConfig.name}</span>
            </div>
            <div className="text-[10px] sm:text-xs text-cyan-300 font-mono-math">
              Depth: {zoneConfig.depthRange}
            </div>
          </div>
        </div>

        {/* Chest Key Progress */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-amber-500/30">
          <span className="text-xs text-amber-300 font-bold uppercase tracking-wider hidden sm:inline">
            Chest Locks:
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: requiredKeys }).map((_, idx) => (
              <span
                key={idx}
                className={`text-base sm:text-lg transition-transform duration-300 ${
                  idx < chestKeys ? 'scale-110 drop-shadow-[0_0_8px_#facc15]' : 'opacity-30 grayscale'
                }`}
              >
                🗝️
              </span>
            ))}
          </div>
        </div>

        {/* Stats: Pearls & Streak */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-cyan-950/60 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/20 text-xs sm:text-sm font-bold font-mono-math">
            <span>⚪</span>
            <span>{pearls}</span>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1 bg-orange-950/60 text-orange-400 px-2 py-1 rounded-lg border border-orange-500/30 text-xs font-bold animate-bounce">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{streak}x</span>
            </div>
          )}

          <button
            onClick={handleToggleSound}
            aria-label={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 active:scale-95 transition-transform"
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-slate-900/85 backdrop-blur-lg rounded-3xl p-4 sm:p-6 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Subtle Water Glow Background in Card */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Chest Illustration & Animation Centerpiece */}
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
          <div
            className={`relative cursor-pointer transition-transform duration-300 ${
              chestShake ? 'scale-110 rotate-2' : ''
            } ${chestKeys >= requiredKeys ? 'chest-radiance' : ''}`}
            onClick={() => sound.playBubblePop()}
          >
            {/* SVG Custom High-Fidelity Treasure Chest */}
            <div className="w-28 h-24 sm:w-36 sm:h-32 flex items-center justify-center">
              <svg viewBox="0 0 160 130" className="w-full h-full drop-shadow-xl">
                <defs>
                  <linearGradient id="woodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#b45309" />
                    <stop offset="50%" stop-color="#92400e" />
                    <stop offset="100%" stop-color="#78350f" />
                  </linearGradient>
                  <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#fef08a" />
                    <stop offset="50%" stop-color="#eab308" />
                    <stop offset="100%" stop-color="#ca8a04" />
                  </linearGradient>
                </defs>
                {/* Chest Base */}
                <path d="M20,60 L140,60 L130,115 C130,120 125,125 118,125 L42,125 C35,125 30,120 30,115 Z" fill="url(#woodGradient)" stroke="#ca8a04" strokeWidth="4" />
                {/* Chest Bands */}
                <rect x="42" y="60" width="12" height="65" fill="url(#goldTrim)" />
                <rect x="106" y="60" width="12" height="65" fill="url(#goldTrim)" />
                {/* Chest Lid */}
                <path
                  d="M15,60 C15,25 145,25 145,60 Z"
                  fill="url(#woodGradient)"
                  stroke="#ca8a04"
                  strokeWidth="4"
                  className={chestKeys >= requiredKeys ? 'transform -translate-y-3 transition-transform' : ''}
                />
                <path d="M42,28 C42,28 48,25 54,60 L42,60 Z" fill="url(#goldTrim)" />
                <path d="M106,28 C106,28 112,25 118,60 L106,60 Z" fill="url(#goldTrim)" />
                {/* Center Golden Lock Plate */}
                <rect x="68" y="50" width="24" height="26" rx="4" fill="url(#goldTrim)" stroke="#a16207" strokeWidth="2" />
                <circle cx="80" cy="60" r="3" fill="#451a03" />
                <path d="M79,62 L81,62 L82,68 L78,68 Z" fill="#451a03" />
              </svg>
            </div>

            {/* Glowing Keys Counter Badge */}
            <div className="absolute -bottom-2 bg-amber-500 text-slate-950 font-game font-bold text-xs px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-yellow-200">
              <span>{chestKeys} / {requiredKeys} Locks</span>
            </div>
          </div>
          <p className="text-xs text-cyan-200/80 mt-3 text-center max-w-sm">
            Solve <span className="font-bold text-amber-300">{requiredKeys - chestKeys} more equation{requiredKeys - chestKeys === 1 ? '' : 's'}</span> to pop the treasure latch and reveal a sea creature!
          </p>
        </div>

        {/* Story Context Banner */}
        <div className="bg-cyan-950/40 rounded-xl p-3 border border-cyan-500/20 mb-4 text-center">
          <p className="text-sm sm:text-base text-cyan-100 font-medium leading-relaxed">
            "{problem.storyContext}"
          </p>
        </div>

        {/* Big Kid-Friendly Equation Card */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 sm:py-5 bg-slate-950/70 rounded-2xl border-2 border-cyan-400/40 shadow-inner mb-4">
          <span className="text-3xl sm:text-5xl font-black font-mono-math text-white">
            {problem.num1}
          </span>
          <span className="text-3xl sm:text-5xl font-black font-game text-amber-400">
            {problem.operator}
          </span>
          <span className="text-3xl sm:text-5xl font-black font-mono-math text-white">
            {problem.num2}
          </span>
          <span className="text-3xl sm:text-5xl font-black font-game text-cyan-400">
            =
          </span>
          <div className="w-16 h-14 sm:w-24 sm:h-20 rounded-2xl bg-cyan-950/80 border-2 border-dashed border-cyan-400 flex items-center justify-center">
            {selectedAnswer !== null ? (
              <span
                className={`text-3xl sm:text-5xl font-black font-mono-math ${
                  isCorrect ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {selectedAnswer}
              </span>
            ) : (
              <span className="text-3xl sm:text-4xl text-cyan-300/60 font-bold animate-pulse">?</span>
            )}
          </div>
        </div>

        {/* Interactive Visual Counter (Scaffolding for K-2 & Visual Learners) */}
        {showVisualAid && (
          <div className="mb-4">
            <VisualMathCounter
              num1={problem.num1}
              num2={problem.num2}
              operator={problem.operator}
              visualType={problem.visualType}
            />
          </div>
        )}

        {/* Multiple Choice Bubble Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {problem.options.map((option) => {
            const isSelected = selectedAnswer === option;
            let btnStyle = 'bg-slate-800/90 text-white border-cyan-500/40 hover:border-cyan-300 hover:bg-slate-700/80';

            if (isSelected) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-600 text-white border-emerald-300 ring-4 ring-emerald-500/40 scale-105';
              } else {
                btnStyle = 'bg-rose-600 text-white border-rose-300 ring-4 ring-rose-500/40 scale-95';
              }
            }

            return (
              <button
                key={option}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswerSelect(option)}
                className={`py-4 sm:py-5 px-3 rounded-2xl border-2 font-game font-bold text-2xl sm:text-3xl shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer min-h-[58px] ${btnStyle}`}
              >
                <span className="drop-shadow-md">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Helpful Tools Bar: Visual Aid Toggle, Hint, Reroll */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setShowVisualAid(!showVisualAid)}
            className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 border border-cyan-500/20 active:scale-95 transition-transform"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showVisualAid ? 'Hide Pearl Counters' : 'Show Pearl Counters'}</span>
          </button>

          <button
            onClick={() => {
              setShowHint(true);
              sound.playBubblePop();
            }}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-100 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 active:scale-95 transition-transform"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ask Turtle for Hint</span>
          </button>

          <button
            onClick={() => {
              setProblem(generateMathProblem(gradeLevel));
              setSelectedAnswer(null);
              setIsCorrect(null);
              setShowHint(false);
              sound.playBubblePop();
            }}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700 active:scale-95 transition-transform"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Equation</span>
          </button>
        </div>

        {/* Hint Callout */}
        {showHint && (
          <div className="mt-3 bg-amber-950/60 border border-amber-500/40 rounded-xl p-3 text-xs sm:text-sm text-amber-200 flex items-start gap-2.5 animate-fadeIn">
            <span className="text-xl">🐢</span>
            <div>
              <p className="font-bold text-amber-300">Sea Turtle's Math Clue:</p>
              <p>{problem.hint}</p>
            </div>
          </div>
        )}
      </div>

      {/* Unlocked Sea Creature Celebration Modal */}
      {isChestOpening && unlockedCreature && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-gradient-to-b from-slate-900 to-cyan-950 border-2 border-amber-400 rounded-3xl p-5 sm:p-7 max-w-lg w-full text-center relative shadow-[0_0_50px_rgba(250,204,21,0.4)] my-auto">
            {/* Confetti / Sparkle Rays */}
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center text-amber-300 mb-2 animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="text-xs uppercase tracking-widest font-black text-amber-400 mb-1">
              Treasure Chest Unlocked!
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-game text-white mb-1">
              You Rescued {unlockedCreature.name}!
            </h3>

            {/* Creature Avatar Big Display */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto my-3 rounded-full bg-cyan-950 border-4 border-amber-400 flex items-center justify-center text-6xl sm:text-7xl shadow-inner relative">
              <span className="transform hover:scale-110 transition-transform">
                {unlockedCreature.emoji}
              </span>
              {unlockedCreature.bioluminescence && (
                <span
                  className="absolute bottom-1 right-1 text-base bg-cyan-900/90 border border-cyan-400 rounded-full px-2 py-0.5 text-cyan-300 font-bold"
                  title="Bioluminescent species"
                >
                  ✨ Glows
                </span>
              )}
            </div>

            {/* Scientific Taxonomy & Marine Biology Details */}
            <div className="bg-slate-950/70 rounded-2xl p-4 text-left border border-cyan-500/30 mb-4 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Scientific Name:</span>
                <span className="font-serif italic font-bold text-cyan-300 text-sm sm:text-base">
                  {unlockedCreature.scientificName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                <div>
                  <span className="text-slate-500">Phylum:</span>{' '}
                  <span className="font-semibold text-slate-200">{unlockedCreature.phylum}</span>
                </div>
                <div>
                  <span className="text-slate-500">Class:</span>{' '}
                  <span className="font-semibold text-slate-200">{unlockedCreature.className}</span>
                </div>
                <div>
                  <span className="text-slate-500">Ocean Depth:</span>{' '}
                  <span className="font-semibold text-cyan-400">{unlockedCreature.depthRange}</span>
                </div>
                <div>
                  <span className="text-slate-500">Rarity:</span>{' '}
                  <span className="font-semibold text-amber-400">{unlockedCreature.rarity}</span>
                </div>
              </div>

              {/* Biological Adaptation & Fact */}
              <div className="bg-cyan-950/50 p-2.5 rounded-xl border border-cyan-500/20 mt-2">
                <p className="text-cyan-300 font-semibold mb-0.5 flex items-center gap-1">
                  <span>🔬</span> Marine Science Adaptation:
                </p>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {unlockedCreature.biologyFact}
                </p>
              </div>

              {unlockedCreature.bioluminescenceMechanism && (
                <div className="text-[11px] text-cyan-400 italic">
                  💡 Light mechanism: {unlockedCreature.bioluminescenceMechanism}
                </div>
              )}
            </div>

            {/* Reward Bonus */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-full text-xs font-bold font-mono-math mb-4">
              <span>+50 Bonus Pearls Added to Sanctuary!</span>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleNextChest}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-game font-bold text-lg sm:text-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Dive to Next Chest</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
