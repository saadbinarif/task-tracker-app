require('dotenv').config({ path: '.env.test' });
const request = require('supertest')

let appServer 


describe('/tasks', ()=>{
    beforeEach(()=>{ appServer = require('../app') })
    afterEach(()=>{ appServer.close(); })
    describe('GET /', ()=>{
        it('should return all tasks', async()=>{
            const res = await request(appServer).get('/tasks')
            expect(res.status).toBe(200)
        })

    });
});