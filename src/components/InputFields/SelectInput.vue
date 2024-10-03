<template>
  <div class="select-input__container" ref="dropdownContainer">
    <div class="search-input__container" @click="toggleDropdown">
      <input
        class="search-input"
        :placeholder="placeholder"
        v-model="searchQuery"
        @focus="isOpen = true"
      />
      <v-icon
        class="search-icon"
        style="margin-right: 0"
        width="20"
        height="20"
        name="md-keyboardarrowdown-sharp"
        color="gray"
        @click="toggleDropdown"
      />
    </div>

    <div v-if="isOpen" class="option-container">
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
import { Option } from '../interfaces/interfaces'

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
      }
    )

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const selectOption = (label: string) => {
      searchQuery.value = label
      emit('update:modelValue', label)
      isOpen.value = false
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
}

.clean-list {
  list-style-type: none;
  padding-left: 0;
}

.option-item {
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: gray;
}

.option-item:hover {
  background-color: #f0f0f0;
}
</style>
