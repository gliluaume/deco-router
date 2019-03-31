import bodyParser from 'body-parser';
import express from 'express';
import {Express} from 'express';
import {bindApp} from '../src/router';

export default function appFactory(controllerPath: string) {
    // tslint:disable-next-line no-var-requires
    require(controllerPath);

    const app: Express = express();
    app.use(bodyParser.json());
    bindApp(app);

    return app;
}
