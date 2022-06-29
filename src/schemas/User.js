const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = User;
