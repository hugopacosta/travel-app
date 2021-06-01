import 'regenerator-runtime/runtime'
const request = require('supertest')
const app = require('../src/server')
const dotenv = require('dotenv');
dotenv.config();

describe('API Endpoints', () => {
    it('should retrieve city info', async() => {
        await request(app)
            .post('/api/getCoordinates')
            .send({
                cityName: "London"
            })
            .expect(200)
            .expect(function(res) {
                console.log(res.body);
                res.body.geonames[0].name = 'London';
            })
    })
})