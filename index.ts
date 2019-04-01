import { Express, NextFunction, Request, Response } from 'express';
import 'reflect-metadata';

let debug = (...params: any[]) => {
    // tslint:disable-next-line
    console.log.apply(null, params);
};

export function setLogger(logger: (...params: any[]) => void) {
    debug = logger;
}

type httpMethod =
    'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'head'
    | 'options'
    | 'connect'
    | 'trace'
    | 'delete';

interface IMethodDesc {
    descriptor: PropertyDescriptor;
    method: httpMethod;
    path: string;
    target: any;
}

let app: Express;
const routesToBind: IMethodDesc[] = [];

export function decoratorFactory(method: httpMethod) {
    return (path: string) => {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            if (routesToBind.some((routeDesc) => routeDesc.path === path)) {
                throw Error(`Route ${path} has already been registred`);
            }
            routesToBind.push({
                descriptor,
                method,
                path,
                target,
            });
        };
    };
}

export const Get = decoratorFactory('get');
export const Post = decoratorFactory('post');
export const Put = decoratorFactory('put');
export const Patch = decoratorFactory('patch');
export const Head = decoratorFactory('head');
export const Options = decoratorFactory('options');
export const Connect = decoratorFactory('connect');
export const Trace = decoratorFactory('trace');
export const Delete = decoratorFactory('delete');

export function bindApp(expApp: Express) {
    app = expApp;
    while (routesToBind.length > 0) {
        const desc = routesToBind.pop();
        app[desc.method](
            desc.path,
            desc.descriptor.value);
        debug(`Registered: ${desc.method.toUpperCase()} ${desc.path}`);
    }
}
