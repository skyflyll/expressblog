'use strict'
var mongoose = require('mongoose')

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//定义数据类型
var adminSchema = new Schema({
    user_name:String,
    password:String,
    id:Number,
    create_time:String,
    admin:{type:String,default:'管理员'},
    status:Number,
    avatar:{type:String,default:'default.jpg'},
    city:String,
})

adminSchema.index({id: 1});

exports.Admins = mongoose.model("admins",adminSchema);


// var admin1 = {
//     user_name:'ces',
//     password:'ces',
//     id:1,
//     create_time:'2018-05-11',
//     admin:'管理员',
//     status:2,
//     avatar:'icon.jpg',
//     city:'贵阳',
//   }

//   Admin.create(admin1, async ()=>{
//      await console.log('kkkkkkkkkkkkkkk')
//   })
  