const router = require("express").Router();
const authValidation = require("../validations/auth")
const authController = require("../controllers/auth")
const Movie = require("../models/movie")

// login
router.post("/giris-yap", authValidation.login, authController.post_login)
router.get("/giris-yap", authController.get_login)

// register
router.post("/kayit-ol", authValidation.register, authController.post_register)
router.get("/kayit-ol", authController.get_register)

// home
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