<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
   <scroll class="content" ref="scroll" 
   :probe-type="3" @scroll=contentScroll
   :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banner="banner"></home-swiper>
        <recommend-view :recommends="recommend"></recommend-view>
        <feature-view></feature-view>
        <tab-control
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
   </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import RecommendView from "./childComps/RecommendView.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue"
import BackTop from "components/content/backTop/BackTop.vue"
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    NavBar,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // result:null,
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:false
    };
  },
  //组件加载完成时调用
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //监听图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      console.log(".........");
      this.$refs.scroll.scroll.refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
    },
    //监听组件事件需要加.native
    backClick() {
      console.log("back");
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      // console.log(position);
      this.isShowBackTop = -position.y >1000
    },
    loadMore() {
      console.log("上拉加载更多");
      this.getHomeGoods(this.currentType)
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        // this.result =  res
        (this.banner = res.data.banner.list),
          (this.recommend = res.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  background-color: #fff;
  position: sticky;
  top: 43px;
  z-index: 99;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;

}
/*.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top:44px;
}*/
</style>