import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [] as any[],
    selectedCountry: null as any | null,
    regions: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCountries() {
      if (this.countries.length > 0) return

      this.loading = true
      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders'
        )

        this.countries = await response.json()
        if (this.countries) {
          const regions = [
            ...new Set(this.countries.map((country) => country.region)),
          ]
          this.regions = regions.map((region) => ({
            value: region,
            label: region,
          }))
        }
      } catch (error) {
        this.error = 'Failed to fetch countries'
      } finally {
        this.loading = false
      }
    },
    setSelectedCountry(country: any) {
      this.selectedCountry = country
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
    getCountriesByName: (state) => {
      return (name: string) => {
        return state.countries.filter((country) =>
          country.name.common.toLowerCase().includes(name.toLowerCase())
        )
      }
    },
  },
})
