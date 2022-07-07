const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const app = express();
const port = process.env.PORT || 3000;
require('./db/mongoose');

// Automaticaly parses json into object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log('Server is up at port ' + port);
});
