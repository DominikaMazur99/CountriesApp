<template>
  <div>
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
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>
    <div class="countries-cards" v-else>
      <CountryCard
        v-for="country in filteredCountries"
        :key="country.name.official"
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
            currencies: Object.values(country.currencies)
              .map((currency) => currency.name)
              .join(', '),
            languages: Object.values(country.languages).join(', '),
            borderCountries: country.borders,
          })
        "
        :class="[
          'countries-cards__details',
          { 'country-cards__details__dark': isDarkMode },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Option, SelectedCountry } from '@/interfaces/interfaces'
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

    const regions = computed<Option[]>(() =>
      countriesStore.regions.map((region) => ({
        label: region,
        value: region,
      }))
    )

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
      loading: computed(() => countriesStore.loading),
    }
  },
})
</script>

<style scoped>
@import '../components/styles/styles.css';

.inputs-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
  gap: 50px;
  padding-top: 50px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    padding: 50px 20px 20px 20px;
  }
}
.countries-cards__details:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.country-cards__details__dark:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.7);
  background-color: #3a454f;
}
</style>
