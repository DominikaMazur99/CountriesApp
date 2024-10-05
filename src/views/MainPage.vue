<template>
  <div :class="['page-container', { 'dark-mode': isDarkMode }]">
    <TopBar @toggle-dark-mode="toggleDarkMode" :darkMode="isDarkMode" />
    <div :class="['main-container', { 'dark-mode__main': isDarkMode }]">
      <div class="main-container__box">
        <div class="inputs-box">
          <!-- SearchInput dla filtrowania po nazwie kraju -->
          <SearchInput v-model="searchTerm" :darkMode="isDarkMode" />
          <!-- SelectInput dla filtrowania po regionie -->
          <SelectInput
            v-model="selectedOption"
            :options="regions"
            :darkMode="isDarkMode"
          />
        </div>
        <div class="countries-cards">
          <!-- Wyświetlanie przefiltrowanych krajów -->
          <CountryCard
            v-for="country in filteredCountries"
            :key="country.cca3"
            :flagUrl="country.flags.png"
            :countryName="country.name.common"
            :populationValue="country.population"
            :capitalCity="country.capital[0]"
            :region="country.region"
            :darkMode="isDarkMode"
            @click="
              handleShowDetails({
                flagUrl: country?.flags.png,
                countryName: country?.name.common,
                populationValue: country?.population,
                capitalCity: country?.capital[0],
                region: country?.region,
                nativeName: country?.name.official,
                subRegion: country?.subregion,
                topLevelDomain: country?.tld[0],
                currencies: Object.keys(country.currencies)[0],
                languages: Object.values(country.languages).join(', '),
                borderCountries: country.borders,
              })
            "
            class="countries-cards__details"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
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
    const searchTerm = ref<string>('')
    const countriesStore = useCountriesStore()
    const router = useRouter()
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
      countriesStore.fetchCountries()
    })

    // Filtrowanie krajów według nazwy lub regionu
    const filteredCountries = computed(() => {
      if (selectedOption.value) {
        return countriesStore.getCountriesByRegion(selectedOption.value)
      } else if (searchTerm.value) {
        return countriesStore.getCountriesByName(searchTerm.value)
      } else {
        return countriesStore.countries // Wyświetl wszystkie kraje, jeśli nic nie jest wybrane
      }
    })

    const regions = computed(() => countriesStore.regions)

    interface IDetails {
      flagUrl: string
      countryName: string
      populationValue: number
      capitalCity: string
      region: string
      nativeName: string
      subRegion: string
      topLevelDomain: string
      currencies: string
      languages: string
      borderCountries: any
    }

    const handleShowDetails = (details: IDetails) => {
      countriesStore.setSelectedCountry(details)

      router.push({ name: 'detailsView' })
    }

    return {
      selectedOption,
      searchTerm,
      filteredCountries,
      regions,
      toggleDarkMode,
      isDarkMode,
      handleShowDetails,
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
.dark-mode__main {
  background-color: #232c35;
  color: #ffffff;
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
.countries-cards__details:hover {
  cursor: pointer;
}
</style>
