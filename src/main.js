import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'; // Импортируем Pinia
import dialogs from 'v-dialogs'
import App from './app.vue'
import "waypoints/lib/noframework.waypoints.js"; //http://imakewebthings.com/waypoints/
import router from '@/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css'; // TailWind

import './assets/styles/style.css'; // Template CSS
import './assets/styles/responsive.css'; // Responsive CSS
import './assets/styles/wspro.css'; // Individual CSS

const app = createApp(App);
const head = createHead();
const pinia = createPinia(); // Создаём экземпляр Pinia
app.use(head);
app.use(pinia); // Подключаем Pinia к приложению
app.use(router); // Подключаем роутер
app.use(dialogs);

// Waypoint уже есть в `window`, просто добавляем его в глобальные свойства
app.config.globalProperties.$Waypoint = window.Waypoint;

app.mount('#app')