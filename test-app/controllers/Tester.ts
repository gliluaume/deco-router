import { Get } from '../../src/router';

export default class Tester {
    @Get('/test/stat')
    public static stat() {
        return { tag: 'static fun' };
    }
    @Get('/test')
    public get() {
        return { nom: 'Roger' };
    }
}
