import _ from 'lodash'
import { describe, expect, it } from 'vitest'
import { prisma } from './../../lib/db'
import { makeDb } from './db'

const db = makeDb({ db: prisma })

describe('Database', () => {
  it.skip('creates a todo in the db', async () => {
    const todoToCreate = makeFakeTodo()
    const createdTodo = await db.createTodo({
      title: todoToCreate.title,
      description: todoToCreate.description,
      duration: todoToCreate.duration,
      date: todoToCreate.date,
      labelId: todoToCreate.labelId,
      userEmail: todoToCreate.userEmail,
      completed: todoToCreate.completed,
    })
    expect(todoToCreate).toEqual(_.omit(createdTodo, ['id']))
  })

  it.skip('delete a todo by id in the db', async () => {
    const fakeTodo = makeFakeTodo()
    const createdTodo = await db.createTodo({
      title: fakeTodo.title,
      description: fakeTodo.description,
      duration: fakeTodo.duration,
      date: fakeTodo.date,
      labelId: fakeTodo.labelId,
      userEmail: fakeTodo.userEmail,
      completed: fakeTodo.completed,
    })

    const deletedTodo = await db.deleteTodoById({ id: createdTodo.id })
    const deleteSuccess = {
      count: 1,
    }

    expect(deletedTodo).toEqual(deleteSuccess)
  })

  it.skip('gets all todos in db', async () => {
    const fakeTodo = makeFakeTodo({ title: 'Find me' })
    const findTodo = await db.createTodo({
      title: fakeTodo.title,
      description: fakeTodo.description,
      duration: fakeTodo.duration,
      date: fakeTodo.date,
      labelId: fakeTodo.labelId,
      userEmail: fakeTodo.userEmail,
      completed: fakeTodo.completed,
    })

    const allTodos = await db.getTodos({
      userEmail: fakeTodo.userEmail,
      includeLabels: false,
    })

    expect(allTodos).toContainEqual(findTodo)
  })

  it.skip('gets all todos with labels', async () => {
    const fakeTodo = makeFakeTodoWithLabel({ title: 'Find me' })
    const findTodo = await db.createTodo({
      title: fakeTodo.title,
      description: fakeTodo.description,
      duration: fakeTodo.duration,
      date: fakeTodo.date,
      labelId: fakeTodo.labelId,
      userEmail: fakeTodo.userEmail,
      completed: fakeTodo.completed,
    })

    const expectedTodo = {
      ...findTodo,
      label: {
        id: '64a25bdab8c639da77274ce6',
        name: 'work',
        category: 'WORK',
      },
    }

    const allTodos = await db.getTodos({
      userEmail: fakeTodo.userEmail,
      labels: true,
    })

    expect(allTodos).toContainEqual(expectedTodo)
  })

  it.skip('gets all todos on a particular date', async () => {
    const date = new Date()
    date.setFullYear(2035)
    date.setMonth(0)
    date.setDay(1)
    date.setHours(1)
    const fakeTodo = makeFakeTodoWithLabel({ date })
    const findTodo = await db.createTodo({
      title: fakeTodo.title,
      description: fakeTodo.description,
      duration: fakeTodo.duration,
      date: fakeTodo.date,
      labelId: fakeTodo.labelId,
      userEmail: fakeTodo.userEmail,
      completed: fakeTodo.completed,
    })

    const allTodos = await db.getTodos({
      userEmail: fakeTodo.userEmail,
      labels: true,
      date: fakeTodo.date,
    })

    expect(allTodos).toContainEqual(findTodo)
  })

  it.skip('gets all todos in a particular duration range', async () => {
    const fakeTodo100 = makeFakeTodo({ duration: 100 })
    const fakeTodo200 = makeFakeTodo({ duration: 200 })
    const fakeTodo300 = makeFakeTodo({ duration: 300 })

    const todo100 = await db.createTodo({
      title: fakeTodo100.title,
      description: fakeTodo100.description,
      duration: fakeTodo100.duration,
      date: fakeTodo100.date,
      labelId: fakeTodo100.labelId,
      userEmail: fakeTodo100.userEmail,
      completed: fakeTodo100.completed,
    })

    const todo200 = await db.createTodo({
      title: fakeTodo200.title,
      description: fakeTodo200.description,
      duration: fakeTodo200.duration,
      date: fakeTodo200.date,
      labelId: fakeTodo200.labelId,
      userEmail: fakeTodo200.userEmail,
      completed: fakeTodo200.completed,
    })

    const todo300 = await db.createTodo({
      title: fakeTodo300.title,
      description: fakeTodo300.description,
      duration: fakeTodo300.duration,
      date: fakeTodo300.date,
      labelId: fakeTodo300.labelId,
      userEmail: fakeTodo300.userEmail,
      completed: fakeTodo300.completed,
    })

    const find100Todos = await db.getTodos({
      duration_lte: 100,
      duration_gte: 100,
    })

    const find200And300Todos = await db.getTodos({
      duration_lte: 300,
      duration_gte: 200,
    })

    const find100And200Todos = await db.getTodos({
      duration_lte: 200,
    })

    const find200And300TodosWithGte = await db.getTodos({
      duration_gte: 200,
    })

    await db.deleteTodoById({ id: todo100.id })
    await db.deleteTodoById({ id: todo200.id })
    await db.deleteTodoById({ id: todo300.id })

    expect(find100Todos).toContainEqual(todo100)
    expect(find200And300Todos).toContainEqual(todo200)
    expect(find200And300Todos).toContainEqual(todo300)
    expect(find100And200Todos).toContainEqual(todo100)
    expect(find100And200Todos).toContainEqual(todo200)
    expect(find200And300TodosWithGte).toContainEqual(todo200)
    expect(find200And300TodosWithGte).toContainEqual(todo300)
  })

  it.skip('gets all todos of a particular user', async () => {
    const fakeTodo = makeFakeTodo()
    await db.createTodo({
      title: fakeTodo.title,
      description: fakeTodo.description,
      duration: fakeTodo.duration,
      date: fakeTodo.date,
      labelId: fakeTodo.labelId,
      userEmail: fakeTodo.userEmail,
      completed: fakeTodo.completed,
    })

    const foundTodos = await db.getTodos({
      userEmail: fakeTodo.userEmail,
    })

    expect(
      foundTodos.every((todo) => todo.userEmail === fakeTodo.userEmail)
    ).toBe(true)
  })

  it.skip('gets all todos in a particular date range', async () => {
    const fakeSeptemper1stTodo = makeFakeTodo({
      date: new Date(2035, 8, 1),
    })
    const fakeSeptemberSecondTodo = makeFakeTodo({
      date: new Date(2035, 8, 2),
    })

    const september1stTodo = await db.createTodo({
      title: fakeSeptemper1stTodo.title,
      description: fakeSeptemper1stTodo.description,
      duration: fakeSeptemper1stTodo.duration,
      date: fakeSeptemper1stTodo.date,
      labelId: fakeSeptemper1stTodo.labelId,
      userEmail: fakeSeptemper1stTodo.userEmail,
      completed: fakeSeptemper1stTodo.completed,
    })

    const september2ndTodo = await db.createTodo({
      title: fakeSeptemberSecondTodo.title,
      description: fakeSeptemberSecondTodo.description,
      duration: fakeSeptemberSecondTodo.duration,
      date: fakeSeptemberSecondTodo.date,
      labelId: fakeSeptemberSecondTodo.labelId,
      userEmail: fakeSeptemberSecondTodo.userEmail,
      completed: fakeSeptemberSecondTodo.completed,
    })

    const foundTodos = await db.getTodos({
      from: '01-09-2035',
      to: '02-09-2035',
    })

    await db.deleteTodoById({ id: september1stTodo.id })
    await db.deleteTodoById({ id: september2ndTodo.id })

    expect(foundTodos).toContainEqual(september1stTodo)
    expect(foundTodos).toContainEqual(september2ndTodo)
  })

  it.skip('edit a particular todo by id', async () => {
    const fakeTodo = makeFakeTodo({
      title: 'Original title',
      description: 'Original description',
      duration: 10,
      date: new Date(2021, 8, 27),
    })
    const todo = await db.createTodo({
      title: fakeTodo.title,
      description: fakeTodo.description,
      duration: fakeTodo.duration,
      date: fakeTodo.date,
      labelId: fakeTodo.labelId,
      userEmail: fakeTodo.userEmail,
      completed: fakeTodo.completed,
    })

    expect(todo.title).toBe('Original title')
    expect(todo.description).toBe('Original description')
    expect(todo.duration).toBe(10)
    expect(todo.date).toEqual(new Date(2021, 8, 27))

    const updatedTodo = await db.editTodoById({
      id: todo.id,
      todo: {
        title: 'Updated title',
        description: 'Updated description',
        duration: 1000,
        date: new Date(2023, 8, 28),
        labelId: fakeTodo.labelId,
      },
    })

    expect(updatedTodo.title).toBe('Updated title')
    expect(updatedTodo.description).toBe('Updated description')
    expect(updatedTodo.duration).toBe(1000)
    expect(updatedTodo.date).toEqual(new Date(2023, 8, 28))
  })
})

export function makeFakeTodo(overrides) {
  const todo = {
    title: 'Fake title',
    description: 'Fake description',
    duration: 100,
    date: new Date(),
    labelId: '64a25bdab8c639da77274ce6',
    userEmail: 'abdulqshabbir@gmail.com',
    completed: false,
  }
  return {
    ...todo,
    ...overrides,
  }
}

export function makeFakeTodoWithLabel(overrides) {
  const todo = {
    title: 'Fake title',
    description: 'Fake description',
    duration: 100,
    date: new Date(),
    labelId: '64a25bdab8c639da77274ce6',
    userEmail: 'abdulqshabbir@gmail.com',
    completed: false,
    label: {
      id: '64a25bdab8c639da77274ce6',
      name: 'Fake label',
      category: 'Fake category',
    },
  }

  return {
    ...todo,
    ...overrides,
  }
}
