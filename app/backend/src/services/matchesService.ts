import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import { IMatches, IMatchesGet } from '../interface/IMatches';

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
}
