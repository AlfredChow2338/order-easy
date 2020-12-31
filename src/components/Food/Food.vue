<template>
    <transition name="detail">
        <!-- <div class="wrapper"> -->
        <div class="food-detail" v-show="showFlag" ref="foodView">
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
                <Split />
                <div class="rating-wrapper">
                    <div class="rating-title">
                        <div class="like-ratio" v-if="food.rating">
                            <span class="title">{{food.rating.title}}</span>
                            <span class="ratio">(
                                {{food.rating.like_ratio_desc}}
                                <i>{{food.rating.like_ratio}}</i>
                                )</span>
                        </div>
                        <div class="snd-title" v-if="food.rating">
                            <span class="text">{{food.rating.snd_title}}</span>
                            <span class="icon icon-keyboard_arrow_right" v-show="food.rating.snd_title!='暂无'"></span>
                        </div>
                    </div>
                    <div class="rating-content-wrapper" v-if="food.rating">
                        <ul class="rating-content" v-for="comment in food.rating.comment_list" :key="comment">
                            <li class="comment-item">
                                <div class="comment-header">
                                    <img :src="comment.user_icon" v-if="comment.user_icon" />
                                    <img src="./anonymity.png" v-if="!comment.user_icon" />
                                </div>
                                <div class="comment-main">
                                    <div class="user">{{comment.user_name}}</div>
                                    <div class="time">{{comment.comment_time}}</div>
                                    <div class="content">{{comment.comment_content}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import CartControl from '../Cartcontrol/CartControl';
import Split from '../Split/Split';
import BScroll from 'better-scroll';

export default {
    components: {
        CartControl,
        Split
    },
    data() {
        return {
            showFlag: false
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
            this.initScroll();
        },
        closeView() {
            this.showFlag = false;
        },
        addFirst() {
            Object.assign(this.food, { 'count': 1 });
            this.$emit('add-cart');
        },
        initScroll() {
            // var that = this;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.foodView, {
                        click: true,
                    });
                } else {
                    this.scroll.refresh();
                }
            })
        }
    },
    computed: {
        
    }
}
</script>

<style>
    @import url(./Food.css);
</style>