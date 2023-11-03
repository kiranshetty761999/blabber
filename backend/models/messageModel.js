const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true , trim: true},
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    seenBy : [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema)
module.exports = Message