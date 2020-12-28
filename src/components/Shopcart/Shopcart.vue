<template>
    <div class="shopcart" :class="{'highlight': totalCount>0}">
        <div class="content-left">
            <div class="logo-wrapper" :class="{'highlight': totalCount>0}">
                <span class="icon-shopping_cart logo" :class="{'highlight': totalCount>0}"></span>
                <i class="num" v-show="totalCount">{{totalCount}}</i>
            </div>
            <div class="desc-wrapper">
                <p class="total-price" v-show="totalPrice">${{totalPrice}}</p>
                <p class="tip" v-show="totalPrice" :class="{'highlight': totalCount>0}">{{shipping_fee_tip}}</p>
            </div>
        </div>
        <div class="content-right" :class="{'highlight': totalCount>0}">
            {{payStr}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shipping_fee_tip: {
            type: String,
            default: ''
        },
        min_price_tip: {
            type: String,
            default: ''
        },
        selectFoods: {
            type: Array
        }
    },
    computed: {
        totalCount() {
            let num = 0;
            this.selectFoods.forEach((food) => {
                num += food.count;
            })
            return num;
        },
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.min_price * food.count;
            })
            return total
        },
        payStr() {
            if(this.totalCount > 0) {
                return "帳單結算"
            } else {
                return this.min_price_tip;
            }
        }
    },
    watch: {
        
    }
}
</script>

<style>
    @import url("Shopcart.css");
</style>