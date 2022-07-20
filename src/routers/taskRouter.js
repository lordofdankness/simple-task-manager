const express = require('express');
const taskRouter = new express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

taskRouter.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body, owner: req.user });
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

taskRouter.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });

        // Or
        // await req.user.populate('tasks');
        // res.status(200).send(req.user.tasks);

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

taskRouter.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) return res.status(404).send('Task not found');
        // await task.populate('owner');
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

taskRouter.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) return res.status(404).send('Task not found');
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

taskRouter.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidUpdate) return res.status(400).send({ error: 'Invalid update' });
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) return res.status(404).send('Task not found');
        updates.forEach((update) => {
            task[update] = req.body[update];
        });
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = taskRouter;