<template>
    <div class="app_newslist">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
                <router-link :to="'/newsdetail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1> 
                        <p class='mui-ellipsis'>
                            <span>{{item.ctime | dataFormat}}</span>
                            <span>点击:{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button type="primary" size="large" @click="getMore">加载更多...</mt-button>
    </div>
</template>
<script>
    export default{
        data(){
            return  {
                list:[],
                pageIndex:0     //页码
            }
        },
        methods:{
            getMore(){
                this.pageIndex++;//页码+1
                var url="newslist/list?pno="+this.pageIndex;
                this.$http.get(url).then(result=>{
                    //赋值会覆盖前一页数据
                    //this.list=result.body.msg.data;
                    //保存前一页
                    this.list=this.list.concat(result.body.msg.data);
                });
            }
            
        },
        created(){
            this.getMore();
        }
    }
</script>
<style>
/*新闻标题*/
    .app_newslist .mui-table-view h1{
        font-size: 14px;
        color: #333;
    }
    .app_newslist li .mui-ellipsis{
        font-size: 12px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }
    .app_newslist .mui-table-view .mui-table-view-cell .mui-media-object{
        width: 42px;
    }
</style>
