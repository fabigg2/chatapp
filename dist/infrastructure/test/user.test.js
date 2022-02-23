"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const DB_1 = __importDefault(require("../settings/db/DB"));
const server_1 = __importDefault(require("../../server"));
describe('products routes', () => {
    // Applies only to tests in this describe block
    let server;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = new server_1.default();
        server.testSettings();
        yield DB_1.default.connect();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield DB_1.default.desconnect();
    }));
    test('create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.getApp())
            .post('/api/user')
            .send({ email: 'fabig4da@gmail.com' })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body.ok).toBeFalsy();
        expect(response.body.errors).not.toBeNull();
        return;
    }));
    test('create', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, supertest_1.default)(server.getApp())
                .post('/api/user')
                .send({ email: 'fabig4da@gmail.com', password: '1234', name: 'fabian', lastname: 'garces' })
                .set('Accept', 'application/json');
            // expect(response.statusCode).toBe(400);
            expect(response.body.ok).not.toBeTruthy();
            // expect(response.body.errors).not.toBeNull();
        }
        catch (error) {
            throw Error(error);
        }
        return;
    }));
    test('log in', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.getApp())
            .post('/api/auth/sign-in')
            .send({ email: 'fabig4da@gmail.com', password: '1234' })
            .set('Accept', 'application/json');
        // expect(response.statusCode).toBe(400);
        expect(response.body.ok).toBeTruthy();
        expect(response.body.data.user.email).toBe('fabig4da@gmail.com');
        expect(response.body.data.token).not.toBeNull();
        // expect(response.body.errors).not.toBeNull();
        return;
    }), 7000);
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
