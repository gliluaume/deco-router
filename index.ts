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

interface IMiddlewaresDesc {
    descriptor: PropertyDescriptor;
    target: any;
    middleware: Middleware;
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

type Middleware = (a: Request, b: Response, c: NextFunction) => void;

interface IMiddlewaresDesc {
    descriptor: PropertyDescriptor;
    middleware: Middleware;
    target: any;
}

const middlewaresToBind: IMiddlewaresDesc[] = [];

export function middleware(fn: Middleware) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        middlewaresToBind.push({
            descriptor,
            middleware: fn,
            target,
        });
    };
}

export function bindApp(expApp: Express) {
    app = expApp;
    while (routesToBind.length > 0) {
        const desc = routesToBind.pop();
        const middlewares = [
            ...getMiddleWares(desc),
            desc.descriptor.value];

        app[desc.method](
            desc.path,
            ...middlewares);
        debug(`Registered: ${desc.method.toUpperCase()} ${desc.path}`);
    }
}

function getMiddleWares(methodDesc: IMethodDesc): Middleware[] {
    return middlewaresToBind
        .filter((middlewaresDesc: IMiddlewaresDesc) =>
            middlewaresDesc.target === methodDesc.target
            && middlewaresDesc.descriptor === methodDesc.descriptor)
        .map((middlewaresDesc) => middlewaresDesc.middleware);
}
