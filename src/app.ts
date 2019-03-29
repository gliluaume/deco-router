import bodyParser from 'body-parser';
import express from 'express';
import {Express} from 'express';
import bindApp from './router';
require('./controllers');

const app: Express = express();
app.use(bodyParser.json());
bindApp(app);
// console.log('routes', app.routes);
// routerBind(app);
// TODO pourquoi ça ne fonctionne pas avec import ?
// tslint:disable-next-line no-var-requires
// const controllers = require('./controllers');
// console.log(Object.keys(ctrls));

export default app;
