import React, { useState } from 'react';
import { SeaCreature, DepthZone } from '../types/game';
import { sound } from '../utils/sound';
import { ZONE_CONFIGS } from '../data/marineCreatures';
import { Sparkles, Heart, Volume2, Info, Lock, ChevronRight, Award, Filter } from 'lucide-react';

interface AquariumSanctuaryProps {
  creatures: SeaCreature[];
  pearls: number;
  onFeedCreature: (creatureId: string) => void;
  onSelectZone: (zone: DepthZone) => void;
}

export const AquariumSanctuary: React.FC<AquariumSanctuaryProps> = ({
  creatures,
  pearls,
  onFeedCreature,
  onSelectZone,
}) => {
  const [selectedCreature, setSelectedCreature] = useState<SeaCreature | null>(
    creatures.find((c) => c.unlockedAt) || creatures[0]
  );
  const [filterZone, setFilterZone] = useState<string>('all');
  const [isReadingFact, setIsReadingFact] = useState<boolean>(false);

  const unlockedCount = creatures.filter((c) => c.unlockedAt).length;

  const filteredList = creatures.filter((c) => {
    if (filterZone === 'all') return true;
    return c.depthZone === filterZone;
  });

  const handleFeed = (creature: SeaCreature) => {
    sound.playFeedYum();
    sound.playBubblePop();
    onFeedCreature(creature.id);
  };

  // Text-to-speech for kids who are learning to read
  const handleReadFact = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    setIsReadingFact(true);
    utterance.onend = () => setIsReadingFact(false);
    utterance.onerror = () => setIsReadingFact(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-3 sm:px-4 py-2 sm:py-4">
      {/* Header Overview */}
      <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-cyan-500/30 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black font-game text-white flex items-center gap-2">
            <span>🪸</span> Children's Marine Sanctuary
          </h2>
          <p className="text-xs sm:text-sm text-cyan-200/80">
            Every math problem solved frees a sea creature into your personal sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-cyan-950/70 border border-cyan-500/40 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-white font-mono-math">
              {unlockedCount} / {creatures.length} Rescued
            </span>
          </div>

          <div className="bg-amber-950/70 border border-amber-500/40 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
            <span>⚪</span>
            <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono-math">
              {pearls} Pearls
            </span>
          </div>
        </div>
      </div>

      {/* Depth Zone Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <button
          onClick={() => setFilterZone('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filterZone === 'all'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          All Depths ({creatures.length})
        </button>
        {Object.entries(ZONE_CONFIGS).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setFilterZone(key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterZone === key
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {config.name.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Main Grid & Creature Inspector */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Side: Sea Creature Grid */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredList.map((creature) => {
            const isUnlocked = !!creature.unlockedAt;
            const isSelected = selectedCreature?.id === creature.id;

            return (
              <div
                key={creature.id}
                onClick={() => {
                  setSelectedCreature(creature);
                  sound.playBubblePop();
                }}
                className={`relative rounded-2xl p-3 text-center border-2 transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-amber-400 bg-slate-800/95 ring-2 ring-amber-400/30 -translate-y-1 shadow-lg'
                    : isUnlocked
                    ? 'border-cyan-500/30 bg-slate-900/80 hover:bg-slate-800/70 hover:border-cyan-400'
                    : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                {/* Emoji Avatar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-cyan-950/50 flex items-center justify-center text-3xl sm:text-4xl mb-2 relative">
                  {isUnlocked ? (
                    <span className="transform hover:scale-110 transition-transform">
                      {creature.emoji}
                    </span>
                  ) : (
                    <Lock className="w-6 h-6 text-slate-500" />
                  )}

                  {isUnlocked && creature.bioluminescence && (
                    <span className="absolute -top-1 -right-1 text-xs">✨</span>
                  )}
                </div>

                <div className="text-xs sm:text-sm font-bold text-white truncate font-game">
                  {isUnlocked ? creature.name : 'Unknown Specimen'}
                </div>

                <div className="text-[10px] text-cyan-300/80 truncate font-serif italic">
                  {isUnlocked ? creature.scientificName : 'Hidden in Deep'}
                </div>

                {isUnlocked && creature.feedCount > 0 && (
                  <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-rose-400 font-bold">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                    <span>Fed {creature.feedCount}x</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Detailed Scientific Profile Card */}
        <div className="md:col-span-5">
          {selectedCreature ? (
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-cyan-500/40 shadow-2xl relative sticky top-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                    {selectedCreature.rarity} Marine Organism
                  </div>
                  <h3 className="text-xl font-black font-game text-white">
                    {selectedCreature.name}
                  </h3>
                  <p className="text-xs font-serif italic text-cyan-300">
                    {selectedCreature.scientificName}
                  </p>
                </div>

                <div className="text-4xl p-2 bg-cyan-950/70 rounded-xl border border-cyan-500/30">
                  {selectedCreature.emoji}
                </div>
              </div>

              {/* Taxonomy Details Badge */}
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5 mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Kingdom:</span>
                  <span className="font-semibold text-slate-200">Animalia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phylum:</span>
                  <span className="font-semibold text-slate-200">{selectedCreature.phylum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Class:</span>
                  <span className="font-semibold text-slate-200">{selectedCreature.className}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Family:</span>
                  <span className="font-semibold text-slate-200">{selectedCreature.family}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Native Depth:</span>
                  <span className="font-semibold text-cyan-400">{selectedCreature.depthRange}</span>
                </div>
              </div>

              {/* Biological Fact & Text to Speech */}
              <div className="bg-cyan-950/40 rounded-xl p-3 border border-cyan-500/20 mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                    <span>🔬</span> Marine Science Discovery:
                  </span>
                  <button
                    onClick={() => handleReadFact(`${selectedCreature.name}. ${selectedCreature.biologyFact}`)}
                    aria-label="Read fact aloud"
                    className="p-1 rounded-md bg-cyan-900/50 text-cyan-300 hover:text-white hover:bg-cyan-800/60 transition-colors"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isReadingFact ? 'animate-bounce text-amber-300' : ''}`} />
                  </button>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedCreature.biologyFact}
                </p>
              </div>

              {/* Bioluminescence tag if applicable */}
              {selectedCreature.bioluminescence && (
                <div className="bg-indigo-950/60 rounded-xl p-2.5 border border-indigo-500/30 text-xs text-indigo-200 mb-3 flex items-start gap-2">
                  <span className="text-base">✨</span>
                  <div>
                    <span className="font-bold text-indigo-300">Bioluminescent Emission:</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {selectedCreature.bioluminescenceMechanism || 'Produces cold biological light to lure prey or camouflage silhouette.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions: Feed Creature or Dive to its native zone */}
              <div className="space-y-2 pt-1">
                {selectedCreature.unlockedAt ? (
                  <button
                    onClick={() => handleFeed(selectedCreature)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-game font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current text-rose-300" />
                    <span>Feed Shrimp Treats (+Heart)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectZone(selectedCreature.depthZone)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-game font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>Dive to {ZONE_CONFIGS[selectedCreature.depthZone]?.name.split(' (')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 rounded-2xl p-6 text-center text-slate-400">
              Select any marine creature to view its biology details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
