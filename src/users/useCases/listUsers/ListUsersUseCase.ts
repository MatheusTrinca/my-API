import {
  IUsersRepository,
  UsersPaginateProperties,
} from '@users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

type ListUsersUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
  ) {}

  async execute({
    page,
    limit,
  }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
    const take = limit
    const skip = (Number(page) - 1) * take
    return this.userRepository.findAll({ page, skip, take })
  }
}
