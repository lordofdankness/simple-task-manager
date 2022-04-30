const mongoose = require('mongoose');
const validator = require('validator');
const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionUrl);

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is not valid!');
			}
		},
	},
	password: {
		type: String,
		trim: true,
		required: true,
		validate(value) {
			if (value.lenght < 6 || value.toLowerCase().includes('password')) {
				throw new Error('Invalid Password');
			}
		},
	},
	age: {
		type: Number,
		max: 120,
		validate(value) {
			if (value < 0) {
				throw new Error('Age cannot be negative number');
			}
		},
	},
});

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
	},
});

const newUser = new User({ name: 'Karlo', age: 30, email: 'dafddfadf@der.com', password: '123passWoRD' });

newUser
	.save()
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log('error', err);
	});

const newTask = new Task({ description: 'Clean Dishes', completed: true });

newTask
	.save()
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log('error', err);
	});
