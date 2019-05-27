const mongoose = require('mongoose');

const productModel = require('../models/product');

exports.products_get_all = (req, res) => {

    productModel
        .find()
        .then(docs => {
            // console.log(docs);
            // res.status(200).json(docs);

            //좀 더 세련되게 작업하는 것. 정보가 더 많은 변수를 만들어줌으로써 코드는 줄이고, 더 많은 내용을 담을 수 있게 됨.
            //url을 통해, 세부데이터를 id입력없이 링크를 통해서 확인(get)할 수 있게 된다.
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });

};

exports.products_get_product = (req, res) => {
    const id = req.params.productId;
    //if 구문의 기본적 구조 괄호: 조건식, 배열 등을 알아두고, ===는 등호, !==부등호 임을 확인.
    // if (id === 'special') {
    //     res.status(200).json({
    //         message: 'You discovered the special ID', 
    //         id: id
    //     });
    // } else {
    //     res.status(200).json({
    //         message: 'You passed an ID'
    //     });
    // }


    //특정 id의 페이지를 가져올 때
    productModel.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    message: 'docdocdoc success',
                    product: doc,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/"
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });



};

exports.products_post = (req, res) => {

    const product = new productModel({
        //_id는 몽구스에서 자동생성되고, name과 price는 body에서 입력해야 한다.
        //./models/product.js에 name과 price를 String으로 줬기 때문에, body에서 ""으로 입력해줘야 한다. 
        //ex) "name":"A01", "price": "10,000" 
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                // message: 'Handling POST requests to /products',
                // createdProduct: result
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
                    }
                }

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_update = (req, res) => {
    // res.status(200).json({
    //     message: 'Updated products'
    // });
    const id = req.params.productId;
    const updateOps = {};

    //for문으로 속성 수만큼 반복을 시켜줘야, update가 누락되지 않고 이뤄진다.
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    //특정 id를  수정할 때, body에 적어야 하는 [배열(속성이 여러개니까) 내의 {propName, value}, {...}] 예시
    //[
    // {
    //     "propName": "name",
    //         "value": "C02"
    // },
    // {
    //     "propName": "price",
    //         "value": "free"
    // }

    // ]

    productModel.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Modify Success',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" + id
                }

            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_delete = (req, res) => {
    const id = req.params.productId;
    productModel.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted Product!',
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/products/",
                    body: { name: 'String', price: 'String' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};