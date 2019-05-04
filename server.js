const http = require('http');

const express = require('express');
const app = express();


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

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//PORT는 방번호
const PORT = 3000;

//app = express()를 활용한 http아래의 서버를 만들고, 그것을 서버로 규정한다. 
const server = http.createServer(app);

//서버가 시작하는 함수
//http://localhost:3000 에서 이러한 작업이 일어난다. (포트에서)
server.listen(PORT, console.log('serverStarted'));

