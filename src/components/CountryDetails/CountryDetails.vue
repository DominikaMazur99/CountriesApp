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
</style>
