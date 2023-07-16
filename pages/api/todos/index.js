import { getServerSession } from 'next-auth/next'
import { authOptions } from './../auth/[...nextauth]'
import { createTodoSchema } from '../../../validators/todo'
import { ValidationError } from 'yup'
import { prisma } from '../../../lib/db'
import { startOfDay, endOfDay } from 'date-fns'

function getDateFromQuery(dateFromQuery) {
  const date = new Date()
  if (dateFromQuery) {
    const [day, month, year] = dateFromQuery.split('-')
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
    console.log('Get outta here you hacker!!')
    return res.status(401).send('Unauthorized')
  }

  const { date, from, to, includeLabels, duration_gte, duration_lte } =
    req.query

  const where = getWhereClauseFromQuery({
    date,
    from,
    to,
    includeLabels,
    duration_gte,
    duration_lte,
    email: session.user.email,
  })

  if (req.method === 'GET') {
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
          completed: false,
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

function getWhereClauseFromQuery({
  date,
  from,
  to,
  email,
  includeLabels,
  duration_gte,
  duration_lte,
}) {
  let where = {
    userEmail: email,
  }
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
