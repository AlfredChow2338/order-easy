<template>
  <div id="app">

    <MyHeader :poiInfo="poiInfo"></MyHeader>
    
    <MyNav :commentNum="commentNum"></MyNav>

    <router-view v-slot="{ Component }">
      <keep-alive include="Goods,Ratings,Seller">
        <component class="view" :is="Component" />
      </keep-alive>
    </router-view>

  </div>
</template>

<script>
import goods from '../data/goods.json'
import ratings from '../data/ratings.json'
// import seller from '../data/seller.json'
import MyHeader from './components/Header/Header'
import MyNav from './components/Nav/Nav'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyNav,
  },
  data () {
    return {
      // header require seller's information
      poiInfo: {},
      goods,
      ratings,
      commentNum: 0
    }
  },
  created () { 
    // console.log(goods);
    if (goods.code === 0) {
      this.poiInfo = goods.data.poi_info;
    }
    if(ratings.code === 0) {
      this.commentNum = ratings.data.comment_num;
      // console.log(this.commentNum);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
