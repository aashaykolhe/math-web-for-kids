import React, { useState } from 'react';
import {
  FileText,
  Layers,
  Calendar,
  Smartphone,
  Cpu,
  BookOpen,
  CheckCircle,
  Copy,
  Check,
  Download,
  Share2,
} from 'lucide-react';

type DocSection = 'overview' | 'urd' | 'prd' | 'srd' | 'architecture' | 'sprints' | 'cross_platform' | 'science_matrix';

export const ProjectDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DocSection>('overview');
  const [copied, setCopied] = useState<boolean>(false);

  const sections: { id: DocSection; label: string; icon: string }[] = [
    { id: 'overview', label: 'Executive Summary', icon: '📋' },
    { id: 'urd', label: 'URD (User Requirements)', icon: '👤' },
    { id: 'prd', label: 'PRD (Product Requirements)', icon: '🎯' },
    { id: 'srd', label: 'SRD (System Requirements)', icon: '⚙️' },
    { id: 'architecture', label: 'Technical Architecture', icon: '🏗️' },
    { id: 'sprints', label: 'Sprint Timeline', icon: '⏱️' },
    { id: 'cross_platform', label: 'iOS & Android Specs', icon: '📱' },
    { id: 'science_matrix', label: 'Science & Math Matrix', icon: '🔬' },
  ];

  const handleCopyAll = () => {
    const text = document.getElementById('project-docs-container')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-3 sm:px-4 py-2 sm:py-4">
      {/* Top Banner */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-cyan-500/30 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-cyan-400">
            Project Specification & Engineering Blueprint
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-game text-white flex items-center gap-2">
            <span>📐</span> AquaMath Odyssey Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Complete URD, PRD, SRD, System Architecture, Mobile Specs, and Sprint Timeline.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md active:scale-95 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Specs!' : 'Copy Full Documentation'}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeSection === sec.id
                ? 'bg-amber-400 text-slate-950 shadow-md font-game'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <span>{sec.icon}</span>
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      {/* Documentation Content Area */}
      <div
        id="project-docs-container"
        className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-cyan-500/30 shadow-2xl text-slate-200 text-sm leading-relaxed space-y-6"
      >
        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>📋</span> Executive Summary & Refined Prompt Transformation
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                From informal concept to enterprise-grade pedagogical product design.
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-1">
                Original Input Prompt
              </h4>
              <blockquote className="italic text-slate-300 text-xs sm:text-sm border-l-2 border-amber-400 pl-3">
                "build a mini game for child to learn basic math skills through an interactive underwater treasure hunt theme where players solve equations to unlock chests filled with digital sea creatures. redine my input prompt in structure urd, prd and srd and other all doc and plan the development architecture, sprint timeline, and technical specifications for this project. and ensure the app is compatible with both iOS and Android platforms."
              </blockquote>
            </div>

            <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-500/30">
              <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-300 mb-2">
                Refined Prompt & Product Definition
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm">
                <strong>AquaMath Odyssey</strong> is an offline-capable, cross-platform (iOS Safari PWA & Android Chrome PWA) educational STEM adventure. It blends early elementary mathematics curriculum (Common Core K-4: addition, subtraction, multiplication, division, visual grouping) with real oceanographic science (bathymetric depth zones, taxonomic classification, and biological adaptations like bioluminescence and chemosynthesis). Children solve procedurally generated math problems to turn lock dials, open glowing treasure chests, and collect living specimens for their personalized Marine Sanctuary.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Core Target Audience</span>
                <span className="text-sm font-game text-white font-bold">Ages 4 – 11 (K – 4th Grade)</span>
                <p className="text-[11px] text-slate-400 mt-1">Adaptive scaffolding from counting pearls to multi-digit times tables.</p>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block mb-1">Pedagogical Framework</span>
                <span className="text-sm font-game text-white font-bold">CPA & Common Core</span>
                <p className="text-[11px] text-slate-400 mt-1">Concrete-Pictorial-Abstract visual aids with immediate reinforcement.</p>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Platform Delivery</span>
                <span className="text-sm font-game text-white font-bold">Cross-Platform PWA</span>
                <p className="text-[11px] text-slate-400 mt-1">Zero-install instant play, offline audio synthesis, iOS/Android touch ready.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: URD */}
        {activeSection === 'urd' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>👤</span> URD: User Requirements Document
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                User personas, user stories with Gherkin acceptance criteria, and accessibility mandates.
              </p>
            </div>

            {/* Personas */}
            <div>
              <h4 className="text-base font-bold text-white mb-3">1. Target Personas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">👦</span>
                    <div>
                      <h5 className="font-bold text-white text-sm">Persona A: Leo (Age 6, 1st Grade)</h5>
                      <span className="text-[11px] text-cyan-400">Emerging Math Learner</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                    <li>Needs visual aids (pearl counters) because abstract numbers alone can feel intimidating.</li>
                    <li>Highly motivated by animal collecting, sound effects, and bright visual feedback.</li>
                    <li>Easily discouraged by punitive "game over" screens; needs gentle encouraging retries.</li>
                  </ul>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">👧</span>
                    <div>
                      <h5 className="font-bold text-white text-sm">Persona B: Maya (Age 9, 3rd Grade)</h5>
                      <span className="text-[11px] text-amber-400">Multiplication Explorer</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                    <li>Practicing times tables and division facts for school mastery.</li>
                    <li>Loves deep sea mysteries (Mariana Trench, giant squids, bioluminescence).</li>
                    <li>Desires agency to choose deeper, darker ocean zones for greater challenge.</li>
                  </ul>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">👩‍👧</span>
                    <div>
                      <h5 className="font-bold text-white text-sm">Persona C: Sarah (Parent / Guardian)</h5>
                      <span className="text-[11px] text-emerald-400">Educational Gatekeeper</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                    <li>Requires 100% ad-free, zero-tracking, zero-in-app-purchase environment (COPPA compliant).</li>
                    <li>Values factual STEM content (authentic Latin taxonomy rather than cartoon trivia).</li>
                    <li>Wants an app that works during airplane travel or road trips with no Wi-Fi.</li>
                  </ul>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">👨‍🏫</span>
                    <div>
                      <h5 className="font-bold text-white text-sm">Persona D: Mr. Gomez (2nd Grade Teacher)</h5>
                      <span className="text-[11px] text-indigo-400">Classroom Educator</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                    <li>Needs alignment to Common Core math standards (K.OA, 1.OA, 2.OA, 3.OA).</li>
                    <li>Requires read-aloud support for ESL and early-reader students via Web Speech API.</li>
                    <li>Wants seamless tablet touch capability on both school iPads and Android Chromebooks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Stories */}
            <div>
              <h4 className="text-base font-bold text-white mb-2">2. User Stories & Acceptance Criteria</h4>
              <div className="space-y-2.5">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="font-bold text-amber-300 block mb-1">
                    US-01: Solving Math to Unlock Chests
                  </span>
                  <p className="text-slate-300 mb-1">
                    <em>As a young child</em>, I want to tap answer bubbles to open a glowing treasure chest, so that I feel like an ocean explorer unlocking real rewards.
                  </p>
                  <p className="text-slate-400 font-mono-math text-[11px]">
                    <strong>Scenario:</strong> Given a math equation with 4 bubble options, When I tap the correct option, Then a key inserts into the chest with a fanfare sound and haptic vibration, and after 3 keys, the chest unlocks.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="font-bold text-cyan-300 block mb-1">
                    US-02: Visual Pearl Counters for Scaffolding
                  </span>
                  <p className="text-slate-300 mb-1">
                    <em>As a visual learner</em>, I want to see groups of pearls representing each number, so that I can physically count them if I cannot do mental math yet.
                  </p>
                  <p className="text-slate-400 font-mono-math text-[11px]">
                    <strong>Scenario:</strong> Given the problem "4 + 3", When the Visual Counter is enabled, Then two distinct boxes render 4 cyan pearls and 3 amber pearls respectively, which bounce when tapped.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="font-bold text-emerald-300 block mb-1">
                    US-03: Real Marine Science & Read-Aloud
                  </span>
                  <p className="text-slate-300 mb-1">
                    <em>As an inquisitive child</em>, I want to hear how my rescued creature survives in the deep sea, so that I learn biology while playing.
                  </p>
                  <p className="text-slate-400 font-mono-math text-[11px]">
                    <strong>Scenario:</strong> Given an unlocked Anglerfish in my sanctuary, When I tap the speaker icon, Then the browser reads its bioluminescence facts out loud via speech synthesis.
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider font-bold text-purple-400 mb-1">
                Accessibility Mandates (WCAG 2.1 AA)
              </h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Minimum touch target size ≥ 48 × 48 px across all phone and tablet screens.</li>
                <li>Zero color-only signaling: all correct/incorrect states pair color with distinct icons and sound cues.</li>
                <li>Built-in Web Speech API read-aloud support for pre-readers and visually impaired users.</li>
                <li>Mute switch that remembers user preference and stops all audio synthesis immediately.</li>
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 3: PRD */}
        {activeSection === 'prd' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>🎯</span> PRD: Product Requirements Document
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                Product vision, functional requirements, feature hierarchy, and Common Core curriculum alignment.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-500/20">
              <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-300 mb-1">Product Vision</h4>
              <p className="text-xs sm:text-sm text-slate-200">
                To transform elementary arithmetic from an anxiety-inducing chore into an exhilarating deep-sea discovery expedition, sparking a lifelong love for both mathematics and oceanographic natural sciences.
              </p>
            </div>

            {/* Feature Hierarchy Matrix */}
            <div>
              <h4 className="text-base font-bold text-white mb-2">Feature Prioritization Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-slate-300">
                      <th className="p-2 font-bold">Priority</th>
                      <th className="p-2 font-bold">Feature Name</th>
                      <th className="p-2 font-bold">Module</th>
                      <th className="p-2 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-2"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">P0</span></td>
                      <td className="p-2 font-bold text-white">Dynamic Math Generator</td>
                      <td className="p-2 text-cyan-400">Math Engine</td>
                      <td className="p-2 text-slate-300">Generates +, -, ×, ÷ with age-adaptive boundaries and distractors.</td>
                    </tr>
                    <tr>
                      <td className="p-2"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">P0</span></td>
                      <td className="p-2 font-bold text-white">Interactive Treasure Chest</td>
                      <td className="p-2 text-amber-400">Core UI</td>
                      <td className="p-2 text-slate-300">Multi-lock dial with wobble, radiance, and celebratory burst.</td>
                    </tr>
                    <tr>
                      <td className="p-2"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">P0</span></td>
                      <td className="p-2 font-bold text-white">Marine Biology Taxonomy</td>
                      <td className="p-2 text-emerald-400">Science Skill</td>
                      <td className="p-2 text-slate-300">16 authentic species across 5 bathymetric zones with Latin names.</td>
                    </tr>
                    <tr>
                      <td className="p-2"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">P1</span></td>
                      <td className="p-2 font-bold text-white">Procedural Web Audio Engine</td>
                      <td className="p-2 text-cyan-400">Audio</td>
                      <td className="p-2 text-slate-300">Zero-asset synthesizer for bubbles, chest chimes, sonar, and fanfares.</td>
                    </tr>
                    <tr>
                      <td className="p-2"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">P1</span></td>
                      <td className="p-2 font-bold text-white">Visual Pearl Counters</td>
                      <td className="p-2 text-indigo-400">Pedagogy</td>
                      <td className="p-2 text-slate-300">CPA interactive counter with touch bounce for dyscalculia support.</td>
                    </tr>
                    <tr>
                      <td className="p-2"><span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">P2</span></td>
                      <td className="p-2 font-bold text-white">Web Speech Read-Aloud</td>
                      <td className="p-2 text-purple-400">Accessibility</td>
                      <td className="p-2 text-slate-300">Synthesizes spoken audio for marine facts and adaptations.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Curriculum Alignment */}
            <div>
              <h4 className="text-base font-bold text-white mb-2">Curriculum Mapping (Common Core Standards)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400">CCSS.MATH.CONTENT.K.OA.A.1 & A.2</span>
                  <p className="text-slate-300 mt-1">Represent addition and subtraction with objects, fingers, mental images, drawings, and sounds.</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400">CCSS.MATH.CONTENT.1.OA.C.6</span>
                  <p className="text-slate-300 mt-1">Add and subtract within 20, demonstrating fluency for addition and subtraction within 10.</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400">CCSS.MATH.CONTENT.2.OA.B.2</span>
                  <p className="text-slate-300 mt-1">Fluently add and subtract within 20 using mental strategies. By end of Grade 2, know from memory all sums of two one-digit numbers.</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400">CCSS.MATH.CONTENT.3.OA.C.7</span>
                  <p className="text-slate-300 mt-1">Fluently multiply and divide within 100, using relationship between multiplication and division.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: SRD */}
        {activeSection === 'srd' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>⚙️</span> SRD: System Requirements Document
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                Non-functional requirements, data schemas, performance thresholds, and security compliance.
              </p>
            </div>

            {/* Performance Thresholds */}
            <div>
              <h4 className="text-base font-bold text-white mb-2">1. Non-Functional Performance Thresholds</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl font-bold font-mono-math text-emerald-400">60 FPS</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Animation Frame Rate</div>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl font-bold font-mono-math text-cyan-400">&lt; 50 ms</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Touch-to-Audio Latency</div>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl font-bold font-mono-math text-amber-400">&lt; 250 KB</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Gzipped Bundle Size</div>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl font-bold font-mono-math text-purple-400">100%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Offline Availability</div>
                </div>
              </div>
            </div>

            {/* Storage Schema */}
            <div>
              <h4 className="text-base font-bold text-white mb-2">2. LocalStorage Persistence Schema</h4>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono-math text-xs text-cyan-300 overflow-x-auto">
                <pre>{`interface PersistentAppState {
  version: 1;
  pearls: number;                       // e.g. 145
  streak: number;                       // e.g. 4
  totalSolved: number;                  // e.g. 38
  currentZone: 'sunlight' | 'twilight' | 'midnight' | 'abyss' | 'hadal';
  gradeLevel: 'kindergarten' | 'early_elementary' | 'advanced_math';
  soundMuted: boolean;
  unlockedCreatureIds: string[];        // ['clownfish', 'anglerfish', ...]
  feedCounts: Record<string, number>;   // { 'clownfish': 3 }
}`}</pre>
              </div>
            </div>

            {/* Privacy & COPPA Compliance */}
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-1">
                Child Privacy & COPPA Compliance
              </h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Zero Personally Identifiable Information (PII) collected or transmitted.</li>
                <li>No third-party analytics trackers, cookies, or advertising SDKs.</li>
                <li>All game states and unlocked creatures remain strictly sandboxed on the client device.</li>
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 5: ARCHITECTURE */}
        {activeSection === 'architecture' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>🏗️</span> Technical Architecture & System Design
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                Modular software topology, unidirectional state flow, and procedural audio pipeline.
              </p>
            </div>

            {/* Component Hierarchy */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-400 mb-2">
                React Component Hierarchy
              </h4>
              <div className="font-mono-math text-xs space-y-1 text-slate-300">
                <div className="text-amber-300">App.tsx (Root State, Tabs, LocalStorage Sync)</div>
                <div className="pl-4">├── UnderwaterBackground.tsx (Animated Depth Gradient & Bubbles)</div>
                <div className="pl-4">├── CrossPlatformBar.tsx (Header, Mobile Navigation & Install PWA)</div>
                <div className="pl-4">├── MathChestGame.tsx (Primary Game Loop)</div>
                <div className="pl-8">├── VisualMathCounter.tsx (CPA Pedagogical Scaffolding)</div>
                <div className="pl-8">└── UnlockedCreatureModal.tsx (Celebration & Science Card)</div>
                <div className="pl-4">├── AquariumSanctuary.tsx (Digital Marine Terrarium & Feed Engine)</div>
                <div className="pl-4">├── ExpeditionMap.tsx (Bathymetric Ladder Navigation)</div>
                <div className="pl-4">└── ProjectDocs.tsx (Live Specification & Architecture Suite)</div>
              </div>
            </div>

            {/* Data Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <h5 className="font-bold text-amber-400 text-xs uppercase mb-1">Math Engine Pipeline</h5>
                <ol className="text-xs text-slate-300 space-y-1 list-decimal pl-4">
                  <li>User selects grade level or default is initialized.</li>
                  <li><code>generateMathProblem()</code> selects operator and operands.</li>
                  <li>Generates 3 plausible distractor answers avoiding duplicate options.</li>
                  <li>Generates underwater narrative story and visual counter model.</li>
                  <li>Emits state to <code>MathChestGame</code> for rendering.</li>
                </ol>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <h5 className="font-bold text-cyan-400 text-xs uppercase mb-1">Web Audio Synthesis Pipeline</h5>
                <ol className="text-xs text-slate-300 space-y-1 list-decimal pl-4">
                  <li>Single lazy-instantiated <code>AudioContext</code> singleton.</li>
                  <li>Resumes context upon first user gesture (Safari requirement).</li>
                  <li>Procedural oscillator nodes (sine/triangle/sawtooth) generate chirps.</li>
                  <li>Gain nodes shape envelopes with exponential volume decay.</li>
                  <li>Instant zero-latency execution with 0 bytes network transfer.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: SPRINTS */}
        {activeSection === 'sprints' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>⏱️</span> Sprint Timeline & Milestone Plan
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                Four 2-week agile sprints delivering an end-to-end production-grade educational game.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950/70 p-4 rounded-xl border-l-4 border-cyan-400 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-white text-sm font-game">Sprint 1: Core Math Engine & Chest Mechanics</h4>
                  <span className="text-[11px] font-mono-math text-cyan-400 font-bold">Weeks 1 – 2</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li>Implement dynamic math problem generator with K-4 difficulty curve.</li>
                  <li>Build interactive SVG treasure chest with lock key slots.</li>
                  <li>Develop Web Audio API procedural synthesizer (bubble pop, chest unlock).</li>
                  <li>Validate responsive touch buttons with zero delay.</li>
                </ul>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border-l-4 border-amber-400 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-white text-sm font-game">Sprint 2: Marine Biology Taxonomy & Sanctuary</h4>
                  <span className="text-[11px] font-mono-math text-amber-400 font-bold">Weeks 3 – 4</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li>Curate 16 marine species with verified Latin scientific classification.</li>
                  <li>Implement 5 bathymetric ocean zones with custom water shaders.</li>
                  <li>Build the Children's Marine Sanctuary with interactive creature feeding.</li>
                  <li>Integrate Web Speech API for auditory reading of science facts.</li>
                </ul>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border-l-4 border-emerald-400 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-white text-sm font-game">Sprint 3: iOS & Android Cross-Platform Hardening</h4>
                  <span className="text-[11px] font-mono-math text-emerald-400 font-bold">Weeks 5 – 6</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li>Configure PWA Web App Manifest, app icons, and offline caching.</li>
                  <li>Handle iOS Safari safe area insets (`env(safe-area-inset-top)`).</li>
                  <li>Implement `navigator.vibrate` haptic triggers for tactile feedback.</li>
                  <li>Optimize battery and GPU consumption during bubble particle loops.</li>
                </ul>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border-l-4 border-purple-400 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-white text-sm font-game">Sprint 4: Accessibility, Polish & Documentation</h4>
                  <span className="text-[11px] font-mono-math text-purple-400 font-bold">Weeks 7 – 8</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li>Embed full in-app Project Specs Suite (URD, PRD, SRD, Architecture).</li>
                  <li>Perform WCAG 2.1 AA accessibility audit on contrast and focus states.</li>
                  <li>Add Dyscalculia visual scaffolding (touch-to-bounce pearl counters).</li>
                  <li>Final QA testing across iOS 15-18 and Android 10-15 mobile devices.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: CROSS PLATFORM */}
        {activeSection === 'cross_platform' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>📱</span> Cross-Platform iOS & Android Technical Specifications
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                Ensuring seamless, native-grade experience across mobile Safari, Android Chrome, and tablets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* iOS Specifications */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2 text-cyan-300 font-bold">
                  <span>🍎</span> iOS Safari & WebKit Compatibility
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li>
                    <strong className="text-white">AudioContext Unlock:</strong> iOS blocks Web Audio until an explicit user touch event. The sound engine attaches to initial button click to call <code>ctx.resume()</code>.
                  </li>
                  <li>
                    <strong className="text-white">Safe Area Insets:</strong> Uses CSS variables <code>env(safe-area-inset-top)</code> and <code>env(safe-area-inset-bottom)</code> to prevent notch and home indicator clipping.
                  </li>
                  <li>
                    <strong className="text-white">Double-Tap Zoom Lock:</strong> Configured <code>touch-action: manipulation</code> on all controls to prevent 300ms click delay and accidental zoom.
                  </li>
                  <li>
                    <strong className="text-white">PWA Full Screen:</strong> Meta tags <code>apple-mobile-web-app-capable: yes</code> and <code>apple-mobile-web-app-status-bar-style: black-translucent</code>.
                  </li>
                </ul>
              </div>

              {/* Android Specifications */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold">
                  <span>🤖</span> Android Chrome & WebAPK Compatibility
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li>
                    <strong className="text-white">Haptic Feedback:</strong> Integrates <code>navigator.vibrate([40, 60, 40])</code> on correct answers and <code>navigator.vibrate(150)</code> on errors for physical feedback.
                  </li>
                  <li>
                    <strong className="text-white">Web App Manifest:</strong> Standalone display mode with 192x192 and 512x512 maskable SVG icons for home screen installation.
                  </li>
                  <li>
                    <strong className="text-white">Dynamic Theme Color:</strong> Matches Android navigation and status bar to ocean theme (<code>#032541</code>).
                  </li>
                  <li>
                    <strong className="text-white">Hardware Acceleration:</strong> Uses CSS 3D transforms (`translateZ(0)`) for smooth 60fps bubble animation on budget Android devices.
                  </li>
                </ul>
              </div>
            </div>

            {/* Touch Target Standards */}
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-1">
                Touch Target & Mobile Ergonomics Standards
              </h4>
              <p className="text-xs text-slate-300">
                Children's motor coordination requires generous touch targets. Every interactive key in AquaMath Odyssey satisfies the Apple Human Interface Guidelines and Google Material Design standard of <strong>minimum 48×48 dp/pt</strong>, with large visual hit states, active scale animations, and instantaneous haptic/audio confirmation.
              </p>
            </div>
          </div>
        )}

        {/* SECTION 8: SCIENCE & MATH MATRIX */}
        {activeSection === 'science_matrix' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-black font-game text-white flex items-center gap-2">
                <span>🔬</span> Marine Science Taxonomy & Math Curriculum Matrix
              </h3>
              <p className="text-xs text-cyan-300 mt-1">
                Detailed scientific verification of digital sea creatures across ocean depth layers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/60 text-slate-300">
                    <th className="p-2 font-bold">Depth Zone</th>
                    <th className="p-2 font-bold">Common Name</th>
                    <th className="p-2 font-bold font-serif italic">Scientific Taxon</th>
                    <th className="p-2 font-bold">Biological Adaptation</th>
                    <th className="p-2 font-bold">Math Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-2 font-bold text-cyan-300">Sunlight (0-200m)</td>
                    <td className="p-2 text-white">Ocellaris Clownfish</td>
                    <td className="p-2 text-cyan-300 font-serif italic">Amphiprion ocellaris</td>
                    <td className="p-2 text-slate-300">Polysaccharide skin mucus prevents sea anemone stings.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Sums to 10</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-cyan-300">Sunlight (0-200m)</td>
                    <td className="p-2 text-white">Green Sea Turtle</td>
                    <td className="p-2 text-cyan-300 font-serif italic">Chelonia mydas</td>
                    <td className="p-2 text-slate-300">Geomagnetic navigation senses Earth's magnetic lines.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Basic subtraction</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-300">Twilight (200-1000m)</td>
                    <td className="p-2 text-white">Lanternfish</td>
                    <td className="p-2 text-indigo-300 font-serif italic">Benthosema glaciale</td>
                    <td className="p-2 text-slate-300">Ventral photophores for counter-illumination camouflage.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Doubles & 1-20</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-300">Twilight (200-1000m)</td>
                    <td className="p-2 text-white">Giant Squid</td>
                    <td className="p-2 text-indigo-300 font-serif italic">Architeuthis dux</td>
                    <td className="p-2 text-slate-300">27cm diameter eyes to detect faint sperm whale bioluminescence.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Sums to 50</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-purple-300">Midnight (1000-4000m)</td>
                    <td className="p-2 text-white">Humpback Anglerfish</td>
                    <td className="p-2 text-purple-300 font-serif italic">Melanocetus johnsonii</td>
                    <td className="p-2 text-slate-300">Symbiotic Photobacterium bacteria in glowing esca lure.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Multiplication (2-5)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-purple-300">Midnight (1000-4000m)</td>
                    <td className="p-2 text-white">Vampire Squid</td>
                    <td className="p-2 text-purple-300 font-serif italic">Vampyroteuthis infernalis</td>
                    <td className="p-2 text-slate-300">Expels glowing bioluminescent mucus cloud to distract predators.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Multiplication (6-10)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-rose-300">Abyss (4000-6000m)</td>
                    <td className="p-2 text-white">Hydrothermal Tubeworm</td>
                    <td className="p-2 text-rose-300 font-serif italic">Riftia pachyptila</td>
                    <td className="p-2 text-slate-300">Chemosynthesis: sulfur-oxidizing bacteria create food from H₂S.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Division facts</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-amber-300">Hadal (6000-11000m)</td>
                    <td className="p-2 text-white">Mariana Snailfish</td>
                    <td className="p-2 text-amber-300 font-serif italic">Pseudoliparis swirei</td>
                    <td className="p-2 text-slate-300">High TMAO osmolyte prevents 1000 atm pressure from warping proteins.</td>
                    <td className="p-2 text-amber-300 font-mono-math">Master Equations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
