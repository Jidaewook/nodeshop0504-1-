const http = require('http');

const express = require('express');
const app = express();

//morgan은 로그를 꼬박꼬박 보여주는 것
//모건은 npm으로 설치해야 하는 것
const morgan = require('morgan');

const bodyParser = require('body-parser');


const mongoose = require('mongoose');


//https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C 
//app이 인풋을 먹으면 아웃풋을 내보낸다. 
//http200번을 응답하는 상황이되면 
// app.use((req, res) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//mongooDB connect
const db = 'mongodb+srv://psatdoctor:passgosi1q2w@cluster0-vqcjp.mongodb.net/test?retryWrites=true';

mongoose.connect(db, {useNewUrlParser: true})
    //then은 그 다음 상황을 보여주는 경우
    .then( () => console.log("MongoDB Connected.."))
    //catch는 에러를 잡는 경우
    .catch(err => console.log(err));


//morgan의 dev버전을 선택해 사용하는 것. 모건의 홈페이지에 가면 다양한 버전을 볼 수 있다.
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);





app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


//PORT는 방번호
const PORT = 3000;

//app = express()를 활용한 http아래의 서버를 만들고, 그것을 서버로 규정한다. 
const server = http.createServer(app);

//서버가 시작하는 함수
//http://localhost:3000 에서 이러한 작업이 일어난다. (포트에서)
server.listen(PORT, console.log('serverStarted'));

