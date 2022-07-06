const express = require('express');
require('./db/mongoose');
const User = require('./schemas/User');
const Task = require('./schemas/Task');

const app = express();

const port = process.env.PORT || 3000;

// Automaticaly parses json into object
app.use(express.json());

app.post('/users', async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
	// user.save().then(() => {
	// 	res.status(201).send(user);
	// }).catch(() => {
	// 	res.status(400).send(e);
	// });
});

app.get('/users', async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(Error);
	}
	// User.find({}).then((users) => {
	// 	res.status(200).send(users);
	// }).catch(() => {
	// 	res.status(500).send(e);
	// });
});

app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
	// User.findById(_id).then((user) => {
	// 	if (!user) {
	// 		return res.status(404).send();
	// 	}
	// 	res.status(200).send(user);
	// }).catch(() => {
	// 	res.status(500).send(e);
	// });
});

app.post('/tasks', async (req, res) => {
	try {
		const task = new Task(req.body);
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
	// const task = new Task(req.body);
	// task.save().then(() => {
	// 	res.status(201).send(task);
	// }).catch(() => {
	// 	res.status(400).send(e);
	// });
});

app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send(error);
	}
	// Task.find({}).then((tasks) => {
	// 	res.status(200).send(tasks);
	// }).catch(() => {
	// 	res.status(500).send(e);
	// });
});

app.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById(_id);
		if (!task) return res.status(404).send();
		res.status(200).send(task);
	} catch (error) {
		res.status(500).send(error);
	}
	// Task.findById(_id).then((task) => {
	// 	if (!task) {
	// 		return res.status(404).send();
	// 	}
	// 	res.status(200).send(task);
	// }).catch(() => {
	// 	res.status(500).send(e);
	// });
});

app.listen(port, () => {
	console.log('Server is up at port ' + port);
});
