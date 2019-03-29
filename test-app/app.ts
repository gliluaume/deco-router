import bodyParser from 'body-parser';
import express from 'express';
import {Express} from 'express';
import routerBind from '../src/router';

// tslint:disable-next-line no-var-requires
require('./controllers');

const app: Express = express();
app.use(bodyParser.json());
routerBind(app);

export default app;
