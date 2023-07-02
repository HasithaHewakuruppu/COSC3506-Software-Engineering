import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '../../lib/db'
import categories from '../../utils/categories'

export default async function label(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    return res.status(401).send('Unauthorized')
  }
  if (req.method === 'POST') {
    const isValidBody = req.body?.labels?.every(
      (label) =>
        label.name &&
        (label.category === categories.WORK ||
          label.category === categories.LEISURE ||
          label.category === categories.FITNESS)
    )
    if (!isValidBody) {
      return res
        .status(400)
        .send(
          'Bad request: ' +
            "Invalid body, it should be like {labels: [{name: '...', category: '...'}, ...]} \n" +
            `category must be one of '${categories.WORK}', '${categories.LEISURE}', '${categories.FITNESS}'`
        )
    }
    const labels = req.body?.labels
    try {
      await prisma.label.createMany({
        data: labels.map((l) => {
          return {
            ...l,
            userEmail: session.user.email,
          }
        }),
      })
      return res.status(200).send('OK')
    } catch (e) {
      console.error(e)
      return res.status(500).send('Internal server error')
    }
  } else if (req.method === 'GET') {
    try {
      const labels = await prisma.label.findMany({
        where: {
          userEmail: session.user.email,
        },
      })
      return res.status(200).json(labels)
    } catch (e) {
      console.error(e)
      return res.status(500).send('Internal server error')
    }
  } else {
    return res.status(404).send('Not found')
  }
}
