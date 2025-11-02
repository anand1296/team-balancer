export type Player = {
  name: string;
  score: number ;
}

export type Team = {
  players: Player[];
  totalScore: number;
}

export type BalanceResult = {
  diff: number;
  avg: number;
  balancePercent: string;
}
