import express from 'express'
import 'express-async-errors'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send({ message: 'Hello World' })
})

app.listen(3000, () => console.log('Server started on port 3000!'))
