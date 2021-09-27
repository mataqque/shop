const { check, body, validationResult } = require('express-validator');

module.exports = {
    verifyRequestBody:(req, res, next)=>{
        let data = body('email').isEmail()
        console.log(data)
        next()
    },
    chunkValidlogin:[
        body('email').isEmail().withMessage("enter a valid email"),
        body('password').isLength({ min: 6}).withMessage('must cotain min 6 caracteres'),
    ]
}
