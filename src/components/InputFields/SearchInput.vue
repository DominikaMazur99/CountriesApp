<template>
  <div
    :class="[
      'search-input__container',
      { 'dark-mode-input__container': darkMode },
    ]"
  >
    <v-icon
      class="search-icon"
      width="20"
      height="20"
      name="hi-solid-search"
      color="gray"
    />
    <input
      :class="['search-input', { 'dark-mode__input': darkMode }]"
      placeholder="Search for a country..."
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchInput',
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
@import '../styles/styles.css';
</style>
