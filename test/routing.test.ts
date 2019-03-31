import testApp from '../test-app/app';
const request = require('supertest');

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
