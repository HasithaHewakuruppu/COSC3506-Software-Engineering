import yup, { ValidationError } from 'yup'
import _ from 'lodash'
import { buildMakeTodo } from './todo'
import { buildTodoValidator } from './build-todo-validator'
import { describe, expect, it } from 'vitest'

const fullTodo = {
  title: 'hi',
  description: 'hi',
  duration: 1,
  date: new Date(),
  labelId: '1',
  userEmail: 'abdulqshabbir@gmail.com',
  completed: false,
}

describe('test todo create', () => {
  const todoCreateValidator = buildTodoValidator({ yup }).todoCreateValidator
  const makeTodo = buildMakeTodo({ todoCreateValidator })

  it('should create a todo if all fields are valid', async () => {
    const todo = await makeTodo({
      ...fullTodo,
    })

    expect(fullTodo).toEqual({
      title: todo.getTitle(),
      description: todo.getDescription(),
      duration: todo.getDuration(),
      date: todo.getDate(),
      labelId: todo.getLabelId(),
      userEmail: todo.getUserEmail(),
      completed: todo.getCompleted(),
    })
  })

  it('should throw an error if title is missing', () => {
    expect(async () => {
      await makeTodo({
        ..._.omit(fullTodo, 'title'),
      })
    }).rejects.toThrowError(ValidationError)
  })

  it('should thorw an error if description is missing', () => {
    expect(async () => {
      await makeTodo({
        ..._.omit(fullTodo, 'description'),
      })
    }).rejects.toThrowError(ValidationError)
  })
  it('should throw an error if duration is missing', () => {
    expect(async () => {
      await makeTodo({
        ..._.omit(fullTodo, 'duration'),
      })
    }).rejects.toThrowError(ValidationError)
  })
  it('should throw an error if date is missing', () => {
    expect(async () => {
      await makeTodo({
        ..._.omit(fullTodo, 'date'),
      })
    }).rejects.toThrowError(ValidationError)
  })
  it('should throw an error if labelId is missing', () => {
    expect(async () => {
      await makeTodo({
        ..._.omit(fullTodo, 'labelId'),
      })
    }).rejects.toThrowError(ValidationError)
  })
  it('should throw an error if userEmail is missing', () => {
    expect(async () => {
      await makeTodo({
        ..._.omit(fullTodo, 'userEmail'),
      })
    }).rejects.toThrowError(ValidationError)
  })
})
