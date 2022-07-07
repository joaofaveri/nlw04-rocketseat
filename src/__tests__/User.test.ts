import request from 'supertest'
import { app } from '../app'
import { npsDataSource } from '../database/app-data-source'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await npsDataSource.initialize()
    await connection.runMigrations()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    })

    expect(response.status).toBe(201)
  })
})
