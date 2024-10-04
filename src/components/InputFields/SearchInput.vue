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
      :style="{ color: darkMode ? 'white' : 'gray' }"
    />
    <input
      :class="['search-input', { 'dark-mode__input': darkMode }]"
      placeholder="Search for a country..."
      v-model="searchValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'SearchInput',
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const searchValue = ref(props.modelValue)

    watch(searchValue, (newValue) => {
      emit('update:modelValue', newValue)
    })

    return {
      searchValue,
    }
  },
})
</script>

<style scoped>
@import '../styles/styles.css';
</style>
