import { ValidationError } from 'yup'

export const createTodoController = ({ createTodoService }) => {
  return async function todoController(httpRequest) {
    try {
      const todoPayload = httpRequest.body
      const todo = await createTodoService(todoPayload)
      return {
        statusCode: 201,
        body: todo,
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        return {
          statusCode: 400,
          error: e.message,
        }
      }
      return {
        statusCode: 500,
        error: 'An unkown error occurred.',
      }
    }
  }
}
