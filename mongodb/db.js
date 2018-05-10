const mongoose =require('mongoose');
const chalk = require('chalk');
mongoose.connect('mongodb://localhost/edb')

const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
})
