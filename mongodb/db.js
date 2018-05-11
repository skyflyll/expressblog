const mongoose =require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://localhost/edb',(err)=>{
  if(err) return console.log(chalk.red('链接数据库失败！'));
  console.log(chalk.green("链接数据库成功！"))
})
