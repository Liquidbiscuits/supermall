<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle--right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props:{
      shop:{
          type:Object,
          default() {
              return {}
          }
      }
  },
  filters: {
       sellCountFilter:function(value) {
          if (value<10000) return value;
          return (value/10000).toFixed(1)+ '万'
      }
  }
}
</script>

<style scoped>
.shop-middle-right table td {
    padding: 5px 0 ;
}
.shop-middle-right .score {
    color: #5ea732;
}
.shop-middle-right .score-better {
    color: #f13e3a;
}
.shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
}
.shop-middle-right .better-more span {
    background-color: #f13e3a;
}

</style>