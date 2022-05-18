import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import naive from "./plugins/naiveui";
import SvgIcon from '@/components/svgIcon/SvgIcon.vue';
import './index.css';
import { getToken } from '@/utils/index';
import axios from 'axios';

const app = createApp(App).use(store).use(router).use(naive);

app.mount('#app')

app.component('svg-icon',SvgIcon);

router.beforeEach((to, from, next) => {
  if(to.name === 'Login') {
    next();
  }else {
    if(getToken()) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  }
})

axios.get("./../config.json", {headers: {"Cache-Control": "no-vavhe"}}).then(res => {
  localStorage.setItem('apiUrl', res.data.apiUrl);
}).catch(error => {
  console.log(error)
})