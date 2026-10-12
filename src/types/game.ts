export type DepthZone = 'sunlight' | 'twilight' | 'midnight' | 'abyss' | 'hadal';

export type GradeLevel = 'kindergarten' | 'early_elementary' | 'advanced_math' | 'custom';

export type MathOperator = '+' | '-' | '×' | '÷';

export interface SeaCreature {
  id: string;
  name: string;
  scientificName: string;
  phylum: string;
  className: string;
  family: string;
  depthRange: string;
  depthZone: DepthZone;
  description: string;
  biologyFact: string;
  adaptation: string;
  bioluminescence: boolean;
  bioluminescenceMechanism?: string;
  emoji: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  unlockedAt?: number;
  feedCount: number;
}

export interface MathProblem {
  id: string;
  num1: number;
  num2: number;
  operator: MathOperator;
  answer: number;
  options: number[];
  hint: string;
  storyContext: string;
  visualCount1: number;
  visualCount2: number;
  visualType: 'pearl' | 'starfish' | 'shell' | 'jelly';
}

export interface ChestState {
  id: string;
  zone: DepthZone;
  level: number;
  requiredKeys: number;
  collectedKeys: number;
  isUnlocked: boolean;
  rewardCreatureId: string;
  pearlBonus: number;
}

export interface ZoneConfig {
  id: DepthZone;
  name: string;
  depthRange: string;
  bgGradient: string;
  waterColor: string;
  particleType: 'sunray' | 'plankton' | 'biolum' | 'vent';
  description: string;
  ambientLight: string;
  pressureAtm: string;
}
