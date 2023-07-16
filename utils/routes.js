export const LOGIN_PAGE = '/'
export const HOME_PAGE = '/tests/dashboard'
export const LABELS_PAGE = '/labels'

export const API_ENDPOINTS = {
  GET_LABELS: 'http://localhost:3000/api/labels',
  GET_TODOS: 'http://localhost:3000/api/todos',
  GET_TODOS_WITH_LABELS: 'http://localhost:3000/api/todos?labels=true',
  GET_TODOS_FOR_DATE: `http://localhost:3000/api/todos?labels=true&date=`,
  GET_TODO_BY_ID: (id) => `localhost:3000/api/todos/${id}`,
}
