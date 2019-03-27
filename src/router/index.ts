import { Express } from 'express'

let app: Express

export function Get(path: string) {
    console.log('yo')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('Get: called', target);
        app.get(path, wrapGet(target, descriptor.value))
    }
}

// export function Routage(tag: string) {
//     console.log('class')
//     return function (target: any) {
//         console.log('Routage', target)
//     }
// }

export default function bind(expApp: Express) {
    app = expApp
}

function wrapGet(target: any, fn: any) {
    return function(req: any, res: any, next: any) {
        const computed = fn(req.query)
        console.log(`${target.constructor.name}.${fn.name}`, 
            'called with', 
            req.query)
        res.json(computed)
        next()
    }
}
