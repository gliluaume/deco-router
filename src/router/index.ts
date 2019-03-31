import { Express } from 'express';
import 'reflect-metadata';

const DEBUG = false;
function debug(...params: any[]) {
    // tslint:disable-next-line
    DEBUG && console.log.apply(null, params);
}

interface IMethodDesc {
    descriptor: PropertyDescriptor;
    method: 'get' | 'post' | 'head' | 'options';
    path: string;
    target: any;
}

let app: Express;
const routesToBind: IMethodDesc[] = [];

export function Get(path: string) {
    debug('call Get factory');
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        debug('Get: called', target, path);
        if (routesToBind.some((routeDesc) => routeDesc.path === path)) {
            throw Error(`Route ${path} has already been registred`);
        }
        routesToBind.push({
            descriptor,
            method: 'get',
            path,
            target,
        });
    };
}

export function bindApp(expApp: Express) {
    app = expApp;
    while (routesToBind.length > 0) {
        const desc = routesToBind.pop();
        app[desc.method](
            desc.path,
            wrapGet(desc.target, desc.descriptor.value));
        debug(`Registered: ${desc.method.toUpperCase()} ${desc.path} for: ${desc.target.constructor.name}`);
    }
}

function wrapGet(target: any, fn: any) {
    return (req: any, res: any, next: any) => {
        const computed = fn(req.query);
        debug(`${target.constructor.name}.${fn.name}`,
            'called with',
            req.query);
        res.json(computed);
        next();
    };
}
