import testApp from '../../test-app/app';
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
