
const  mongoose = require('mongoose');
const md5 = require('md5')
const jwt = require('jwt-simple')
const SERCRET = 'DUANBOYU'
async function register(req, res) {
    const { username, password } = req.body;
    try {
        const Model = mongoose.model('user');
        if (username && password) {
            const r = await Model.findOne({ username })
            if (r) {
                res.json({ message: '用户名重复', status: 400 })
            } else {
                const save = await Model.create({ username, password: md5(password), register_time: Date.now() });
                if (save) {
                    const token = jwt.encode({ username }, SERCRET)
                    res.json({ status: 200, message: 'success', data: {token} })
                } else {
                    res.json({ status: 500, message: '保存失败' })
                }
            }
        } else {
            res.json({ status: 400, message: '参数错误' })
        }
    
    } catch (error) {
        res.json({message:'服务器错误',status:500})
        
    }

    
    
}
async function login(req, res) {
    const { username, password } = req.body;
    try {
        const Model = mongoose.model('user');
        if (username && password) {
            const r = await Model.findOne({ username })
            if (r) {
                const {  password:passwordDB } = r;
                if (passwordDB === md5(password)) {
                    const token = jwt.encode({ username }, SERCRET)
                    res.json({ status: 200, message: 'success', data: {token} })
                } 
               
            } else {
                res.json({ status: 400, message: '用户名密码错误' })
            }
        } else {
            res.json({ status: 400, message: '参数错误' })
        }
    
    } catch (error) {
        res.json({message:'服务器错误',status:500})
        
    }
}

async function getUserInfo(req, res) {
    const token = req.headers.token;
    try {
        if (token) {
            const user = jwt.decode(token, SERCRET)
            const Model = mongoose.model('user');
            const r = await Model.findOne(user)
            if (r) {
                res.json({ status: 200, data: r, message: '' })
            } else {
                throw new Error();
            }
        } else {
            res.json({status:401,message:'未登录'})
        }
    } catch (error) {
        res.json({status:401,message:'未登录'})
        
    }
    
    
    
 }

module.exports = {register,login,getUserInfo}