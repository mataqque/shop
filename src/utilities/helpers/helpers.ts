const bcrypt = require('bcryptjs');
export class helpers{
    public encryptPassword = async (password:string) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    matchPassword = async (password:string, savedPassword:string) => {
        try {
            return await bcrypt.compare(password, savedPassword);
        } catch (err) {
            return err
        }
    }
    verifyUser = async (pool:any,res:any,email:string,password:string) =>{
        
    }
}


