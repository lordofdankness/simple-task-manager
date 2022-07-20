const express = require('express');
const userRouter = new express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

userRouter.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
    // user.save().then(() => {
    // 	res.status(201).send(user);
    // }).catch(() => {
    // 	res.status(400).send(e);
    // });
});

userRouter.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

// By putting the custom auth function as the second argument we use the custom middleware only on the route we choose.
// After next() is called on our middleware the async function will run
userRouter.get('/users/me', auth, async (req, res) => {
    await req.user.populate('tasks');
    res.status(200).send(req.user);
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

userRouter.patch('/users/me', auth, async (req, res) => {
    // const _id = req.user._id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidUpdate) return res.status(400).send({ error: 'Invalid update' });
    try {
        // const user = await User.findById(_id);
        // if (!user) return res.status(404).send('User not found');

        const user = req.user;

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.delete('/users/me', auth, async (req, res) => {
    // const _id = req.user._id;
    try {
        // const user = await User.findByIdAndDelete(_id);
        // if (!user) return res.status(404).send('User not found');
        await req.user.remove();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = userRouter;