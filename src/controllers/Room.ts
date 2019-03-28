import { Get } from '../router';

export default class Room {
    @Get('/Room')
    public get() {
        return { name: 'Single', id: 1 };
    }
}
