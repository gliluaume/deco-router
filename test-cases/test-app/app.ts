import bodyParser from 'body-parser';
import express from 'express';
import { Express } from 'express';
import * as router from '../..';

// tslint:disable-next-line no-var-requires
require('./controllers');
const app: Express = express();
app.use(bodyParser.json());

 // tslint:disable-next-line
router.setLogger(console.log);
router.bindApp(app);

export default app;
