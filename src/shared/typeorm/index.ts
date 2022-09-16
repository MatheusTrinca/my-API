import { DataSource } from 'typeorm'

export const datasource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [],
  migrations: [],
})
