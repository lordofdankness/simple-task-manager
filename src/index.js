const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const app = express();
const port = process.env.PORT || 3000;
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


app.listen(port, () => {
	console.log('Server is up at port ' + port);
});