const router = require('express').Router()

router.get('/test',(req,res)=>{res.send('chat received')})


module.exports = router