export const LOGIN_PAGE = '/'
export const HOME_PAGE = '/dashboard'
export const LABELS_PAGE = '/labels'

const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? process.env.NEXTAUTH_URL : 'http://localhost:3000'

export const API_ENDPOINTS = {
  GET_LABELS: `${baseUrl}/api/labels`,
  GET_TODOS: `${baseUrl}/api/todos`,
  GET_TODOS_WITH_LABELS: `${baseUrl}/api/todos?labels=true`,
  GET_TODOS_FOR_DATE: `${baseUrl}/api/todos?labels=true&date=`,
}
