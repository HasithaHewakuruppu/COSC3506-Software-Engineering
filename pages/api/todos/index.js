import { getServerSession } from 'next-auth/next'
import { authOptions } from './../auth/[...nextauth]'
import { createTodoSchema } from '../../../validators/todo'
import { ValidationError } from 'yup'
import { prisma } from '../../../lib/db'

export default async function todos(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    return res.status(401).send('Unauthorized')
  }
  if (req.method === 'POST') {
    try {
      const newTodo = req.body
      const todo = await createTodoSchema.validate(newTodo)
      await prisma.todo.create({
        data: {
          title: todo.title,
          description: todo.description,
          duration: todo.duration,
          date: todo.date,
          labelId: todo.labelId,
          userEmail: todo.userEmail,
        },
      })
      return res.status(200).json(todo)
    } catch (e) {
      console.error(e)
      if (e instanceof ValidationError) {
        return res.status(400).send(e.message)
      } else {
        return res.status(500).send('Internal server error')
      }
    }
  } else {
    return res.status(404).send('Not found')
  }
}
