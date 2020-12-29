<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="this.food.count > 0">
                <span class="inner icon-remove_circle_outline"></span> 
            </div>
        </transition>

        <div class="cart-count" v-show="this.food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart">
            <i class="bg"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            food: {
                type: Object,
                required: true,
                default: function () {
                    return {
                    name: '',
                    _progress: 0
                    }
                }
            },
        },
        computed: {
            
        },
        methods: {
            addCart() {
                // console.log(this.food);
                // var vm = this;
                // vm.set(this.food, 'count', 1);
                if (!this.food.count) {
                    Object.assign(this.food, { 'count': 1 });
                } else {
                    this.$emit('add-cart');
                }
                
                // this.$emit('add-count')
                // this.food.min_price ++;
            },
            decreaseCart() {
                // console.log(this.food.min_price);
                this.$emit('minus-cart');
                // this.food.min_price --;
            },
        },
    }
</script>

<style>
    @import url("CartControl.css");
</style>