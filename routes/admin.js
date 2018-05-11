var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var AdminModule = require('../controller/admin')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册admin
router.get('/create',function(req,res,next){
  // res.send('index')
  var admin = {
    user_name:'linlang',
    password:'linlang',
    id:5,
    create_time:'2018-05-11',
    admin:'管理员',
    status:6,
    avatar:'icon.jpg',
    city:'贵阳',
  }
  AdminModule.create(admin).then((res)=>{
    console.log(chalk.green(res))
  });
  res.send('hhhhhhhhhh')
})

router.get('/name',(req,res,next)=>{
    var name = 'linlang';
    AdminModule.getAdminByName(name).then((res)=>{
        console.log(res)
    })
})

module.exports = router;
