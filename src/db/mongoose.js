const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionUrl);

// const newUser = new User({ name: 'Karlo', age: 30, email: 'dafddfadf@der.com', password: 'qwerty1234' });

// newUser
// 	.save()
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log('error', err);
// 	});

// const newTask = new Task({ description: 'Clean Dishes' });

// newTask
// 	.save()
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log('error', err);
// 	});
