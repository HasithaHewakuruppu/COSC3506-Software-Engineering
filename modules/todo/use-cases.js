import { buildMakeTodo } from './todo'

export function buildCreateTodoInDb({ db, todoCreateValidator }) {
  const makeTodo = buildMakeTodo({
    todoCreateValidator,
  })

  return async function createTodoInDb(todo) {
    const validTodo = await makeTodo({
      title: todo.title,
      description: todo.description,
      duration: todo.duration,
      date: todo.date,
      labelId: todo.labelId,
      userEmail: todo.userEmail,
      completed: todo.completed,
    })

    return db.createTodo({ ...validTodo })
  }
}

export function buildDeleteTodoByIdInDb({ db, todoDeleteValidator }) {
  return async function deleteTodoByIdInDb({ id }) {
    const deleteTodoPayload = await todoDeleteValidator({ id })
    return db.deleteTodoById({ id: deleteTodoPayload.id })
  }
}

export function buildEditTodoByIdInDb({ db, todoEditValidator }) {
  return async function editTodoByIdInDb({ id, todo }) {
    debugger
    const editTodoPayload = await todoEditValidator({ id, todo })
    return db.editTodoById({
      id: editTodoPayload.id,
      todo: editTodoPayload.todo,
    })
  }
}

export function buildGetTodosInDb({ db, getTodosValidator }) {
  return async function getTodos({
    userEmail,
    labels = false,
    duration_lte,
    duration_gte,
    includeLabels,
    date,
    from,
    to,
  }) {
    const getTodosPayload = await getTodosValidator({
      userEmail,
      labels,
      duration_lte,
      duration_gte,
      includeLabels,
      date,
      from,
      to,
    })
    return db.getTodos({
      userEmail: getTodosPayload.userEmail,
      labels: getTodosPayload.labels,
      duration_lte: getTodosPayload.duration_lte,
      duration_gte: getTodosPayload.duration_gte,
      includeLabels: getTodosPayload.includeLabels,
      date: getTodosPayload.date,
      from: getTodosPayload.from,
      to: getTodosPayload.to,
    })
  }
}
