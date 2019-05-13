const mongoose = require('mongoose');

//Schema는 각각의 항목 ex) name, price
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',

        //require: true는 product에 꼭 있어야 한다는 속성
        require: true
    },
    quantity: {type: Number, default: 1}


});


//'Order'라는 항목에 상수로 설정한 orderSchema의 내용을 담는다. 
module.exports = mongoose.model('Order', orderSchema);