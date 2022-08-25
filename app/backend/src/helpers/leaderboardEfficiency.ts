import { IMatches } from '../interface/IMatches';
import LeaderboardTotalGames from './leaderboardTotalGamesAndPoints';

export default class LeaderboardEfficiency {
  static totalEfficiency(id: number | undefined, matches: IMatches[]): number {
    const getEfficiency = (LeaderboardTotalGames
      .totalPoints(id, matches) / (LeaderboardTotalGames.totalGames(id, matches) * 3)) * 100;
    return Number(getEfficiency.toFixed(2));
  }

  static homeEfficiency(id: number | undefined, matches: IMatches[]): number {
    const getEfficiency = (LeaderboardTotalGames
      .homePoints(id, matches) / (LeaderboardTotalGames.homeGames(id, matches) * 3)) * 100;
    return Number(getEfficiency.toFixed(2));
  }

  static awayEfficiency(id: number | undefined, matches: IMatches[]): number {
    const getEfficiency = (LeaderboardTotalGames
      .awayPoints(id, matches) / (LeaderboardTotalGames.awayGames(id, matches) * 3)) * 100;
    return Number(getEfficiency.toFixed(2));
  }
}
