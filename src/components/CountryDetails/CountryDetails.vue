<template>
  <div :class="['details-container', { 'dark-mode__card': darkMode }]">
    <div>
      <img :src="flagUrl" alt="Country flag" class="details-container__image" />
    </div>

    <div v-if="!loading" class="card-container__details">
      <div>
        <h1>{{ countryName }}</h1>
      </div>
      <div class="details-box">
        <div>
          <ul class="clean-list__card">
            <li><strong>Native Name: </strong>{{ nativeName }}</li>
            <li><strong>Population: </strong>{{ populationValue }}</li>
            <li><strong>Region: </strong>{{ region }}</li>
            <li><strong>Sub Region: </strong>{{ subRegion }}</li>
            <li><strong>Capital: </strong>{{ capitalCity }}</li>
          </ul>
        </div>
        <div>
          <ul class="clean-list__card">
            <li><strong>Top Level Domain: </strong>{{ topLevelDomain }}</li>
            <li><strong>Currencies: </strong>{{ currencies }}</li>
            <li><strong>Languages: </strong>{{ languages }}</li>
          </ul>
        </div>
      </div>
      <div class="borders-section">
        <h3>Border Countries:</h3>
        <div class="borders-buttons">
          <div v-for="border in borderCountries" :key="border">
            <button class="border-button" @click="handleBorderClick(border)">
              {{ border }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCountriesStore } from '../../stores/countriesStore'

export default defineComponent({
  name: 'CountryDetails',
  props: {
    flagUrl: {
      type: String,
      required: true,
    },
    countryName: {
      type: String,
      required: true,
    },
    populationValue: {
      type: Number,
      required: true,
    },
    capitalCity: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    nativeName: {
      type: String,
      required: true,
    },
    subRegion: {
      type: String,
      required: true,
    },
    topLevelDomain: {
      type: String,
      required: true,
    },
    currencies: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
    borderCountries: {
      type: Array,
      required: true,
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const countriesStore = useCountriesStore()
    const loading = ref(false)

    const handleBorderClick = async (borderCountry: string) => {
      loading.value = true
      const country = countriesStore.getSelectedCountry(borderCountry)
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

      if (selectedObject) {
        await countriesStore.setSelectedCountry(selectedObject)
      } else {
        console.error('Country not found')
      }
      loading.value = false
    }

    return {
      handleBorderClick,
      loading,
    }
  },
})
</script>

<style scoped>
.details-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
}

.details-container__image {
  width: 100%;
  max-width: 400px;
  margin-bottom: 30px;
}

.card-container__details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  width: 100%;
}

.details-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
}

.clean-list__card {
  list-style: none;
  padding: 0;
}

.clean-list__card li {
  margin-bottom: 10px;
}

.borders-section {
  margin-top: 20px;
}

.borders-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.border-button {
  padding: 5px 15px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.border-button:hover {
  background-color: #e0e0e0;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.back-btn:hover {
  background-color: #f0f0f0;
}

.back-btn__icon {
  margin-right: 8px;
}
</style>
