const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');

const userSchema = new mongoose.Schema({
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
		unique: true,
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
	avatar: {
		type: Buffer
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, {
	timestamps: true
});

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse', { expiresIn: '3 days' });
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email: email });
	if (!user) throw new Error('Unable to login');

	const isVerified = await bcrypt.compare(password, user.password);
	if (!isVerified) throw new Error('Unable to login');
	return user;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;
	return userObject;
};

// Pre middleware functions are executed one after another, when each middleware calls next.
// This middleware bypasses updates so we will use the save method to update a document.
// Hash the plain text password.
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 9);
	}
	next();
});

// Delete user tasks when user is removed.
userSchema.pre('remove', async function (next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
