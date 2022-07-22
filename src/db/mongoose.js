const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const connectionUrl = process.env.MONGODB_CONNECTION_URL;

mongoose.connect(connectionUrl);
