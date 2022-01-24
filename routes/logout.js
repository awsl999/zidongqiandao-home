var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    //删除Cookie  
    res.clearCookie('username')
    req.session.username = ""
    //回到/login路由
    res.redirect('/login');
})


module.exports = router;