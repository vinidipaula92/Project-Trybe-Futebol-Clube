import { IMatches } from './IMatches';
import { ITeamsName } from './ITeams';

export interface ILeaderboardMask {
  name: string;
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface IGetClassification {
  getClassification(Teams: ITeamsName[], Matches: IMatches[]): ILeaderboardMask[];
  getClassificationHome(Teams: ITeamsName[], Matches: IMatches[]): ILeaderboardMask[];
  getClassificationAway(Teams: ITeamsName[], Matches: IMatches[]): ILeaderboardMask[];
}
