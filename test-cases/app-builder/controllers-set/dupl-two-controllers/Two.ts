import { Get } from '../../../../src/router';

export default class Two {
    @Get('/dupl')
    public get() {
        return { tag: 'two dupl' };
    }
}
