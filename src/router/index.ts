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

const queryMetadataKey = Symbol('query');
export function query(target: object, propertyKey: string | symbol, parameterIndex: number) {
    debug('query');
    debug('query', target);
    debug('query', propertyKey);
    debug('query', parameterIndex);

    const existingQueryParams: any[] = Reflect.getOwnMetadata(queryMetadataKey, target, propertyKey) || [];
    existingQueryParams.push(parameterIndex);
    Reflect.defineMetadata(queryMetadataKey, existingQueryParams, target, propertyKey);
    debug('query', existingQueryParams);
}

export function parsereq(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    debug('parsereq');
    debug('parsereq', target);
    debug('parsereq', propertyName);
    debug('parsereq', descriptor);
    const method = descriptor.value;
    descriptor.value = function() {
        const queryParameterIndexes: number[] = Reflect.getOwnMetadata(queryMetadataKey, target, propertyName);
        const queryParameters = queryParameterIndexes.map((index) => arguments[index]);
        debug(method, queryParameters);

        return method.apply(this, arguments);
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
