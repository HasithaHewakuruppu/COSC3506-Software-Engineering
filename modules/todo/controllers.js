export const makeCreateTodoController = ({ createTodoService }) => {
  return async function createTodoController(httpRequest) {
    const todoPayload = httpRequest.body
    const todo = await createTodoService(todoPayload)
    return {
      statusCode: 201,
      body: todo,
    }
  }
}

export const makeDeleteTodoController = ({ deleteTodoByIdService }) => {
  return async function deleteTodoController(httpRequest) {
    const id = httpRequest.query.todoId
    const deleted = await deleteTodoByIdService({ id })
    if (deleted.count === 0) {
      return {
        statusCode: 400,
        error: 'Todo not found in DB',
      }
    }
    return {
      statusCode: 204,
    }
  }
}

export const makeGetTodosController = ({ getTodosService }) => {
  return async function getTodosController(httpRequest) {
    const {
      userEmail,
      labels = false,
      duration_lte,
      duration_gte,
      includeLabels,
      date,
      from,
      to,
    } = httpRequest.query
    const todos = await getTodosService({
      userEmail,
      labels,
      duration_lte,
      duration_gte,
      includeLabels,
      date,
      from,
      to,
    })
    return {
      statusCode: 200,
      body: todos,
    }
  }
}

export const makeEditTodoController = ({ editTodoService }) => {
  return async function editTodoController(httpRequest) {
    const id = httpRequest.query.todoId
    const todo = httpRequest.body
    const created = await editTodoService({ id, todo })
    return {
      statusCode: 200,
      body: created,
    }
  }
}
