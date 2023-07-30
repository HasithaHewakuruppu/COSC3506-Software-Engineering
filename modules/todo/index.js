import {
  makeCreateTodoController,
  makeDeleteTodoController,
  makeEditTodoController,
  makeGetTodosController,
} from './controllers'

import {
  getTodosService,
  createTodoService,
  editTodoByIdService,
  deleteTodoByIdService,
} from './services'

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

export default Object.freeze({
  createTodoController,
  deleteTodoController,
  editTodoController,
  getTodosController,
})

export {
  createTodoController,
  deleteTodoController,
  editTodoController,
  getTodosController,
}
