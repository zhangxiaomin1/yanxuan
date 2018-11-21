<template>
    <div class="app_search">
        <!--商品输入框-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <input type="text" v-model="value" value="" placeholder="请搜索关键字" >
                    <mt-button type="danger" size="small" @click="search">搜索</mt-button>
                </div>
            </div>
        </div>
        <!--商品列表-->
        <div class="mui-card">
            <div class="mui-card-header">搜索结果</div>
            <div class="mui-card-content" v-for="item in list" :key="item.pid">
                <div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media">
                            <a @click="toDetail(item.pid)" href="javascript:;">
                                <img class="mui-media-object mui-pull-left" :src="item.pic">
                                <div class="mui-media-body">
                                    {{item.pname}}
                                    <p class='mui-ellipsis'>
                                        {{item.subtitle}}
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mui-card-footer"></div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                list:[],
                value:""
            }
        },
        methods:{
            search(){
                var url="search/list?pname="+this.value
                this.$http.get(url).then(result=>{
                    //console.log(result.body);
                    this.list=result.body;
                })
            },
            toDetail(pid){
                //console.log(pid)
                this.$router.push({path:"/home/goodsinfo/"+pid})
            }
        },
        created(){}
    }
</script>
<style>

</style>
