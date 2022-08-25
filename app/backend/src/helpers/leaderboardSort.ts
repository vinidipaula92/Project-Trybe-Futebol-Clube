import { ILeaderboardMask } from '../interface/ILeaderboard';

export default class LeaderboardSort {
  static getLeaderboard(leaderboard: ILeaderboardMask[]): ILeaderboardMask[] {
    const getLeaderboard = leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
      || b.totalDraws - a.totalDraws
      || b.totalLosses - a.totalLosses);
    return getLeaderboard;
  }
}
