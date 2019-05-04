const http = require('http');

const express = require('express');
const app = express();


//PORT는 방번호
const PORT = 3000;

//app = express()를 활용한 http아래의 서버를 만들고, 그것을 서버로 규정한다. 
const server = http.createServer(app);

//서버가 시작하는 함수
server.listen(PORT, console.log('serverStarted'));

