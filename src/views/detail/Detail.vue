<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages = topImages></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import {getDetail} from "network/detail"
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
    },
    data() {
        return {
            iid:null,
            topImages:[],
        }
    },
    //生命周期函数
    created () {
        //1。保存传入的iid
        this.iid = this.$route.params.iid
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            console.log(res);
            //获取顶部的轮播数据
            this.topImages = res.result.itemInfo.topImages
        })
    }
}
</script>

<style scoped>

</style>