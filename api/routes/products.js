const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('../models/product');



//server에서 들어온 data에 대한 응답 값(현재 req가 없다) res만 보일 것.
//DB내의 Total Data를 불러오는 작업이 이뤄지는 구간.
router.get('/', (req, res) => {

    productModel
        .find()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });

});

// 특정 제품의 상세페이지 보기
router.get('/:productId',(req, res) => {
    const id = req.params.productId;
    //if 구문의 기본적 구조 괄호: 조건식, 배열 등을 알아두고, ===는 등호, !==부등호 임을 확인.
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID', 
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});


//server 켜면 postman에서 해당 메소드 통해 확인 가능.

//특정 상세페이지를 삭제하는 코딩도 위와 같으므로, 확장시켜서 연습해볼 것.

//DB에 제품 등록
router.post('/', (req, res) =>{

    const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/', (req, res) => {
    res.status(200).json({
        message: 'Updated products'
    });
});

router.delete('/', (req, res) => {
    res.status(200).json({
        message: 'Delete products'
    });
});

//router를 사용하면 =반드시 적어줘야 하는 문구.
//express - framework 에서 확인할 수 있다.

module.exports = router;