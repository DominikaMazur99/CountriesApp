<template>
  <div :class="['details-container', { 'dark-mode__card': darkMode }]">
    <div>
      <img :src="flagUrl" alt="Country flag" class="details-container__image" />
    </div>

    <div v-if="!loading" class="card-container__details">
      <div>
        <span class="card-title">{{ countryName }}</span>
      </div>
      <div class="details-box">
        <div>
          <ul class="clean-list__card">
            <li
              v-for="value in baseInfoList"
              :key="value.value"
              class="detailsList"
            >
              <span class="detailsList__label">{{ value.label }}: </span>
              <span class="detailsList__value"> {{ value.value }}</span>
            </li>
          </ul>
        </div>
        <div>
          <ul class="clean-list__card">
            <li
              v-for="value in secondInfoList"
              :key="value.value"
              class="detailsList"
            >
              <span class="detailsList__label">{{ value.label }}: </span>
              <span class="detailsList__value"> {{ value.value }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="borders-section">
        <span class="detailsList__label">Border Countries:</span>
        <div class="borders-buttons" v-if="borderCountries.length">
          <div v-for="border in borderCountries" :key="border">
            <button
              :class="['border-button', { 'border-button__dark': darkMode }]"
              @click="handleBorderClick(border)"
            >
              {{ border }}
            </button>
          </div>
        </div>
        <span v-else>-</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const loading = ref(false)

    const baseInfoList = computed(() => [
      { label: 'Native Name', value: props.nativeName },
      { label: 'Population', value: props.populationValue },
      { label: 'Region', value: props.region },
      { label: 'Sub Region', value: props.subRegion },
      { label: 'Capital', value: props.capitalCity },
    ])

    const secondInfoList = computed(() => [
      { label: 'Top Level Domain', value: props.topLevelDomain },
      { label: 'Currencies', value: props.currencies },
      { label: 'Languages', value: props.languages },
    ])

    const handleBorderClick = async (borderCountry: string) => {
      loading.value = true
      const country = countriesStore.getSelectedCountry(borderCountry)
      const selectedObject = {
        flagUrl: country?.flags.png || '',
        countryName: country?.name.common || '',
        populationValue: country?.population || 0,
        capitalCity: country?.capital?.[0] || '',
        region: country?.region || '',
        nativeName: country?.name.official || '',
        subRegion: country?.subregion || '',
        topLevelDomain: country?.tld?.[0] || '',
        currencies: Object.keys(country?.currencies || {})[0] || '',
        languages: Object.values(country?.languages || {}).join(', ') || '',
        borderCountries: country?.borders || [],
      }

      if (selectedObject) {
        await countriesStore.setSelectedCountry(selectedObject)
        router.push({
          name: 'detailsView',
          params: { countryName: selectedObject.countryName },
        })
      } else {
        console.error('Country not found')
      }
      loading.value = false
    }

    return {
      handleBorderClick,
      loading,
      baseInfoList,
      secondInfoList,
    }
  },
})
</script>

<style scoped>
@import '../styles/styles.css';
.details-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

.details-container__image {
  width: 100%;
  aspect-ratio: 10 / 7;
  object-fit: cover;
  max-width: 500px;
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
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

.clean-list__card {
  list-style: none;
  padding: 0;
}

.clean-list__card li {
  margin-bottom: 10px;
  font-size: 14px;
}

.borders-section {
  display: flex;
  gap: 20px;
  align-items: center;
}

.borders-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.border-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  padding: 8px;
  color: #000000;
  font-size: 14px;
  font-weight: 300;
}

.border-button__dark {
  color: #ffffff;
  background-color: #2e3742;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.border-button:hover {
  cursor: pointer;
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
