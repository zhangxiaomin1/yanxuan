const pool=require("../pool");
const express=require("express");
//创建路由对象
var router=express.Router();
//轮播图
router.get("/list",(req,res)=>{
    var sql="SELECT cid,img FROM wyv_index_carousel";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:result})
    })
})
//导出当前路由模块
module.exports=router;