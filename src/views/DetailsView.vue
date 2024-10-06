<template>
  <div :class="['page-container', { 'dark-mode': isDarkMode }]">
    <TopBar @toggle-dark-mode="toggleDarkMode" :darkMode="isDarkMode" />
    <div :class="['main-container', { 'dark-mode__main': isDarkMode }]">
      <div class="main-container__box">
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
              <p class="back-btn__text">Back</p>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useCountriesStore } from '@/stores/countriesStore'
import { defineComponent, onMounted, ref, watch } from 'vue'
import CountryDetails from '../components/CountryDetails/CountryDetails.vue'
import TopBar from '../components/TopBar/TopBar.vue'

export default defineComponent({
  name: 'DetailsView',
  components: {
    TopBar,
    CountryDetails,
  },
  setup() {
    const isDarkMode = ref(localStorage.getItem('darkMode') === 'on')
    const countriesStore = useCountriesStore()

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('darkMode', isDarkMode.value ? 'on' : 'off')
    }

    const handleBack = () => {
      router.push({ name: 'mainPage' })
      countriesStore.setSelectedCountry(null)
    }

    onMounted(() => {
      if (localStorage.getItem('darkMode') === 'on') {
        isDarkMode.value = true
      } else {
        isDarkMode.value = false
      }
    })

    watch(
      () => countriesStore.selectedCountry,
      (newCountry) => {
        selectedCountry.value = newCountry
      }
    )

    const selectedCountry = ref(countriesStore.selectedCountry)

    return {
      toggleDarkMode,
      isDarkMode,
      selectedCountry,
      handleBack,
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
