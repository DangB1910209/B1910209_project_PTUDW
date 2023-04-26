import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import store from './store';
import route from './router';
import VueSelect from "vue-select";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import './App.css'


library.add(faXmark)

const app = createApp(App)
app.use(store)
app.use(route)
app.use(ToastPlugin);
app.component("v-select", VueSelect).component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
