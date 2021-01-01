import { createWebHistory, createRouter } from "vue-router";
import Goods from '../src/components/Goods/Goods'
import Ratings from '../src/components/Ratings/Ratings'
import Seller from '../src/components/Seller/Seller'

const routes = [
  {
      path: "/",
      redirect: "/goods",
  },
  {
    path: "/goods",
    name: "Goods",
    component: Goods,
    meta: {
      keepAlive: true,
    } 
  },
  {
    path: "/ratings",
    name: "Ratings",
    component: Ratings,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: "/seller",
    name: "Seller",
    component: Seller,
    meta: {
      keepAlive: true,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;