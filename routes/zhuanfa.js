const express = require('express')
const dingshi = require('../utils/dingshi')
const proxy = require('express-http-proxy')
const open = require('open')
var router = express.Router();


const url = 'https://app.upc.edu.cn/ncov/wap/default/index'
const openBrowser = async () => {   
    await open(url)
}

dingshi.scheduleCronStyle('20 0 0 * * *', openBrowser)

router.get('/', proxy('http://39.103.134.90:3000', {
    //过滤器（可选）
    filter: function (req, res) {
        return req.method == 'GET';
    },
    //请求路径解析（可选）
    proxyReqPathResolver: function (req) {

        console.log(`请求的路径：${req.url}`); //请求的路径：/article/list

        return `${req.url}` //转发请求路径： /article/list?token=123456
    },
    //返回数据处理,如果过程有异步操作应返回Promise（可选）
    userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
        //同步
        return proxyResData.toString('utf8')
        //异步
        // return new Promise(function (resolve) {
        //     proxyResData.funkyMessage = 'oi io oo ii';
        //     setTimeout(function () {
        //         resolve(proxyResData);
        //     }, 200);
        // });
    },
}))

module.exports = router;