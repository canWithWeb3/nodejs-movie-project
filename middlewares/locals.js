const Category = require("../models/category")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    res.locals.csrfToken = "req.csrfToken()"
    res.locals.existQuery = false
    res.locals.url = ""

    res.locals.old = {}
    res.locals.error = ""
    res.locals.errors = {}
    
    res.locals.isAuth = false
    res.locals.user = {}
    res.locals.userId = false
    res.locals.username = ""
    res.locals.isAdmin = false

    const token = req.session.authToken
    if(token){
        const decodedToken = jwt.verify(token, "jwtPrivateKey")
        if(decodedToken._id){
            const user = await User.findOne({ _id: decodedToken._id })
            if(user){
                res.locals.isAuth = true
                res.locals.userId = user._id
                res.locals.username = user.username
                res.locals.isAdmin = user.isAdmin
            }
        }
    }

    const categories = await Category.find().sort({ name: 1 })
    // const categories = []
    res.locals.categories = categories

    next()
}