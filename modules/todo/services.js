import yup from 'yup'
import {
  buildCreateTodoInDb,
  buildDeleteTodoByIdInDb,
  buildEditTodoByIdInDb,
  buildGetTodosInDb,
} from './use-cases'
import { buildTodoValidator } from './build-todo-validator'
import { makeDb } from './db'
import { prisma } from '../../lib/db'

const db = makeDb({ db: prisma })

const {
  todoCreateValidator,
  todoDeleteValidator,
  getTodosValidator,
  editTodoValidator,
} = buildTodoValidator({ yup })

/* Create Todo  */
const createTodoService = buildCreateTodoInDb({
  db,
  todoCreateValidator,
})

/* Edit Todo  */
const editTodoByIdService = buildEditTodoByIdInDb({
  db,
  todoEditValidator: editTodoValidator,
})

/* Get Todos  */
const getTodosService = buildGetTodosInDb({
  db,
  getTodosValidator,
})

/* Delete Todos  */
const deleteTodoByIdService = buildDeleteTodoByIdInDb({
  db,
  todoDeleteValidator,
})

export default Object.freeze({
  createTodoService,
  getTodosService,
  editTodoByIdService,
  deleteTodoByIdService,
})

export {
  getTodosService,
  createTodoService,
  editTodoByIdService,
  deleteTodoByIdService,
}
