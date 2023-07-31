import 'express-async-errors'
import 'reflect-metadata'
import express, { Application } from 'express'
import userRoutes from './routes/user.routes'
import loginRoutes from './routes/login.routes'
import contactRoutes from './routes/contact.routes'
import { handleErrors } from './error'

const app: Application = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRoutes)
app.use('/contacts', contactRoutes)

app.use(handleErrors)

export default app