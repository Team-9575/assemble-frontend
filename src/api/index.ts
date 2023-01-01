import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import Cookies from 'js-cookie'
import snakecaseKeys from 'snakecase-keys'

export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { Accept: 'application/json' },
  withCredentials: true,
})
export const imgClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
})

const getCamelCaseResponse = (responseConfig: AxiosResponse) => {
  const { data, ...rest } = responseConfig
  return { data: camelcaseKeys(data, { deep: true }), ...rest }
}
const getSnakeCaseRequest = (requestConfig: AxiosRequestConfig) => {
  if (requestConfig.data) {
    const { data, ...rest } = requestConfig
    return { data: snakecaseKeys(data, { deep: true }), ...rest }
  }
  return requestConfig
}

const setRequestConfig = (requestConfig: AxiosRequestConfig) => {
  apiClient.defaults.headers.common['X-CSRFTOKEN'] =
    Cookies.get('csrftoken') || ''
  const snakeCaseConfig = getSnakeCaseRequest(requestConfig)
  return snakeCaseConfig
}

const setImgRequestConfig = (requestConfig: AxiosRequestConfig) => {
  return requestConfig
}

const handleError = async (error: AxiosError) => {
  // TODO: handle error
  return Promise.reject(error)
}

apiClient.interceptors.response.use(getCamelCaseResponse, handleError)
apiClient.interceptors.request.use(setRequestConfig)

imgClient.interceptors.response.use(getCamelCaseResponse, handleError)
imgClient.interceptors.request.use(setImgRequestConfig)

export default apiClient
