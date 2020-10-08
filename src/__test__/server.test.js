const app = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(app);

it('tests the /bookTrip post endpoint', async done => {
    const response = await request.post('/bookTrip')
    expect(response.status).toBe(200)
    done();
})
