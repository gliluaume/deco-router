# Decorouter
WIP: Use decorator to make an express router
Controllers are decoupled from express way to handle request and write response. This will be done by the decorator.

## Create decorator
A decorator will handle request call decorated function with data from request and then create response

## Bind decorator to express app
FIXME: this is made in a hacky way for now.

## Use decorator
Methods of controllers are decorated with route they respond to:
```javascript
import { Get } from '../router'

export class Room {
    @Get('/')
    public get() {
        return { nom: 'Roger' }
    }
}
```
There is no reference to express, or parsing request or whatever

## Global handling
Decorator could be used to handle globally:
 - errors
 - logging
 - access rights
  