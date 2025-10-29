import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import TeamGrid from "./components/TeamGrid";
import BalanceIndicator from "./components/BalanceIndicator";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTeamBalancer } from "./hooks/useTeamBalancer";
import type { Player, Team } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
// import ThemeToggle from "./components/ThemeToggle";
import "./App.css";
import ConfirmationDialog from "./components/ConfirmationDialog";

export default function App() {
  const [players, setPlayers] = useLocalStorage<Player[]>("players", []);
  const [numTeams, setNumTeams] = useLocalStorage<number>("numTeams", 2);
  const [teams, setTeams] = useLocalStorage<Team[]>("teams", []);
  const { generateBalancedTeams, getBalanceScore } = useTeamBalancer();
  const teamsRef = useRef<HTMLDivElement>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleAddPlayer = (player: Player) => setPlayers([...players, player]);
  const handleGenerate = () => {
    const newTeams = generateBalancedTeams(players, numTeams);
    setTeams(newTeams);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        teamsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleClear = () => {
    // open modal instead of native confirm
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    setPlayers([]);
    setTeams([]);
    setNumTeams(2);
    localStorage.clear();
    setShowClearConfirm(false);
  };

  const cancelClear = () => setShowClearConfirm(false);

  const balance = getBalanceScore(teams);

  const canGenerate = players.length >= 4;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-emerald-50 to-indigo-50 flex flex-col items-center px-4 sm:px-6 md:px-12 py-10 overflow-x-hidden">
      {/* toggle between light and dark mode */}
      {/* <ThemeToggle /> */}
      <div className="w-full max-w-6xl">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-800/80 tracking-tight drop-shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚖️ Team Balancer
        </motion.h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Enter your players and their skill levels to automatically generate
          well-balanced teams. Perfect for games, hackathons, or fun matchups!
        </p>

        <div
          className={`transition-all duration-500 ${
            teams.length
              ? "flex flex-col md:flex-row justify-between gap-8 items-start"
              : "flex flex-col items-center"
          }`}
        >
          {/* LEFT SECTION */}
          <motion.div
            className={`flex-1 w-full md:max-w-lg ${
              !teams.length ? "text-center" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Player List */}
            <PlayerList
              players={players}
              onUpdate={(updatedPlayers) => setPlayers(updatedPlayers)}
            />

            {/* Player Form */}
            <PlayerForm onAdd={handleAddPlayer} existingPlayers={players} />

            {/* Team Count Input */}
            <div className="bg-white/80 backdrop-blur-md shadow-md border border-gray-100 p-5 rounded-2xl mb-4">
              <div className="flex gap-2 flex-1 items-start">
                <h2 className="text-xl text-start font-semibold text-slate-700 w-3/4!">
                  🧩 Number of Teams
                </h2>
                <div className="flex flex-col w-1/4">
                  <input
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    type="number"
                    min="2"
                    max={
                      players.length < 4 ? 2 : Math.floor(players.length / 2)
                    }
                    value={numTeams}
                    onChange={(e) =>
                      setNumTeams(Math.max(2, Number(e.target.value)))
                    }
                  />
                  <span className="text-xs italic text-gray-500 mt-1">
                    Min: {2} | Max:{" "}
                    {players.length < 4 ? 2 : Math.floor(players.length / 2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Helper message */}
            {!canGenerate && (
              <p className="text-sm text-start text-gray-500 mb-4">
                Add at least <strong>4 players</strong> to generate teams.
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-8">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="px-5 py-3 rounded-xl w-full sm:w-auto transition-transform shadow-sm text-white"
              >
                🎲 Generate Teams
              </button>
              <button
                onClick={handleClear}
                disabled={players.length === 0 && teams.length === 0}
                className="bg-white! text-gray-800/80! border-gray-800/80! px-5 py-3 rounded-xl w-full sm:w-auto transition-transform active:scale-95 shadow-sm"
              >
                🧹 Clear All
              </button>
            </div>
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            ref={teamsRef}
            className="flex-1 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <BalanceIndicator balance={balance} />
            <AnimatePresence>
              {teams.length > 0 && <TeamGrid teams={teams} />}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* confirmation dialog */}
      <ConfirmationDialog
        open={showClearConfirm}
        title="Clear all data?"
        description="This will remove all players, teams, and reset the team count. This action cannot be undone."
        onConfirm={confirmClear}
        onCancel={cancelClear}
      />

      <footer className="mt-12 text-center text-sm text-gray-500">
        Made with 🩶
      </footer>
    </div>
  );
}
