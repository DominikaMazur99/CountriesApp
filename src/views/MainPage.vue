<template>
  <div class="inputs-box">
    <div class="inputs-box__search">
      <SearchInput v-model="searchTerm" :darkMode="isDarkMode" />
    </div>
    <div class="inputs-box__select">
      <SelectInput
        v-model="selectedOption"
        :options="regions"
        :darkMode="isDarkMode"
      />
    </div>
  </div>
  <div class="countries-cards">
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
</template>

<script lang="ts">
import { SelectedCountry } from '@/interfaces/interfaces'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CountryCard from '../components/CountryCard/CountryCard.vue'
import SearchInput from '../components/InputFields/SearchInput.vue'
import SelectInput from '../components/InputFields/SelectInput.vue'
import { useCountriesStore } from '../stores/countriesStore'

export default defineComponent({
  name: 'MainPageView',
  components: {
    SearchInput,
    SelectInput,
    CountryCard,
  },
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const selectedOption = ref<string>('')
    const searchTerm = ref<string>('')
    const countriesStore = useCountriesStore()
    const router = useRouter()

    onMounted(() => {
      countriesStore.fetchCountries()
    })

    const filteredCountries = computed(() => {
      let filtered = countriesStore.countries

      if (selectedOption.value) {
        filtered = countriesStore.getCountriesByRegion(selectedOption.value)
      }

      if (searchTerm.value) {
        filtered = filtered.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase())
        )
      }

      return filtered
    })

    const regions = computed(() => countriesStore.regions)

    const handleShowDetails = (details: SelectedCountry) => {
      countriesStore.setSelectedCountry(details)

      router.push({
        name: 'detailsView',
        params: { countryName: details.countryName },
      })
    }

    return {
      selectedOption,
      searchTerm,
      filteredCountries,
      regions,
      handleShowDetails,
      loading: countriesStore.loading,
    }
  },
})
</script>

<style scoped>
@import '../components/styles/styles.css';

.inputs-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
.inputs-box__search {
  display: grid;
  grid-template-columns: 1fr;
}
.inputs-box__select {
  display: grid;
  grid-template-columns: 0.25fr;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: flex-start;
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
