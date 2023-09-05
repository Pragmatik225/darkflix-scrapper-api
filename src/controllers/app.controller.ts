import { Request, Response } from "express";
import { Get, JsonController, Req, Res } from 'routing-controllers';
import { Service } from "typedi";

@JsonController('/api/app')
@Service()
export default class AppController {
    constructor() {} 

    @Get('/hello')
    async hello(@Req() request: Request, @Res() response: Response) {
        return response.send({ hello: 'world' });
    }
}