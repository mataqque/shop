var execsql = require('execsql');
var dbConfig = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
};
var connected;
var sql = process.env.DATABASE;
var sqlFile = __dirname + '/db.sql';

var callback = function(err,results){
    if (err){
        if(err.code == "ER_DB_CREATE_EXISTS"){
            console.log('Already database exist')
        }
        connected.end()
        return;
    }
    
}

var connected = execsql.config(dbConfig).exec('USE project;',(err,result)=>{return}).execFile(sqlFile,callback)