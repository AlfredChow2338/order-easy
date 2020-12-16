import { createWebHistory, createRouter } from "vue-router";
import Goods from '../src/components/Goods/Goods'
import Ratings from '../src/components/Ratings/Ratings'
import Seller from '../src/components/Seller/Seller'
// import GoodsJson from '../data/goods.json'
// import RatingsJson from '../data/ratings.json'
// import SellerJson from '../data/seller.json'

const routes = [
  {
      path: "/",
      redirect: "/goods",
  },
  {
    path: "/goods",
    name: "Goods",
    component: Goods,
  },
  {
    path: "/ratings",
    name: "Ratings",
    component: Ratings,
  },
  {
    path: "/seller",
    name: "Seller",
    component: Seller,
  }
  // api source
//   {
//     path: "/api/goods",
//     name: "GoodsJson",
//     component: GoodsJson,
//   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;