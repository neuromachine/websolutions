import { createApp } from 'vue'
import App from './app.vue'
import router from '@/router'
// import * as jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;

createApp(App)
    .use(router)
    //.use($)
    .mount('#app')