module.exports = {
    login: function login(req, res, next) {
        if(!req.session.admin){
            console.log('管理员未登陆')
            return res.redirect('/admin/login')
        }
        next();
    },
    notLogin:function notLogin(req,res,next){
        if(req.session.admin){
            console.log('管理员已经登录')
            return res.redirect('back')
        }
    }
}