const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const { register,getUserInfo, login } = require('./services')
const { connectDB} = require('./model')

app.use(bodyParser.json())
app.post('/api/register', register);
app.post('/api/login',login)
app.post('/api/user_info',getUserInfo)

app.use((req,res) => {
    console.log(req.url)
    res.end('404')
})

connectDB(() => {
    // 数据库连接成功 启动服务器
    app.listen(PORT, () => {
        console.log(`Server Start at ${PORT}`);
    })
})


   

