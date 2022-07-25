if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
}

const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const app = express();

require('./db/mongoose');

app.use(express.json()); // Automaticaly parses json into object
app.use(userRouter);
app.use(taskRouter);

//
// Without middleware: new request => run route handler
//
//
// With middleware: new request => do something => run route handler
//

module.exports = app;