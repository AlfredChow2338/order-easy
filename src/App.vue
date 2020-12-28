<template>
  <div id="app">

    <MyHeader :poiInfo="poiInfo"></MyHeader>
    
    <MyNav></MyNav>
    
    <router-view></router-view>

  </div>
</template>

<script>
import goods from '../data/goods.json'
// import ratings from '../data/ratings.json'
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
    }
  },
  created () { 
    // console.log(goods);
    if (goods.code === 0) {
      this.poiInfo = goods.data.poi_info;
    }
  //   axios.get('/api/goods')
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
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
