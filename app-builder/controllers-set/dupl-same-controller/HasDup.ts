import { Get } from '../../../src/router';

export default class HasDup {
    @Get('/test/stat')
    public static stat() {
        return { tag: 'static fun' };
    }
    @Get('/test/stat')
    public static statOther() {
        return { tag: 'duplicate' };
    }
}
