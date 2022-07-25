const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();

const userOneSignUp = {
    name: 'Timbo',
    email: 'timbo@testemail.com',
    password: 'MyPass777!'
};

const userOneLogin = {
    email: 'timbo@testemail.com',
    password: "MyPass777!"
};

const userOne = {
    _id: userOneId,
    name: 'Timbo',
    email: 'timbo@testemail.com',
    password: 'MyPass777!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

const userTwoSignUp = {
    name: 'Fimbo',
    email: 'fimbo@testemail.com',
    password: 'MyPass888!'
};

const userTwoLogin = {
    email: 'fimbo@testemail.com',
    password: 'MyPass888!'
};

module.exports = {
    userOneSignUp,
    userOneLogin,
    userOne,
    userTwoSignUp,
    userTwoLogin
};