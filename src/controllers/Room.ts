import { Get, Routage } from '../router'

export class Room {
    @Get('/Room')
    public get() {
        return { name: 'Single', id: 1 }
    }
}