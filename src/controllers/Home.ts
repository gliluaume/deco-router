import { Get } from '../router';

export default class Home {
    @Get('/stat')
    public static stat() {
        console.log('statstatstatstatstatstatstat');
        return { tag: 'static fun' };
    }
    @Get('/')
    public get() {
        console.log('getgetgetgetgetgetgetgetget');
        return { nom: 'Roger' };
    }
}
