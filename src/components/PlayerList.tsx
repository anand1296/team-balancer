import { useState } from "react";
import type { Player } from "../types";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerListProps {
  players: Player[];
  onUpdate: (updatedPlayers: Player[]) => void;
}

export default function PlayerList({ players, onUpdate }: PlayerListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editScore, setEditScore] = useState<number | string>("");

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditName(players[index].name);
    setEditScore(players[index].score);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
    setEditScore("");
  };

  const saveEdit = (index: number) => {
    if (!editName.trim()) return;
    const updated = [...players];
    updated[index] = {
      name: editName.trim(),
      score: Number(editScore) || 0,
    };
    onUpdate(updated);
    cancelEdit();
  };

  const deletePlayer = (index: number) => {
    const updated = players.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md border border-gray-100 dark:border-gray-700 rounded-2xl mb-6 p-4 transition-colors">
      <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-100 mb-2 flex justify-between items-center">
        📋 Player List ({players.length})
      </h2>

      <div className="h-48 overflow-y-auto border-t border-gray-200 dark:border-gray-600 pt-2 pr-1">
        <AnimatePresence>
          {players.length === 0 && (
            <motion.p
              className="text-gray-400 text-sm italic mt-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No players added yet.
            </motion.p>
          )}

          {players.map((p, i) => (
            <motion.div
              key={i}
              className="py-2 px-2 border-b border-gray-100 dark:border-gray-700 last:border-0 flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {editingIndex === i ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-2 flex-1">
                    <input
                      className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg flex-1 bg-transparent focus:ring-2 focus:ring-emerald-400 text-sm sm:text-base"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <input
                      className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-20 bg-transparent focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                      type="number"
                      min="0"
                      max="10"
                      value={editScore}
                      onChange={(e) => setEditScore(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(i)}
                      className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-slate-700 dark:text-gray-100 text-sm sm:text-base">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Score: {p.score}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEditing(i)}
                      className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deletePlayer(i)}
                      className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
