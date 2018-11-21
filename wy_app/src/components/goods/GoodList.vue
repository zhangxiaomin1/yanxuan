<template>
    <div class="app_goods_list">
        <div class="app_goods_item" v-for="item in list" :key="item.pid">
            <img @click="toDetail(item.pid)" :src="item.pic" alt="">
            <span class="sale_p">{{item.p_sale}}</span> 
            <h1 class="title">{{item.pname}}</h1>
            <h2 class="title-info" @click="toDetail(item.pid)">{{item.subtitle}}</h2>
            <div class="info">
                <p class="price">
                    <span class="new">¥{{item.price}}</span>
                    <span class="old">¥{{item.price-5}}</span>
                </p>
            </div>
        </div>
        <mt-button @click="getMore" type="primary" size="large">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[],
                pageIndex:0     //页码  
                
            }
        },
        methods:{
            getMore(){
                this.pageIndex++;
                var url="goodslist/list?pno="+this.pageIndex;
                this.$http.get(url).then(result=>{
                    this.list=this.list.concat(result.body.msg.data);
                })
            },
            toDetail(pid){
                //console.log(pid)
                this.$router.push({path:"/home/goodsinfo/"+pid})
            }
        },
        created(){
            this.getMore();
        }
    }
</script>
<style>
    .app_goods_list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
    }
    .app_goods_list .app_goods_item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 260px;
    }
    .app_goods_list .app_goods_item img{
        width: 100%;
    }
    .app_goods_list .app_goods_item .sale_p{
        color: #f00;
        font-size: 12px;
        background-color: #e0e0e0;
        text-align: center;
        margin: 0px;
    }
    .app_goods_list .app_goods_item .title{
        font-size: 14px;
        margin-bottom: 0px;
    }
    .app_goods_list .app_goods_item .title-info{
        font-size: 13px;
        color: #999;
    }
    .app_goods_list .app_goods_item .info{
        background-color: #eee;
    }
    .app_goods_list .app_goods_item .info p{
        margin: 0;
        padding: 0px 5px;
    }
    .app_goods_list .app_goods_item .info .price .new{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .app_goods_list .app_goods_item .info .price .old{
    text-decoration: line-through; 
    font-size: 12px;
    margin-left: 10px;
    }
    .app_goods_list .app_goods_item .info .sell{
        display: flex;
        font-size: 12px;
        justify-content: space-between;
    }
</style>
