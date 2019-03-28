import { Get, parsereq, query } from '../router';

export default class Room {
    @Get('/Room')
    @parsereq
    public get(@query param: any, name: string) {
        return { name: 'Single', id: 1, param  };
    }
}
