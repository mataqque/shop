var jwt = require('jsonwebtoken');

module.exports = {
    sign : (values)=>{
        let token = jwt.sign({
            data: JSON.stringify(values)
        }, 'secret', { expiresIn: '1h' }, { algorithm: 'HS256' });
        return token
    },
    verify: (values)=>{
        try{
            return jwt.verify(values, 'secret', { algorithm: 'HS256' });
        }catch(err){
            if(err instanceof jwt.TokenExpiredError) {
                return false
            }
        }
    }
}