import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/infrastructure/databases/prisma/index';

describe('Auth routes testing', ()=> {

    beforeAll(async() => {
        await testServer.start();
    });

    afterAll(async () => {
        testServer.close();
        await prisma.$disconnect();
    });

    beforeAll(async () => {
        await prisma.user.deleteMany();
    });
    const newUser = {
        email: 'example_test@example.com',
        password: '12345678',
        name: 'Name Test'
    };
    test('create User for login api/v1/auth/registerUser', async () => {
        const { body } = await request(testServer.app)
        .post('/api/v1/auth/registerUser')
        .send(newUser)
        .expect( 200 );
        expect( body ).toEqual(  { message: `Create user is successfully` });
    });

    test('Error email in create user api/v1/auth/registerUser', async() => {
        const { body } = await request(testServer.app)
        .post('/api/v1/auth/registerUser')
        .send({
            email: 'emailNotValid.com',
            password: '12345678',
            name: 'Name Test'
        }).expect( 400);
        expect( body ).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message: '"email" debe ser un email válido'
          });
    });

    test('Login successful user and password api/v1/auth/login', async () => {
        const {body} = await request(testServer.app)
        .post('/api/v1/auth/login')
        .send(
            {
            email: newUser.email,
            password: newUser.password})
        .expect(200);
        expect( body ).toEqual( {
            token: expect.any( String ),
            user:  expect.any( Object ),
            message: expect.any( String ),
          });
    });

    test('Error credentials login password api/v1/auth/login', async () => {
       await request(testServer.app)
        .post('/api/v1/auth/login')
        .send(
            {
            email: newUser.email,
            password: '123456789'})
        .expect(404);
    });

    test('Router no existing', async () => {
        await request(testServer.app)
        .post('/api/v1/auth/notExisting')
        .expect(404);
    });
});