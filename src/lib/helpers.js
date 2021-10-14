const bcrypt = require('bcryptjs');
const Manage_token = require('../controllers/tokens');
const helpers = {};
const constantAnswer = require("../commands/constantAnswer.js");


helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (err) {
        return err
    }
};

helpers.verifyUser = async (pool,res,email,password) =>{
    
}

module.exports = helpers;
