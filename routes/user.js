const router = require("express").Router();
const userController = require("../controllers/user")
const isUser = require("../middlewares/user");

router.post("/movie/:movie_slug/addList", isUser, userController.post_movie_add_list)

// movie add comment
router.post("/movie/:movie_slug/addComment", isUser, userController.post_movie_comment)

// movie detail
router.get("/movie/:movie_slug", userController.get_movie_detail)

// // search movies
// router.get("/search", async (req, res) => {
//     try{
//         console.log(1)
//         const page = req.query.page || 1
//         const offset = (page - 1) * size

//         console.log(2)
//         const { query } = req.query
//         if(!query) { return res.redirect("/") }

//         console.log(3)
//         const count = await Movie.find({ original_name: /.*bar*./i }).count()
//         const movies = await Movie.find({ original_name: /.*bar*./i }).limit(size).skip(offset).populate("categories").sort({ createdAt: -1 })
//         console.log("movies", movies)
//         let totalPages = Math.ceil(count / size)
//         return res.render("user/query-movies", {
//             title: query,
//             movies: movies,
//             totalItems: count,
//             totalPages: totalPages,
//             currentPage: page
//         })
//     }catch(err){
//         console.log(6)
//         return res.redirect("/")
//     }
// })

// category movies
router.get("/kategori/:category_slug", userController.get_category_movies)

// archive
router.get("/arsiv", userController.get_archive)

// home
router.get("/", userController.get_home)

module.exports = router