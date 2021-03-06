import 'reflect-metadata'
import express from 'express'
import { npsDataSource } from './database/app-data-source'
import { router } from './routes'
import * as dotenv from 'dotenv'

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

export { app }
