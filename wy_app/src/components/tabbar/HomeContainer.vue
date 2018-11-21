<template>
    <div class="app">
        <!--主页组件-->
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in list" :key="item.cid">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="row">
            <div>❈自营品牌</div>
            <div>❈30天无忧退货</div>    
            <div>❈48小时快速退款</div>
        </div> 

        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a @click="routerlink">
                    <img src="../../img/haowu.png" alt="">
                    <div class="mui-media-body">好物攻略</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a @click="product">
                    <img src="../../img/product.png" alt="">
                    <div class="mui-media-body">商品</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/shop">
                    <img src="../../img/cart.png" alt="">
                    <div class="mui-media-body">购物车</div>
                </router-link>
            </li>
        </ul>
        <div class="divider"></div>
        <!--floor2-->
        <div class="col1">
            <div @click="toList">
                <p class="f2-t">超值拼团</p>
                <img src="../../img/pt.jpg" />
            </div>
            <div @click="toList">
                <p class="f2-t">新品首发</p>
                <img src="../../img/xp.png" />
            </div>
            <div @click="toList">
                <p class="f2-t">严选砍价</p>
                <img src="../../img/cw.png" />
            </div>
        </div>
        <div class="col2">
            <div @click="toList">
                <p class="">新秀丽制造商</p>
                <img src="../../img/xx.png" alt="">
            </div>
            <div @click="toList">
                <p class="">MUJI制造商</p>
                <img src="../../img/mu.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
//加载当前组件需要的第三方模块
import {Toast} from "mint-ui";
export default{
    data(){
        return{
            list:[]
        }
    },
    methods:{
        toList(){
            this.$router.push({path:"/home/goodslist/"})
        },
        getImageList(){
            //获取图片轮播数据
            var url="http://127.0.0.1:3000/imagelist/list";
            this.$http.get(url).then(result=>{
                //node.js发送json字符串
                //通过VueResource接收自动将json字符串转换为js对象
                if(result.body.code==1){
                    this.list=result.body.msg;
                }else{
                    //出错提示 Toast()
                    Toast("加载轮播图片失败...")
                }
            })
        },
        routerlink(){
            this.$router.push({path:'/home/newslist'})
        },
        product(){
            this.$router.push({path:"/home/goodslist"})
        }
    },
    created(){
        this.getImageList();
    }
}
</script>
<style>
    .app-container{
        padding: 40px 0 0px 0;
    }
    .row{
        margin: 5px;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        padding: 0 5px;
        color: rgb(211, 81, 81);
    }
    /*floor2*/
    .col1 div{position: relative;}
    .col1{
        margin-top: 10px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding:0 5px;
    }
    .col1 img{
       width: 115px;
       height: 115px;
    }
     .f2-t{
       position: absolute;
       top: 10px;
       left: 32px;
    }
    .col2{
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
    }
    .col2 img{
        width: 178px;;
    }
    .col2 div{
        position: relative;

    }
    .col2 p{
        position: absolute;
        top: 2px;
        left: 55px;
    }
    /*图片轮播组件高度为0*/
    .app .mint-swipe{
        height: 150px;
    }
    .app .mint-swipe img{
        width: 100%;
    }
     /*灰色分隔块*/
    .divider{
    height:10px;
    background:#f1f1f1;
    box-shadow:0 5px 5px rgba(0,0,0,.1) inset;
    }
    /*九宫格背景*/ 
    .app .mui-grid-view.mui-grid-9{
        background-color: #fff; 
    }
    .app .mui-grid-view.mui-grid-9 .mui-table-view-cell{
         border: 0;
    }
    .app .mui-grid-view.mui-grid-9 .mui-table-view-cell .mui-media-body{
        font-size: 13px;
    }
    .app .mui-grid-view.mui-grid-9 img{
        width: 60px;
        height: 60px;
    }
</style>
