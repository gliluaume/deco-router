import { Get } from '../router'

export class Room {
    @Get('/')
    public get() {
        return { nom: 'Roger' }
    }
}
