import { getServerSession } from 'next-auth/next'
import { authOptions } from './../auth/[...nextauth]'
import { deleteTodoSchema } from '../../../validators/todo'
import { ValidationError } from 'yup'
import { prisma } from '../../../lib/db'

export default async function todos(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    return res.status(401).send('Unauthorized')
  }

  const todoPayload = {
    todoId: req.query.todoId,
  }
  if (req.method === 'DELETE') {
    try {
      const todo = await deleteTodoSchema.validate(todoPayload)
      const todosDeleted = await prisma.todo.deleteMany({
        where: {
          id: todo.todoId,
        },
      })
      if (todosDeleted.count === 0) {
        return res.status(400).send('Todo not found in DB')
      }
      return res.status(204).send()
    } catch (e) {
      console.error(e)
      if (e instanceof ValidationError) {
        return res.status(400).send(e.message)
      }
      return res.status(500).send('Internal server error')
    }
  }
  return res.status(404).send('Not found')
}
