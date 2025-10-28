import { motion, AnimatePresence } from "framer-motion";
import TeamCard from "./TeamCard";
import type { Team } from "../types";

interface TeamGridProps {
  teams: Team[];
}

export default function TeamGrid({ teams }: TeamGridProps) {
  if (!teams.length) return null;
  return (
    <div
      className="grid gap-4 w-full"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
    >
      <AnimatePresence>
        {teams.map((team, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <TeamCard team={team} index={i} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
