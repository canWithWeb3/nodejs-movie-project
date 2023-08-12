const { validationResult } = require("express-validator");
const Category = require("../models/category")
const Movie = require("../models/movie")
const slugField = require("../helpers/slugfield")

// movies start
exports.post_create_movie = async (req, res) => {
    try{
        const { original_name, turkish_name, description, publish_year, imdb, trailer, categories, languages } = req.body

        const youtube = trailer.split("watch?v=")[1]
        const embeddedYoutube = `https://www.youtube.com/embed/${youtube}`

        await Movie.create({
            image: req.file.filename,
            original_name: original_name,
            turkish_name: turkish_name,
            publish_year: publish_year,
            description: description,
            imdb: imdb,
            trailer: embeddedYoutube,
            categories: categories,
            languages: languages,
            slug: slugField(original_name)
        })

        return res.redirect("/admin/movies")
    }catch(err){
        console.log(err)
        console.log("3",req.body)
        return res.render("admin/movies/create-movie", {
            title: "Film ekle",
            old: req.body,
            error: "Bilinmeyen hata"
        })
    }
}

exports.get_create_movie = async (req,res) => {
    return res.render("admin/movies/create-movie", {
        title: "Film Ekle"
    })
}

exports.get_movies = async (req, res) => {
    const movies = await Movie.find().populate("categories")
    return res.render("admin/movies/movies", {
        title: "Filmler",
        movies: movies
    })
}
// movies finish



// categories start
exports.post_delete_category = async (req, res) => {
    try{
        const { categoryid } = req.params
        if(!categoryid){
            return res.redirect("/admin/categories")
        }

        let category = await Category.findOne({ _id: categoryid })
        if(!category){
            return res.redirect("/admin/categories")
        }

        await Category.deleteOne({ _id: categoryid })
        
        return res.redirect("/admin/categories")
    }catch(err){
        return res.redirect("/admin/categories")
    }
}

exports.post_update_category = async (req, res) => {
    try{
        const { categoryid } = req.params
        const { name } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render("admin/categories/update-category", {
                title: "Update Category",
                old: req.body,
                errors: errors.mapped()
            })
        }

        let category = await Category.findOne({ _id: categoryid })
        if(!category){
            return res.redirect("/admin/categories")
        }

        category.name = name
        category.slug = slugField(name)
        await category.save()

        return res.redirect("/admin/categories")
    }catch(err){
        return res.render("admin/categories/update-category", {
            title: "Update Category",
            old: req.body,
            error: "Bilinmeyen hata"
        })
    }
}

exports.get_update_category = async (req, res) => {
    try{
        const { categoryid } = req.params
        if(!categoryid){
            return res.redirect("/admin/categories")
        }

        const category = await Category.findOne({ _id: categoryid })
        if(!category){
            return res.redirect("/admin/categories")
        }

        return res.render("admin/categories/update-category", {
            title: "Update Category",
            category: category
        })
    }catch(err){
        return res.redirect("/admin/categories")
    }
}

exports.post_create_category = async (req, res) => {
    try{
        const { name } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render("admin/categories/create-category", {
                title: "Create Category",
                old: req.body,
                errors: errors.mapped()
            })
        }

        await Category.create({
            name: name,
            slug: slugField(name)
        })

        return res.redirect("/admin/categories")
    }catch(err){
        return res.render("admin/categories/create-category", {
            title: "Create Category",
            old: req.body,
            error: "Bilinmeyen hata"
        })
    }
}

exports.get_create_category = (req, res) => {
    return res.render("admin/categories/create-category", {
        title: "Create Category"
    })
}

exports.get_categories = (req, res) => {
    return res.render("admin/categories/categories", {
        title: "Kategoriler"
    })
}
// categories finish
