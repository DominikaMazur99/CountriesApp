<template>
  <TopBar />
  <div class="main-container">
    <div class="main-container__box">
      <div class="inputs-box">
        <SearchInput />
        <div></div>
        <SelectInput v-model="selectedOption" :options="countryOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SearchInput from '../components/InputFields/SearchInput.vue'
import SelectInput from '../components/InputFields/SelectInput.vue'
import TopBar from '../components/TopBar/TopBar.vue'

export default defineComponent({
  name: 'MainPageView',
  components: {
    TopBar,
    SearchInput,
    SelectInput,
  },
  setup() {
    const selectedOption = ref<string>('')
    const countryOptions: { value: string; label: string }[] = [
      { value: '', label: '' },
      { value: 'us', label: 'United States' },
      { value: 'pl', label: 'Poland' },
      { value: 'de', label: 'Germany' },
    ]

    return {
      selectedOption,
      countryOptions,
    }
  },
})
</script>

<style scoped>
.main-container {
  height: calc(100% - 50px);
  background-color: #fafafa;
  overflow: hidden;
}
.main-container__box {
  padding: 100px 60px 0 60px;
  @media (max-width: 768px) {
    padding: 100px 30px 0 30px;
  }
}

.inputs-box {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
