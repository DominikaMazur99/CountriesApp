import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiArrowLeft,
  BiMoon,
  FaMoon,
  HiSolidSearch,
  MdKeyboardarrowdownSharp,
} from 'oh-vue-icons/icons'

addIcons(BiMoon, FaMoon, HiSolidSearch, MdKeyboardarrowdownSharp, BiArrowLeft)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
