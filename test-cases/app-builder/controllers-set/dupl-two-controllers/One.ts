import { NextFunction, Request, Response } from 'express';
import { Get } from '../../../..';

export default class One {
    @Get('/dupl')
    public get(req: Request, res: Response, next: NextFunction) {
        res.json({ tag: 'one' });
    }
}
