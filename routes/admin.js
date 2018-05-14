'sue strict'
var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var sha1 = require('sha1');
var AdminModule = require('../controller/admin');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册admin
router.get('/create', (req, res) => {
  res.render('admin', { title: "admin" })
})
router.post('/create', function (req, res, next) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err,fields,files)=>{
    if(err){
      res.send({
        status:0,
        type:'FORM_DATA_ERROR',
        message:'表单信息错误'
      })
      return
    }
    console.log(fields,files)
  })
  res.send('mmmmmmmmmmmmmmmmmmm')
})


//根据名字获取管理员
router.get('/name', (req, res, next) => {
  var name = 'linlang';
  AdminModule.getAdminByName(name).then((res) => {
    console.log(res)
  })
})

router.get('/login', (req, res, next) => {

})

module.exports = router;
