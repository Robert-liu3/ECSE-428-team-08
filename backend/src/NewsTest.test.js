const app = require('./index').default // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

test('news', async () => {

    it('gets the test endpoint', async done => {
        const response = await request.get('/news')

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('pass!')
        done()
    })

  
});


