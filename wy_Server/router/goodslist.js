const pool=require("../pool");
const express=require("express");
var router=express.Router();

//发送商品列表
router.get("/list",(req,res)=>{
    var pno=req.query.pno;      //当前页数
    var pageSize=req.query.pageSize;        //页大小
    if(!pno){
        pno=1
    }
    if(!pageSize){
        pageSize=10
    }
    var reg=/^[0-9]{1,}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:"页码格式不正确"})
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:"页大小格式不正确"})
    }
    var obj={pno:pno,pageSize:pageSize}
    var process=0;
    var sql="SELECT count(pid) as p FROM wy_product";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var pageCount=Math.ceil(result[0].p/pageSize)    
        obj.pageCount=pageCount;    //总页数
        process+=50;
        if(process==100){
            res.send({code:1,msg:obj})
        }
    })
    //当前页内容
    var offset=parseInt((pno-1)*pageSize);
    pageSize=parseInt(pageSize);
    var sql="SELECT pid,pname,subtitle,price,p_sale,pic FROM wy_product LIMIT ?,?"
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        obj.data=result;    //保存当前页内容
        process+=50;
        if(process==100){
            res.send({code:1,msg:obj})
        }
    })
})
 //查询商品详情信息
 router.get("/detail",(req,res)=>{
    var pid=parseInt(req.query.pid);
    var sql="SELECT a.pid,a.pname,a.subtitle,a.price,a.pic,b.p_id,b.sm,b.lg FROM wy_product AS a INNER JOIN yx_product_pic AS b ON a.pid=b.p_id WHERE a.pid=?";
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
});
/*//详情
router.get("/detail",(req,res)=>{
    var pid=parseInt(req.query.pid);
    var sql="SELECT * FROM wy_product WHERE pid=?"
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})*/
//商品评价
router.get("/ping",(req,res)=>{
    var sql="SELECT * FROM wy_content";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

module.exports=router;