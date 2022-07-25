const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const userTestData = require('./fixtures/user.fixtures');

beforeEach(async () => {
    await User.deleteMany();
    await new User(userTestData.userOne).save();
});

test('Should signup a new user', async () => {
    await request(app).post('/users').send(userTestData.userTwoSignUp).expect(201);
});

test('Should login existing user', async () => {
    const res = await request(app)
        .post('/users/login')
        .send(userTestData.userOneLogin)
        .expect(200);

    const user = await User.findById(res.body.user._id);
    // https://jestjs.io/docs/expect#tomatchobjectobject
    expect(res.body.user).toMatchObject({
        _id: userTestData.userOne._id,
        name: userTestData.userOne.name,
        email: userTestData.userOne.email
    });
    expect(res.body.token).toBe(user.tokens[1].token);
});

test('Should get loggedin user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userTestData.userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not login nonexisting user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'notuser@notexistingemail.com',
            password: "asdfasdfadf!"
        }).expect(400);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account for user', async () => {
    const res = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userTestData.userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userTestData.userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/IMG_1045.PNG')
        .expect(200);
    const user = await User.findById(userTestData.userOne._id);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userTestData.userOne.tokens[0].token}`)
        .send({
            name: 'Jess'
        })
        .expect(200);
    const user = await User.findById(userTestData.userOne._id);
    expect(user.name).toEqual('Jess');
});

test('Should not update invalid fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userTestData.userOne.tokens[0].token}`)
        .send({
            location: 'athens'
        })
        .expect(400);
});