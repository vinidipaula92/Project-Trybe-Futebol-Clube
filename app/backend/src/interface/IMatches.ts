import Matches from '../database/models/matches.model';

export interface IMatches extends Matches {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  },
}

export interface IMatchesGet {
  getMatches(inProgressMatch: boolean): Promise<IMatches[]>
}
