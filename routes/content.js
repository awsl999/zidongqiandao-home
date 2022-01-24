var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
   res.send("cookie---" + req.signedCookies.username + "---session---" + req.session.username)
})


module.exports = router;