import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { datasource } from '..'

async function create() {
  const connection = await datasource.initialize()

  // Create Role
  const roleId = uuidv4()
  await connection.query(
    `INSERT INTO roles(id, name) values ('${roleId}', 'T.I.')`,
  )

  // Create User
  const userId = uuidv4()
  const password = await hash('1234', 10)
  await connection.query(
    // is Admin é boolean, passar entre ""
    `
    INSERT INTO users(id, name, email, password, "isAdmin", roleId)
    values ('${userId}', 'admin', 'a@a.com', '${password}', true, '${roleId}')
    `,
  )
  await connection.destroy()
}

create().then(() => console.log('User Admin Created'))
