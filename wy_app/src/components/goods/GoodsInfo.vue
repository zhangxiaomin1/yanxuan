<template>
    <div class="app">
        <!--轮播图-->
        <mt-swipe class="sw" :auto="4000">
            <mt-swipe-item v-for="item in detail" :key="item.index">
                <img :src="item.sm" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="first">
            <div class="first-t">
                <span class="t1">{{detail[0].pname}}</span>
                <span class="t2">98.7%</span>
            </div>
            <div class="first-t">
                <span class="t3">{{detail[0].subtitle}}</span>
                <span class="t3">好评率></span>
            </div>
        </div>
        <div class="second">
            <span class="p1">¥{{detail[0].price}}</span>
            <span class="p2">¥{{detail[0].price-5}}</span>
        </div>
        <div class="count">
            <span>购买数量:
                <div class="mui-numbox">
                    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goSub">-</button>
                    <input class="mui-input-numbox" type="number" value="1" v-model="num">
                    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goAdd">+</button>
                </div>
            </span>
            <p class="p-btn">
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small"   @click="addCart">加入购物车</mt-button>
            </p>
            
        </div>
        <div class="pingjia">
            <div class="ping-t">
                <span class="ping-t1">用户评价(44812)</span>
                <span class="ping-t2">98.7% 好评 ></span>
            </div>
            <div class="ping-b"  v-for="item in ping" :key="item.index">
                <div class="ping-sec">
                    <img :src="item.avatar" class="avatar">
                    <div class="uname">{{item.from_uname}}</div>
                    <div class="star">★★★★★</div>
                </div>
                <div class="ping-time">2018-03-16</div>
                <div class="ping-p">{{item.content}}</div>
                <div class="ping-res">{{item.w_res}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                pid:this.$route.params.pid,
                detail:{},
                ping:[],
                num:1
            }
        },
        methods:{
            addCart(){
                //修改Vuex中共享数据,参数方法名称
                this.$store.commit("increment",this.num);
            },
            goSub(){
                if(this.num<=1){return;}
                this.num=this.num-1;
            },
            goAdd(){
                if(this.num>99){return;}
                this.num=parseInt(this.num)+1;
            },
            getGoodsDetail(){
                var url="goodslist/detail?pid="+this.pid;
                //console.log(this.pid)
                this.$http.get(url).then(result=>{
                    this.detail=result.body;
                    console.log(result.body[0])
                })
            },
            getPing(){
                var url="goodslist/ping";
                this.$http.get(url).then(result=>{
                    this.ping=result.body
                    //console.log(result.body)
                })
            }
            
        },
        created(){
            console.log(this.pid);
            this.getGoodsDetail();
            this.getPing();
        }
    }
</script>
<style>
    /*图片轮播组件高度为0*/
    .app .sw{
        height: 375px;
    }
    .app .sw img{
        width: 100%;
        height: 375px;
    }
    .app .first{
        padding: 4px 5px;
    }

    .first .first-t{
         display: flex;
        justify-content: space-between;
    }
    .first .first-t .t1{
        font-size: 16px;
        color: #333;
        font-weight: bold;
    }
    .first .first-t .t2{
        font-size: 18px;
        color: crimson;
        font-weight: bold;
    }
    .first .t3{
        font-size: 14px;
        color: #666;
    }
    .second{
        padding: 4px 5px;
        float: left;
        width: 100%;
        border-bottom: 1px solid #ccc;
    }
    .second .p1{
        font-size: 20px;
        color: crimson;
        font-weight: bold;
    }
    .second .p2{
        margin-left: 5px;
        font-size: 15px;
        color: #666;
        text-decoration: line-through;
    }
  
    .p-btn button{
        margin-right: 50px;
    }
    .count{margin: 10px;}
    .count-t{}
    .mui-numbox{
        display: flex;
        margin: 5px;
    }
    
    /*评价*/
    .ping-t{
        display: flex;
        justify-content: space-between;
        padding: 5px 5px;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
    }
    .ping-b{
        margin-bottom: 5px;
    }
    .ping-b .ping-sec{
        display: flex;
        justify-content: flex-start;
        padding: 5px;
        line-height: 60px;
    }
    .ping-sec .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0;
    }
    .ping-sec .uname{
        line-height: 30px;
        margin-left: 5px;
        font-size: 15px;
    }
    .ping-sec .star{
        color: #FABD4F;
        line-height: 30px;
        font-size: 15px;
        margin-left: 10px;
    }
    .ping-time{
        font-size: 13px;
        color: #666;
        padding: 0 5px;
    }
    .ping-p{
        font-size: 15px;
        padding: 0 5px;
    }
    .ping-res{
        background-color: #ccc;
        margin:0 5px;
        padding: 5px;
        font-size: 13px;
        color: #666;
    }
</style>
