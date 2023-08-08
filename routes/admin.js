const router = require("express").Router();
const adminValidation = require("../validations/admin")
const adminController = require("../controllers/admin")
const imageUpload = require("../helpers/image-upload")

// movies start
// router.post("/categories/:categoryid/delete", adminController.post_delete_category)
// router.post("/categories/:categoryid/update", adminValidation.category, adminController.post_update_category)
// router.get("/categories/:categoryid/update", adminController.get_update_category)
router.post("/movies/create", imageUpload.upload.single("image"), adminController.post_create_movie)
router.get("/movies/create", adminController.get_create_movie)
router.get("/movies", adminController.get_movies)
// movies finish

// categories start
router.post("/categories/:categoryid/delete", adminController.post_delete_category)
router.post("/categories/:categoryid/update", adminValidation.category, adminController.post_update_category)
router.get("/categories/:categoryid/update", adminController.get_update_category)
router.post("/categories/create", adminValidation.category, adminController.post_create_category)
router.get("/categories/create", adminController.get_create_category)
router.get("/categories", adminController.get_categories)
// categories finish


// dashboard
router.get("/", (req, res) => {
    res.render("admin/dashboard", {
        title: "Admin"
    })
})

module.exports = router