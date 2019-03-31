import { parseQueryType, parsereq, query } from '../../../src/parser';
import { Get } from '../../../src/router';
import { Toto } from '../../template-app/model/Toto';

export default class Tester {
    @Get('/test/stat')
    public static stat() {
        return { tag: 'static fun' };
    }
    @Get('/test')
    public get() {
        return { nom: 'Roger' };
    }
    @Get('/param')
    @parsereq
    public getQ(@query params: any) {
        return params;
    }
    @Get('/type-parse')
    @parseQueryType(Toto)
    public getTypeParse(@query params: Toto) {
        return params;
    }
}
