export function buildMakeTodo({ todoCreateValidator }) {
  return async function makeTodo({
    title,
    description,
    duration,
    date,
    labelId,
    userEmail,
    completed = false,
  }) {
    const validTodo = await todoCreateValidator({
      title,
      description,
      duration,
      date,
      labelId,
      userEmail,
      completed,
    })

    return Object.freeze({
      title: validTodo.title,
      description: validTodo.description,
      duration: validTodo.duration,
      date: validTodo.date,
      labelId: validTodo.labelId,
      userEmail: validTodo.userEmail,
      completed: validTodo.completed,
      getTitle: () => validTodo.title,
      getDescription: () => validTodo.description,
      getDuration: () => validTodo.duration,
      getDate: () => validTodo.date,
      getLabelId: () => validTodo.labelId,
      getUserEmail: () => validTodo.userEmail,
      getCompleted: () => validTodo.completed,
    })
  }
}
