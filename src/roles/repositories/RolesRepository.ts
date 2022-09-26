import { Role } from '@roles/entities/Role'
import { datasource } from '@shared/typeorm/index'
import { Repository } from 'typeorm'
import {
  IRolesRepository,
  PaginateParams,
  RolesPaginateProperties,
  CreateRoleDTO,
} from './IRolesRepository'

export class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>

  constructor() {
    this.repository = datasource.getRepository(Role)
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
