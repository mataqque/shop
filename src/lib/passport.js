const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool =  require("../databases");
const helpers = require("../lib/helpers");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, user, pass, done) => {
        const {username, phone, email, password } = req.body
        let newUser = {
            username:username,
            phone,
            email,
            password,   
        };
        let checkUser = await pool.query(`SELECT * FROM users WHERE ( email = ? );`,email)
        try {
            if(checkUser.length > 0){
                req.res.send('already exist email');
                return done(null,'already exist email');
            }else{
                newUser.password = await helpers.encryptPassword(password);
                const result = await pool.query('INSERT INTO users SET ? ', newUser);
                newUser.id = result.insertId;
                req.res.send('User added')
                return done(null, newUser);
            }
        }catch(err) {
            req.res.send('error')
        }
    }
));
module.exports = {
    RegisterStrategy:(req,res,next)=>{
    }
}