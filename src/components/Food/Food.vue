<template>
    <transition name="detail">
        <div class="food" v-show="showFlag">
            <div class="food-wrapper">
                <div class="food-content">
                    <div class="img-wrapper">
                        <img class="food-img" :src="food.picture" />
                        <span class="close-bt icon-close" @click="closeView"></span>
                        <img class="share-bt" src="./share.png" />
                        <img class="more-bt" src="./more.png" />
                    </div>
                    <div class="content-wrapper">
                        <h3 class="name">{{food.name}}</h3>
                        <p class="saled">{{food.month_saled_content}}</p>
                        <img class="product" v-show="food.product_label_picture" :src="food.product_label_picture" />
                        <p class="price">
                            <span class="text">${{food.min_price}}</span>
                            <span class="unit">/{{food.unit}}</span>
                        </p>
                        <div class="cartcontrol-wrapper">
                            <CartControl :food="food" />
                        </div>
                        <div class="buy" v-show="!food.count || food.count == 0" @click="addFirst">選擇規格</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import CartControl from '../Cartcontrol/CartControl'

export default {
    components: {
        CartControl
    },
    data() {
        return {
            showFlag: false,
        }
    },
    props: {
        food: {
            type: Object
        }
    },
    created() {
        // console.log(this.food.picture);
    },
    methods: {
        showView() {
            // Parent components can apply child methods
            this.showFlag = true;
            // console.log(this.food.picture);
        },
        closeView() {
            this.showFlag = false;
        },
        addFirst() {
            Object.assign(this.food, { 'count': 1 });
            this.$emit('add-cart');
        }
    }
}
</script>

<style>
    @import url(./Food.css);
</style>