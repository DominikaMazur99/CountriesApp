import { apiRequest } from '@/utils/api' // Import reużywalnej funkcji
import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [] as any[],
    regions: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCountries() {
      if (this.countries.length > 0) return

      this.loading = true
      try {
        this.countries = await apiRequest(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital'
        )
        if (this.countries) {
          const regions = [
            ...new Set(this.countries.map((country) => country.region)),
          ]

          this.regions = regions.map((region) => ({
            value: region,
            label: region,
          }))
        }
        console.log('jestem')
      } catch (error) {
        this.error = 'Failed to fetch countries'
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    getCountriesByRegion: (state) => {
      return (region: string) => {
        return state.countries.filter((country) =>
          country.region.toLowerCase().includes(region.toLowerCase())
        )
      }
    },
  },
})
