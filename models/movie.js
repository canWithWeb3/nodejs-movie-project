const { Schema, model } = require("mongoose")
const { commentSchema } = require("../models/comment")

const movieSchema = Schema({
    image: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true
    },
    turkish_name: {
        type: String,
        required: true
    },
    publish_year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    imdb: {
        type: Number,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
    languages: [{
        type: String,
        required: true
    }],
    slug: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, { timestamps: true })

const Movie = model("Movie", movieSchema)

module.exports = Movie