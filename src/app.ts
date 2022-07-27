import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { npsDataSource } from './database/app-data-source'
import { router } from './routes'
import * as dotenv from 'dotenv'
import { AppError } from './errors/AppError'

dotenv.config()
npsDataSource
  .initialize()
  .then(() =>
    console.log(
      `Data Source has been initialized! Database ${npsDataSource.options.database}`
    )
  )
  .catch((error) =>
    console.error('Error during Data Source initialization: ', error)
  )

const app = express()

app.use(express.json())
app.use(router)

app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    })
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error: ${error.message}`,
  })
})

export { app }
