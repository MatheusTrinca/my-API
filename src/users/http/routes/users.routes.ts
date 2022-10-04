import { Router } from 'express'
import { Segments, Joi, celebrate } from 'celebrate'
import { container } from 'tsyringe'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'

const usersRoutes = Router()

const createUserController = container.resolve(CreateUserController)

usersRoutes.post(
  '/',
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

export { usersRoutes }
