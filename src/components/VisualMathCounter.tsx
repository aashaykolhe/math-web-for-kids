import React from 'react';
import { MathOperator } from '../types/game';

interface VisualMathCounterProps {
  num1: number;
  num2: number;
  operator: MathOperator;
  visualType?: 'pearl' | 'starfish' | 'shell' | 'jelly';
}

export const VisualMathCounter: React.FC<VisualMathCounterProps> = ({
  num1,
  num2,
  operator,
  visualType = 'pearl',
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'starfish':
        return '⭐';
      case 'shell':
        return '🐚';
      case 'jelly':
        return '🪼';
      default:
        return '⚪';
    }
  };

  const icon = getIcon(visualType);

  // Limit visual render to avoid giant overflowing grids if numbers exceed 15
  const display1 = Math.min(num1, 15);
  const display2 = Math.min(num2, 15);

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-cyan-500/20 shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider font-semibold text-cyan-300 flex items-center gap-1.5">
          <span>🧮</span> Visual Counter (Touch to Count)
        </span>
        <span className="text-xs text-slate-400">
          {num1} {operator} {num2}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-1">
        {/* First group */}
        <div className="flex flex-col items-center bg-cyan-950/40 p-2 sm:p-2.5 rounded-xl border border-cyan-500/20">
          <div className="flex flex-wrap max-w-[140px] sm:max-w-[180px] gap-1.5 justify-center">
            {Array.from({ length: display1 }).map((_, i) => (
              <span
                key={`g1-${i}`}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold border border-cyan-400/40 transform active:scale-125 transition-transform cursor-pointer"
                title={`Item ${i + 1}`}
              >
                {icon}
              </span>
            ))}
          </div>
          <span className="mt-1 text-xs font-bold text-cyan-300 font-mono-math">
            {num1} items
          </span>
        </div>

        {/* Operator Badge */}
        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-bold text-base shadow-sm">
          {operator}
        </div>

        {/* Second group */}
        <div className="flex flex-col items-center bg-amber-950/40 p-2 sm:p-2.5 rounded-xl border border-amber-500/20">
          <div className="flex flex-wrap max-w-[140px] sm:max-w-[180px] gap-1.5 justify-center">
            {Array.from({ length: display2 }).map((_, i) => (
              <span
                key={`g2-${i}`}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold border border-amber-400/40 transform active:scale-125 transition-transform cursor-pointer"
                title={`Item ${i + 1}`}
              >
                {icon}
              </span>
            ))}
          </div>
          <span className="mt-1 text-xs font-bold text-amber-300 font-mono-math">
            {num2} items
          </span>
        </div>
      </div>
    </div>
  );
};
