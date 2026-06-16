import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GameState, HallOfFameEntry } from "./game/types";
import { ALL_EVENTS } from "./game/content";
import {
  chooseOption,
  clearToasts,
  continueAfterResult,
  createCareer,
  resolveElection,
} from "./game/engine";
import {
  clearSave,
  loadGame,
  loadHallOfFame,
  recordHallOfFame,
  saveGame,
} from "./game/storage";

import StartScreen from "./components/StartScreen";
import Hud from "./components/Hud";
import EventCard from "./components/EventCard";
import ResultScreen from "./components/ResultScreen";
import ElectionScreen from "./components/ElectionScreen";
import EndScreen from "./components/EndScreen";
import Dashboard from "./components/Dashboard";
import AchievementToasts from "./components/AchievementToasts";

export default function App() {
  const pool = ALL_EVENTS;
  const [game, setGame] = useState<GameState | null>(null);
  const [savedGame, setSavedGame] = useState<GameState | null>(null);
  const [hof, setHof] = useState<HallOfFameEntry[]>([]);
  const [showDash, setShowDash] = useState(false);
  const recordedRef = useRef(false);

  // Load any in-progress career + the hall of fame once on boot.
  useEffect(() => {
    setSavedGame(loadGame());
    setHof(loadHallOfFame());
  }, []);

  // Auto-save the live career.
  useEffect(() => {
    if (game) saveGame(game);
  }, [game]);

  // Record a finished career to the hall of fame exactly once.
  useEffect(() => {
    if (!game) return;
    if (game.status === "gameover" || game.status === "victory") {
      if (!recordedRef.current) {
        recordedRef.current = true;
        setHof(recordHallOfFame(game));
        clearSave();
      }
    } else {
      recordedRef.current = false;
    }
  }, [game]);

  // Auto-dismiss achievement toasts.
  useEffect(() => {
    if (game && game.pendingToasts.length > 0) {
      const t = setTimeout(() => setGame((g) => (g ? clearToasts(g) : g)), 3400);
      return () => clearTimeout(t);
    }
  }, [game]);

  const start = useCallback(
    (name: string, personaId: string) => {
      recordedRef.current = false;
      setShowDash(false);
      setGame(createCareer(name, personaId, pool));
    },
    [pool]
  );

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

  const next = useCallback(
    () => setGame((g) => (g ? continueAfterResult(g, pool) : g)),
    [pool]
  );

  const newCareer = useCallback(() => {
    clearSave();
    setSavedGame(null);
    setGame(null);
    setShowDash(false);
  }, []);

  const electionResult = useMemo(() => {
    if (game && game.status === "election") return resolveElection(game, pool);
    return null;
  }, [game, pool]);

  // ── Render ────────────────────────────────────────────────────────────────
  if (!game) {
    return (
      <StartScreen
        savedGame={savedGame}
        hallOfFame={hof}
        onStart={start}
        onResume={resume}
        eventCount={pool.length}
      />
    );
  }

  const isPlaying = game.status === "playing" || game.status === "result";

  return (
    <div className="app-shell">
      {isPlaying && <Hud game={game} onOpenDashboard={() => setShowDash(true)} />}

      <main className="stage">
        {game.status === "playing" && (
          <EventCard game={game} pool={pool} onChoose={choose} />
        )}
        {game.status === "result" && (
          <ResultScreen game={game} pool={pool} onContinue={next} />
        )}
        {game.status === "election" && electionResult && (
          <ElectionScreen
            game={game}
            result={electionResult}
            onContinue={() => setGame(electionResult.state)}
          />
        )}
        {(game.status === "gameover" || game.status === "victory") && (
          <EndScreen game={game} hallOfFame={hof} onNewCareer={newCareer} />
        )}
      </main>

      {showDash && <Dashboard game={game} onClose={() => setShowDash(false)} />}
      <AchievementToasts ids={game.pendingToasts} />
    </div>
  );
}
