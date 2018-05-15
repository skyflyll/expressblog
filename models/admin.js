'use strict'
var mongoose = require('mongoose')

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//定义数据类型
var adminSchema = new Schema({
    user_name:String,
    password:String,
    id:{type:Number,default:1},
    create_time:{type:Date,default:new Date()},
    admin:{type:String,default:'管理员'},
    status:{type:Number,default:2},
    avatar:{type:String,default:'default.jpg'},
    city:{type:String,default:'贵阳'},
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
  