import { DataSource, DataSourceOptions } from 'typeorm'

const dataSourceConfig: DataSourceOptions = {
  type: 'sqlite',
  database: './src/database/database.sqlite',
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/models/**.ts'],
}

Object.assign(dataSourceConfig, {
  database:
    process.env.NODE_ENV === 'test'
      ? './src/database/database.test.sqlite'
      : dataSourceConfig.database,
})

const npsDataSource = new DataSource(dataSourceConfig)

export { npsDataSource }
