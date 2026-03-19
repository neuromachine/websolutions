import {createApp} from 'vue'
import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia';
import { i18n } from '@/i18n'
import { setupI18nSync } from '@/plugins/i18nSync'
import dialogs from 'v-dialogs'
import App from './App.vue' // Case sensivity fix
import "waypoints/lib/noframework.waypoints.js"; //http://imakewebthings.com/waypoints/
import router from '@/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css'; // TailWind

import './assets/styles/style.css'; // Template CSS
import './assets/styles/responsive.css'; // Responsive CSS
import './assets/styles/wspro.css'; // Individual CSS

import AppLink from '@/components/AppLink.vue'

import { useUiStore } from '@/stores/uiStore'


const app = createApp(App);
const head = createHead();
const pinia = createPinia();

app.use(head);
app.use(pinia);
app.use(i18n)
setupI18nSync(pinia)
app.use(router);
app.use(dialogs);
app.component('AppLink', AppLink)

const uiStore = useUiStore()
const saved = localStorage.getItem('scope')
if (saved)
{
    uiStore.setScope(saved)
}
// Waypoint уже есть в `window`, просто добавляем его в глобальные свойства
app.config.globalProperties.$Waypoint = window.Waypoint;

app.mount('#app')