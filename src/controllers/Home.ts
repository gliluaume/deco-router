// import { Request, Response } from "express";

// /**
//  * GET /
//  * Home page.
//  */
// export let index = (req: Request, res: Response) => {
//   res.json({nom: 'roger'})
// }
import { Get, Routage } from '../router'

export class Room {
    @Get('/')
    public get() {
        return { nom: 'Roger' }
    }
}