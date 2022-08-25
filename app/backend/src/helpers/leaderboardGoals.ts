import { IMatches } from '../interface/IMatches';

export default class LeaderboardGoals {
  static totalGoalsFavor(id: number | undefined, matches: IMatches[]): number {
    let goalsFavor = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) goalsFavor += match.homeTeamGoals;
      if (match.awayTeam === id) goalsFavor += match.awayTeamGoals;
      else goalsFavor += 0;
    });
    return goalsFavor;
  }

  static homeGoalsFavor(id: number | undefined, matches: IMatches[]): number {
    let goalsFavor = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) goalsFavor += match.homeTeamGoals;
      else goalsFavor += 0;
    });
    return goalsFavor;
  }

  static awayGoalsFavor(id: number | undefined, matches: IMatches[]): number {
    let goalsFavor = 0;
    matches.forEach((match) => {
      if (match.awayTeam === id) goalsFavor += match.awayTeamGoals;
      else goalsFavor += 0;
    });
    return goalsFavor;
  }

  static totalGoalsOwn(id: number | undefined, matches: IMatches[]): number {
    let goalsOwn = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) goalsOwn += match.awayTeamGoals;
      if (match.awayTeam === id) goalsOwn += match.homeTeamGoals;
      else goalsOwn += 0;
    });
    return goalsOwn;
  }

  static homeGoalsOwn(id: number | undefined, matches: IMatches[]): number {
    let goalsOwn = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) goalsOwn += match.awayTeamGoals;
      else goalsOwn += 0;
    });
    return goalsOwn;
  }

  static awayGoalsOwn(id: number | undefined, matches: IMatches[]): number {
    let goalsOwn = 0;
    matches.forEach((match) => {
      if (match.awayTeam === id) goalsOwn += match.homeTeamGoals;
      else goalsOwn += 0;
    });
    return goalsOwn;
  }

  static totalGoalsBalance(id: number | undefined, matches: IMatches[]): number {
    const goalsBalance = LeaderboardGoals
      .totalGoalsFavor(id, matches) - LeaderboardGoals.totalGoalsOwn(id, matches);
    return goalsBalance;
  }

  static homeGoalsBalance(id: number | undefined, matches: IMatches[]): number {
    const goalsBalance = LeaderboardGoals
      .homeGoalsFavor(id, matches) - LeaderboardGoals.homeGoalsOwn(id, matches);
    return goalsBalance;
  }

  static awayGoalsBalance(id: number | undefined, matches: IMatches[]): number {
    const goalsBalance = LeaderboardGoals
      .awayGoalsFavor(id, matches) - LeaderboardGoals.awayGoalsOwn(id, matches);
    return goalsBalance;
  }
}
