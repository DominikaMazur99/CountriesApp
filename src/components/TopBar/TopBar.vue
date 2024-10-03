<template>
  <div class="topbar-container">
    <div class="topbar-box">
      <span class="topbar-box__name">Where in the world?</span>
      <div class="topbar-box__mode">
        <v-icon width="20" height="20" fill="#000000" name="bi-moon" />
        <span>Dark Mode</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopBar',
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
  @media (max-width: 768px) {
    padding: 12px 30px;
  }
}
.topbar-box {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  height: 100%;
}
.topbar-box__name {
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
  color: #000000;
}
.topbar-box__mode {
  display: flex;
  justify-content: space-between;
  gap: 2px;
  align-items: center;
}
</style>
