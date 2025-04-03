import { createApp } from 'vue'
import App from './app.vue'
import "waypoints/lib/noframework.waypoints.js";
import router from '@/router'
// import * as jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;

const app = createApp(App)
    .use(router)
    //.use($) // TODO: разобраться с этим, возможно рефакторинг с новыми вводными при глобальной регистрации jquery

// Waypoint уже есть в `window`, просто добавляем его в глобальные свойства
app.config.globalProperties.$Waypoint = window.Waypoint;

app.mount('#app')