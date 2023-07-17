import { describe, expect, it } from 'vitest'
import { prisma } from './../../lib/db'
import { makeDb } from './db'
import {
  buildCreateTodoInDb,
  buildDeleteTodoByIdInDb,
  buildGetTodosInDb,
  buildEditTodoByIdInDb,
} from './use-cases'
import yup from 'yup'
import { buildTodoValidator } from './build-todo-validator'
import { makeFakeTodo } from './db.test'

const {
  todoCreateValidator,
  todoDeleteValidator,
  getTodosValidator,
  editTodoValidator,
} = buildTodoValidator({ yup })

const db = makeDb({ db: prisma })

const createTodoService = buildCreateTodoInDb({
  db,
  todoCreateValidator,
})
const todoDeleteService = buildDeleteTodoByIdInDb({
  db,
  todoDeleteValidator,
})
const getTodosService = buildGetTodosInDb({ db, getTodosValidator })
const editTodoByIdService = buildEditTodoByIdInDb({
  db,
  todoEditValidator: editTodoValidator,
})

describe('Todo Service', () => {
  it.skip('create todo service should create a todo', async () => {
    const fakeTodo = makeFakeTodo()

    const todo = await createTodoService({
      ...fakeTodo,
    })

    const foundTodos = await getTodosService({ userEmail: fakeTodo.userEmail })

    await todoDeleteService({ id: todo.id })

    expect(foundTodos).toContainEqual(todo)
  })

  it.skip('delete todo service should delete a todo', async () => {
    const fakeTodo = makeFakeTodo()

    const todo = await createTodoService({
      ...fakeTodo,
    })
    const foundTodos = await getTodosService({ userEmail: fakeTodo.userEmail })
    expect(foundTodos).toContainEqual(todo)

    await todoDeleteService({ id: todo.id })
    const todosAfterDelete = await getTodosService({
      userEmail: fakeTodo.userEmail,
    })

    expect(todosAfterDelete).not.toContainEqual(todo)
  })

  it.skip('get todos service should get all todos', async () => {
    const fakeTodo = makeFakeTodo()
    const fakeTodo2 = makeFakeTodo()

    const todo = await createTodoService({
      ...fakeTodo,
    })
    const todo2 = await createTodoService({
      ...fakeTodo2,
    })
    const foundTodos = await getTodosService({ userEmail: fakeTodo.userEmail })

    await todoDeleteService({ id: todo.id })
    await todoDeleteService({ id: todo2.id })

    expect(foundTodos).toContainEqual(todo)
    expect(foundTodos).toContainEqual(todo2)
  })

  it.skip('get todos service should throw error if user email is not provided', async () => {
    const fakeTodo = makeFakeTodo()
    const fakeTodo2 = makeFakeTodo()

    const todo = await createTodoService({
      ...fakeTodo,
    })
    const todo2 = await createTodoService({
      ...fakeTodo2,
    })

    await todoDeleteService({ id: todo.id })
    await todoDeleteService({ id: todo2.id })

    await expect(getTodosService({})).rejects.toThrow()
  })

  it.skip('edit todo service should edit a todo', async () => {
    const fakeTodo = makeFakeTodo()
    const todo = await createTodoService({
      ...fakeTodo,
    })

    const allTodos = await getTodosService({ userEmail: fakeTodo.userEmail })

    expect(allTodos).toContainEqual(todo)

    const updated = {
      ...todo,
      title: 'updated title',
      description: 'updated description',
      duration: 9000,
      date: new Date('2023-01-01'),
    }

    expect(todo.title).not.toBe(updated.title)
    expect(todo.description).not.toBe(updated.description)
    expect(todo.duration).not.toBe(updated.duration)
    expect(todo.date).not.toEqual(updated.date)

    const editedTodo = await editTodoByIdService({
      id: todo.id,
      todo: {
        ...updated,
      },
    })

    const foundTodos = await getTodosService({ userEmail: fakeTodo.userEmail })
    const updatedTodo = foundTodos.find((t) => t.id === todo.id)
    expect(updatedTodo.title).toBe(updated.title)
    expect(updatedTodo.description).toBe(updated.description)
    expect(updatedTodo.duration).toBe(updated.duration)
    expect(updatedTodo.date).toEqual(updated.date)

    await todoDeleteService({ id: editedTodo.id })
  })
})
