import axios, { AxiosRequestConfig } from 'axios'

export async function apiRequest(
  url: string,
  method = 'GET',
  data: any = null,
  headers: AxiosRequestConfig['headers'] = {}
) {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
    }

    if (data) {
      config.data = data
    }

    const response = await axios(config)
    return response.data
  } catch (error) {
    console.error(`Error during API request to ${url}:`, error)
    throw error
  }
}
