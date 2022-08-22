import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesGet } from '../interface/IMatches';

export default class MatchesController {
  constructor(private matchesController: IMatchesGet) { }

  async getMatches(req: Request, res: Response) {
    if (req.query.inProgress === 'true') {
      const matchesInProgress = await this.matchesController.getMatches(true);
      return res.status(StatusCodes.OK).json(matchesInProgress);
    }
    const matchesFinished = await this.matchesController.getMatches(false);
    return res.status(StatusCodes.OK).json(matchesFinished);
  }
}
