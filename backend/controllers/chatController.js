
const getIndividualChat = (req,res)=>{
    console.log(req.params)
    res.send(`chat received ${req.params.id}`)
}

const sendMessage = (req, res) =>{
    res.send('message sent')
}

const getListOfChats = (req,res)=>{
    res.send('list of chats')
}

module.exports = {getIndividualChat,sendMessage,getListOfChats}