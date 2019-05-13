const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userModel = require('../models/user');

//회원가입
//hash는 password를 보완하기 위해, 자동으로 암호화 시켜준다.
router.post('/signup', (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new userModel({
            _id: new mongoose.Types.ObjectId(),
            userName: req.body.username,
            email: req.body.email,
            password: hash
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
        }
    }); 


    // const user = new userModel({
    //     _id: new mongoose.Types.ObjectId(),
    //     userName: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // user
    //     .save()
    //     .then(result => {
    //         res.status(200).json({
    //             message: 'User created',
    //             createdUser: result

    //         });
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             error: err
    //         });
    //     });

});




module.exports = router;