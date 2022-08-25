import { IMatches } from '../interface/IMatches';

export default class LeaderboardTotalGames {
  static totalGames(id: number | undefined, matches: IMatches[]): number {
    let totalGames = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) totalGames += 1;
      if (match.awayTeam === id) totalGames += 1;
      else totalGames += 0;
    });
    return totalGames;
  }

  static homeGames(id: number | undefined, matches: IMatches[]): number {
    let homeGames = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) homeGames += 1;
      else homeGames += 0;
    });
    return homeGames;
  }

  static awayGames(id: number | undefined, matches: IMatches[]): number {
    let awayGames = 0;
    matches.forEach((match) => {
      if (match.awayTeam === id) awayGames += 1;
      else awayGames += 0;
    });
    return awayGames;
  }

  static totalPoints(id: number | undefined, matches: IMatches[]): number {
    let totalPoints = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) totalPoints += 3;
      if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) totalPoints += 3;
      if (match.homeTeam === id && match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
      if (match.awayTeam === id && match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
      else totalPoints += 0;
    });
    return totalPoints;
  }

  static homePoints(id: number | undefined, matches: IMatches[]): number {
    let homePoints = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) homePoints += 3;
      if (match.homeTeam === id && match.homeTeamGoals === match.awayTeamGoals) homePoints += 1;
      else homePoints += 0;
    });
    return homePoints;
  }

  static awayPoints(id: number | undefined, matches: IMatches[]): number {
    let awayPoints = 0;
    matches.forEach((match) => {
      if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) awayPoints += 3;
      if (match.awayTeam === id && match.homeTeamGoals === match.awayTeamGoals) awayPoints += 1;
      else awayPoints += 0;
    });
    return awayPoints;
  }
}
