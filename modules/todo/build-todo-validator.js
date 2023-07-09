export function buildTodoValidator({ yup }) {
  return Object.freeze({
    todoCreateValidator: function ({
      title,
      description,
      duration,
      date,
      labelId,
      userEmail,
      completed = false,
    }) {
      const todoSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        duration: yup.number().required().positive().integer(),
        date: yup.date().required(),
        labelId: yup.string().required(),
        userEmail: yup.string().email().required(),
      })

      const todo = {
        title,
        description,
        duration,
        date,
        labelId,
        userEmail,
        completed,
      }

      return todoSchema.validate(todo)
    },
    todoDeleteValidator: function ({ id }) {
      const todoDeleteSchema = yup.object({
        id: yup.string().required(),
      })

      const todoDeletePayload = {
        id,
      }

      return todoDeleteSchema.validate(todoDeletePayload)
    },
    getTodosValidator: function ({
      userEmail,
      labels = false,
      duration_lte,
      duration_gte,
      includeLabels,
      date,
      from,
      to,
    }) {
      const getTodosSchema = yup.object({
        userEmail: yup.string().email().required(),
        labels: yup.boolean(),
        duration_lte: yup.number().positive().integer(),
        duration_gte: yup.number().positive().integer(),
        includeLabels: yup.boolean(),
        date: yup.date(),
        from: yup.date(),
        to: yup.date(),
      })

      const getTodosPayload = {
        userEmail,
        labels,
        duration_lte,
        duration_gte,
        includeLabels,
        date,
        from,
        to,
      }

      return getTodosSchema.validate(getTodosPayload)
    },
    editTodoValidator: function ({ id, todo }) {
      const editTodoSchema = yup.object({
        id: yup.string().required(),
        todo: yup.object({
          title: yup.string().required(),
          description: yup.string().required(),
          duration: yup.number().required().positive().integer(),
          date: yup.date().required(),
          labelId: yup.string().required(),
        }),
      })
      const editTodoPayload = {
        id,
        todo,
      }
      return editTodoSchema.validate(editTodoPayload)
    },
  })
}
