import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRoutes } from '@users/http/routes/users.routes'

const routes = Router()

routes.use('/roles', rolesRouter)
routes.use('/users', usersRoutes)

export { routes }
