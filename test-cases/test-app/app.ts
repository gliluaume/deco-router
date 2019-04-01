import bodyParser from 'body-parser';
import express from 'express';
import {Express} from 'express';
import {bindApp} from '../..';

// tslint:disable-next-line no-var-requires
require('./controllers');

const app: Express = express();
app.use(bodyParser.json());
bindApp(app);

export default app;
