import 'reflect-metadata'
import express from 'express'
import npsDataSource from './database/app-data-source'

npsDataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((error) =>
    console.error('Error during Data Source initialization: ', error)
  )

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hello, World!' })
})

app.post('/', (request, response) => {
  return response.json({ message: 'Dados salvos com sucesso!' })
})

app.listen(5000, () => console.log('Server is running'))
