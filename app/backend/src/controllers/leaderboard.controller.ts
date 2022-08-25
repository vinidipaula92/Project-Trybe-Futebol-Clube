import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IGetClassification } from '../interface/ILeaderboard';
import { IMatchesGet } from '../interface/IMatches';
import { ITeams } from '../interface/ITeams';

export default class LeaderboardController {
  constructor(
    private TeamsService: ITeams,
    private MatchesService: IMatchesGet,
    private leaderboardController: IGetClassification,
  ) { }

  async getTeams(_req: Request, res: Response) {
    const teams = await this.TeamsService.getTeams();
    const matches = await this.MatchesService.getMatches(false);
    const classification = this.leaderboardController.getClassification(teams, matches);
    res.status(StatusCodes.OK).json(classification);
  }

  async getTeamsHome(_req: Request, res: Response) {
    const teams = await this.TeamsService.getTeams();
    const matches = await this.MatchesService.getMatches(false);
    const classification = this.leaderboardController.getClassificationHome(teams, matches);
    res.status(StatusCodes.OK).json(classification);
  }

  async getTeamsAway(_req: Request, res: Response) {
    const teams = await this.TeamsService.getTeams();
    const matches = await this.MatchesService.getMatches(false);
    const classification = this.leaderboardController.getClassificationAway(teams, matches);
    res.status(StatusCodes.OK).json(classification);
  }
}
