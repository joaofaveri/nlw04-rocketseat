import request from 'supertest'
import { app } from '../app'
import { npsDataSource } from '../database/app-data-source'

describe('Users', () => {
  beforeAll(async () => {
    if (!npsDataSource.isInitialized) {
      const connection = await npsDataSource.initialize()
      await connection.dropDatabase()
      await connection.runMigrations()
    }
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    })

    expect(response.status).toBe(201)
  })

  it('Should not be able to create a user with exists email', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    })

    expect(response.status).toBe(400)
  })
})
