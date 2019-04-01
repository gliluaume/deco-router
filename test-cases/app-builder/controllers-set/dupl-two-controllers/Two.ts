import { Get } from '../../../..';

export default class Two {
    @Get('/dupl')
    public get() {
        return { tag: 'two dupl' };
    }
}
