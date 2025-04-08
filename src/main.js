/*
import $ from 'jquery';

// Проверяем, есть ли jQuery в глобальном объекте
console.log('jQuery in global scope:', window.jQuery, window.$);

// Принудительно делаем jQuery глобальным
window.jQuery = $;
window.$ = $;

// Проверяем еще раз
console.log('jQuery set in global scope:', window.jQuery, window.$);
*/

import { createApp } from 'vue'
import { createPinia } from 'pinia'; // Импортируем Pinia
import App from './app.vue'
import "waypoints/lib/noframework.waypoints.js"; //http://imakewebthings.com/waypoints/
import router from '@/router'
// import * as jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;

// const app = createApp(App)
    //.use($) // TODO: разобраться с этим, возможно рефакторинг с новыми вводными при глобальной регистрации jquery
const app = createApp(App);
const pinia = createPinia(); // Создаём экземпляр Pinia
app.use(pinia); // Подключаем Pinia к приложению
app.use(router); // Подключаем роутер

// Waypoint уже есть в `window`, просто добавляем его в глобальные свойства
app.config.globalProperties.$Waypoint = window.Waypoint;

app.mount('#app')