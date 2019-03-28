import bodyParser from 'body-parser';
import express from 'express';
import {Express} from 'express';
import routerBind from '../src/router';

const app: Express = express();
routerBind(app);
// TODO pourquoi ça ne fonctionne pas avec import ?
// tslint:disable-next-line no-var-requires
const controllers = require('./controllers');
app.use(bodyParser.json());

export default app;
