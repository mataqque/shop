module.exports = {
    database:{
        host: process.env.HOST_DATABASE,
        user: process.env.USER_DATABASE,
        // password: '$Heliopassword123',
        password: '',
        database:process.env.DATABASE,
        port:process.env.DB_PORT,
        decimalNumbers:true
    }
}
