const { Schema, model } = require("mongoose")

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Category = model("Category", categorySchema)

module.exports = Category