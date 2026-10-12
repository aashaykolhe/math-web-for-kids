import React from 'react';
import { DepthZone, SeaCreature } from '../types/game';
import { ZONE_CONFIGS } from '../data/marineCreatures';
import { sound } from '../utils/sound';
import { Compass, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';

interface ExpeditionMapProps {
  currentZone: DepthZone;
  creatures: SeaCreature[];
  onSelectZone: (zone: DepthZone) => void;
}

export const ExpeditionMap: React.FC<ExpeditionMapProps> = ({
  currentZone,
  creatures,
  onSelectZone,
}) => {
  const zones: DepthZone[] = ['sunlight', 'twilight', 'midnight', 'abyss', 'hadal'];

  return (
    <div className="max-w-3xl mx-auto w-full px-3 sm:px-4 py-2 sm:py-4">
      {/* Header */}
      <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-cyan-500/30 mb-5 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black font-game text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            <span>Bathymetric Ocean Depth Map</span>
          </h2>
          <p className="text-xs sm:text-sm text-cyan-200/80">
            Descend from surface reefs to the 11,000-meter Hadal Trench abyss.
          </p>
        </div>
      </div>

      {/* Depth Ladder */}
      <div className="space-y-3 relative">
        {/* Submarine Depth Indicator Line */}
        <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-1 bg-gradient-to-b from-cyan-400 via-indigo-600 to-purple-900 rounded-full -z-0 opacity-40" />

        {zones.map((zoneKey, index) => {
          const config = ZONE_CONFIGS[zoneKey];
          const isCurrent = currentZone === zoneKey;
          const zoneCreatures = creatures.filter((c) => c.depthZone === zoneKey);
          const unlockedCount = zoneCreatures.filter((c) => c.unlockedAt).length;

          return (
            <div
              key={zoneKey}
              onClick={() => {
                sound.playSonarPing();
                onSelectZone(zoneKey);
              }}
              className={`relative z-10 rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer select-none ${
                isCurrent
                  ? 'border-amber-400 bg-slate-900/95 ring-4 ring-amber-400/20 shadow-2xl scale-[1.02]'
                  : 'border-cyan-500/30 bg-slate-900/80 hover:bg-slate-800/80 hover:border-cyan-400'
              }`}
            >
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  {/* Depth Zone Number / Submarine Icon */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-game font-bold text-base sm:text-lg shrink-0 border ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 border-yellow-200 shadow-md'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-500/30'
                    }`}
                  >
                    {isCurrent ? '🚢' : `${index + 1}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold font-game text-white">
                        {config.name}
                      </h3>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                          Current Depth
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1">
                      <span className="text-cyan-400 font-mono-math">
                        Depth: {config.depthRange}
                      </span>
                      <span className="text-slate-400 font-mono-math">
                        Pressure: {config.pressureAtm}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                      {config.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs font-bold text-amber-300 font-mono-math">
                      {unlockedCount} / {zoneCreatures.length}
                    </div>
                    <div className="text-[10px] text-slate-400">Species</div>
                  </div>

                  <div className="mt-2 flex items-center justify-end text-cyan-400 text-xs font-bold gap-0.5">
                    <span>{isCurrent ? 'Exploring' : 'Dive Here'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
