module.exports = function(req, res, next) {
    if(!res.locals.isAuth){
        return res.redirect("/giris-yap")
    }

    next()
}