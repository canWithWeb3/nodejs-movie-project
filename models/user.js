const { Schema, model } = require("mongoose")

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }],
}, { timestamps: true })

const User = model("User", userSchema)

module.exports = User