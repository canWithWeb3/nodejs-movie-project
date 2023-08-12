module.exports = function(req, res, next) {
    if(!res.locals.isAdmin){
        return res.redirect("/")
    }

    next()
}