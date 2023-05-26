import express from 'express'
import cors from 'cors'
import compression from 'compression'

import routes from '../routes'
import * as ErrorMiddlewares from '../middlewares/errors.middleware'

const app = express()
app.use(compression())
app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.use(ErrorMiddlewares.methodNotAllowed)
app.use(ErrorMiddlewares.genericErrorHandler)

export default app
