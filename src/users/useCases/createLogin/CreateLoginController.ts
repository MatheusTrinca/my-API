import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLoginUseCase } from './CreateLoginUseCase'

export class CreateLoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createLogiUseCase = container.resolve(CreateLoginUseCase)
    const { email, password } = request.body

    const { user, accessToken, refreshToken } = await createLogiUseCase.execute(
      { email, password },
    )

    return response
      .status(200)
      .json(instanceToInstance({ user, accessToken, refreshToken }))
  }
}
