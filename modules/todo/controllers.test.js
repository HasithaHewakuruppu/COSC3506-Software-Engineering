import { createTodoController } from './controllers'
import { expect, it, describe } from 'vitest'
import { createTodoService } from './services'
import { makeFakeTodo } from './db.test'

const todoController = createTodoController({
  createTodoService,
})

describe('Todo Controller', async () => {
  describe('Get Todo Controller', async () => {
    it('should return 201 if todo created', async () => {
      const mockRequest = makeFakeHttpRequest()
      const response = await todoController(mockRequest)

      expect(response.statusCode).toBe(201)
      expect(response.body.id).toBeDefined()
      expect(response.body.completed).toBe(mockRequest.body.completed)
      expect(response.body.title).toBe(mockRequest.body.title)
      expect(response.body.description).toBe(mockRequest.body.description)
      expect(response.body.duration).toBe(mockRequest.body.duration)
      expect(response.body.date).toEqual(mockRequest.body.date)
      expect(response.body.labelId).toBe(mockRequest.body.labelId)
      expect(response.body.userEmail).toBe(mockRequest.body.userEmail)
    })
    it.skip('should return 400 if todo no user email provided', async () => {
      const mockRequest = makeFakeHttpRequest({}, { userEmail: null })
      const response = await todoController(mockRequest)

      expect(response.statusCode).toBe(400)
      expect(response.error).toBeDefined()
    })
  })

  describe('Delete Todo Controller', async () => {
    it('should return 204 if todo deleted', async () => {
      // const todoController = createTodoController({
      //   deleteTodoByIdService,
      // })
      // const mockRequest = makeFakeHttpRequest()
      // const response = await todoController(mockRequest)
      // expect(response.statusCode).toBe(204)
    })
  })
})

function makeFakeHttpRequest(overrides, todoOverrides) {
  return {
    body: {
      ...makeFakeTodo(todoOverrides),
    },
    query: {
      id: 'test-id',
    },
    method: 'GET',
    path: '/test-path',
    ...overrides,
  }
}
