const pool=require("../pool");
const express=require("express");
var router=express.Router();

//购物车
router.get("/list",(req,res)=>{
    var obj={code:1,msg:[
        {lid:1,name:"手持挂烫机",price:599,count:1},
        {lid:2,name:"千层星云酥",price:19.9,count:2},
        {lid:3,name:"全棉四件套",price:199,count:1}
    ]};
    res.send(obj);
})

module.exports=router;