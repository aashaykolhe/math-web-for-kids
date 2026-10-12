import React, { useState, useEffect } from 'react';
import { GradeLevel } from '../types/game';
import { sound } from '../utils/sound';
import {
  Compass,
  Trophy,
  BookOpen,
  Download,
  Settings,
  Share2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface CrossPlatformBarProps {
  currentTab: 'game' | 'aquarium' | 'map' | 'docs';
  onSelectTab: (tab: 'game' | 'aquarium' | 'map' | 'docs') => void;
  gradeLevel: GradeLevel;
  onChangeGradeLevel: (level: GradeLevel) => void;
  pearls: number;
}

export const CrossPlatformBar: React.FC<CrossPlatformBarProps> = ({
  currentTab,
  onSelectTab,
  gradeLevel,
  onChangeGradeLevel,
  pearls,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [showInstallGuide, setShowInstallGuide] = useState<boolean>(false);
  const [showGradeMenu, setShowGradeMenu] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstallGuide(true);
    }
  };

  const gradeLabels: Record<GradeLevel, string> = {
    kindergarten: 'Ages 4-6 (K-1st)',
    early_elementary: 'Ages 6-8 (1st-2nd)',
    advanced_math: 'Ages 8-11 (3rd-4th)',
    custom: 'Custom Math',
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 pt-safe px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Title */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => {
            sound.playBubblePop();
            onSelectTab('game');
          }}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg sm:text-xl">
              🐡
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black font-game text-white tracking-wide leading-tight">
              AquaMath <span className="text-amber-400">Odyssey</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-cyan-300 hidden sm:block">
              Underwater Math & Marine Science
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              sound.playBubblePop();
              onSelectTab('game');
            }}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'game'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-game'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>🗝️</span>
            <span className="hidden xs:inline">Treasure Hunt</span>
          </button>

          <button
            onClick={() => {
              sound.playBubblePop();
              onSelectTab('aquarium');
            }}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'aquarium'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-game'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>🪸</span>
            <span className="hidden xs:inline">Sanctuary</span>
          </button>

          <button
            onClick={() => {
              sound.playSonarPing();
              onSelectTab('map');
            }}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'map'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md font-game'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Depth Map</span>
          </button>

          <button
            onClick={() => {
              sound.playBubblePop();
              onSelectTab('docs');
            }}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'docs'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-game'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Docs & Arch</span>
            <span className="sm:hidden">Docs</span>
          </button>
        </nav>

        {/* Right Tools: Math Level Selector & Mobile Install */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Grade Level Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowGradeMenu(!showGradeMenu)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
            >
              <span className="hidden md:inline">Math: </span>
              <span className="text-white">{gradeLabels[gradeLevel].split(' (')[0]}</span>
              <ChevronDown className="w-3 h-3 text-cyan-400" />
            </button>

            {showGradeMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-cyan-500/40 rounded-2xl p-1.5 shadow-2xl z-50 text-xs">
                {(['kindergarten', 'early_elementary', 'advanced_math'] as GradeLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      onChangeGradeLevel(lvl);
                      setShowGradeMenu(false);
                      sound.playBubblePop();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium ${
                      gradeLevel === lvl
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {gradeLabels[lvl]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Install PWA Button */}
          <button
            onClick={handleInstallClick}
            title="Install App for iOS / Android"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Install PWA</span>
          </button>
        </div>
      </div>

      {/* iOS / Android Install Guide Modal */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-5 max-w-sm w-full text-center shadow-2xl space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-2xl">
              📲
            </div>
            <h3 className="text-lg font-bold text-white font-game">Install AquaMath Odyssey</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Play completely offline on iPad, iPhone, and Android devices:
            </p>

            <div className="bg-slate-950 p-3 rounded-xl text-left text-xs space-y-2 border border-slate-800">
              <div>
                <strong className="text-cyan-400">iOS (Safari):</strong>
                <p className="text-slate-300">Tap the Share icon <Share2 className="w-3 h-3 inline mx-0.5" /> and select <strong>"Add to Home Screen"</strong>.</p>
              </div>
              <div className="border-t border-slate-800 pt-1.5">
                <strong className="text-emerald-400">Android (Chrome):</strong>
                <p className="text-slate-300">Tap the 3 dots menu and choose <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong>.</p>
              </div>
            </div>

            <button
              onClick={() => setShowInstallGuide(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
