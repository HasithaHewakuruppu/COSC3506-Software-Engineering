import { object, string, number, date } from 'yup'

export const createTodoSchema = object({
  title: string().required(),
  description: string().required(),
  duration: number().required().positive().integer(),
  date: date().required(),
  labelId: string().required(),
  userEmail: string().email().required(),
})

export const deleteTodoSchema = object({
  todoId: string().required(),
})
