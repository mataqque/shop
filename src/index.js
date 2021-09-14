const express = require("express");
const helmet = require("helmet");
const morgan =  require("morgan");
const cors = require("cors")
const path = require("path")
require('dotenv').config();
const app =  express();
const PORT = 3000 || process.env.PORT;
var jwt = require('jsonwebtoken');
var token = jwt.sign({
    data: 'foobar'
}, 'secret', { expiresIn: '1h' }, { algorithm: 'RS256' });
// console.log("this.",token)

jwt.verify(token, 'secret', function(err,decoded) {
    console.log("this.token",decoded) // bar
});

// settings
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use("/login",require('./routes/routes'));

app.listen(PORT,(req,res)=>{
    console.log("Port opened: ",PORT)
})