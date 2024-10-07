<template>
  <div class="select-input__container" ref="dropdownContainer">
    <div
      :class="[
        'search-input__container',
        { 'dark-mode-input__container': darkMode },
      ]"
      style="justify-content: space-between"
    >
      <input
        :class="['search-input', { 'dark-mode__input': darkMode }]"
        :placeholder="placeholder"
        v-model="searchQuery"
        @focus="isOpen = true"
      />
      <button
        v-if="!modelValue.length"
        @click="toggleDropdown"
        class="btn-nostyle"
      >
        <v-icon
          class="search-icon"
          width="20"
          height="20"
          name="md-keyboardarrowdown-sharp"
          :style="{ color: darkMode ? 'white' : 'gray' }"
        />
      </button>
      <button v-else @click="handleClear" class="btn-nostyle">
        <v-icon
          class="search-icon"
          width="20"
          height="20"
          name="bi-x"
          :style="{ color: darkMode ? 'white' : 'gray' }"
        />
      </button>
    </div>

    <div
      v-if="isOpen"
      :class="['option-container', { 'option-container__dark': darkMode }]"
    >
      <ul class="clean-list">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          @click="selectOption(option.label)"
          class="option-item"
        >
          {{ option.label }}
        </li>
        <li v-if="filteredOptions.length === 0" class="option-item">
          No options found
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { Option } from '../../interfaces/interfaces'

export default defineComponent({
  name: 'SelectInput',
  props: {
    options: {
      type: Array as () => Option[],
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    const isOpen = ref(false)
    const dropdownContainer = ref<HTMLElement | null>(null)

    const filteredOptions = computed(() => {
      if (!searchQuery.value) return props.options
      return props.options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    watch(
      () => props.modelValue,
      (newValue) => {
        searchQuery.value = newValue
      },
      { immediate: true }
    )

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const selectOption = (label: string) => {
      searchQuery.value = label
      emit('update:modelValue', label)
      isOpen.value = false
    }

    const handleClear = () => {
      searchQuery.value = ''
      emit('update:modelValue', '')
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainer.value &&
        !dropdownContainer.value.contains(event.target as Node)
      ) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside)
    })

    const placeholder = 'Filter by region...'

    return {
      searchQuery,
      filteredOptions,
      isOpen,
      toggleDropdown,
      selectOption,
      handleClear,
      dropdownContainer,
      placeholder,
    }
  },
})
</script>

<style scoped>
@import '../styles/styles.css';

.select-input__container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.option-container {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  color: gray;
}
.option-container__dark {
  background-color: #2e3742;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  color: white;
}

.option-item {
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.option-item:hover {
  background-color: #f0f0f0;
}
.btn-nostyle {
  border: none;
  background-color: transparent;
  padding: 0;
  color: transparent;
}
.btn-nostyle:hover {
  cursor: pointer;
}
</style>
