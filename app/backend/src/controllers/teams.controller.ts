import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeams } from '../interface/ITeams';

export default class TeamController {
  constructor(private teamController: ITeams) {}

  async getTeams(req: Request, res: Response) {
    const teams = await this.teamController.getTeams();
    res.status(StatusCodes.OK).json(teams);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamController.getTeamById(Number(id));
    res.status(StatusCodes.OK).json(team);
  }
}
