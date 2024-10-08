<template>
  <div :class="['card-container', { 'dark-mode__card': darkMode }]">
    <img :src="flagUrl" alt="Country flag" class="card-container__image" />
    <div class="card-container__description">
      <span class="card-title">{{ countryName }}</span>
      <div class="card-container__details">
        <ul class="clean-list__card">
          <li
            v-for="value in cardInfoList"
            :key="value.value"
            class="detailsList"
          >
            <span class="detailsList__label">{{ value.label }}: </span>
            <span class="detailsList__value"> {{ value.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

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
  setup(props) {
    const cardInfoList = computed(() => [
      { label: 'Population', value: props.populationValue },
      { label: 'Region', value: props.region },
      { label: 'Capital', value: props.capitalCity },
    ])
    return {
      cardInfoList,
    }
  },
})
</script>

<style scoped>
@import '../styles/styles.css';

.card-container {
  display: grid;
  grid-template-rows: 50% 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  max-height: 380px;
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
