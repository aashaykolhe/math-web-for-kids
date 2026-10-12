/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DepthZone, GradeLevel, SeaCreature } from './types/game';
import { INITIAL_SEA_CREATURES } from './data/marineCreatures';
import { UnderwaterBackground } from './components/UnderwaterBackground';
import { CrossPlatformBar } from './components/CrossPlatformBar';
import { MathChestGame } from './components/MathChestGame';
import { AquariumSanctuary } from './components/AquariumSanctuary';
import { ExpeditionMap } from './components/ExpeditionMap';
import { ProjectDocs } from './components/ProjectDocs';

const STORAGE_KEY = 'aquamath_odyssey_save_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'game' | 'aquarium' | 'map' | 'docs'>('game');
  const [currentZone, setCurrentZone] = useState<DepthZone>('sunlight');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('early_elementary');
  const [pearls, setPearls] = useState<number>(25);
  const [streak, setStreak] = useState<number>(0);

  // Initialize creatures from LocalStorage or defaults
  const [creatures, setCreatures] = useState<SeaCreature[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedMap) {
          return INITIAL_SEA_CREATURES.map((creature) => {
            const isUnlocked = parsed.unlockedMap[creature.id];
            const feedCount = parsed.feedCounts?.[creature.id] || 0;
            return {
              ...creature,
              unlockedAt: isUnlocked ? Date.now() : undefined,
              feedCount,
            };
          });
        }
      }
    } catch {
      // Fallback
    }

    // Default: clownfish unlocked as starter companion
    return INITIAL_SEA_CREATURES.map((c) =>
      c.id === 'clownfish' ? { ...c, unlockedAt: Date.now() } : c
    );
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      const unlockedMap: Record<string, boolean> = {};
      const feedCounts: Record<string, number> = {};
      creatures.forEach((c) => {
        if (c.unlockedAt) unlockedMap[c.id] = true;
        if (c.feedCount > 0) feedCounts[c.id] = c.feedCount;
      });

      const payload = {
        pearls,
        streak,
        gradeLevel,
        currentZone,
        unlockedMap,
        feedCounts,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore quota errors
    }
  }, [creatures, pearls, streak, gradeLevel, currentZone]);

  const handleCreatureUnlocked = (unlocked: SeaCreature) => {
    setCreatures((prev) =>
      prev.map((c) => (c.id === unlocked.id ? { ...c, unlockedAt: Date.now() } : c))
    );
  };

  const handlePearlsEarned = (amount: number) => {
    setPearls((prev) => prev + amount);
  };

  const handleFeedCreature = (creatureId: string) => {
    if (pearls < 2) return; // Costs 2 pearls to feed
    setPearls((prev) => Math.max(0, prev - 2));
    setCreatures((prev) =>
      prev.map((c) => (c.id === creatureId ? { ...c, feedCount: c.feedCount + 1 } : c))
    );
  };

  const handleSelectZone = (zone: DepthZone) => {
    setCurrentZone(zone);
    setCurrentTab('game'); // Take child straight to treasure hunt at that depth
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 overflow-x-hidden">
      {/* Dynamic Animated Underwater Backdrop */}
      <UnderwaterBackground zone={currentZone} />

      {/* Top Navigation & Applet Controls */}
      <CrossPlatformBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        gradeLevel={gradeLevel}
        onChangeGradeLevel={setGradeLevel}
        pearls={pearls}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-start pb-safe pt-2">
        {currentTab === 'game' && (
          <MathChestGame
            currentZone={currentZone}
            gradeLevel={gradeLevel}
            availableCreatures={creatures}
            onCreatureUnlocked={handleCreatureUnlocked}
            onPearlsEarned={handlePearlsEarned}
            pearls={pearls}
            streak={streak}
            setStreak={setStreak}
          />
        )}

        {currentTab === 'aquarium' && (
          <AquariumSanctuary
            creatures={creatures}
            pearls={pearls}
            onFeedCreature={handleFeedCreature}
            onSelectZone={handleSelectZone}
          />
        )}

        {currentTab === 'map' && (
          <ExpeditionMap
            currentZone={currentZone}
            creatures={creatures}
            onSelectZone={handleSelectZone}
          />
        )}

        {currentTab === 'docs' && <ProjectDocs />}
      </main>

      {/* Bottom Floating Mobile Bar for Fast Quick-Switch */}
      <footer className="w-full bg-slate-950/80 backdrop-blur-md border-t border-cyan-500/20 py-2 px-4 text-center text-xs text-cyan-300/80 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
          <span>🌊</span>
          <span>Ocean Depth: <strong>{currentZone.toUpperCase()}</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentTab('docs');
            }}
            className="text-[11px] sm:text-xs text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
          >
            📋 View System Architecture & PRD/URD/SRD
          </button>
        </div>
      </footer>
    </div>
  );
}
