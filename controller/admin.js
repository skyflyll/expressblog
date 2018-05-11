'use strict'
/**
 * admins 操作
 */
var Admins = require('../models/admin').Admins
module.exports = {
    create:(admin)=> {
        console.log(admin)
        return Admins.create(admin)
    },
    getAdminByName:(name) =>{
        return Admins.findOne({ user_name: name })
    }
}