import { parsereq, query } from '../parser';
import { Get } from '../router';


export default class Room {
    @Get('/Room')
    @parsereq
    public get(@query param: any, name: string) {
        return { name: 'Single', id: 1, param  };
    }
}
