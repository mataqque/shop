const express = require("express");
const helmet = require("helmet");
const morgan =  require("morgan");
const cors = require("cors")
const path = require("path")
require('dotenv').config();
const app =  express();
const PORT = process.env.PORT || 3000;
require('./lib/passport');
const passport = require('passport')
var jwt = require('jsonwebtoken');
var token = jwt.sign({
    data: 'foobar'
}, 'secret', { expiresIn: '1h' }, { algorithm: 'RS256' });
// console.log("this.",token)

jwt.verify(token, 'secret', function(err,decoded) {
    // console.log("this.token",decoded)
});

// settings
app.use(passport.initialize());
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.resolve(__dirname, '../client/build')));

//routes
app.use("/",require('./routes/routes'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT,(req,res)=>{
    console.log("Port opened: ",PORT)
})
