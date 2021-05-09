function admin(req,res,next){
    //cheack user loggen in or not
    if(req.isAuthenticated() && req.user[0].role === 'admin'){
      return next()
    }
    return res.redirect('/')
}

module.exports = admin