import { StatusCodes } from 'http-status-codes';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import { IMatches, IMatchesGet, INewMatch, IUpdateTeams } from '../interface/IMatches';
import UnauthorizedeError from '../validations/UnhathorizedError';
import ValidationError from '../validations/ValidationError';
import JwtService from './JwtService';

export default class MatchesService implements IMatchesGet {
  private db = Matches;
  private homeTeam = {
    model: Teams,
    as: 'teamHome',
    attributes: ['teamName'],
  };

  private awayTeam = {
    model: Teams,
    as: 'teamAway',
    attributes: ['teamName'],
  };

  async getMatchesAll(): Promise<IMatches[]> {
    const matches = await this.db.findAll({
      include: [this.homeTeam, this.awayTeam],
    });
    return matches as IMatches[];
  }

  async getMatches(inProgressMatch: boolean): Promise<IMatches[]> {
    if (inProgressMatch) {
      const matches = await this.db.findAll({
        include: [this.homeTeam, this.awayTeam],
        where: { inProgress: true },
      });
      return matches as IMatches[];
    }
    const matches = await this.db.findAll({
      include: [this.homeTeam, this.awayTeam],
      where: { inProgress: false },
    });
    return matches as IMatches[];
  }

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjYxMjI0OTI3fQ.5MpWKGWYQ2raaSatSi97aCYOTZSSej2Few8hkfJDfd8

  async getSaveMatch(token: string, data: INewMatch): Promise<INewMatch> {
    const { homeTeam, awayTeam } = data;
    const findTeamHome = await Teams.findByPk(homeTeam);
    const findTeamAway = await Teams.findByPk(awayTeam);
    const dataToken = JwtService.verify(token);
    if (!dataToken) {
      throw new UnauthorizedeError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
    if (findTeamHome?.id === findTeamAway?.id) {
      throw new ValidationError(StatusCodes
        .UNAUTHORIZED, 'It is not possible to create a match with two equal teams');
    }
    if (!findTeamHome || !findTeamAway) {
      throw new ValidationError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
    const match = await this.db.create({ ...data, inProgress: true });
    return match;
  }

  async finishMatch(id: number): Promise<void> {
    await this.db.update({
      inProgress: false,
    }, { where: { id } });
  }

  async updateMatch(updateData: IUpdateTeams, id: number): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = updateData;
    await this.db.update({
      homeTeamGoals, awayTeamGoals,
    }, {
      where: { id },
    });
  }
}
