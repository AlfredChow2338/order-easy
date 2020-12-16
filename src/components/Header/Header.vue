<template>
    <div class="header">
      <div class="top-wrapper">
        <div class="back-wrapper">
          <span class="icon-arrow_lift"></span>
        </div>
        <form class="search-wrapper">
          <span class="search-icon"></span>
          <input class="search-bar" type="text" placeholder="搜尋餐廰 / 食物種類" />
        </form>
        <div class="more-wrapper">
          <a class="spelling-btn">團購</a>
          <div class="more-btn">
            <i class="s-radius"></i>
            <i class="s-radius"></i>
            <i class="s-radius"></i>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="icon" :style="header_bg">
          <!-- <img :src="poiInfo.pic_url" /> -->
        </div>
        <div class="name">
          <h3>{{ poiInfo.name }}</h3>
        </div>
        <div class="collection">
          <img src="./assets/star.png" />
          <span>收藏</span>
        </div>
      </div>

      <div class="bulletin-wrapper">
        <img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" />
        <span class="text" v-if="poiInfo.discounts2">{{ poiInfo.discounts2[0].info }}</span>
        <div class="detail" @click="showDetail()">
          {{poiInfo.discounts2.length}}個活動
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>

      <div class="bg-wrapper" :style="content_bg"></div>

      <transition name="detail">
        <div class="bulletin-detail" v-show="isShowDetail">
          <div class="detail-wrapper">
            <div class="main-wrapper" :style="detail_bg">
              <div class="icon" :style="header_bg"></div>
              <h3 class="name">{{ poiInfo.name }}</h3>
              <div class="score">
                <Star :score="poiInfo.wm_poi_score"></Star>
                <span>{{ poiInfo.wm_poi_score }}</span>
              </div>
              <p class="tip">
                {{ poiInfo.min_price_tip }}
                <i>|</i>
                {{ poiInfo.shipping_fee_tip }}
                <i>|</i>
                {{ poiInfo.delivery_time_tip }}
              </p>  
              <p class="time">
                運送時間：{{ poiInfo.shipping_time }}
              </p>
              <div class="discount" v-if="(poiInfo.discounts2)">
                <p>
                  <img :src="poiInfo.discounts2[0].icon_url">
                  <span>{{ poiInfo.discounts2[0].info }}</span>
                </p>
              </div>
            </div>
            <div class="close" @click="closeDetail()">
              <span class="icon-close"></span>
            </div>
          </div>
        </div>
      </transition>

    </div>
</template>

<script>
import Star from '../Star/Star'

export default {
    components: {
      Star
    },
    props: {
      poiInfo: {
        type: Object
      }
    },
    data () {
      return {
        isShowDetail: false,
      }
    },
    methods: {
      async showDetail () {
        this.isShowDetail = true;
      },
      async closeDetail () {
        this.isShowDetail = false;
      }
    },
    computed: {
      content_bg () {
        return "background-image: url(" + this.poiInfo.head_pic_url + ");";
      },
      header_bg () {
        return "background-image: url(" + this.poiInfo.pic_url + ");";
      },
      detail_bg () {
        return "background-image: url(" + this.poiInfo.poi_back_pic_url + ");";
      }
    }
}
</script>

<style scoped>
  @import url("../../common/styles/icon.css");

  @import url("Header.css");
</style>