//使用express构建web服务器
const express=require('express');
//加载处理post参数第三方模块
const bodyParse=require("body-parser");
//引入路由模块
const routerImagelist=require("./router/imagelist");
const routerNewsList=require("./router/newslist");
const routerGoodList=require("./router/goodslist");
const routerCartList=require("./router/cartlist");
const routerSearch=require("./router/searchlist");
//创建express
var app=express();
//配置模块
app.use(bodyParse.urlencoded({extended:false}));
//加载处理跨域模块cors
const cors=require("cors");
//允许哪个地址跨域访问
app.use(cors({
    origin:["http://127.0.0.1:3001",
            "http://localhost:3001"],
    credentials:true
}))
app.listen(3000);
//托管静态资源
app.use(express.static('public'));
//使用路由器来管理路由
app.use("/imagelist",routerImagelist);
app.use("/newslist",routerNewsList);
app.use("/goodslist",routerGoodList);
app.use("/cartlist",routerCartList);
app.use("/search",routerSearch);
