<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
        <home-swiper :banner="banner"></home-swiper>
        <recommend-view :recommends="recommend"></recommend-view>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import HomeSwiper from "./childComps/HomeSwiper.vue"
import {getHomeMultidata} from "network/home"
import RecommendView from "./childComps/RecommendView.vue"





export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
    },
    data() {
        return{ 
            // result:null,
            banner:[],
            recommend:[],
        }
    },
    created() {
        getHomeMultidata().then(res=>{
            console.log(res);
            // this.result =  res
            this.banner = res.data.banner.list,
            this.recommend = res.data.recommend.list
        })
    }

}
</script>

<style>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>