import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { analyze } from '../controllers/analyze.controller';

const analyzeRouter = Router();

analyzeRouter.post('/analyze', (req: Request, res: Response, next: NextFunction) => analyze(req, res));

export default analyzeRouter;