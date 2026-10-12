import React, { useMemo } from 'react';
import { DepthZone } from '../types/game';
import { ZONE_CONFIGS } from '../data/marineCreatures';

interface UnderwaterBackgroundProps {
  zone: DepthZone;
}

export const UnderwaterBackground: React.FC<UnderwaterBackgroundProps> = ({ zone }) => {
  const currentConfig = ZONE_CONFIGS[zone] || ZONE_CONFIGS.sunlight;

  // Generate deterministic floating bubbles
  const bubbles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.floor((i % 5) * 6 + 10), // 10px to 34px
      left: `${(i * 19) % 96}%`,
      duration: `${12 + (i % 7) * 3}s`,
      delay: `${(i * 1.3) % 9}s`,
      opacity: (i % 3 === 0 ? 0.35 : 0.2),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-colors duration-1000">
      {/* Dynamic ocean depth gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentConfig.bgGradient} transition-all duration-1000 opacity-95`} />

      {/* Sunlight rays overlay (only visible in Epipelagic / sunlight zone) */}
      {zone === 'sunlight' && (
        <div className="absolute inset-0 opacity-25 mix-blend-screen overflow-hidden">
          <div className="absolute -top-40 -left-20 w-[140%] h-[120%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-cyan-200 to-transparent transform -rotate-12 scale-125 animate-pulse" style={{ animationDuration: '6s' }} />
        </div>
      )}

      {/* Bioluminescent particles overlay (in twilight, midnight, abyss, hadal) */}
      {zone !== 'sunlight' && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
          {zone === 'abyss' || zone === 'hadal' ? (
            <div className="absolute bottom-10 left-1/3 w-96 h-48 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" style={{ animationDuration: '3.5s' }} />
          ) : null}
        </div>
      )}

      {/* Floating oceanic bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble-particle"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: b.left,
            animationDuration: b.duration,
            animationDelay: b.delay,
            opacity: b.opacity,
          }}
        />
      ))}

      {/* Seabed silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 overflow-hidden opacity-30 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-slate-950 fill-current">
          <path d="M0,40 C150,90 350,10 500,45 C650,80 850,20 1000,60 C1100,85 1180,30 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Hydrothermal vent chimneys on abyss and hadal */}
      {(zone === 'abyss' || zone === 'hadal') && (
        <div className="absolute bottom-0 right-8 sm:right-24 w-28 h-40 opacity-40">
          <svg viewBox="0 0 100 140" className="w-full h-full fill-slate-900 stroke-cyan-600 stroke-1">
            <path d="M30,140 L38,40 L45,35 L48,45 L52,40 L58,140 Z" />
            <path d="M60,140 L65,70 L72,65 L76,140 Z" />
          </svg>
          <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-cyan-400/40 blur-sm animate-ping" />
        </div>
      )}
    </div>
  );
};
