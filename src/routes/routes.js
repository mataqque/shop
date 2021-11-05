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
const Manage_token = require('../controllers/tokens');
const multer  = require('multer');
const path = require('path');
const fs = require('fs')
const pathDestination = '../public/images';
const constantAnswer = require("../commands/constantAnswer.js");
const RegisterStrategy = require("../lib/passport")

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
    console.log(password)

    if(!errors.isEmpty()){
        res.send(errors)
    }else{
        await pool.query(`SELECT * FROM users WHERE ( email = ? );`,[email],async (err, results, field)=>{
            try{
                if(err){
                    res.send(err)
                }
                if(results.length > 0){
                    const match = await bcrypt.compare(password, results[0].password);
                    console.log({match})
    
                    if(match){
                        let token = await Manage_token.sign(JSON.stringify(results[0]))
                        res.send({type:true,token:token})
                    }else{
                        res.send({type:false,token:null})
                    }
                }
                if(results.length == 0){
                    res.send({result:constantAnswer.USERNAME_PASSWORD_COMBINATION_ERROR,status:401,type:false})
                }
            }catch(err){
                console.error(err)
                return err
            }
        })
    }
    
});


router.post("/checkUser",async (req,res)=>{
    let { token } = req.body
    
    let verify = await Manage_token.verify(token);  
    if(verify){
        let dataSet = Manage_token.parse(token);
        res.send({token:true,dataSet:dataSet})
        
    }else{
        res.send({token:false })
    }
});

// router.post("/registro",RegisterStrategy.RegisterStrategy);
router.post("/registro",passport.authenticate('register',{passReqToCallback:true}),(req,res)=>{
    console.log(req.body)
});

router.post("/signout",(req,res)=>{
    let add = Manage_token.parse(req.body.token);
    res.send(add)
});
router.post("/signin",(req,res)=>{
    let add = Manage_token.sign(req.body.token);
    res.send(add)
});




router.post("/upload",upload.single('archivo'), async (req,res)=>{
    const {filename, encoding, mimetype, size, path, destination } = req.file;
    const file = {
        filename:filename,
        coding:encoding,
        mimetype:mimetype,
        destination:destination,
        size:size,
        path:path,
    }
    const newFile = await pool.query('INSERT INTO files SET ? ',file)
    res.send({newFile:newFile})
})

router.post('/all-images',async (req,res)=>{
    const allFiles = await pool.query('SELECT * FROM files');
    res.send(allFiles)
})

router.post('/add-slider',async (req,respond)=>{
    try{
        if(req.body.length == 0){
            await pool.query( "DELETE FROM slider;");
            respond.send('DOSNT EXIST ITEM')
        }else{
            var result = req.body.map((e)=>Object.values(e));
            await pool.query( "DELETE FROM slider;");
            let newFile = await pool.query(`INSERT INTO slider(id,imageDesk,imageMobile,alt,title,type) VALUES ?;`,[result],(err, res) => {
                if(err) throw err;
                respond.send('UPDATE DATA')
            })
        }
    }catch(err){
        respond.send('ERROR, UPDATING')
    }
})

router.get('/get-sliders',async (req,res)=>{
    const allSlides = await pool.query('SELECT * FROM slider');
    res.send(allSlides)
})  

router.get('/get-slider-main',async (req,res)=>{
    const allSlides = await pool.query('SELECT * FROM slider WHERE type = "slider-main";');
    res.send(allSlides)
})  
module.exports = router