import { startOfDay, endOfDay } from 'date-fns'

export function makeDb({ db }) {
  async function createTodo(todoToCreate) {
    return await db.todo.create({
      data: {
        title: todoToCreate.title,
        description: todoToCreate.description,
        duration: todoToCreate.duration,
        date: todoToCreate.date,
        labelId: todoToCreate.labelId,
        userEmail: todoToCreate.userEmail,
        completed: false,
      },
    })
  }
  async function getTodos({
    userEmail,
    labels = false,
    duration_lte,
    duration_gte,
    includeLabels,
    date,
    from,
    to,
  }) {
    const where = buildWhereClause({
      date,
      from,
      to,
      includeLabels,
      duration_gte,
      duration_lte,
    })
    if (labels) {
      return await db.todo.findMany({
        where: {
          userEmail,
          ...where,
        },
        include: {
          label: {
            select: {
              id: true,
              category: true,
              name: true,
            },
          },
        },
      })
    } else {
      return await db.todo.findMany({
        where: {
          userEmail,
          ...where,
        },
      })
    }
  }
  async function deleteTodoById({ id }) {
    return await db.todo.deleteMany({
      where: {
        id,
      },
    })
  }
  async function editTodoById({ id, todo }) {
    const upateTodo = {
      title: todo.title,
      description: todo.description,
      duration: todo.duration,
      date: todo.date,
      labelId: todo.labelId,
    }
    return await db.todo.update({
      where: {
        id,
      },
      data: {
        ...upateTodo,
      },
    })
  }
  return Object.freeze({
    getTodos,
    createTodo,
    deleteTodoById,
    editTodoById,
  })
}

function getDateFromQuery(dateFromQuery) {
  const [day, month, year] = dateFromQuery.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  return date
}

function buildWhereClause({
  date,
  from,
  to,
  includeLabels,
  duration_gte,
  duration_lte,
}) {
  let where = {}
  if (from) {
    where = {
      ...where,
      date: {
        ...where.date,
        gte: startOfDay(getDateFromQuery(from)),
      },
    }
  }

  if (to) {
    where = {
      ...where,
      date: {
        ...where.date,
        lte: endOfDay(getDateFromQuery(to)),
      },
    }
  }
  if (date) {
    where = {
      ...where,
      date: {
        gte: startOfDay(getDateFromQuery(date)),
        lte: endOfDay(getDateFromQuery(date)),
      },
    }
  }
  if (includeLabels) {
    where = {
      ...where,
      labelId: { in: includeLabels.split(',') },
    }
  }
  if (duration_gte) {
    where = {
      ...where,
      duration: { gte: parseInt(duration_gte) },
    }
  }
  if (duration_lte) {
    where = {
      ...where,
      duration: {
        ...where.duration,
        lte: parseInt(duration_lte),
      },
    }
  }
  if (duration_lte && duration_lte && duration_gte > duration_lte) {
    delete where.duration
  }
  return where
}
