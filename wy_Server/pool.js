//创建mysql连接池
const mysql=require('mysql');
var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'wy_V',
    connectionLimit:10
});
//导出连接池
module.exports=pool;