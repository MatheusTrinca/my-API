import express, { NextFunction, Request, Response } from 'express'
import path from 'node:path'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'
import swaggerFile from '../../swagger.json'
import { errors } from 'celebrate'
import '@shared/container'
import uploadConfig from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
app.use(errors())

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }
    console.log(error)
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

export { app }
