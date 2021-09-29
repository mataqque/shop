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
            let desencrypted = jwt.verify(values, 'secret', { algorithm: 'HS256' });
            return desencrypted

        }catch(err){
            return err
        }
    },
    parse(token){
        JSON.parse(JSON.parse(jwt.verify(values, 'secret', { algorithm: 'HS256' })))
    }
}