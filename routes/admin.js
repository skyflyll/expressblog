'sue strict'
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var sha1 = require('sha1');
var AdminModule = require('../controller/admin');
var formidable = require('formidable');
var moment = require('moment');
var adminCheck = require('../middleware/adminCheck').login;
var svgCaptcha = require('svg-captcha');

/* GET home page. */
router.get('/', adminCheck, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册admin
router.get('/create', (req, res) => {
  res.render('admin/create', { title: "admin" })
})

//提交注册处理
router.post('/create', function (req, res, next) {
  // console.log(req)
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = './upload/admin'
  form.keepExtensions = 'true';
  form.maxFieldsSize = 20 * 1024 * 1024;
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send({
        status: 0,
        type: 'FORM_DATA_ERROR',
        message: '表单信息错误'
      })
      return;
    }
    // console.log(files.avatar.name);
    // 时间格式
    var timeNow = moment().format('YYYYMMDDHHmmss');
    // 4个随机数字
    var ran = parseInt(Math.random() * 10000);
    // 获取扩展名
    var extName = path.extname(files.avatar.name);
    // 旧路径
    var oldPath = path.normalize(files.avatar.path);
    // 新路径
    var newFileName = timeNow + ran + extName;
    var newPath = './upload/admin/' + newFileName

    // 换名操作
    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        res.send({
          status: 0,
          type: "CHANGE_FILES_ERROR",
          message: '改名失败'
        })
        return
      }
      console.log('头像图片上传成功！')
      //当没有注册成功的时候删除文件
      // fs.unlink(newPath)
    })
    var admin = {
      user_name: fields.user_name,
      password: sha1(fields.password),
      avatar: newPath,
      id: 1,
      create_time: new Date(),
      admin: '管理员',
      status: 2,
      city: '太阳系'
    }
    AdminModule.getAdminByName(admin.user_name).then((result) => {
      if (result) {
        fs.unlinkSync(newPath);
        return res.send({
          status: 0,
          type: 'USER_NAME_HANS',
          message: '用户名已经存在'
        })
      } else {
        AdminModule.create(admin).then((result) => {
          const admin = result
          // console.log('result===========',admin);
          admin.password = null
          console.log(admin)
          req.session.admin = admin
          res.send('成功')
        })
      }
    })
  })
})

// 登录
router.get('/login', (req, res, next) => {
  res.render('admin/login', { title: '登录' })
})

//登录post操作
router.post('/login', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send({
        status: 0,
        type: 'LOGIN_ERROR',
        message: '登录失败'
      })
      return
    }
    //解构赋值
    const { user_name, password, status = 1 } = fields;
    const admin = AdminModule.getAdminByName(user_name).then((result) => {
      if (!result) {
        res.send({
          status: 0,
          type: 'ADMIN_ERROR_NOT',
          message: '用户未注册'
        })
        return;
      }
      // console.log(result)
      if (sha1(password) === result.password) {
        const admin = result
        admin.password = null
        req.session.admin = admin;
        res.send({
          status: 1,
          type: 'SUCCESS_LOGIN',
          message: req.session.admin
        })
      } else {
        res.send({
          status: 0,
          type: 'PASSWORD_ERROR',
          message: "用户密码错误"
        })
      }
    })
  })
})

// 获取验证码
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1i',
    noise: 5,
    color: 'red'
  });
  
  req.session.captcha = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
})

module.exports = router;
