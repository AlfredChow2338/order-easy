<template>
    <div class="ratings" ref="ratingView">
      <div class="ratings-wrapper">
        <div class="overview">
          <div class="overview-left">
            <div class="comment-score">
              <p class="score">{{dataSource.comment_num}}</p>
              <p class="text">商家評分</p>
            </div>
            <div class="other-score">
              <div class="quality-score item">
                <span class="text">口味</span>
                <Star :score="dataSource.quality_score" class="star" />
                <span class="score">{{dataSource.quality_score}}</span>
              </div>
              <div class="pack-score item">
                <span class="text">包裝</span>
                <Star :score="dataSource.pack_score" class="star" />
                <span class="score">{{dataSource.pack_score}}</span>
              </div>
            </div>
          </div>
          <div class="overview-right">
            <div class="delivery-score">
              <p class="score">{{dataSource.delivery_score}}</p>
              <p class="text">配送評分</p>
            </div>
          </div>
        </div>
        <Split />
        <div class="content">
          <div class="rating-select" v-if="dataSource.tab">
            <span class="item" @click="selectTypeFn(2)" :class="{'active':selectType === 2}">
              {{dataSource.tab[0].comment_score_title}}
            </span>
            <span class="item" @click="selectTypeFn(1)" :class="{'active':selectType === 1}">
              {{dataSource.tab[1].comment_score_title}}
            </span>
            <span class="item" @click="selectTypeFn(0)" :class="{'active':selectType === 0}">
              <img src="./icon_sub_tab_dp_normal@2x.png" v-show="selectType !== 0" />
              <img src="./icon_sub_tab_dp_highlighted@2x.png" v-show="selectType === 0" />
              {{dataSource.tab[2].comment_score_title}}
            </span>
          </div>
          <div class="labels-view">
            <span v-for="item in dataSource.labels" :key="item" class="item" :class="{'highlight': item.label_star > 0}">
              {{item.content}} {{item.label_count}}
            </span>
          </div>
          <div class="rating-list-wrapper">
            <ul class="rating-list">
              <li v-for="comment in selectComments" :key="comment" class="comment-item" >
                <div class="comment-header">
                    <img :src="comment.user_pic_url" v-if="comment.user_pic_url" />
                    <img src="./anonymity.png" v-if="!comment.user_pic_url" />
                </div>
                <div class="comment-main">
                    <div class="user">{{comment.user_name}}</div>
                    <div class="time">{{formatData(comment.comment_time)}}</div>
                    <div class="star-wrapper">
                      <span class="text">評分</span>
                      <Star :score="comment.order_comment_score" class="star" />
                    </div>
                    <div class="c_content" v-html="commentStr(comment.comment)"></div>
                    <div class="img-wrapper" v-if="comment.comment_pics">
                      <img v-for="item in comment.comment_pics" :key="item" :src="item.thumbnail_url" /> 
                    </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Ratings from '../../../data/ratings.json'
import Star from '../Star/Star'
import Split from '../Split/Split'
import BScroll from 'better-scroll'

const ALL = 2;
// const PICTURE = 1;
// const COMMENT = 0;

export default {
  name: 'Ratings',
  data() {
    return {
      Ratings: {},
      dataSource: {},
      selectType: ALL,
    }
  },
  components: {
    Star,
    Split,
    // BScroll
  },
  created() {
    this.dataSource = Ratings.data;
    // Bscroll init
    let that = this;
    that.$nextTick(() => {
    if(!that.scroll) {
      that.scroll = new BScroll(this.$refs.ratingView, {
        click: true
      });
    } else {
      that.scroll.refresh();
    }
  })
  },
  methods: {
    selectTypeFn(type) {
      this.selectType = type;
      // Refresh content
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
    formatData(time) {
      let data = new Date(time * 1000);
      // Date formatting
      let fmt = "yyyy.MM.dd";
      if(/(y+)/.test(fmt)) {
        let year = data.getFullYear().toString();
        fmt = fmt.replace(RegExp.$1, year);
      }

      if(/(M+)/.test(fmt)) {
        let month = data.getMonth() + 1;
        if(month < 10) {
          month = '0' + month;
        }
        fmt = fmt.replace(RegExp.$1, month);
      }
      
      if(/(d+)/.test(fmt)) {
        let day = data.getDate();
        // console.log(day);
        if(day < 10) {
          day = '0' + day;
        }
        fmt = fmt.replace(RegExp.$1, day);
      }
      // console.log(fmt);
      return fmt;
    },
    commentStr(content) {
      if(content) {
        let rel = /#[^#]+#/g;
        return content.replace(rel, '<i>$&<i>');
      }
    }
  },
  computed: {
    selectComments() {
      if(this.selectType == ALL) {
        return this.dataSource.comments;
      } else if (this.selectType == 1) {
        let arr = [];
        this.dataSource.comments.forEach((comment) => {
          if(comment.comment_pics.length) {
            arr.push(comment);
          }
        })
        return arr;
      } else {
        return this.dataSource.comments_dp;
      }
    }
  }
}
</script>

<style>
  @import url(./Ratings.css);
</style>