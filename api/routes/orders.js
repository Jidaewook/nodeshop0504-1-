const express = require('express');
const router = express.Router();
//order에 대한 CRUD를 작업.
//git에 order router로 업로드.

// const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const orderController = require('../controller/ordercon');

// const orderModel = require('../models/order');
// const productModel = require('../models/product');

// order만들기
router.post('/', checkAuth, orderController.order_post);



// orderList 불러오기

router.get('/', checkAuth, orderController.order_get_all);



// orderList 삭제하기

router.delete('/:orderId', checkAuth, orderController.order_delete);


module.exports = router;