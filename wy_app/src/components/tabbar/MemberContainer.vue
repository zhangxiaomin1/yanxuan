<template>
    <div class="app_member">
        <div class="avatar">
            <img src="../../img/jj.png" alt="">
        </div>
        <div class="user">个人中心</div>
        <div class="cell">
            <div class="cell-item">
                <p>个人资料</p>
            </div>
        </div>
        <div class="cell">
            <div class="cell-item arrow">
                <p>地址管理</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="cell">
            <div class="cell-item arrow">
                <p>我的订单</p>
            </div>
            <div class="cell-item arrow">
                <p>我的拼团</p>
            </div>
            <div class="cell-item arrow">
                <p>我的积分</p>
            </div>
            <div class="cell-item arrow">
                <p>优惠券</p>
            </div>
            <div class="cell-item arrow">
                <p>退换/售后</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="cell">
            <div class="cell-item arrow">
                <p>用户反馈</p>
            </div>
            <div class="cell-item arrow">
                <p>帮助中心</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        methods:{},
        created(){}
    }
</script>
<style>
    .app-container{
        background-color: #fff;
    }
    .user{
        text-align: center;
        color: #333;
        margin-top: 10px;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 20px;
    }
    /*列表*/
    .cell{
        background-color: #fff;
        font-size: 18px;
    }
    .cell-item{
        border-bottom: 1px solid #ddd;
        padding: 5px 10px;
        height: 40px;
    }

    .avatar{
        width: 80px;
        margin: 10px auto;
    }
    .avatar img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 5px solid rgba(204, 204, 204, .5);
        margin: 5px auto;
    }
    /*灰色分隔块*/
    .divider{
    height:10px;
    background:#f1f1f1;
    box-shadow:0 5px 5px rgba(0,0,0,.1) inset;
    }
    /*箭头*/
    .arrow{
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .arrow p{
        line-height: 30px;
        margin-top: 5px;
    }
    .arrow::after{
    content: "";
    width: 10px;   /*箭头，正方形加边框*/
    height: 10px;
    border-top: 3px solid #999;
    border-right: 3px solid #999;
    transform: rotate(45deg);
    }
</style>
