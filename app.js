var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStroe = require('connect-mongo')(session);
var app = express();

//链接数据库
var mongo = require('./mongodb/db')
var users = require('./models/users')

//路由
var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//验证码
// var captcha = svgCaptcha.create();
// console.log('captcha------------------',captcha);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'edb',
  key: 'edb.id',
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  resave: false,
  saveUninitialized: true,
  store: new MongoStroe({
    url: 'mongodb://localhost/edb'
  })
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

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
