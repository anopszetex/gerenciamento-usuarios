<details>
<summary><strong>🇧🇷 Ver documentação em Português (Brasil)</strong></summary>

# user-management

API REST em **TypeScript** para gerenciamento de usuários com autenticação JWT, hash de senhas com **Argon2** e persistência em **PostgreSQL**.

O projeto organiza o código em camadas (`domains`, `adapters`, `infra`, `strategies`) para manter as regras de negócio separadas de frameworks e detalhes de infraestrutura.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/) — framework web rápido e leve
- [Knex.js](https://knexjs.org/) — query builder SQL
- [PostgreSQL](https://www.postgresql.org/)
- [Pino](https://getpino.io/) — logger de alta performance
- [Argon2](https://github.com/ranisalt/node-argon2) — hash seguro de senhas
- [JWT](https://jwt.io/) — autenticação com tokens

## Arquitetura

```text
src/
├── adapters/server/fastify  # adaptadores HTTP
├── domains                  # regras de negócio (auth, register, users)
├── infra                    # banco de dados, configurações
├── routes                   # definição de rotas
├── strategies               # estratégias de acesso a dados
└── support                  # logger e utilitários
```

## Como rodar

### Pré-requisitos

- Node.js
- Docker e Docker Compose

### Subir o banco

```sh
docker-compose up -d
```

### Instalar dependências

```sh
npm install
```

### Rodar migrations

```sh
npm run knex:migrate
```

### Iniciar o servidor

```sh
npm run dev
```

O servidor sobe em `http://localhost:4000` por padrão.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia em modo desenvolvimento |
| `npm run dev:watch` | Inicia com recarga automática |
| `npm run build` | Compila o TypeScript |
| `npm run knex:migrate` | Executa as migrations |
| `npm run knex:rollback` | Reverte a última migration |
| `npm test` | Executa os checks de qualidade |
| `npm run lint` | Executa o ESLint |

## Endpoints

### `POST /api/register`

Cadastra um novo usuário.

```json
{
  "nome": "Carlos Santos",
  "email": "carlos@example.com",
  "senha": "senhaSegura123",
  "cpf": "896.285.890-24"
}
```

### `POST /api/login`

Autentica o usuário e retorna um token JWT.

```json
{
  "email": "carlos@example.com",
  "senha": "senhaSegura123"
}
```

### `GET /api/users`

Lista os usuários cadastrados. Requer autenticação via header:

```sh
authorization: <token-jwt>
```

## Licença

[MIT](LICENSE)

</details>

# gerenciamento-usuarios

A TypeScript REST API for user management with JWT authentication, Argon2 password hashing, Fastify, Knex, and PostgreSQL. Domain rules are separated from HTTP and persistence concerns through layered adapters and strategies.

## Requirements and setup

- Node.js 22+
- Docker and Docker Compose

```sh
docker-compose up -d
npm ci
npm run knex:migrate
npm run dev
```

The server listens on `http://localhost:4000` by default.

## Main endpoints

- `POST /api/register` — create an account.
- `POST /api/login` — authenticate and obtain a JWT.
- `GET /api/users` — list users with an `authorization` token.

## Architecture

```text
src/
├── adapters/server/fastify  # HTTP adapter
├── domains                  # authentication and user rules
├── infra                    # configuration and database
├── routes                   # route definitions
├── strategies               # persistence strategies
└── support                  # logging and shared utilities
```

## Quality checks

```sh
npm test
```

The command runs lint and a complete TypeScript build. Automated behavioral tests are the next planned improvement.

## License

[MIT](LICENSE)
