<template>
  <div :class="['page-container', { 'dark-mode': isDarkMode }]">
    <TopBar @toggle-dark-mode="toggleDarkMode" :darkMode="isDarkMode" />

    <div :class="['main-container', { 'dark-mode__main': isDarkMode }]">
      <div class="main-container__box">
        <router-view :isDarkMode="isDarkMode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import TopBar from '../components/TopBar/TopBar.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    TopBar,
  },
  setup() {
    const isDarkMode = ref(localStorage.getItem('darkMode') === 'on')

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('darkMode', isDarkMode.value ? 'on' : 'off')
    }

    onMounted(() => {
      if (localStorage.getItem('darkMode') === 'on') {
        isDarkMode.value = true
      } else {
        isDarkMode.value = false
      }
    })

    return {
      isDarkMode,
      toggleDarkMode,
    }
  },
})
</script>

<style>
@import '../components/styles/styles.css';

.main-container__box {
  padding: 50px 60px 30px 60px;
  @media (max-width: 768px) {
    padding: 50px 30px 30px 30px;
  }
}
</style>
