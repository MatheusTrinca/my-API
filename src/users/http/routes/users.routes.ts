import { Router } from 'express'
import multer from 'multer'
import { Segments, Joi, celebrate } from 'celebrate'
import { container } from 'tsyringe'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import uploadConfig from '@config/upload'
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarController'
import { ShowProfileController } from '@users/useCases/showProfile/ShowProfileController'
import { UpdateProfileController } from '@users/useCases/updateProfile/UpdateProfileController'

const usersRoutes = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)
const updateProfileController = container.resolve(UpdateProfileController)
const upload = multer(uploadConfig)

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

usersRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    return updateAvatarController.handle(request, response)
  },
)

usersRoutes.get('/profile', isAuthenticated, (request, response) => {
  return showProfileController.handle(request, response)
})

usersRoutes.put(
  '/profile',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    }),
  }),
  (request, response) => {
    updateProfileController.handle(request, response)
  },
)

export { usersRoutes }
