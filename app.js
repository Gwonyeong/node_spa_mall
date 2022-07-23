const express = require('express');
const connect = require('./schemas')//index라는 이름이 있는지 자동으로 확인한다.

connect();

const cartRouter = require('./routes/carts')

const app = express(); // 서버 객체를 받아오고 app에 넣어준다.
const port = 3000;

const goodsRouter = require('./routes/goods.js')

app.use(express.json())

app.use('/api', [goodsRouter, cartRouter]); //두번째인자에는 미들웨어를 두개 이상 넣을 수 있음.

app.use((req, res, next) => {
    console.log('Request Url', req.originalUrl, ' - ', new Date())
    next()
})

// app.use((req, res, next) =>{ //express에서 미들웨어를 구성하는 함수, app.get보다 먼저 실행되어야 미들웨어를 정의하고 서버에 데이터를 요청하기 때문에 항상 app.get보다는 위에 있어야한다.
//     console.log('미들웨어가 구현됐나??')//요청이 들어올 때마다 이곳을 거쳐간다.
//     console.log('주소는', req.path)
//     if(req.path === '/test'){
//         res.send('테스트 주소로 왔다.')
//     }else{
//         next(); // 다음에 있는 미들웨어로 건너간다. app.get도 하나의 미들웨어이기 때문에 next를 만나면 app.get으로 넘어감. 
//     }
// });

app.get('/' , (req, res) => {//get이라는 메소드로 받아 '/' 주소일때 첫번째 매개변수는 request 두번쨰는 response
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌어요.')
})