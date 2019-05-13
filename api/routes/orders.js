const express = require('express');
const router = express.Router();
//order에 대한 CRUD를 작업.
//git에 order router로 업로드.

const mongoose = require('mongoose');

const orderModel = require('../models/order');
const productModel = require('../models/product');

// order만들기
router.post('/', (req, res) => {
    productModel.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new orderModel({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



// orderList 불러오기

router.get('/', (req, res) =>{
    orderModel.find()
        .select("product quantity _id")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                order: docs.map(doc => {
                    return{
                        // ':' 앞에 있는 것은 항목, ':' 뒤에 있는 것은 속성값. product냐 productId냐가 헷갈렸다.
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});



// orderList 삭제하기

router.delete('/:orderId', (req, res)=> {
    orderModel
        .remove({
            _id: req.params.orderId
        })
        .then(result => {
            res.status(200).json({
                message: 'order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: {productId: "ID", quantity: "Number"}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;