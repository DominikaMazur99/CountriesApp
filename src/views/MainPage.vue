<template>
  <div class="page-container">
    <TopBar />
    <div class="main-container">
      <div class="main-container__box">
        <div class="inputs-box">
          <SearchInput />
          <div></div>
          <SelectInput v-model="selectedOption" :options="countryOptions" />
        </div>
        <div class="countries-cards">
          <CountryCard
            v-for="country in countries"
            :key="country.cca3"
            :flagUrl="country.flags.png"
            :countryName="country.name.common"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import CountryCard from '../components/CountryCard/CountryCard.vue'
import SearchInput from '../components/InputFields/SearchInput.vue'
import SelectInput from '../components/InputFields/SelectInput.vue'
import TopBar from '../components/TopBar/TopBar.vue'
import { useCountriesStore } from '../stores/countriesStore'

export default defineComponent({
  name: 'MainPageView',
  components: {
    TopBar,
    SearchInput,
    SelectInput,
    CountryCard,
  },
  setup() {
    const selectedOption = ref<string>('')
    const countryOptions: { value: string; label: string }[] = [
      { value: '', label: '' },
      { value: 'us', label: 'United States' },
      { value: 'pl', label: 'Poland' },
      { value: 'de', label: 'Germany' },
    ]
    const countriesStore = useCountriesStore()
    onMounted(() => {
      countriesStore.fetchCountries()
    })

    const countries = computed(() => countriesStore.countries)

    return {
      selectedOption,
      countryOptions,
      countries: countries,
    }
  },
})
</script>

<style scoped>
.page-container {
  display: grid;
  grid-template-rows: 50px auto;
  height: 100vh;
}
.main-container {
  background-color: #fafafa;
  overflow-x: hidden;
  overflow-y: auto;
}
.main-container__box {
  padding: 50px 60px 0 60px;
  @media (max-width: 768px) {
    padding: 50px 30px 0 30px;
  }
}

.inputs-box {
  display: grid;
  grid-template-columns: 0.75fr 1fr auto;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
.countries-cards {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  padding: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
