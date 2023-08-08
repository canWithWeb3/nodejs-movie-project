const { check } = require("express-validator")

exports.movie = [
    check("image").notEmpty().withMessage("Resim boş bırakılamaz"),
    check("original_name").trim().notEmpty().withMessage("Orijinal adı boş bırakılamaz"),
    check("original_name").trim().isLength({ min: 2 }).withMessage("Orijinal adı en az 2 karakter içerebilir"),
    check("turkish_name").trim().notEmpty().withMessage("Türkçe adı boş bırakılamaz"),
    check("turkish_name").trim().isLength({ min: 2 }).withMessage("Türkçe adı en az 2 karakter içerebilir"),
    check("publish_year").trim().notEmpty().withMessage("Yapım yılı boş bırakılamaz"),
    check("publish_year").trim().isNumeric().withMessage("Yapım yılı boş bırakılamaz"),
    check("imdb").trim().notEmpty().withMessage("Imdb boş bırakılamaz"),
    check("imdb").trim().isNumeric().withMessage("Imdb boş bırakılamaz"),
    check("categories").notEmpty().withMessage("Kategori boş bırakılamaz")
]

exports.category = [
    check("name").trim().notEmpty().withMessage("Adı boş bırakılamaz"),
    check("name").trim().isLength({ min: 2 }).withMessage("Adı en az 2 karakter içerebilir")
]

