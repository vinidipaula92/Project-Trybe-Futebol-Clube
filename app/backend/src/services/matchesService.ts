import { StatusCodes } from 'http-status-codes';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import User from '../database/models/user.model';
import { IMatches, IMatchesGet, INewMatch, IUpdateTeams } from '../interface/IMatches';
import UnauthorizedeError from '../validations/UnhathorizedError';
import ValidationError from '../validations/ValidationError';
import JwtService from './JwtService';

export default class MatchesService implements IMatchesGet {
  private db = Matches;
  private dbUser = User;
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
    });
    return matches as IMatches[];
  }

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjYxMjI0OTI3fQ.5MpWKGWYQ2raaSatSi97aCYOTZSSej2Few8hkfJDfd8

  async getSaveMatch(token: string, data: INewMatch): Promise<INewMatch> {
    const { payload } = JwtService.verify(token);
    if (!payload) {
      throw new UnauthorizedeError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
    const user = await this.dbUser.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new UnauthorizedeError(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
    }
    if (data.homeTeam === data.awayTeam) {
      throw new ValidationError(StatusCodes
        .NOT_FOUND, 'It is not possible to create a match with two equal teams');
    }
    if (data.homeTeam === undefined || data.awayTeam === undefined) {
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
