module.exports = function(req, res, next) {
    if(res.locals.isAuth){
        return res.redirect("/")
    }

    next()
}