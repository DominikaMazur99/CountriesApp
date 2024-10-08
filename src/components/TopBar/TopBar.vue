<template>
  <div :class="['topbar-container', { 'dark-mode': darkMode }]">
    <div class="topbar-box">
      <span @click="handleGoToMainPage" :class="['topbar-box__name']"
        >Where in the world?</span
      >
      <div class="topbar-box__mode">
        <div
          :class="['switch-mode__btn', { 'switch-mode__dark': darkMode }]"
          @click="$emit('toggle-dark-mode')"
        >
          <v-icon width="16" height="16" name="fa-moon" />
          <span v-if="darkMode">Light Mode</span>
          <span v-else>Dark Mode</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useCountriesStore } from '@/stores/countriesStore'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'TopBar',
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const countriesStore = useCountriesStore()
    const route = useRoute()
    const handleGoToMainPage = () => {
      router.push({ name: 'mainPage' })
      countriesStore.setSelectedCountry(null)
    }

    return {
      handleGoToMainPage,
    }
  },
})
</script>

<style scoped>
.topbar-container {
  padding: 12px 60px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  height: 50px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  color: #000000;
  @media (max-width: 768px) {
    padding: 12px 30px;
  }
}
.dark-mode {
  background-color: #2e3742;
  color: #ffffff;
}
.topbar-box {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  height: 100%;
}
.topbar-box__name {
  font-size: 24px;
  font-weight: 400;
  line-height: 1.2;
}
.topbar-box__name:hover {
  cursor: pointer;
}
.topbar-box__mode {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
.switch-mode__btn {
  border: none;
  background-color: none;
  padding: 12px;
  align-items: flex-end;
  font-weight: 200;
  font-size: 15px;
}
.switch-mode__btn:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.switch-mode__dark:hover {
  color: #ffffff;
  background-color: #2e3742;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-color: transparent;
}
</style>
