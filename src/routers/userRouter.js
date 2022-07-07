const express = require('express');
const userRouter = new express.Router();
const User = require('../schemas/User');

userRouter.post('/users', async (req, res) => {
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

userRouter.get('/users', async (req, res) => {
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

userRouter.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send('User not found');
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

userRouter.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'name', 'email', 'age', 'password' ];
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidUpdate) return res.status(400).send({ error: 'Invalid update' });
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = userRouter;