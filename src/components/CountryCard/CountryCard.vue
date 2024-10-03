<template>
  <div :class="['card-container', { 'dark-mode__card': darkMode }]">
    <img :src="flagUrl" alt="Country flag" class="card-container__image" />
    <div class="card-container__description">
      <h1>{{ countryName }}</h1>
      <div class="card-container__details">
        <ul class="clean-list__card">
          <li><strong>Population: </strong>{{ populationValue }}</li>
          <li><strong>Region: </strong>{{ region }}</li>
          <li><strong>Capital: </strong>{{ capitalCity }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CountryCard',
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
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
@import '../styles/styles.css';

.card-container {
  display: grid;
  grid-template-rows: 40% 60%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
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
</style>
