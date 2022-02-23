import request from 'supertest';
import DB from '../settings/db/DB';
import Server from '../../server';


describe('products routes', () => {
    // Applies only to tests in this describe block
    let server: any;
    beforeAll(async () => {
        server = new Server();
        server.testSettings();
        await DB.connect();
    })

    afterAll(async () => {
        await DB.desconnect();
    })


    test('create user', async () => {
        const response = await request(server.getApp())
            .post('/api/user')
            .send({ email: 'fabig4da@gmail.com' })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body.ok).toBeFalsy();
        expect(response.body.errors).not.toBeNull();
        return
    })
    test('create', async () => {
        try {
            const response = await request(server.getApp())
                .post('/api/user')
                .send({ email: 'fabig4da@gmail.com', password: '1234', name: 'fabian', lastname: 'garces' })
                .set('Accept', 'application/json');
            // expect(response.statusCode).toBe(400);
            expect(response.body.ok).not.toBeTruthy();
            // expect(response.body.errors).not.toBeNull();
        } catch (error: any) {
            throw Error(error)
        }

        return
    })
    test('log in', async () => {

        const response = await request(server.getApp())
            .post('/api/auth/sign-in')
            .send({ email: 'fabig4da@gmail.com', password: '1234' })
            .set('Accept', 'application/json');
        // expect(response.statusCode).toBe(400);
        expect(response.body.ok).toBeTruthy()
        expect(response.body.data.user.email).toBe('fabig4da@gmail.com')
        expect(response.body.data.token).not.toBeNull()


        // expect(response.body.errors).not.toBeNull();
        return
    }, 7000)



    // test('add product', async()=>{
    //     try {

    //         const response = await request(Server.app)
    //         .post('/api/product')
    //         .set('Accept', 'application/json')
    //         .set('Content-Type', 'application/json')
    //         .send({
    //             name:'camisa'
    //         });
    //         expect(response.body.ok).not.toBeTruthy();
    //         console.log(response.body);
    //         return 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })


});