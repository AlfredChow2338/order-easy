<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuScroll">
          <ul>
              <li class="menu-item" :class="{'current': currentIndex === 0}" @click="selectMenu(0)">
                  <p class="text">
                      <img class="icon" :src="container.tag_icon" v-if="container.tag_icon" />
                      {{ container.tag_name }}
                  </p>
              </li>
              <li class="menu-item" v-for="(menuItem, index) in menuItems" :key="menuItem" :class="{'current': currentIndex === index + 1}" @click="selectMenu(index+1)">
                  <p class="text">
                      <img class="icon" :src="menuItem.icon" v-if="menuItem.icon" />
                      {{ menuItem.name }}
                  </p>
                  <i class="num" v-show="calculateCount(menuItem.spus)">{{calculateCount(menuItem.spus)}}</i>
              </li>
          </ul>
      </div>
      <div class="food-wrapper" ref="foodScroll">
          <ul>
              <li class="container-list food-list-hook">
                  <div v-for="item in container.operation_source_list" :key="item">
                      <img :src="item.pic_url" />
                  </div>
              </li>
              <li class="food-list food-list-hook" v-for="menuItem in menuItems" :key="menuItem">
                  <h3 class="title">{{ menuItem.name }}</h3>
                  <ul>
                      <li class="food-item" v-for="food in menuItem.spus" :key="food">
                          <div class="icon" :style="head_bg(food.picture)"></div>
                          <div class="content">
                              <h3 class="name">{{ food.name }}</h3>
                              <p class="desc" v-if="food.description">{{ food.description }}</p>
                              <div class="extra">
                                  <span class="sold">{{ food.month_saled_content }}</span>
                                  <span class="praise">{{ food.praise_content }}</span>
                              </div>
                              <img class="product" :src="food.product_label_picture" v-if="food.product_label_picture" />
                              <p class="price">
                                  <span class="text">${{ food.min_price }}</span>
                                  <span class="unit">/{{ food.unit }}</span>
                              </p>
                          </div>
                          <div class="cartcontrol-wrapper">
                              <CartControl :food="food" @add-cart="food.count++" @minus-cart="food.count--" />
                          </div>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
      <Shopcart :shipping_fee_tip="poiInfo.shipping_fee_tip" :min_price_tip="poiInfo.min_price_tip" :selectFoods="selectFoods"></Shopcart>
    </div>
</template>

<script>
import goods from '../../../data/goods.json'
import BScroll from 'better-scroll'
import Shopcart from '../Shopcart/Shopcart.vue'
import CartControl from '../Cartcontrol/CartControl.vue'
// import vue from 'vue'

export default {
    components: {
        Shopcart,
        CartControl
    },
    data () {
        return {
            goods,
            poiInfo: {},
            container: {},
            menuItems: {},
            listHeight: [],
            scrollY: 0,
            menuScroll: {},
            foodScroll: {},
        }
    },
    created() {
        var that = this;
        this.container = this.goods.data.container_operation_source;
        this.menuItems = this.goods.data.food_spu_tags;
        that.poiInfo = this.goods.data.poi_info;

        // Initiate scroll (doesn't work due to no height value)
        // that.initScroll();

        // nextTick
        that.$nextTick( () => {
            // DOM is updated and height value is received
            that.initScroll();

            // Calculate height between food category
            that.calculateHeight();
        })
        console.log(this.goods);
        console.log(this.menuItems[0]);
    },
    computed: {
        currentIndex () {
            // Change category according to Scoll Y
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
            

                // Is between 2 height
                if (!height2 || (this.scrollY >= height1 && this.scrollY <= height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.menuItems.forEach(good => {
                good.spus.forEach((food) => {
                    if(food.count > 0) {
                        foods.push(food);
                    }
                })
            })
            return foods;
        }
    },
    methods: {
        head_bg (imgName) {
            return "background-image: url(" + imgName + ");";
        },
        initScroll () {
            // ref attribute to bind DOM elements or components inside this.$refs
            this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
            });
            this.foodScroll = new BScroll(this.$refs.foodScroll, {
                probeType: 3,
                click: true
            });

            // Listen scroll event
            this.foodScroll.on('scroll', (pos) => {
                // console.log(pos.y);
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },
        calculateHeight () {
            // Get elements from $refs
            let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');

            // Add to data
            let height = 0;
            this.listHeight.push(height);

            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMenu (index) {
            let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');

            // Scoll to element according to index
            let el = foodList[index]

            this.foodScroll.scrollToElement(el, 250);
        },
        calculateCount(spus) {
            let count = 0;
            spus.forEach((food) => {
                if(food.count > 0) {
                    count += food.count;
                }
            });
            return count;
        }
    }
}
</script>

<style scoped>
    @import url(Goods.css);
</style>