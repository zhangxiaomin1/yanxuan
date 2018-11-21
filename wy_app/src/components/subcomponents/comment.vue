<template>
    <div class="app_subcomment">
        <h1>发表评论</h1>
        <hr>
        <textarea placeholder="请输入评论内容(评论内容不超过120字)" v-model="msg"></textarea>
        <mt-button size="large" type="primary" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-list-item"  v-for="(item,i) in list" :key="item.index">
                <div class="cmt-title">
                    第{{i+1}}楼 &nbsp;&nbsp; 用户: {{item.username}} 发表时间:{{item.ctime | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button type="primary" size="large" @click="getCommentList">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return {
                list:[],
                msg:"",         //双向绑定留言
                pageIndex:0  //当前显示页码
            }
        },
        methods:{
            getCommentList(){
                this.pageIndex++;
                var url="newslist/commentlist?nid="+this.id;
                url+="$pno="+this.pageIndex;
                this.$http.get(url).then(result=>{
                    this.list=this.list.concat(result.body.data);
                })
              },
            postComment(){
                //发表评论
                var username="匿名";
                var nid=this.id;
                var content=this.msg;   //双向绑定留言内容
                //console.log(content)
                var url="newslist/saveComment";
                var obj={nid:nid,content:content,username:username};
                this.$http.post(url,obj).then(result=>{
                    if(result.body.code==1){
                        //添加完成清空原有内容
                        this.msg="";
                        //提示
                        Toast(result.body.msg);
                        this.pageIndex=0;     //当前页码清零
                        this.list=[];   //数据值清空
                        this.getCommentList(); //加载第一页
                    }else{
                        Toast(result.body.msg);
                    }
                })
            }
        },
        created(){
            this.getCommentList();
            //console.log(123);
            //console.log(this.id); //在程序中直接使用this.id
        },
        props:["id"]        //接收父组件传递参数

    }
</script>
<style>
    .app_subcomment h1{
        font-size: 18px;
    }
    .app_subcomment textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .app_subcomment .cmt-list{
        margin: 5px 0;

    }
    .app_subcomment .cmt-list .cmt-list-item{
        font-size: 13px;
    }
    .app_subcomment .cmt-list .cmt-list-item .cmt-title{
        line-height: 30px;
        background-color: #f1f1f1;
    }
    .app_subcomment .cmt-list .cmt-list-item .cmt-body{
        line-height: 30px;
        text-indent: 2em;
    }
</style>

