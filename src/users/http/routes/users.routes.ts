import { Router } from 'express'
import { Segments, Joi, celebrate } from 'celebrate'
import { container } from 'tsyringe'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const usersRoutes = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)

usersRoutes.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

usersRoutes.get(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.string(),
      limit: Joi.string(),
    }),
  }),
  (request, response) => {
    return listUsersController.handle(request, response)
  },
)

usersRoutes.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return createLoginController.handle(request, response)
  },
)

export { usersRoutes }
