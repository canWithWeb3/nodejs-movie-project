const { Schema, model } = require("mongoose")

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
    categories: [{
        type: Schema.Types.ObjectId, 
        ref: "Category",
        required: true
    }],
    slug: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Movie = model("Movie", movieSchema)

module.exports = Movie