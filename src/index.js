const express = require("express");
const helmet = require("helmet");
const morgan =  require("morgan");
const cors = require("cors")
const path = require("path")
const favicon = require('express-favicon');
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
app.use(favicon(path.join(__dirname,'../client/build/favicon.ico')));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(morgan("dev"))
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", 'ourAuth0domain.us.auth0.com'],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        imgSrc: ["'self'", 'https://ourAuth0domain.us.auth0.com', 'data:'],
        connectSrc: ["'self'", 'https://ourAuth0domain.us.auth0.com/oauth/token'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"]
        },
        reportOnly: true
    }
}));
app.disable("x-powered-by");

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use("/",require('./routes/routes'));

// app.get('/registro', (req, res) => {
//     res.status(401)
//     // res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT,(req,res)=>{
    console.log("Port opened: ",PORT)
})
