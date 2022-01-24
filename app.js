var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var contentRouter = require('./routes/content');
var zhuanfaRouter = require('./routes/zhuanfa');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser('123456'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '123456',
  name: 'session',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30000,
    secure: false
  },
  rolling: true, //在每次请求时强行设置 cookie，重置 cookie 过期时间（默认：false）
}))

//  检测是否登录
app.use(function(req, res, next) {
  // 判断不拦截的路由 出/login和/之外的都拦截
  if (req.query.rand != "fafdagadafa") {
      res.end() 
      return
  } 
  //如果登录过，我们就执行下一个中间件
  next();
});
app.use('/logout', logoutRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/content', contentRouter);
app.use('/zhuanfa', zhuanfaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;