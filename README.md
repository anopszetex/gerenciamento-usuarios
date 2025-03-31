## 📘 Gerenciamento de Usuários

API simples para gerenciamento de usuários

### ⚙️ Tecnologias

- Fastify — Framework web rápido e leve para Node.js
- TypeScript — Superset de JavaScript com tipagem estática
- Knex.js — Query builder SQL para Node.js
- PostgreSQL — Banco de dados relacional
- Pino — Logger de alta performance
- Argon2 — Hash seguro de senhas
- JWT — Autenticação com tokens

### 📁 Funcionalidades

- POST /api/register: Cadastro de novo usuário

```json
{
  "nome": "carlos santos",
  "email": "carlo123s@carlos.com", 
  "senha": "carlos123", 
  "cpf": "896.285.890-24"
}
```

- POST /api/login: Autenticação de usuário

```json
{
  "email": "carlo123s@carlos.com", 
  "senha": "carlos123"
}
```

- GET /api/users: Listagem de usuários `(autenticado)`

### 🧪 Scripts

```sh
# yarn dev
Inicia o projeto em modo desenvolvimento

# yarn build
Compila o projeto com tsc e tsc-alias

# executa as migrations do banco
yarn knex:migrate

# reverte a última migration executada
yarn knex:rollback
```

### 🔐 Autenticação

As rotas protegidas utilizam autenticação via JWT. O token deve ser enviado no header:

```sh
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjYXJsbzEyM3NAY2FybG9zLmNvbSIsImlhdCI6MTc0MzM5MDgxOSwiZXhwIjoxNzQzMzk4MDE5fQ.cOmzDXLShXE3fDkxpO8pTfnPYNMIz1V7CWXdbzJjs6c
```
