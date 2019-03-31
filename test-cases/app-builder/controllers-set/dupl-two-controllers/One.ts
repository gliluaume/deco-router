import { Get } from '../../../../src/router';

export default class One {
    @Get('/dupl')
    public get() {
        return { tag: 'one' };
    }
}
