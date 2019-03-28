import { Get } from '../router';

export default class Home {
    @Get('/stat')
    public static stat() {
        return { tag: 'static fun' };
    }
    @Get('/')
    public get() {
        return { nom: 'Roger' };
    }
}
