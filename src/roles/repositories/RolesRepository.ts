import { Role } from '@roles/entities/Role'
import { datasource } from '@shared/typeorm/index'
import { Repository } from 'typeorm'

type CreateRoleDTO = {
  name: string
}

export type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type RolesPaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: Role[]
}

export class RolesRepository {
  private repository: Repository<Role>
  private static INSTANCE: RolesRepository

  private constructor() {
    this.repository = datasource.getRepository(Role)
  }

  public static getInstance(): RolesRepository {
    if (!RolesRepository.INSTANCE) {
      RolesRepository.INSTANCE = new RolesRepository()
    }
    return RolesRepository.INSTANCE
  }

  async create({ name }: CreateRoleDTO): Promise<Role> {
    const role = this.repository.create({ name })
    return this.repository.save(role)
  }

  async save(role: Role): Promise<Role> {
    return this.repository.save(role)
  }

  async delete(role: Role): Promise<void> {
    // remove recebe a entidade inteira
    // delete precisa do id
    await this.repository.remove(role)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<RolesPaginateProperties> {
    // take -> a quantidade para pegar
    // skip -> a quantidade para pular
    const [roles, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount()

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: roles,
    }
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repository.findOneBy({ name })
  }

  async findById(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id })
  }
}

// retornando direto sem variável, não precisa do await
