import { Express, NextFunction, Request, Response } from 'express';

export function track(req: Request, res: Response, nex: NextFunction) {
    res.append('x-track-id', '5?GNKR');
    nex();
}

export function user(req: Request, res: Response, nex: NextFunction) {
    res.locals.user = 'user-1';
    console.log(res.locals);
    nex();
}

export function userOverride(req: Request, res: Response, nex: NextFunction) {
    res.locals.user = 'user-new';
    console.log(res.locals);
    nex();
}
