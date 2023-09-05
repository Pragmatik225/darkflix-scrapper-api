import 'dotenv/config'
import 'reflect-metadata';
import cors from 'cors'
import express from 'express'
import path from 'path';
import { Container } from 'typedi';
import { createExpressServer, useContainer  } from 'routing-controllers';
import { CustomInternalError } from './exceptions/custom-internal-error'
import { HTTP_CODES } from './constants/http-codes';
import AppController from './controllers/app.controller';

useContainer(Container);
const app: express.Application = createExpressServer({
    controllers: [
        path.join(__dirname + '/controllers/*.ts')
    ],
    classTransformer: true,
});
app.use('/', express.static('ui'))
app.use(express.json())
app.use(cors())
app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    //return res;
});
if (process.env.APP_HOST === undefined || process.env.APP_PORT == undefined) {
    throw new CustomInternalError("Le port du processus est indéfini", HTTP_CODES.INTERNAL_SERVER_ERROR);
}
const host = process.env.APP_HOST;
const port = parseInt(process.env.APP_PORT!);
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})