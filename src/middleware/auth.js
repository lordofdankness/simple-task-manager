const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        if (!user) throw new Error();
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};

module.exports = auth;