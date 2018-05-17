var mongoose = require('mongoose')

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const userInfoSchema = new Schema({
    avatar: { type: String, default: 'default.jpg' },
    username: { type: String, default: 'shuaigelang' },
    password: { type: String, default: '123456' },
    email: { type: String, default: '270901715@qq.com' },
    city: { type: String, default: 'guiyang' },
    introduce: {
        name: { type: String, default: 'lang' },
        age: { type: String, default: '23' }
    }
})

// userInfoSchema.index({username:1});
exports.UserInfo = mongoose.model('users',userInfoSchema)
// const UserInfo = mongoose.model('users', userInfoSchema)

// var users1 = {
//     avatar: 'index.jpg',
//     username: 'shuaigelang',
//     password: '1234567',
//     email: '270901715@qq.com',
//     city: 'guiyang',
//     introduce: {
//         name: 'lang',
//         age: '23'
//     }
// }

// UserInfo.create(users1, async () => {
//     console.log('llllllllllllllllllllll')
// })