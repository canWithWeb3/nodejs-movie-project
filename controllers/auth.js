const { validationResult } = require("express-validator");
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.post_login = async (req, res) => {
    try{
        const { email, password } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render("auth/login", {
                title: "Giriş yap",
                old: req.body,
                errors: errors.mapped()
            })
        }

        let user = await User.findOne({ email: email })
        if(!user){
            return res.render("auth/login", {
                title: "Giriş yap",
                old: req.body,
                error: "Email veya parola hatalı"
            })
        }
    
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.render("auth/login", {
                title: "Giriş yap",
                old: req.body,
                error: "Email veya parola hatalı"
            })
        }

        const token = jwt.sign({ _id: user._id }, "jwtPrivateKey")
        req.session.authToken = token

        return res.redirect("/")
    }catch(err){
        return res.render("auth/login", {
            title: "Giriş yap",
            old: req.body,
            error: "Bilinmeyen hata"
        })
    }
}

exports.get_login = (req, res) => {
    return res.render("auth/login", {
        title: "Giriş yap"
    })
}

exports.post_register = async (req, res) => {
    try{
        const { username, email, password } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render("auth/register", {
                title: "Register",
                old: req.body,
                errors: errors.mapped()
            })
        }
        let user = await User.findOne({ email: email })
        if(user){
            return res.render("auth/register", {
                title: "Register",
                old: req.body,
                errors: {
                    email: { msg: "Bu email kullanılmaktadır." }
                }
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        return res.redirect("/giris-yap")
    }catch(err){
        console.log(err)
        return res.render("auth/register", {
            title: "Register",
            old: req.body,
            error: "Bilinmeyen hata"
        })
    }
}

exports.get_register = (req, res) => {
    return res.render("auth/register", {
        title: "Kayıt ol"
    })
}