const router = require("express").Router();
const authValidation = require("../validations/auth")
const authController = require("../controllers/auth")
const Movie = require("../models/movie")
const User = require("../models/user")
const Category = require("../models/category");
const { Comment } = require("../models/comment");
const jwt = require("jsonwebtoken")

const size = 6

// login
router.post("/giris-yap", authValidation.login, authController.post_login)
router.get("/giris-yap", authController.get_login)

// register
router.post("/kayit-ol", authValidation.register, authController.post_register)
router.get("/kayit-ol", authController.get_register)



// movie add comment
router.post("/movie/:movie_slug/addComment", async (req, res) => {
    try{
        const { comment } = req.body;
        const { movie_slug } = req.params;
        if(!movie_slug){ return res.redirect("/") }

        const movie = await Movie.findOne({ slug: movie_slug }).populate("categories")
        if(!movie){ return res.redirect("/") }

        let userId
        const token = req.session.authToken
        if(token){
            const decodedToken = jwt.verify(token, "jwtPrivateKey")
            if(decodedToken._id){
                const user = await User.findOne({ _id: decodedToken._id })
                if(user){
                    userId = user._id
                }
            }
        }

        const newComment = new Comment({
            text: comment,
            user: userId
        })

        movie.comments.unshift(newComment)

        await movie.save()

        return res.status(400).json({ success: true })
    }catch(err){
        console.log("Form", err)
        return res.status(400).json({ error: "Bilinmeyen hata" })
    }
})

// movie detail
router.get("/movie/:movie_slug", async (req, res) => {
    try{
        const { movie_slug } = req.params;
        if(!movie_slug){ return res.redirect("/") }

        const movie = await Movie.findOne({ slug: movie_slug })
            .populate("categories")
            .populate({
                path: "comments",
                populate: { path: "user" }
            })
        if(!movie){ return res.redirect("/") }

        return res.render("user/movie-detail", {
            title: `${movie.original_name} (${movie.turkish_name})`,
            movie: movie
        })
    }catch(err){
        return res.redirect("/")
    }
})

// search movies
router.get("/search", async (req, res) => {
    try{
        console.log(1)
        const page = req.query.page || 1
        const offset = (page - 1) * size

        console.log(2)
        const { query } = req.query
        if(!query) { return res.redirect("/") }

        console.log(3)
        const count = await Movie.find({name: { $regex: '/.*' + query + '.*/' } }).count()
        const movies = await Movie.find({name: { $regex: '/.*' + query + '.*/' } }).limit(size).skip(offset).populate("categories").sort({ createdAt: -1 })
        console.log("movies", movies)
        let totalPages = Math.ceil(count / size)
        return res.render("user/query-movies", {
            title: query,
            movies: movies,
            totalItems: count,
            totalPages: totalPages,
            currentPage: page
        })
    }catch(err){
        console.log(6)
        return res.redirect("/")
    }
})

// category movies
router.get("/kategori/:category_slug", async (req, res) => {
    try{
        const page = req.query.page || 1
        const offset = (page - 1) * size

        const { category_slug } = req.params
        if(!category_slug) { return res.redirect("/") }

        let category = await Category.findOne({ slug: category_slug })
        if(!category){ return res.redirect("/") }

        const count = await Movie.find({ categories: { $eq: category._id } }).count()
        const movies = await Movie.find({ categories: { $eq: category._id } }).limit(size).skip(offset).populate("categories").sort({ createdAt: -1 })

        let totalPages = Math.ceil(count / size)
        return res.render("user/category-movies", {
            title: category.name,
            movies: movies,
            totalItems: count,
            totalPages: totalPages,
            currentPage: page
        })
    }catch(err){
        return res.redirect("/")
    }
})

// archive
router.get("/arsiv", async (req, res) => {
    const category = req.query.category || ""
    const imdb = req.query.imdb || 0
    const language = req.query.language || ""
    const publish_year = req.query.publish_year || 0

    let existQuery = false
    if(category && imdb && language && publish_year){
        existQuery = true
    }

    const page = req.query.page || 1
    const offset = (page - 1) * size

    let movies = []
    let selectedMovies = []
    let count = 0
    
    if(category){
        count = await Movie.find({ categories: { $eq: category }, imdb: { $gte: imdb }, publish_year: { $gte: publish_year } }).count()
        movies = await Movie.find({ categories: { $eq: category }, imdb: { $gte: imdb }, publish_year: { $gte: publish_year } }).limit(size).skip(offset).populate("categories").sort({ createdAt: -1 })
    }else{
        count = await Movie.find({ imdb: { $gte: imdb }, publish_year: { $gte: publish_year } }).count()
        movies = await Movie.find({ imdb: { $gte: imdb }, publish_year: { $gte: publish_year } }).limit(size).skip(offset).populate("categories").sort({ createdAt: -1 })
    }

    if(language){
        movies.forEach(m => {
            m.languages.forEach(l => {
                if(l == language){
                    selectedMovies.push(m)
                }
            })
        })
    }else{
        selectedMovies = movies
    }

    let publish_years = []
    const publish_yearsDB = await Movie.find().select("publish_year")
    publish_yearsDB.forEach(py => {
        if(!publish_years.includes(py.publish_year)){
            publish_years.push(py.publish_year)
        }
    })

    publish_years = publish_years.sort()
    let totalPages = Math.ceil(count / size)
    const url = req.url
    
    return res.render("user/archive", {
        title: "Arşiv",
        old: req.query,
        publish_years: publish_years,
        movies: selectedMovies,
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        existQuery: existQuery,
        url: url
    })
})

// home
router.get("/", async (req, res) => {
    try{
        const page = req.query.page || 1
        const offset = (page - 1) * size
        
        const count = await Movie.find().count()
        const movies = await Movie.find().limit(size).skip(offset).sort({ createdAt: -1 })
    
        let totalPages = Math.ceil(count / size)
        return res.render("user/home", {
            title: "Project",
            movies: movies,
            totalItems: count,
            totalPages: totalPages,
            currentPage: page
        })
    }catch(err){
        console.log("hata")
    }
})

module.exports = router