var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    let username = req.body.name
    let password = req.body.pwd
    if (username == 'zs' && password == '1234') {
        // let content = {name: username}
        // let token = jwt.sign(content, "1234", {
        //     expiresIn: 60*60*10
        // })
        // res
        //     .status(201)
        //     .cookie('access_token', 'Bearer ' + token, {
        //         expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
        //     })
        //     .cookie('test', 'test')
        req.session.username = username
        res.cookie('username', username, {
            maxAge: 30000,
            httpOnly: false,
            signed: true
        });
        res.redirect('/content')
    } else {
        res.send("failed")
    }
});

module.exports = router;