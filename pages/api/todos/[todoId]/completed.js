import { getServerSession } from 'next-auth/next'
import { authOptions } from './../../auth/[...nextauth]'
import { z } from 'zod'
import { ValidationError } from 'yup'
import { prisma } from '../../../../lib/db'

export default async function todos(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const todoId = req.query.todoId
    const todoIdSchema = z.string()
    const validTodoId = todoIdSchema.parse(todoId)

    const foundTodo = await prisma.todo.findFirst({
      where: {
        id: validTodoId,
      },
    })
    const updatedTodo = await prisma.todo.update({
      where: {
        id: validTodoId,
      },
      data: {
        completed: !foundTodo.completed,
      },
    })

    return res.status(200).json(updatedTodo)
  } catch (e) {
    console.error(e)
    if (e instanceof ValidationError) {
      return res.status(400).send(e.message)
    }
    return res.status(500).send('Internal Server Error')
  }
}
