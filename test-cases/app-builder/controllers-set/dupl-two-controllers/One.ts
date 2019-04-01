import { Get } from '../../../..';

export default class One {
    @Get('/dupl')
    public get() {
        return { tag: 'one' };
    }
}
