function guest(req,res,next){
    //cheack user loggen in or not
    if(!req.isAuthenticated()){
      return next()
    }
    return res.redirect('/')
}

module.exports = guest