import Teams from '../database/models/teams.model';
import { ITeamsName } from '../interface/ITeams';

export default class TeamsService implements ITeamsName {
  id?: number | undefined;
  teamName: string;
  private db = Teams;

  async getTeams(): Promise<ITeamsName[]> {
    const teams = await this.db.findAll();
    return teams;
  }

  async getTeamById(id: number): Promise<ITeamsName> {
    const team = await this.db.findByPk(id);
    return team as ITeamsName;
  }
}
