## My API - Projeto de Estudo usando NodeJS com Typescript

<hr>
Instalações NodeJS com TS

- npm i -D typescript @types/node ts-node-dev tsconfig-paths
- npx tsc --init
- Ver alterações no tsconfig.json
- Ver scripts do package.json
- npm i rimraf -> (para apagar a pasta dist antes de cada build)
- Definir os "paths" no tsconfig.json

ESLint, Prettier, Editor Config

- npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier
- Criar os arquivos .eslintrc.cjs, .eslintignore, .prettierrc, .prettierignore

Express

- npm i express express-async-errors
- npm i -D @types/express

Cors

- npm i cors
- npm i -D @types/cors

DotEnv

- npm i dotenv

Swagger

- npm i swagger-ui-express
- npm i -D @types/swagger-ui-express

TypeORM

- npm i typeorm reflect-metadata

SQLite

- npm i sqlite3

Celebrate

- npm i celebrate
- npm i -D types/joi

Migrations Run

- package.json script -> "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
- yarn run typeorm migration:create src/shared/typeorm/migrations/CreateRefreshTokensTable
- yarn run typeorm -- -d ./src/shared/typeorm/index.ts migration:run

Multer

- yarn add multer
- yarn add -D @types/multer
