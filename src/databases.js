const mysql = require("mysql");
const { promisify } = require('util')
const { database } = require("./keys");

const pool = mysql.createPool(database);
// pool.getConnection((err:any,connection:any) => {
//     if(err){
//         if(err.code === 'PROTOCOL_CONNECTION_LOST'){
//             console.log('DATABASE CONNECTION WAS CLOSED');
//         }
//         if(err.code === 'ERR_CON_COUNT_ERROR'){
//             console.log('DATABASE HAS TOO MANY CONNECTION');
//         }
//         if(err.code === 'ECONNREFUSED'){
//             console.log('DATABASE CONNECTION WAS REFUSED');
//         }
//     }
//     if(connection){
//         connection.release();
//         console.log('DB IS CONNECTED');
//     }
//     returnOo
// });

pool.query = promisify(pool.query)

module.exports = pool