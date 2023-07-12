import {
  makeCreateTodoController,
  makeDeleteTodoController,
  makeEditTodoController,
  makeGetTodosController,
} from './controllers'
import { expect, it, describe } from 'vitest'
import {
  createTodoService,
  deleteTodoByIdService,
  editTodoByIdService,
  getTodosService,
} from './services'
import { makeFakeTodo } from './db.test'

const createTodoController = makeCreateTodoController({
  createTodoService,
})
const deleteTodoController = makeDeleteTodoController({
  deleteTodoByIdService,
})

const editTodoController = makeEditTodoController({
  editTodoService: editTodoByIdService,
})

const getTodosController = makeGetTodosController({
  getTodosService,
})

describe.skip.concurrent('Todo Controller', async () => {
  describe.concurrent('Create Todo Controller', async () => {
    it('should return 201 if todo created', async () => {
      const mockRequest = makeFakeHttpRequest()
      const response = await createTodoController(mockRequest)

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
    it('should throw if no user email provided', async () => {
      const mockRequest = makeFakeHttpRequest({}, { userEmail: null })
      expect(
        async () => await createTodoController(mockRequest)
      ).rejects.toThrow()
    })
  })

  describe.concurrent('Get Todos Controller', async () => {
    it('should return 200 if todos found', async () => {
      const mockRequest = makeFakeHttpRequest()
      const createResponse = await createTodoController(mockRequest)

      const mockRequest2 = makeFakeHttpRequest({
        query: {
          userEmail: mockRequest.body.userEmail,
        },
      })
      const getResponse = await getTodosController(mockRequest2)
      console.log({ getResponse: JSON.stringify(getResponse, null, 2) })
      expect(getResponse.statusCode).toBe(200)
      expect(getResponse.body).toContainEqual(createResponse.body)

      const deleteRequest = makeFakeHttpRequest({
        query: {
          todoId: createResponse.body.id,
        },
      })
      await deleteTodoController(deleteRequest)
    })
  })

  describe.concurrent('Delete Todo Controller', async () => {
    it('should return 204 if todo deleted', async () => {
      const mockRequest = makeFakeHttpRequest({})
      const res = await createTodoController(mockRequest)
      const newTodoId = res.body.id

      const mockRequest2 = makeFakeHttpRequest({
        query: {
          todoId: newTodoId,
        },
      })
      const response = await deleteTodoController(mockRequest2)
      expect(response.statusCode).toBe(204)
    })
    it('should throw if no todo id provided', async () => {
      const mockRequest = makeFakeHttpRequest({
        query: {},
      })
      expect(
        async () => await deleteTodoController(mockRequest)
      ).rejects.toThrow()
    })
  })
  describe.concurrent('Edit Todo Controller', async () => {
    it('should return 200 if todo edited', async () => {
      const mockRequest = makeFakeHttpRequest({})
      const res = await createTodoController(mockRequest)
      const newTodoId = res.body.id

      const mockRequest2 = makeFakeHttpRequest(
        {
          query: {
            todoId: newTodoId,
          },
        },
        {
          title: 'New Updated Title',
          description: 'New Updated Description',
          duration: 2387,
          labelId: res.body.labelId,
          date: new Date(2343, 8, 28),
        }
      )

      expect(res.body.title).not.toBe(mockRequest2.body.title)
      expect(res.body.description).not.toBe(mockRequest2.body.description)
      expect(res.body.duration).not.toBe(mockRequest2.body.duration)
      expect(res.body.date).not.toEqual(mockRequest2.body.date)

      const editedTodoResponse = await editTodoController(mockRequest2)
      expect(editedTodoResponse.statusCode).toBe(200)
    })
    it('should throw if no todo id provided', async () => {
      const mockRequest = makeFakeHttpRequest({
        query: {},
      })
      expect(
        async () => await editTodoController(mockRequest)
      ).rejects.toThrow()
    })
  })
})

function makeFakeHttpRequest(overrides, todoOverrides) {
  return {
    body: {
      ...makeFakeTodo(todoOverrides),
    },
    method: 'GET',
    path: '/test-path',
    ...overrides,
  }
}
