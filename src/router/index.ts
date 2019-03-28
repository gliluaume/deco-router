import { Express } from 'express';
import 'reflect-metadata';

const DEBUG = false;
function debug(...params: any[]) {
    // tslint:disable-next-line
    DEBUG && console.log.apply(null, params);
}

let app: Express;

export function Get(path: string) {
    debug('call Get factory');
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        debug('Get: called', target);
        app.get(path, wrapGet(target, descriptor.value));
    };
}

export default function bind(expApp: Express) {
    app = expApp;
}

function wrapGet(target: any, fn: any) {
    return (req: any, res: any, next: any) => {
        const computed = fn(req.query);
        // tslint:disable-next-line
        debug(`${target.constructor.name}.${fn.name}`,
            'called with',
            req.query);
        res.json(computed);
        next();
    };
}
