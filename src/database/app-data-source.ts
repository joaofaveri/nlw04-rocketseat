import { DataSource } from 'typeorm'

const npsDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/database.sqlite',
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/models/**.ts'],
})

export default npsDataSource
