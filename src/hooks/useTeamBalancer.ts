import type { BalanceResult, Player, Team } from "../types";


export function useTeamBalancer() {
  const generateBalancedTeams = (players: Player[], numTeams: number): Team[] => {
    if (players.length < numTeams) return [];

    const sorted = [...players].sort((a, b) => b.score - a.score);
    const teams: Team[] = Array.from({ length: numTeams }, () => ({
      players: [],
      totalScore: 0,
    }));

    for (const player of sorted) {
      const idx = teams.reduce(
        (minIdx, team, i, arr) =>
          team.totalScore < arr[minIdx].totalScore ? i : minIdx,
        0
      );
      teams[idx].players.push(player);
      teams[idx].totalScore += player.score;
    }

    return teams;
  };

  const getBalanceScore = (teams: Team[]): BalanceResult | null => {
    if (!teams.length) return null;
    const scores = teams.map((t) => t.totalScore);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const diff = max - min;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const balancePercent = Math.max(0, 100 - (diff / avg) * 100).toFixed(1);

    return { diff, avg, balancePercent };
  };

  return { generateBalancedTeams, getBalanceScore };
}
