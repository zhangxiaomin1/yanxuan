const pool=require("../pool");
const express=require("express");
var router=express.Router();

//新闻分页显示
router.get("/list",(req,res)=>{
    var pno=req.query.pno;  //当前页码
    var pageSize=req.query.pageSize;    //每页行数
    if(!pno){
        pno=1;
    }
    if(!pageSize){
        pageSize=10;
    }
    //验证用户输入
    var reg=/^[0-9]{1,}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:"页码格式不正确"});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:"页大小格式不正确"});
        return;
    }
    //创建SQL发送
    //总记录数
    //创建一个空对象，保存返回数据
    var obj={pno:pno,pageSize:pageSize};
    var progress=0;
    var sql="SELECT count(id) as c FROM wy_news";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var pageCount=Math.ceil(result[0].c/pageSize);
        obj.pageCount=pageCount;//总页数
        progress+=50;
        if(progress==100){
            res.send({code:1,msg:obj})
        }
    })
    //当前页内容
    var offset=parseInt((pno-1)*pageSize);
    pageSize=parseInt(pageSize);
    var sql="SELECT id,title,ctime,click,img_url FROM wy_news LIMIT ?,?";
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        obj.data=result;   //保存当前页内容
        progress+=50;     //进度加50
        if(progress==100){    //如果两条SQL语句全部完成
            res.send({code:1,msg:obj})  //发送
        }
    })
});
//功能二：依据用户id查找新闻详细信息
router.get("/find",(req,res)=>{
    //参数id
    var id=req.query.id;
    //参数过滤 正则表达式
    //sql 不要使用模板字符串
    var sql="SELECT `id`, `title`, `content`, `click`, `img_url`, `price`, `ctime` FROM `wy_news` WHERE id=?";
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:result})
    })
});

//分页显示评论列表
router.get("/commentlist",(req,res)=>{
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    var nid=parseInt(req.query.nid);
    if(!pno){pno=1}
    if(!pageSize){pageSize=5}
    //总记录数
    var obj={pno:pno,pageSize:pageSize};
    var progress=0;
    var sql="SELECT count(id) as c FROM wy_comment WHERE nid=?";
    pool.query(sql,[nid],(err,result)=>{
        if(err) throw err;
        obj.pageCount=Math.ceil(result[0].c/pageSize);
        progress+=50;
        if(progress==100){
            res.send(obj);
        }
    })
    var offset=parseInt((pno-1)*pageSize);
    pageSize=parseInt(pageSize);
    var sql="SELECT `id`, `nid`, `ctime`, `content`, `username`, `isdel` FROM `wy_comment` WHERE nid=? ORDER BY id DESC LIMIT ?,?";
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
        if(err) throw err;
        obj.data=result;
        progress+=50;
        if(progress==100){
            res.send(obj);
        }
    })
})
//添加一条评论
router.post("/saveComment",(req,res)=>{
    var nid=parseInt(req.body.nid);   //新闻编号
    var username=req.body.username; //用户名
    var content=req.body.content;   //评论内容
    if(content.length<2){
        res.send({code:-1,msg:"评论内容太少了"})
        return;
    }
    var sql="INSERT INTO `wy_comment`(`id`, `nid`, `ctime`, `content`, `username`, `isdel`) VALUES (null,?,now(),?,?,0)";
    pool.query(sql,[nid,content,username],(err,result)=>{
        if(err)throw err;
        //执行成功条件，影响行数
        if(result.affectedRows==1){
            res.send({code:1,msg:"添加成功"});
        }else{
            res.send({code:-1,msg:"添加失败"});
        }      
    })
})
//导出路由对象
module.exports=router;