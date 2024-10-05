<template>
  <div :class="['details-container', { 'details-container': darkMode }]">
    <img :src="flagUrl" alt="Country flag" class="details-container__image" />
    <div class="card-container__details">
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
            <button class="border-button">{{ border }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
})
</script>

<style scoped>
@import '../styles/styles.css';

.details-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
}

.dark-mode__card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #2e3742;
}

.card-container__image {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.card-container__description {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
}

.card-container__details {
  margin-top: 10px;
}

.clean-list__card {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.clean-list__card li {
  margin-bottom: 10px;
}
.details-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Stylowanie przycisków dla krajów graniczących */
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

.border-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}
</style>
