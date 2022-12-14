import Matches from '../database/models/matches.model';

export interface IMatches extends Matches {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  },
}

export interface INewMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IUpdateTeams {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchesGet {
  getMatchesAll(): Promise<IMatches[]>
  getMatches(inProgressMatch: boolean): Promise<IMatches[]>
  getSaveMatch(token: string, data: INewMatch): Promise<INewMatch>
  finishMatch(id: number): Promise<void>
  updateMatch(updateData: IUpdateTeams, id: number): Promise<void>
}
