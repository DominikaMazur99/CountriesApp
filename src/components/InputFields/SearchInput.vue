<template>
  <div class="search-input__container">
    <v-icon
      class="search-icon"
      width="20"
      height="20"
      name="hi-solid-search"
      color="gray"
    />
    <input class="search-input" placeholder="Search for a country..." />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchInput',
})
</script>

<style scoped>
@import '../styles/styles.css';

.search-input {
  padding: 16px;
  border: none;
  font-size: 16px;
  outline: none;
}

.search-input:focus {
  border-color: transparent;
  box-shadow: none;
}
</style>
