import 'regenerator-runtime/runtime'
const request = require('supertest')
const app = require('../src/server')

describe('API Endpoints', () => {
    it('should retrieve city info', async() => {
        const res = await request(app)
            .post('/api/getCoordinates')
            .send({
                cityName: "London"
            })
            .expect(200)
            .expect(function(res) {
                res.body.geonames[0].name = 'London';
            })
    })
})