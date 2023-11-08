const Message = require('../models/messageModel')
const Chat = require('../models/chatModel')


const createChat = async (req, res) => {

    const { isGroupChat, users, groupAdmin, chatName } = req.body

    if (!users || (isGroupChat && (!groupAdmin || groupAdmin?.length === 0))) {
        res.status(400);
        throw new Error("Invalid payload");
    }
    const chatExists = await Chat.find({ users: users })

    if (!isGroupChat && chatExists) {
        res.status(400);
        throw new Error("Chat already exists");
    }

    let newChat = new Chat()

    newChat = {
        isGroupChat: isGroupChat,
        users: users,
        ...(isGroupChat ? { groupAdmin: groupAdmin } : {}),
        chatName: isGroupChat ? chatName : ""
    }


    const chatCreated = await Chat.create(newChat)


    if (chatCreated)
        res.status(201).json({
            chatId: chatCreated._id
        })
    else {
        res.status(500)
        throw new Error('Internal Server Error')
    }
}

const getIndividualChat = async (req, res) => {

    const chatId = req.params.id

    if (!chatId) {
        res.status(400)
        throw new Error("Invalid Chat ID")
    }
    else {
        const messagesRetrieved = await Message.find({ chatId: chatId })
            .sort({ timeStamp: -1 })
            .select('-chatId')


        if (messagesRetrieved) {
            res.status(200).json({
                messages: messagesRetrieved
            })
        }
    }

}

const sendMessage = async (req, res) => {

    const { sentBy, message, chatId } = req.body

    if (!sentBy, !chatId) {
        res.status(400)
        throw new Error("Invalid payload")
    }
    else {
        const messageCreated = await Message.create({
            sentBy: sentBy,
            message: message || "",
            chatId: chatId,
        })


        if (messageCreated) {
            const update = {
                $set: {
                    latestMessage: messageCreated._id
                }
            };
            const condition = { _id: chatId };

            const addedLatestMessage = await Chat.updateOne(condition, update)
            if (!addedLatestMessage) {
                res.status(500);
            }
            else {
                res.status(201).json({
                    messageId: messageCreated._id
                })
            }

        }
        else {
            res.status(500)
            throw new Error('Internal Server Error')
        }
    }


}

const getListOfChats = async (req, res) => {
    const allChatsRetrieved = await Chat.find({})
        .populate("users", "-password")
        .populate("latestMessage")

    if (allChatsRetrieved) {
        res.status(200).json({
            chats: allChatsRetrieved
        })
    }
    else {
        res.status(500)
        throw new Error("Internal server error")
    }
}

module.exports = { getIndividualChat, sendMessage, getListOfChats, createChat }