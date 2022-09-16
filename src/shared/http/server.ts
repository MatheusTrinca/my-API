import 'dotenv/config'
import 'reflect-metadata'
import { app } from './app'
import { datasource } from '../typeorm/index'

datasource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}!`),
    )
  })
  .catch(err => console.log(err))
