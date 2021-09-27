const { Router } = require("express");
const poolConnection =  require("../databases");
const pool = require("../databases");
const commands = require("../commands/commands");
const router = Router();
const { validationResult } = require('express-validator');
const passport = require('passport');
const  LocalStrategy = require('passport-local').Strategy;
const helpers = require("../lib/helpers");
const bcrypt = require('bcryptjs');
const { sign, verify } = require('../controllers/tokens');
const multer  = require('multer');
const path = require('path');
const fs = require('fs')
const pathDestination = '../public/images';
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if(fs.existsSync(path.join(__dirname,pathDestination))){
            cb(null, path.join(__dirname,'../public/images'))
        }else{
            await fs.mkdirSync(path.join(__dirname,pathDestination),{recursive:true})
            cb(null, path.join(__dirname,pathDestination))
        }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+"-"+file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/login",commands.chunkValidlogin, async (req,res)=>{
    const errors = validationResult(req);
    const {email, password } = req.body;
    if(!errors.isEmpty()){
        // console.log('enter')
        res.send(errors)
    }else{
        await pool.query(`SELECT * FROM users WHERE ( email = '${email}');`,async (err, results, field)=>{
            if(err){
                res.send(err)
            }
            if(results.length > 0){
                // let match = helpers.matchPassword(password,results[0].password)
                console.log("pass:",password,' email:',email)
                const match = await bcrypt.compare(password, results[0].password);
                if(match){
                    let token = sign(JSON.stringify(results[0]))
                    res.send({type:'token',token:token})
                }else{
                    res.send({type:'broken'})
                }
            }
            if(results.length == 0){
                res.send(results)
            }
        })

    }
    
})
router.post("/valid-login",async (req,res)=>{
    let { token } = req.body
    
    if(token == null){
        res.send({token:false })
    }else{
        if(verify(token) != false){
            let valid = await helpers.matchPassword('panpan123',JSON.parse(JSON.parse(verify(token).data)).password)
            res.send({token:valid})
        }else{ 
            res.send({token:false})
        }
    }

    // res.send({token:token,verify:verify(token)})
});

router.post("/registro",passport.authenticate('register', {
    passReqToCallback:true,
}))

router.get('/registro',(req,res)=>{
    res.send("resgistro1")
})

router.post("/upload",upload.single('archivo'),(req,res)=>{
    console.log(req.file)
    res.send(true)
})
module.exports = router