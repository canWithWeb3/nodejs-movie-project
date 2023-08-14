const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require("express-session")
// const csurf = require("csurf")

//custom modules
const path = require("path");
const locals = require("./middlewares/locals")

app.set("view engine", "ejs")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: "d8493bc7-e29a-465c-a48f-1d818c593044",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 8640000
    }
}))

// app.use(csurf())
app.use(locals)

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

const adminRoutes = require("./routes/admin")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

app.use("/admin", adminRoutes)
app.use(authRoutes)
app.use(userRoutes)

const DB_USERNAME = "canoguzorhan066"
const DB_PASSWORD = "nodejs-book-project"
const DB_DATABASE = "ecommerce"

const mongooseConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://canoguzorhan066:nodejs-book-project@cluster0.m0zvq4g.mongodb.net/movies?retryWrites=true&w=majority");
        console.log("mongodb bağlantısı kuruldu.");
    }catch(err) {
        console.log("MONDO DB ERROR", err);
    }
}

mongooseConnect()

app.listen(3000, () => {
    console.log(`Server listening on port: 3000`)
})

