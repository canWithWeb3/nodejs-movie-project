const { Schema, model } = require("mongoose")

const commentSchema = Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = model("Comment", commentSchema)

module.exports = { Comment, commentSchema }