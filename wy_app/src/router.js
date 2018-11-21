import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"

//配置组件访问路由
//1.引入自定义组件
import HomeContainer from "./components/tabbar/HomeContainer"
import NewsContainer from "./components/news/NewsContainer"
import MemberContainer from "./components/tabbar/MemberContainer"
import SearchContainer from "./components/tabbar/SearchContainer"
import ShopContainer from "./components/tabbar/ShopContainer"
import NewsDetailContainer from "./components/news/NewsDetailContainer"
import GoodList from "./components/goods/GoodList"
import GoodsInfo from "./components/goods/GoodsInfo"

Vue.use(Router)
//2.指定该组件访问路径
export default new Router({
  routes: [
    {path: '/',redirect:"/home"},
    {path:"/home",component:HomeContainer},
    {path:"/home/newslist",component:NewsContainer},
    {path:"/home/goodslist",component:GoodList},
    {path:"/home/goodsinfo/:pid",component:GoodsInfo},
    {path:"/member",component:MemberContainer},
    {path:"/search",component:SearchContainer},
    {path:"/shop",component:ShopContainer},
    {path:"/newsdetail/:id",component:NewsDetailContainer}
  ],linkActiveClass:"mui-active"//覆盖路由高亮类
})

