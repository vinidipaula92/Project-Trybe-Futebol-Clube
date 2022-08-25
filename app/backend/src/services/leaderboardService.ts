import LeaderboardEfficiency from '../helpers/leaderboardEfficiency';
import LeaderboardGames from '../helpers/leaderboardGames';
import LeaderboardGoals from '../helpers/leaderboardGoals';
import LeaderboardSort from '../helpers/leaderboardSort';
import LeaderboardTotalGames from '../helpers/leaderboardTotalGamesAndPoints';
import { IGetClassification, ILeaderboardMask } from '../interface/ILeaderboard';
import { IMatches } from '../interface/IMatches';
import { ITeamsName } from '../interface/ITeams';

export default class LeaderboardService implements IGetClassification {
  getClassification = (Teams: ITeamsName[], Matches: IMatches[]): ILeaderboardMask[] => {
    const leaderboard: ILeaderboardMask[] = [];
    Teams.forEach((team) => {
      const leaderboardMask: ILeaderboardMask = {
        name: team.teamName,
        totalPoints: LeaderboardTotalGames.totalPoints(team.id, Matches),
        totalGames: LeaderboardTotalGames.totalGames(team.id, Matches),
        totalVictories: LeaderboardGames.totalVictories(team.id, Matches),
        totalDraws: LeaderboardGames.totalDraws(team.id, Matches),
        totalLosses: LeaderboardGames.totalLosses(team.id, Matches),
        goalsFavor: LeaderboardGoals.totalGoalsFavor(team.id, Matches),
        goalsOwn: LeaderboardGoals.totalGoalsOwn(team.id, Matches),
        goalsBalance: LeaderboardGoals.totalGoalsBalance(team.id, Matches),
        efficiency: LeaderboardEfficiency.totalEfficiency(team.id, Matches),
      };
      leaderboard.push(leaderboardMask);
    });
    return LeaderboardSort.getLeaderboard(leaderboard);
  };

  getClassificationHome = (Teams: ITeamsName[], Matches: IMatches[]): ILeaderboardMask[] => {
    const leaderboard: ILeaderboardMask[] = [];
    Teams.forEach((team) => {
      const leaderboardMask: ILeaderboardMask = {
        name: team.teamName,
        totalPoints: LeaderboardTotalGames.homePoints(team.id, Matches),
        totalGames: LeaderboardTotalGames.homeGames(team.id, Matches),
        totalVictories: LeaderboardGames.homeVictories(team.id, Matches),
        totalDraws: LeaderboardGames.homeDraws(team.id, Matches),
        totalLosses: LeaderboardGames.homeLosses(team.id, Matches),
        goalsFavor: LeaderboardGoals.homeGoalsFavor(team.id, Matches),
        goalsOwn: LeaderboardGoals.homeGoalsOwn(team.id, Matches),
        goalsBalance: LeaderboardGoals.homeGoalsBalance(team.id, Matches),
        efficiency: LeaderboardEfficiency.homeEfficiency(team.id, Matches),
      };
      leaderboard.push(leaderboardMask);
    });
    return LeaderboardSort.getLeaderboard(leaderboard);
  };

  getClassificationAway = (Teams: ITeamsName[], Matches: IMatches[]): ILeaderboardMask[] => {
    const leaderboard: ILeaderboardMask[] = [];
    Teams.forEach((team) => {
      const leaderboardMask: ILeaderboardMask = {
        name: team.teamName,
        totalPoints: LeaderboardTotalGames.awayPoints(team.id, Matches),
        totalGames: LeaderboardTotalGames.awayGames(team.id, Matches),
        totalVictories: LeaderboardGames.awayVictories(team.id, Matches),
        totalDraws: LeaderboardGames.awayDraws(team.id, Matches),
        totalLosses: LeaderboardGames.awayLosses(team.id, Matches),
        goalsFavor: LeaderboardGoals.awayGoalsFavor(team.id, Matches),
        goalsOwn: LeaderboardGoals.awayGoalsOwn(team.id, Matches),
        goalsBalance: LeaderboardGoals.awayGoalsBalance(team.id, Matches),
        efficiency: LeaderboardEfficiency.awayEfficiency(team.id, Matches),
      };
      leaderboard.push(leaderboardMask);
    });
    return LeaderboardSort.getLeaderboard(leaderboard);
  };
}
