const Category = require("../models/category")

module.exports = async (req, res, next) => {
    res.locals.csrfToken = "req.csrfToken()"

    res.locals.old = {}
    res.locals.error = ""
    res.locals.errors = {}
    
    // const categories = await Category.find().sort({ name: 1 })
    const categories = []
    res.locals.categories = categories

    next()
}