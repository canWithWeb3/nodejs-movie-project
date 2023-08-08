const router = require("express").Router();
const authValidation = require("../validations/auth")
const authController = require("../controllers/auth")
const Movie = require("../models/movie")
const Category = require("../models/category")

// login
router.post("/giris-yap", authValidation.login, authController.post_login)
router.get("/giris-yap", authController.get_login)

// register
router.post("/kayit-ol", authValidation.register, authController.post_register)
router.get("/kayit-ol", authController.get_register)

// home
router.get("/movie/:movie_slug", async (req, res) => {
    try{
        const { movie_slug } = req.params;
        if(!movie_slug){ return res.redirect("/") }

        const movie = await Movie.findOne({ slug: movie_slug })
        if(!movie){ return res.redirect("/") }

        return res.render("user/movie-detail", {
            title: `${movie.original_name} (${movie.turkish_name})`,
            movie: movie
        })
    }catch(err){
        return res.redirect("/")
    }
})

router.get("/kategori/:category_slug", async (req, res) => {
    try{
        const { category_slug } = req.params
        if(!category_slug) { return res.redirect("/") }

        let category = await Category.findOne({ slug: category_slug })
        if(!category){ return res.redirect("/") }

        const movies = await Movie.find({ categories: { $eq: category._id } }).populate("categories")

        return res.render("user/category-movies", {
            title: category.name,
            movies: movies
        })
    }catch(err){
        return res.redirect("/")
    }
})

router.get("/arsiv", async (req, res) => {
    res.render("user/archive", {
        title: "Arşiv"
    })
})

router.get("/", async (req, res) => {
    const movies = await Movie.find()
    res.render("user/home", {
        title: "Project",
        movies: movies
    })
})

module.exports = router