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
        const countries = await response.json()

        const regions = [
          ...new Set(countries.map((country: any) => country.region)),
        ]
        this.regions = regions.map((region) => ({
          value: region,
          label: region,
        }))

        const borders = countries
          .filter(
            (country: any) => country.borders && country.borders.length > 0
          )
          .flatMap((country: any) => country.borders)

        if (borders.length > 0) {
          const responseBorders = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${borders.join(
              ','
            )}&fields=name,cca3`
          )
          const borderCountries = await responseBorders.json()

          const borderMap: { [key: string]: string } = {}
          borderCountries.forEach((country: any) => {
            borderMap[country.cca3] = country.name.common
          })

          this.countries = countries.map((country: any) => {
            if (country.borders) {
              country.borders = country.borders.map(
                (code: string) => borderMap[code] || code
              )
            }
            return country
          })
        } else {
          this.countries = countries
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
    getSelectedCountry: (state) => {
      return (name: string) => {
        return state.countries.find(
          (country) => country.name.common.toLowerCase() === name.toLowerCase()
        )
      }
    },
  },
})
