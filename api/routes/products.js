const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const productModel = require('../models/product');

const productController = require('../controller/productcon');


//server에서 들어온 data에 대한 응답 값(현재 req가 없다) res만 보일 것.
//DB내의 Total Data를 불러오는 작업이 이뤄지는 구간.

// /products/
router.get('/', productController.products_get_all);

// 특정 제품의 상세페이지 보기
router.get('/:productId',productController.products_get_product);


//server 켜면 postman에서 해당 메소드 통해 확인 가능.

//특정 상세페이지를 삭제하는 코딩도 위와 같으므로, 확장시켜서 연습해볼 것.

//DB에 제품 등록
router.post('/', checkAuth, productController.products_post);

router.patch('/:productId', checkAuth, productController.products_update);

//특정 id 삭제 메커니즘.
router.delete('/:productId', checkAuth, productController.products_delete);

//router를 사용하면 =반드시 적어줘야 하는 문구.
//express - framework 에서 확인할 수 있다.

module.exports = router;