import { Express, NextFunction, Request, Response } from 'express';

export function track(req: Request, res: Response, nex: NextFunction) {
    res.append('x-track-id', '5?GNKR');
    nex();
}
