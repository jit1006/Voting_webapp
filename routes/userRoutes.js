import express from 'express';

const router = express.Router();  // jis variable ser router ko import karoge usi ko export karoge

import { jwtAuthMiddleware, generateToken } from "./../jwt.js";

import User from './../models/user.js';
// user start------
// async and await is used
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        //  create a new user document using the mongoose model
        const newUser = new User(data);
        const response = await newUser.save()
        console.log(`Data saved`);

        //jwt implementation
        const payload = {
            id: response.id
        }
        const token = generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error while saving person data" });
    }
})

//login route
router.post('/login', async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { adharCardNumber, password } = req.body;//while person enter adhar and password
        //find the user by adhar;
        const user = await User.findOne({ adharCardNumber: adharCardNumber });

        // if user does not ext or password does not match,return error
        if (!user || !await user.comparePassword(password)) {
            return res.status(404).json({ error: "Envalied username or password" });
        }
        // genrate token
        const payload = {
            id: user.id
        }
        const token = generateToken(payload);
        // return token as response
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})
//...
// list full details of current user
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;//jwtAuthMiddleware send response (user)
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(202).json({ user });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Internal server Error" });
    }
})

//change  password by user
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; //getting id trough token
        const { currentPassword, newPassword } = req.body; //getting user pasword json data from the the body
        //find the user by UserId;
        const user = await User.findById(userId);
        // if password does not match,return error
        if (!await user.comparePassword(currentPassword)) { //ye fn user table se match karega given password
            return res.status(404).json({ error: "Envalid current Password" });
        }
        //update the user's password
        user.password = newPassword;
        await user.save();
        console.log('Password Updated');
        res.status(200).json({ message: "password updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

// ------end
export default router;
