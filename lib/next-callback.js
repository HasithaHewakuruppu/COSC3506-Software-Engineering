import { ValidationError } from 'yup'
export const makeNextCallback = (controller) => {
  return function (req, res) {
    const httpRequest = {
      body: req.body,
      query: req.query,
      method: req.method,
      path: req.path,
    }
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.body) {
          res.status(httpResponse.statusCode).json(httpResponse.body)
        } else if (httpResponse.send) {
          res.status(httpResponse.statusCode).send(httpResponse.send)
        } else {
          res.status(httpResponse.statusCode).end()
        }
      })
      .catch((e) => {
        if (e instanceof ValidationError) {
          res.status(400).send({ error: e.message })
        } else {
          res.status(500).send({ error: 'An unkown error occurred.' })
        }
      })
  }
}
