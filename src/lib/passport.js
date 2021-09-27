const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool =  require("../databases")
const helpers = require("../lib/helpers")

passport.use('register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, user , pass, done) => {
        // console.log('')
        const {username, phone, email, password } = req.body
        let newUser = {
            username:username,
            phone,
            email,
            password,
        };
        let checkUser = await pool.query(`SELECT * FROM users WHERE ( email = '${email}');`)
        console.log(checkUser)
        if(checkUser.length > 0){
            return done();
        }else{
            newUser.password = await helpers.encryptPassword(password);
            const result = await pool.query('INSERT INTO users SET ? ', newUser);
            newUser.id = result.insertId;
            return done(null, newUser);

        }
    // Saving in the Database
    }
));