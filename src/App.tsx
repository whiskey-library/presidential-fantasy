import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Difficulty, GameState, Profile, Settings } from "./game/types";
import { ALL_EVENTS } from "./game/content";
import {
  chooseOption,
  clearToasts,
  continueAfterMidterm,
  continueAfterResult,
  createCareer,
  decisionSeconds,
  resolveElection,
} from "./game/engine";
import {
  clearSave,
  loadGame,
  loadSettings,
  recordHallOfFame,
  saveGame,
  saveSettings,
} from "./game/storage";
import {
  currentSession,
  getProfile,
  deleteProfile,
  listProfiles,
  migrateV1IfNeeded,
  recordCareerToProfile,
  signIn,
  signOut,
} from "./auth/local";
import { setSoundEnabled, sfxUnlock, sfxWhoosh } from "./game/sound";
import { hashSeed, todaySeed } from "./game/rng";
import { PERSONAS } from "./game/personas";

import ColdOpen from "./components/ColdOpen";
import SignInScreen from "./components/SignInScreen";
import HomeScreen from "./components/HomeScreen";
import Hud from "./components/Hud";
import EventCard from "./components/EventCard";
import ResultScreen from "./components/ResultScreen";
import MidtermScreen from "./components/MidtermScreen";
import ElectionScreen from "./components/ElectionScreen";
import EndScreen from "./components/EndScreen";
import Dashboard from "./components/Dashboard";
import LeaderboardScreen from "./components/LeaderboardScreen";
import SettingsSheet from "./components/SettingsSheet";
import AchievementToasts from "./components/AchievementToasts";

type Screen = "home" | "leaderboard";

export default function App() {
  const pool = ALL_EVENTS;

  const [booted, setBooted] = useState(false);
  const [coldOpen, setColdOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [game, setGame] = useState<GameState | null>(null);
  const [savedGame, setSavedGame] = useState<GameState | null>(null);
  const [screen, setScreen] = useState<Screen>("home");
  const [showDash, setShowDash] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const recordedRef = useRef(false);

  // ── Boot: migrate v1, restore session, cold open once per session ─────────
  useEffect(() => {
    migrateV1IfNeeded();
    setProfiles(listProfiles());
    const sid = currentSession();
    if (sid) {
      const p = getProfile(sid);
      if (p) {
        setProfile(p);
        setSavedGame(loadGame(p.id));
      }
    }
    try {
      if (!sessionStorage.getItem("pf:coldopen") && !loadSettings().fastBriefings) {
        setColdOpen(true);
        sessionStorage.setItem("pf:coldopen", "1");
      }
    } catch {
      /* ignore */
    }
    setBooted(true);
  }, []);

  // Sound + reduced-motion side effects.
  useEffect(() => {
    setSoundEnabled(settings.sound);
    document.documentElement.classList.toggle("reduced-motion", settings.reducedMotion);
    saveSettings(settings);
  }, [settings]);

  // Auto-save the live career.
  useEffect(() => {
    if (game && profile) saveGame(profile.id, game);
  }, [game, profile]);

  // Record a finished career exactly once: hall of fame + profile totals.
  useEffect(() => {
    if (!game || !profile) return;
    if (game.status === "gameover" || game.status === "victory") {
      if (!recordedRef.current) {
        recordedRef.current = true;
        recordHallOfFame(profile.id, game);
        const updated = recordCareerToProfile(profile, game);
        setProfile(updated);
        setProfiles(listProfiles());
        clearSave(profile.id);
        setSavedGame(null);
      }
    } else {
      recordedRef.current = false;
    }
  }, [game, profile]);

  // Achievement toasts: chime + auto-dismiss. Keyed on toast identity so
  // unrelated state transitions neither re-chime nor reset the timer.
  const toastKey = game ? game.pendingToasts.join("|") : "";
  useEffect(() => {
    if (!toastKey) return;
    sfxUnlock();
    const t = setTimeout(() => setGame((g) => (g ? clearToasts(g) : g)), 3400);
    return () => clearTimeout(t);
  }, [toastKey]);

  // ── Auth actions ───────────────────────────────────────────────────────────
  const handleSignIn = useCallback((profileId: string) => {
    const p = signIn(profileId);
    if (p) {
      setProfile(p);
      setSavedGame(loadGame(p.id));
      setScreen("home");
    }
    setProfiles(listProfiles());
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
    setProfile(null);
    setGame(null);
    setShowSettings(false);
    setProfiles(listProfiles());
  }, []);

  const handleDeleteProfile = useCallback((id: string) => {
    deleteProfile(id);
    setProfiles(listProfiles());
  }, []);

  // ── Career actions ─────────────────────────────────────────────────────────
  const start = useCallback(
    (name: string, personaId: string, difficulty: Difficulty) => {
      recordedRef.current = false;
      setShowDash(false);
      sfxWhoosh();
      setGame(createCareer(name, personaId, pool, difficulty, null));
    },
    [pool]
  );

  const startDaily = useCallback(() => {
    if (!profile) return;
    recordedRef.current = false;
    setShowDash(false);
    sfxWhoosh();
    const seed = todaySeed();
    const persona = PERSONAS[hashSeed(`PF-${seed}`) % PERSONAS.length];
    setGame(createCareer(profile.name, persona.id, pool, "normal", seed));
  }, [pool, profile]);

  const resume = useCallback(() => {
    if (savedGame) {
      recordedRef.current = false;
      setGame(savedGame);
    }
  }, [savedGame]);

  const choose = useCallback(
    (choiceId: string) => setGame((g) => (g ? chooseOption(g, pool, choiceId) : g)),
    [pool]
  );

  const next = useCallback(() => {
    sfxWhoosh();
    setGame((g) => (g ? continueAfterResult(g, pool) : g));
  }, [pool]);

  const afterMidterm = useCallback(
    () => setGame((g) => (g ? continueAfterMidterm(g, pool) : g)),
    [pool]
  );

  const backHome = useCallback(() => {
    setGame(null);
    setScreen("home");
    if (profile) setSavedGame(loadGame(profile.id));
  }, [profile]);

  const electionResult = useMemo(() => {
    if (game && game.status === "election") return resolveElection(game, pool);
    return null;
  }, [game, pool]);

  // ── Render ────────────────────────────────────────────────────────────────
  if (!booted) return null;
  if (coldOpen) return <ColdOpen onDone={() => setColdOpen(false)} />;

  if (!profile) {
    return (
      <SignInScreen profiles={profiles} onSignIn={handleSignIn} onDelete={handleDeleteProfile} />
    );
  }

  if (!game) {
    return (
      <>
        {screen === "home" ? (
          <HomeScreen
            profile={profile}
            savedGame={savedGame}
            onResume={resume}
            onStart={start}
            onStartDaily={startDaily}
            onLeaderboard={() => setScreen("leaderboard")}
            onSettings={() => setShowSettings(true)}
            eventCount={pool.length}
          />
        ) : (
          <LeaderboardScreen profile={profile} onBack={() => setScreen("home")} />
        )}
        {showSettings && (
          <SettingsSheet
            settings={settings}
            onChange={setSettings}
            onSignOut={handleSignOut}
            onClose={() => setShowSettings(false)}
          />
        )}
      </>
    );
  }

  const isPlaying = game.status === "playing" || game.status === "result";
  const timerSeconds = game.status === "playing" ? decisionSeconds(game, settings.timerOverride) : 0;

  return (
    <div className="app-shell">
      {isPlaying && <Hud game={game} onOpenDashboard={() => setShowDash(true)} />}

      <main className="stage">
        {game.status === "playing" && (
          <EventCard
            game={game}
            pool={pool}
            timerSeconds={timerSeconds}
            fastBriefings={settings.fastBriefings || settings.reducedMotion}
            onChoose={choose}
          />
        )}
        {game.status === "result" && <ResultScreen game={game} pool={pool} onContinue={next} />}
        {game.status === "midterm" && <MidtermScreen game={game} onContinue={afterMidterm} />}
        {game.status === "election" && electionResult && (
          <ElectionScreen
            game={game}
            result={electionResult}
            reducedMotion={settings.reducedMotion || settings.fastBriefings}
            onContinue={() => setGame(electionResult.state)}
          />
        )}
        {(game.status === "gameover" || game.status === "victory") && (
          <EndScreen
            game={game}
            onNewCareer={backHome}
            onLeaderboard={() => {
              setGame(null);
              setScreen("leaderboard");
            }}
          />
        )}
      </main>

      {showDash && <Dashboard game={game} onClose={() => setShowDash(false)} />}
      <AchievementToasts ids={game.pendingToasts} />
    </div>
  );
}
