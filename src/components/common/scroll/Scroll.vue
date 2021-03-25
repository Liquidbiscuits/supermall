<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props:{
    probeType:{
      type:Number,
      default:0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false,
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    });
    //实时监听滚动的位置
    this.scroll.on("scroll",(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    }),
    //监听上拉事件
    this.scroll.on("pullingUp",()=>{
      // console.log("上拉加载更多");
      this.$emit("pullingUp")
    })
  },
  methods:{
      scrollTo(x,y,time=500){
          this,scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll.refresh()
      }
  }
};
</script>

<style>
</style>