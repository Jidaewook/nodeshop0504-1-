const express = require('express');
const router = express.Router();


//server에서 들어온 data에 대한 응답 값(현재 req가 없다) res만 보일 것.
router.get('/', (req, res) => {
    res.status(200).json({
       message: 'Handling GET requests to /products' 
    });
});


//server 켜면 postman에서 해당 메소드 통해 확인 가능.
router.post('/', (req, res) =>{
    res.status(201).json({
        message: 'Handling POST requests to /products'
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