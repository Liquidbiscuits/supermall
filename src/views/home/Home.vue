<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommends="recommend"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
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
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    NavBar,
    GoodsList,
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
      currentType:'pop'
    };
  },
  //组件加载完成时调用
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed:{
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      // console.log(index);
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
          case 1:
          this.currentType = 'new'
          break
          case 2:
          this.currentType = 'sell'
      }

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
      });
    },
  },
};
</script>

<style>
#home {
  padding-top: 44px;
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
  z-index: 9;
}
</style>