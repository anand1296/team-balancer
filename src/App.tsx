import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import TeamGrid from "./components/TeamGrid";
import BalanceIndicator from "./components/BalanceIndicator";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTeamBalancer } from "./hooks/useTeamBalancer";
import type { Player, Team } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [players, setPlayers] = useLocalStorage<Player[]>("players", []);
  const [numTeams, setNumTeams] = useLocalStorage<number>("numTeams", 2);
  const [teams, setTeams] = useLocalStorage<Team[]>("teams", []);
  const { generateBalancedTeams, getBalanceScore } = useTeamBalancer();

  const handleAddPlayer = (player: Player) => setPlayers([...players, player]);
  const handleGenerate = () => {
    const newTeams = generateBalancedTeams(players, numTeams);
    setTeams(newTeams);
  };
  const handleClear = () => {
    if (confirm("Clear all data?")) {
      setPlayers([]);
      setTeams([]);
      setNumTeams(2);
      localStorage.clear();
    }
  };

  const balance = getBalanceScore(teams);

  const canGenerate = players.length >= 4;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-indigo-50 flex flex-col items-center px-4 sm:px-6 md:px-12 py-10 overflow-x-hidden">
      <ThemeToggle />
      <div className="w-full max-w-6xl">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-emerald-700 tracking-tight drop-shadow-sm"
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
            className={`flex-1 w-full md:max-w-sm ${
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
            <PlayerForm onAdd={handleAddPlayer} />

            {/* Team Count Input */}
            <div className="bg-white/80 backdrop-blur-md shadow-md border border-gray-100 p-5 rounded-2xl mb-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-3">
                🧩 Number of Teams
              </h2>
              <input
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                type="number"
                min="2"
                value={numTeams}
                onChange={(e) =>
                  setNumTeams(Math.max(2, Number(e.target.value)))
                }
              />
              {numTeams < 2 && (
                <p className="text-sm text-rose-500 mt-2">
                  Minimum 2 teams required.
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`px-5 py-3 rounded-xl w-full sm:w-auto transition-transform shadow-sm text-white ${
                  canGenerate
                    ? "bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.02]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                🎲 Generate Teams
              </button>
              <button
                onClick={handleClear}
                className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 rounded-xl w-full sm:w-auto transition-transform hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                🧹 Clear All
              </button>
            </div>

            {/* Helper message */}
            {!canGenerate && (
              <p className="text-sm text-gray-500 mb-6">
                Add at least <strong>4 players</strong> to generate teams.
              </p>
            )}

            <BalanceIndicator balance={balance} />
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence>
              {teams.length > 0 && <TeamGrid teams={teams} />}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Made with 💚 by{" "}
        <span className="text-emerald-600 font-semibold">You</span>
      </footer>
    </div>
  );
}
