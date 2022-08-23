import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesGet } from '../interface/IMatches';
import ValidationError from '../validations/ValidationError';

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

  async getSaveMatch(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ValidationError(401, 'Token must be a valid token');
    }
    const data = req.body;
    const newMatch = await this.matchesController.getSaveMatch(authorization, data);
    res.status(StatusCodes.CREATED).json(newMatch);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesController.finishMatch(Number(id));
    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }
}
