const express=require("express");
const pool=require("../pool");
const qs=require("querystring");
var router=express.Router();

router.get("/list",(req,res)=>{
    var pname=req.query.pname;
    var sql=`SELECT * FROM wy_product WHERE pname like '%${pname}%'`;
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result));
    })
})
module.exports=router;