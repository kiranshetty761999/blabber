const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectToDb = require('./config/dbConnection')
const userRouter = require('./routers/userRouter')
const chatRouter = require('./routers/chatRouter')

const app = express()
connectToDb()
dotenv.config()

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
  })
);


const PORT = process.env.PORT || 4000
app.use(express.json())
app.use('/v1/user', userRouter)
app.use('/v1/chat', chatRouter)

app.get('/', (req, res) => {
  res.send('<p><center><h1>API IS WORKING</h1></center></p>')
})

app.listen(4000, () => {
  console.log(`Blabber chat app server is operational on port ${PORT}.`)
})