import { DataSource } from 'typeorm'

const npsDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/database.sqlite',
})

export default npsDataSource
