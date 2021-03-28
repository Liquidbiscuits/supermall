<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
  data() {
    return{
      isLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    //控制imageLoad 仅发出一次距离请求
    imageLoad() {
      // console.log("====");
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>