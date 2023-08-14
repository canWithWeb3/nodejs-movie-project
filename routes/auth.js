const router = require("express").Router();
const authValidation = require("../validations/auth")
const authController = require("../controllers/auth")
const user = require("../middlewares/user")
const notUser = require("../middlewares/notUser")
const userImageUpload = require("../helpers/user-image-upload")

// profile
router.post("/profilim/changeImage", user, authController.post_change_image)
router.get("/profilim", user, authController.get_profile)

// logout
router.post("/cikis-yap", user, authController.post_logout)

// login
router.post("/giris-yap", notUser, authValidation.login, authController.post_login)
router.get("/giris-yap", notUser, authController.get_login)

// register
router.post("/kayit-ol", notUser, authValidation.register, authController.post_register)
router.get("/kayit-ol", notUser, authController.get_register)

module.exports = router