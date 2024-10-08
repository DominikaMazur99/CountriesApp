import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiArrowLeft,
  BiX,
  HiSolidSearch,
  IoMoonOutline,
  IoMoonSharp,
  MdKeyboardarrowdownSharp,
} from 'oh-vue-icons/icons'

addIcons(
  HiSolidSearch,
  MdKeyboardarrowdownSharp,
  BiArrowLeft,
  BiX,
  IoMoonOutline,
  IoMoonSharp
)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
