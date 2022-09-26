import { Role } from '@roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1663378783400 } from './migrations/1663378783400-CreateRolesTable'
import { CreateUsersTable1664221020631 } from './migrations/1664221020631-CreateUsersTable'
import { AddRoleIdToUsersTable1664221815210 } from './migrations/1664221815210-AddRoleIdToUsersTable'

export const datasource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [
    CreateRolesTable1663378783400,
    CreateUsersTable1664221020631,
    AddRoleIdToUsersTable1664221815210,
  ],
})
