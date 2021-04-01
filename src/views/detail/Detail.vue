<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop = "shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramsInfo"></detail-param-info>
    <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"

import Scroll from "components/common/scroll/Scroll.vue"

import { getDetail, Goods, Shop , GoodsParam} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
    };
  },
  //生命周期函数
  created() {
    //1。保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      //获取顶部的轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramsInfo =  new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //获取评论信息
      if (data.rate.cRate !== 0 ) {
        this.commentInfo = data.rate.list[0]
      }
    
    });
  },
  methods:{
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
};
</script>

<style scoped>
 #detail {
     position: relative;
     height: 100vh;
     z-index: 9;
     background-color: #fff;
 }
 .detail-nav {
     position: relative;
     z-index: 99;
     background-color: #fff;
 }
 .content {
     height: calc(100% - 44px);
 }
</style>