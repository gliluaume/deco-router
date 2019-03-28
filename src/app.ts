import bodyParser from 'body-parser';
import express from 'express';
import routerBind from './router';

const app = express();
routerBind(app);
// TODO pourquoi ça ne fonctionne pas avec import ?
// tslint:disable-next-line no-var-requires
const controllers = require('./controllers');
app.use(bodyParser.json());

export default app;
