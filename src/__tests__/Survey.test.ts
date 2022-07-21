import request from 'supertest'
import { app } from '../app'
import { npsDataSource } from '../database/app-data-source'

describe('Surveys', () => {
  beforeAll(async () => {
    if (!npsDataSource.isInitialized) {
      const connection = await npsDataSource.initialize()
      await connection.dropDatabase()
      await connection.runMigrations()
    }
  })

  afterAll(async () => {
    await npsDataSource.dropDatabase()
    await npsDataSource.destroy()
  })

  it('Should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Survey Title Example',
      description: 'Survey description example',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('Should be able to get all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'Survey Title Example 2',
      description: 'Survey description example 2',
    })

    const response = await request(app).get('/surveys')

    expect(response.body.length).toBe(2)
  })
})
