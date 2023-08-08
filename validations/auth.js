const { check } = require("express-validator")

exports.login = [
    check("email").trim().notEmpty().withMessage("Email boş bırakılamaz"),
    check("email").trim().isEmail().withMessage("Uygun email giriniz"),
    check("password").trim().notEmpty().withMessage("Parola boş bırakılamaz"),
    check("password").trim().isLength({ min: 5, max: 15 }).withMessage("Parola 5 ile 15 karakter içerebilir")
]

exports.register = [
    check("username").trim().notEmpty().withMessage("Kullanıcı adı boş bırakılamaz"),
    check("username").trim().isLength({ min: 2, max: 15 }).withMessage("Kullanıcı adı 2 ile 15 karakter içerebilir"),
    check("email").trim().notEmpty().withMessage("Email boş bırakılamaz"),
    check("email").trim().isEmail().withMessage("Uygun email giriniz"),
    check("password").trim().notEmpty().withMessage("Parola boş bırakılamaz"),
    check("password").trim().isLength({ min: 5, max: 15 }).withMessage("Parola 5 ile 15 karakter içerebilir")
]