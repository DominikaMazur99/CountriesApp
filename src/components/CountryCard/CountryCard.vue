<template>
  <div class="card-container">
    <img :src="flagUrl" alt="Country flag" class="card-container__image" />
    <div class="card-container__description">
      <h1>{{ countryName }}</h1>
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
  },
})
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  height: 400px;
}

.card-container__image {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.card-container__description {
  padding: 16px;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
