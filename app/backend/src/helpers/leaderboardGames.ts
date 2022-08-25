import { IMatches } from '../interface/IMatches';

export default class LeaderboardGames {
  static totalVictories(id: number | undefined, matches: IMatches[]): number {
    let totalVictories = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
      if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) totalVictories += 1;
      else totalVictories += 0;
    });
    return totalVictories;
  }

  static totalDraws(id: number | undefined, matches: IMatches[]): number {
    let totalDraws = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
      if (match.awayTeam === id && match.awayTeamGoals === match.homeTeamGoals) totalDraws += 1;
      else totalDraws += 0;
    });
    return totalDraws;
  }

  static totalLosses(id: number | undefined, matches: IMatches[]): number {
    let totalLosses = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
      if (match.awayTeam === id && match.awayTeamGoals < match.homeTeamGoals) totalLosses += 1;
      else totalLosses += 0;
    });
    return totalLosses;
  }

  static homeVictories(id: number | undefined, matches: IMatches[]): number {
    let homeVictories = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) homeVictories += 1;
      else homeVictories += 0;
    });
    return homeVictories;
  }

  static homeDraws(id: number | undefined, matches: IMatches[]): number {
    let homeDraws = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals === match.awayTeamGoals) homeDraws += 1;
      else homeDraws += 0;
    });
    return homeDraws;
  }

  static homeLosses(id: number | undefined, matches: IMatches[]): number {
    let homeLosses = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals) homeLosses += 1;
      else homeLosses += 0;
    });
    return homeLosses;
  }

  static awayVictories(id: number | undefined, matches: IMatches[]): number {
    let awayVictories = 0;
    matches.forEach((match) => {
      if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) awayVictories += 1;
      else awayVictories += 0;
    });
    return awayVictories;
  }

  static awayDraws(id: number | undefined, matches: IMatches[]): number {
    let awayDraws = 0;
    matches.forEach((match) => {
      if (match.awayTeam === id && match.awayTeamGoals === match.homeTeamGoals) awayDraws += 1;
      else awayDraws += 0;
    });
    return awayDraws;
  }

  static awayLosses(id: number | undefined, matches: IMatches[]): number {
    let awayLosses = 0;
    matches.forEach((match) => {
      if (match.awayTeam === id && match.awayTeamGoals < match.homeTeamGoals) awayLosses += 1;
      else awayLosses += 0;
    });
    return awayLosses;
  }
}
