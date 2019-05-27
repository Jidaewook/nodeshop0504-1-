const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const userModel = require('../models/user');

const userController = require('../controller/usercon');

//회원가입
//hash는 password를 보완하기 위해, 자동으로 암호화 시켜준다.
router.post('/signup', userController.user_signup);

router.delete('/:userId', userController.user_delete);

router.post('/login', userController.user_login);

module.exports = router;