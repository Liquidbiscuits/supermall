<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="TabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banner="banner"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="TabControl2"
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
import { debounce } from "common/utils";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  //组件加载完成时调用
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //监听图片加载完成
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    //监听事件相关
    this.$bus.$on("itemImageLoad", () => {
      // console.log(".........");
      // this.scroll && this.$refs.scroll.refresh();
      refresh();
    });
    //获取tabControl的offsetTop
    //所有的组件都有一个属性 $el:用于获取组件中的元素
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
    destroyed() {
      console.log("销毁页面时调用");
    },
    activated() {
      //进入页面时调用
      //返回时，最好调用一次refresh
      //refresh()
      // this.$refs.scroll.scrollTo(0, -this.saveY, 0);
    },
    deactivated() {
      //离开页面时调用
      // this.saveY = this.$refs.scroll.getScrollY();
    },
  },
  methods: {
    //防抖函数

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
      //复用组件 重新设置 点击事件
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    //监听组件事件需要加.native
    backClick() {
      console.log("back");
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // console.log(position);
      //判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载更多的方法
    loadMore() {
      console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
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
        this.$refs.scroll.finishPullUp();
      });
    },
    //首页吸顶效果
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop;
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
  position: relative;
  /*
  在使用浏览器原生滚动时，为了导航栏的粘性定位，不跟随一起滚动
  position: fixed;
  left: 0;
  top: 0;
  right: 0;*/
  z-index: 99;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tab-control {
  position: relative;
  /* 设置相对定位，使z-index 生效*/
  z-index: 99;
  background-color: #fff;
}
/*.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top:44px;
}*/
</style>