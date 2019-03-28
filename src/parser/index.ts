const DEBUG = false;
function debug(...params: any[]) {
    // tslint:disable-next-line
    DEBUG && console.log.apply(null, params);
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

// tslint:disable-next-line ban-types
export function parsereq(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    debug('parsereq');
    debug('parsereq', target);
    debug('parsereq', propertyName);
    debug('parsereq', descriptor);
    const method = descriptor.value;
    descriptor.value = function() {
        const queryParameterIndexes: number[] = Reflect.getOwnMetadata(queryMetadataKey, target, propertyName);
        const queryParameters = queryParameterIndexes.map((index) => arguments[index]);
        debug(method.length, method, queryParameters, arguments);

        return method.apply(this, arguments);
    };
}

export type NewAble<T> = new() => T;
export type ClassType<T> = new (...args: any[]) => T;

export function parseQueryType<T extends object>(cls: ClassType<T>) {
    // tslint:disable-next-line ban-types
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        debug('parsereq');
        debug('parsereq', target);
        debug('parsereq', propertyName);
        debug('parsereq', descriptor);
        const method = descriptor.value;
        descriptor.value = function() {
            const queryParameterIndexes: number[] = Reflect.getOwnMetadata(queryMetadataKey, target, propertyName);

            queryParameterIndexes.forEach((index) => {
                arguments[index] = new cls(arguments[index]);
            });

            return method.apply(this, arguments);
        };
    };
}
