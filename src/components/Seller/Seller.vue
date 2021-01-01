<template>
    <div class="seller">
      <div class="seller-wrapper">
        <Split />
        <div class="seller-view">
          <div class="addr-wrapper">
            <div class="addr-left">
              {{seller.address}}
            </div>
            <div class="addr-right">
              <div class="content"></div>
            </div>
          </div>
          <div class="pics-wrapper" v-if="seller.poi_env.thumbnails_url_list" ref="picsView">
            <ul class="pics-list" ref="picsList">
              <li class="pics-item" ref="picsItem" v-for="imgurl in seller.poi_env.thumbnails_url_list" :key="imgurl">
                <img :src="imgurl" />
              </li>
            </ul>
          </div>
          <div class="safety-wrapper">
            查看食品安全檔案
            <span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>
        <Split />
        <div class="tip-wrapper">
          <div class="delivery-wrapper">
            配送服務：{{seller.app_delivery_tip}}
          </div>
          <div class="shipping-wrapper">
            配送時間：{{seller.shipping_time}}
          </div>
        </div>
        <Split />
        <div class="other-wrapper">
          <div class="service-wrapper">
            商家服務
            <div class="poi-service" v-for="item in seller.poi_service" :key="item">
              <img :src="item.icon" />
              {{item.content}}
            </div>
          </div>
          <div class="discounts-wrapper">
            <div class="discounts-item" v-for="item in seller.discounts2" :key="item">
              <div class="icon">
                <img :src="item.icon_url" />
              </div>
              <div class="text">{{item.info}}</div>
            </div>
          </div>
        </div>
        <Split class="bottom" />
      </div>
    </div>
</template>

<script>
import Split from '../Split/Split'
import Seller from '../../../data/seller.json'
import BScroll from 'better-scroll'

export default {
  name: 'Seller',
    components: {
      Split      
    },
    data() {
      return {
        seller: {}
      }
    },
    created() {
      if(Seller.code === 0) {
        this.seller = Seller.data;

        let that = this
        that.$nextTick(() => {
          if(that.seller.poi_env.thumbnails_url_list) {
            let imgW = that.$refs.picsItem.clientWidth;
            // console.log('foo');
            // console.log(that.$refs.picsItem);
            // console.log(imgW);
            let marginR = 11;
            let width = (imgW + marginR) * that.seller.poi_env.thumbnails_url_list.length;
            that.$refs.picsList.style.width = width + 'px'
            // console.log(that.$refs.picsList.style.width);
            that.scroll = new BScroll(that.$refs.picsView, {
              scrollX: true,
              scrollY: false,
            })
          }
        })
      }
      // console.log(this.seller);
      // BScoll init
      // console.log('foo');
    }
}
</script>

<style>
  @import url(./Seller.css);
</style>