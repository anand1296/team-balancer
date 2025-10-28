import type { Team } from "../types";

interface TeamCardProps {
  team: Team;
  index: number;
}

const colors = [
  "bg-emerald-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-amber-500",
];

export default function TeamCard({ team, index }: TeamCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-md border border-gray-100 rounded-2xl overflow-hidden transition hover:shadow-lg">
      <div
        className={`${colors[index % colors.length]} text-white p-3 font-bold`}
      >
        Team {index + 1}{" "}
        {!!team.totalScore && <span> — Score: {team.totalScore}</span>}
      </div>
      <ul className="divide-y divide-gray-200 text-slate-700">
        {team.players.map((p, j) => (
          <li key={j} className="py-2 px-3 text-sm sm:text-base">
            {p.name}{" "}
            {!!p.score && (
              <span className="text-gray-500 text-xs sm:text-sm">
                ({p.score})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
