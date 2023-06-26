import { getServerSession } from 'next-auth/next'
import { authOptions } from './../auth/[...nextauth]'
import { createTodoSchema } from '../../../validators/todo'
import { ValidationError } from 'yup'
import { prisma } from '../../../lib/db'
import { startOfDay, endOfDay } from 'date-fns'

function getDateFromQuery(query) {
  const date = new Date()
  if (query.date) {
    const [day, month, year] = query.date.split('-')
    date.setDate(day)
    date.setMonth(month - 1)
    date.setFullYear(year)
    date.setHours(1)
  }
  return date
}

export default async function todos(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    return res.status(401).send('Unauthorized')
  }
  if (req.method === 'GET') {
    let where = {
      userEmail: session.user.email,
    }
    if (req.query.date) {
      where = {
        ...where,
        date: {
          gte: startOfDay(getDateFromQuery(req.query)),
          lte: endOfDay(getDateFromQuery(req.query)),
        },
      }
    }
    let todos = []
    if (req.query.labels === 'true') {
      todos = await prisma.todo.findMany({
        where,
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
      todos = await prisma.todo.findMany({
        where,
      })
    }
    return res.status(200).json(todos)
  } else if (req.method === 'POST') {
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
