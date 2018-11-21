<template>
    <div class="app_shopcart">
        <div class="mui-card">
            <div class="mui-card-header">购物车</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner" v-for="item in list" :key="item.lid">
                    {{item.name}} ¥{{item.price}}   &nbsp;&nbsp;&nbsp;&nbsp;
                    <div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="setSub(item.lid)">-</button>
                        <input class="mui-input-numbox" type="number" :value="item.count">
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="setAdd(item.lid)">+</button>
                    </div>
                </div>
            </div>
            <div class="mui-card-footer">
                小计:<span>¥1{{getsubtotal}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                list:[]
            }
        },
        methods:{
            getCartlist(){
                this.$http.get("cartlist/list").then(result=>{
                    this.list=result.body.msg;
                    console.log(this.list)
                })
            },
            setSub(lid){
                for(var item of this.list){
                    if(item.lid==lid){
                        if(item.count<=1)
                        break;
                        item.count--;
                    }
                    
                }
            },
            setAdd(lid){
                //console.log(lid)
                //获取当前购物车id
                for(var item of this.list){
                    if(item.lid==lid){
                        item.count++;
                    }
                }
            }
        },
        created(){
            this.getCartlist()
        },
        computed:{
            //计算属性 计算多个数据变化
            getsubtotal:function(){
                var sum=0;
                for(var item of this.list){
                    sum+=item.price * item.count;
                }
                return sum;
            }
        }
    }
</script>
<style>

</style>
