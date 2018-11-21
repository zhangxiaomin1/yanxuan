<template>
    <div class="app_newsdetail">
        <h1 class="title">{{newsinfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.ctime | dataFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>
        <div class="container" v-html="newsinfo.content"></div>
        <!--评论-->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
    //导入评论子组件
    import comment from "../subcomponents/comment"

    export default{
        data(){
            return {
                id:this.$route.params.id,
                newsinfo:{}      //保存当前新闻内容
            }
        },
        methods:{
            getNewsDetail(){
                //获取新闻详情内容
                var url="newslist/find?id="+this.id;
                this.$http.get(url).then(result=>{
                    this.newsinfo=result.body.msg[0];
                    console.log(this.newsinfo);
                })
            }       
        },
        created(){
            //console.log(this.$route.params.id)
            this.getNewsDetail();
        },
        components:{
            'comment-box':comment       //注册子组件
        }
    }
</script>
<style>
    .app_newsdetail{
        padding: 0 4px;
    }
    .app_newsdetail .title{
        font-size: 16px;
        text-align: center;
        color: #333;
        margin: 15px 0;
    }
    .app_newsdetail .subtitle{
        display: flex;
        justify-content: space-between;
        color: #999;
        font-size: 13px;
    }
    .app_newsdetail .container h3{
        font-size: 15px;
    }
    .app_newsdetail .container img{
        width: 100%;
    }
</style>

