const { Router } = require("express");
const poolConnection =  require("../databases");
const router = Router()

router.post("/",(req,res)=>{
    console.log(req.body)
    res.send("index")
})

module.exports = router