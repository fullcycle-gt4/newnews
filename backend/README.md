# NewNews API

API backend do NewNews construída com Node.js, Express, TypeScript, Prisma,
SQLite e Zod.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação

Na pasta `backend/`, instale as dependências:

```bash
npm install
```

Para executar os comandos `npm` diretamente no terminal, fora do Dockerfile e do
Docker Compose, crie o arquivo `.env` na pasta `backend/` com base no
`.env.example`. Esse arquivo fornece as variáveis de ambiente usadas pelo
Prisma e pela aplicação:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

Sem o `.env`, comandos como `npm run db:migrate`, `npm run db:seed` e
`npm run dev` não terão acesso à configuração do banco de dados.

Gere o Prisma Client e aplique as migrations:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

O banco SQLite será criado em `backend/dev.db`.

## Executando a API

### Docker Compose

A partir da raiz do repositório, inicie o backend com os demais serviços:

```bash
docker compose up --build backend
```

A pasta `backend/` é montada no container em `/app`, e `node_modules` permanece
em um volume anônimo para não ser sobrescrito pelo bind mount. A API ficará
disponível em `http://localhost:3000`.

### Desenvolvimento

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

### Produção

Compile o projeto e execute o JavaScript gerado:

```bash
npm run build
npm start
```

## Rotas

Todas as rotas da API usam o prefixo `/api`.

### Health check

Verifica se a API está ativa.

```http
GET /api/health
```

Exemplo:

```bash
curl http://localhost:3000/api/health
```

Resposta:

```json
{
  "status": "ok",
  "service": "newnews-api",
  "timestamp": "2026-10-06T13:00:00.000Z"
}
```

### Listar usuários

Retorna todos os usuários cadastrados, ordenados do mais recente para o mais
antigo.

```http
GET /api/users
```

Exemplo:

```bash
curl http://localhost:3000/api/users
```

Resposta:

```json
{
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "User",
      "createdAt": "2026-10-06T13:00:00.000Z",
      "updatedAt": "2026-10-06T13:00:00.000Z"
    }
  ]
}
```

### Criar usuário

Cria um novo usuário.

```http
POST /api/users
Content-Type: application/json
```

Corpo obrigatório:

| Campo | Tipo | Regras |
| --- | --- | --- |
| `email` | `string` | Deve ser um e-mail válido e único |
| `name` | `string` | Entre 1 e 120 caracteres |

Exemplo:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"User"}'
```

Resposta de sucesso (`201 Created`):

```json
{
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "User",
    "createdAt": "2026-10-06T13:00:00.000Z",
    "updatedAt": "2026-10-06T13:00:00.000Z"
  }
}
```

Resposta para dados inválidos (`400 Bad Request`):

```json
{
  "error": "Invalid request body",
  "issues": [
    {
      "code": "invalid_format",
      "format": "email",
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

## Respostas de erro

### Rota inexistente

Qualquer rota não implementada retorna `404 Not Found`:

```json
{
  "error": "Not found"
}
```

### Erro interno

Falhas não esperadas retornam `500 Internal Server Error`:

```json
{
  "error": "Internal server error"
}
```

## Banco de dados

O schema Prisma está em [`prisma/schema.prisma`](./prisma/schema.prisma).

Comandos úteis:

```bash
# Gerar ou atualizar o Prisma Client
npm run db:generate

# Criar e aplicar uma migration
npm run db:migrate -- --name nome_da_migration

# Abrir o Prisma Studio
npm run db:studio

# Popular ou atualizar os usuários de desenvolvimento
npm run db:seed
```

## Estrutura do projeto

```text
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── health.ts
│   │   └── users.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── package.json
├── prisma.config.ts
└── tsconfig.json
```
