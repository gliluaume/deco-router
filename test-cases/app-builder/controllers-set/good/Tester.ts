import { NextFunction, Request, Response } from 'express';
import { Get } from '../../../..';

export default class Tester {
    @Get('/test/stat')
    public static stat(req: Request, res: Response, next: NextFunction) {
        res.json({ tag: 'static fun' });
    }
    @Get('/test')
    public get(req: Request, res: Response, next: NextFunction) {
        res.json({ nom: 'Roger' });
    }
}
