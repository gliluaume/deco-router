import { NextFunction, Request, Response } from 'express';
import { Get } from '../../../..';

export default class HasDup {
    @Get('/test/stat')
    public static stat(req: Request, res: Response, next: NextFunction) {
        res.json({ tag: 'static fun' });
    }
    @Get('/test/stat')
    public static statOther(req: Request, res: Response, next: NextFunction) {
        res.json({ tag: 'duplicate' });
    }
}
