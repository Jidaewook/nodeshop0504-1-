const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userModel = require('../models/user');

//회원가입
router.post('/signup', (req, res) => {
    const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user
        .save()
        .then(result => {
            res.status(200).json({
                message: 'User created',
                createdUser: result

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});




module.exports = router;