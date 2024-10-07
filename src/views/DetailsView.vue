<template>
  <div class="details-box">
    <div class="back-btn__container">
      <button
        :class="['back-btn', { 'back-btn__dark': isDarkMode }]"
        @click="handleBack"
      >
        <v-icon
          class="back-btn__icon"
          width="16"
          height="16"
          name="bi-arrow-left"
        />
        <p>Back</p>
      </button>
    </div>
    <div class="details-container">
      <CountryDetails
        v-if="selectedCountry"
        :flagUrl="selectedCountry.flagUrl"
        :countryName="selectedCountry.countryName"
        :populationValue="selectedCountry.populationValue"
        :capitalCity="selectedCountry.capitalCity"
        :region="selectedCountry.region"
        :nativeName="selectedCountry.nativeName"
        :subRegion="selectedCountry.subRegion"
        :topLevelDomain="selectedCountry.topLevelDomain"
        :currencies="selectedCountry.currencies"
        :languages="selectedCountry.languages"
        :borderCountries="selectedCountry.borderCountries || []"
        :darkMode="isDarkMode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useCountriesStore } from '@/stores/countriesStore'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CountryDetails from '../components/CountryDetails/CountryDetails.vue'

export default defineComponent({
  name: 'DetailsView',
  components: {
    CountryDetails,
  },
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const countriesStore = useCountriesStore()
    const route = useRoute()

    const handleBack = () => {
      router.go(-1)
    }

    const fetchCountry = (countryName: string) => {
      const country = countriesStore.getSelectedCountry(countryName)

      if (country) {
        const selectedObject = {
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
        }
        selectedCountry.value = selectedObject
        countriesStore.setSelectedCountry(selectedObject)
      } else {
        router.push({ name: 'mainPage' })
        countriesStore.setSelectedCountry(null)
      }
    }

    onMounted(() => {
      fetchCountry(route.params.countryName as string)
    })

    const selectedCountry = ref(countriesStore.selectedCountry)

    watch(
      () => route.params.countryName,
      (newCountryName) => {
        fetchCountry(newCountryName as string)
      }
    )

    return {
      selectedCountry,
      handleBack,
    }
  },
})
</script>

<style scoped>
.back-btn__container {
  display: grid;
  grid-template-columns: 0.25fr 1fr auto;
  width: 100%;
}
.back-btn {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  padding: 2px 8px;
  min-width: 150px;
  color: #000000;
  font-size: 14px;
  font-weight: 300;
}

.back-btn__dark {
  color: #ffffff;
  background-color: #2e3742;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.back-btn:hover {
  cursor: pointer;
}

.details-box {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>
