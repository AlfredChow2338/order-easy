import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/router'
// import axios from 'axios'

// createApp.prototype.$axios = axios;
createApp(App).use(router).mount('#app')