export interface Country {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: {
      ara: {
        official: string
        common: string
      }
    }
  }
  tld: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  capital: string[]
  region: string
  subregion: string
  languages: {
    [key: string]: string
  }
  borders: string[]
  population: number
}

export interface SelectedCountry {
  flagUrl: string
  countryName: string
  populationValue: number
  capitalCity: string
  region: string
  nativeName: string
  subRegion: string
  topLevelDomain: string
  currencies: string
  languages: string
  borderCountries: string[]
}

export interface Option {
  value: string
  label: string
}
