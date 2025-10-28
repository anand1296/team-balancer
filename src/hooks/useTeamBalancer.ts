import type { Player, Team, BalanceResult } from "../types";

export function useTeamBalancer() {
  const generateBalancedTeams = (players: Player[], numTeams: number): Team[] => {
    if (players.length < numTeams) return [];

    // 🧠 If all players have identical scores, just shuffle randomly
    const allSameScore = players.every((p) => p.score === players[0].score);

    if (allSameScore) {
      const shuffled = [...players].sort(() => Math.random() - 0.5);
      const teams: Team[] = Array.from({ length: numTeams }, () => ({
        players: [],
        totalScore: 0,
      }));

      shuffled.forEach((player, idx) => {
        const teamIndex = idx % numTeams; // evenly distribute
        teams[teamIndex].players.push(player);
        teams[teamIndex].totalScore += player.score;
      });

      return teams;
    }

    // 🧮 Otherwise use the normal greedy balancing algorithm
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const teams: Team[] = Array.from({ length: numTeams }, () => ({
      players: [],
      totalScore: 0,
    }));

    for (const player of sorted) {
      // assign next player to team with the smallest total score
      const minIndex = teams.reduce(
        (minIdx, team, i, arr) =>
          team.totalScore < arr[minIdx].totalScore ? i : minIdx,
        0
      );

      teams[minIndex].players.push(player);
      teams[minIndex].totalScore += player.score;
    }

    return teams;
  };

  const getBalanceScore = (teams: Team[]): BalanceResult | null => {
    if (!teams.length) return null;
    const totals = teams.map((t) => t.totalScore);
    const max = Math.max(...totals);
    const min = Math.min(...totals);
    const diff = max - min;
    const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
    const balancePercent = Math.max(0, 100 - (diff / (avg || 1)) * 100).toFixed(1);

    return { diff, avg, balancePercent };
  };

  return { generateBalancedTeams, getBalanceScore };
}
