# Deco-router
Use decorator to make an express router.

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

Express application ask decorators lib to bind function to express app:

Application structure:
```bash
.
├── app.ts
├── controllers
│   ├── index.ts
│   └── Tester.ts
└── server.ts
```
where controllers are exposed by `index.ts`, `app.ts` looks like:
```javascript
import express from 'express';
import { Express } from 'express';
import { bindApp } from 'deco-router';

// requiring controllers loads decorators
require('./controllers');

const app: Express = express();

// bind router to express application
bindApp(app);

export default app;
```

See test for a running example (`npm run serve`).

## Global handling
Decorator could be used to handle globally:
 - errors
 - logging
 - access rights
  