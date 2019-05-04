const http = require('http');

const express = require('express');
const app = express();

//morgan은 로그를 꼬박꼬박 보여주는 것
//모건은 npm으로 설치해야 하는 것
const morgan = require('morgan');

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


//morgan의 dev버전을 선택해 사용하는 것. 모건의 홈페이지에 가면 다양한 버전을 볼 수 있다.
app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

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

