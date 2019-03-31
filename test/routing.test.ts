import appFactory from '../app-builder';
import testApp from '../test-app/app';
// tslint:disable-next-line no-var-requires
const request = require('supertest');

describe('Decorators - Routing w/ app generator', () => {
    describe('With a test application', () => {
        it('route on static methods', async () => {
            const app = appFactory('../app-builder/controllers-set/good');
            await request(app)
                .get('/test/stat')
                .expect(200)
                .then((res: any, ee: any) => {
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toEqual({ tag: 'static fun' });
                });
        });
    });
    describe('fails on', () => {
        it('loading a controller with duplicated routes', () => {
            expect(() => appFactory('../app-builder/controllers-set/dupl-same-controller'))
                .toThrow(/Route .* has already been registred/);
        });
        it('loading two controllers with duplicated routes', () => {
            expect(() => appFactory('../app-builder/controllers-set/dupl-two-controllers'))
                .toThrow(/Route .* has already been registred/);
        });
    });
});

describe('Decorators - Routing', () => {
    describe('With a test application', () => {
        it('route on static methods', async () =>
            await request(testApp)
                .get('/test/stat')
                .expect(200)
                .then((res: any, ee: any) => {
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toEqual({ tag: 'static fun' });
                }));
        it('route on instance methods', async () =>
            await request(testApp)
                .get('/test/')
                .expect(200)
                .then((res: any, ee: any) => {
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toEqual({ nom: 'Roger' });
                }));
    });
});

describe('Decorators - Parameters', () => {
    it('get one param value from query parameters', async () =>
        await request(testApp)
            .get('/param?id=F4K3')
            .expect(200)
            .then((res: any) => {
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toEqual({ id: 'F4K3' });
            }));

    it('type query param', async () => {
        await request(testApp)
            .get('/type-parse?id=42&name=roger')
            .expect(200)
            .then((res: any) => {
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toEqual({ id: 42, name: 'roger' });
            });
    });
});
