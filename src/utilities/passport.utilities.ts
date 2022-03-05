import {pool} from '../database/database';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import { helpers } from "../utilities/helpers/helpers";

export class passportUtilities{
    public helpers : helpers = new helpers();
    private connection;
    constructor (){
        this.connection = pool;
    }
    passportInit(){
        passport.serializeUser(function(user:any, done:any) {
            done(null, user);
        });
        
        passport.deserializeUser(function(user:any, done:any) {
            done(null, user);
        });
        
        passport.use('register', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
            }, async (req:any, user:any, pass:any, done:any) => {
                const {username, phone, email, password } = req.body
                let newUser = {
                    username:username,
                    password,
                    perfil:'/profile.jpg',
                    email,
                    phone,
                };
                let checkUser = await pool.query(`SELECT * FROM users WHERE ( email = ? );`,email)
                try {
                    if(checkUser.length > 0){
                        req.res.send('already exist email');
                        return done(null,'already exist email');
                    }else{
                        newUser.password = await this.helpers.encryptPassword(password);
                        const result = await pool.query('INSERT INTO users SET ? ', newUser);
                        // newUser.id_user = result.insertId;
                        req.res.send('User added')
                        return done(null, newUser);
                    }
                }catch(err) {
                    console.log(err)
                    req.res.send('error')
                }
            }
        ));
    }
}