# Backend — New News

API backend do New News, construída com **Node.js + Express + TypeScript + Prisma + SQLite + Zod**.

---

## 🚀 Primeiros Passos

Na pasta `backend/`, instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

Gere o Prisma Client, aplique as migrations e execute o seed:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

> **Banco de dados:** o SQLite será criado em `dev.db`.

---

## 🧰 Scripts

| Script                | O que faz                                   |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Inicia o servidor de desenvolvimento        |
| `npm run build`       | Compila o projeto para produção             |
| `npm start`           | Executa o projeto compilado                 |
| `npm run db:generate` | Gera o Prisma Client                        |
| `npm run db:migrate`  | Cria e aplica migrations                    |
| `npm run db:seed`     | Popula o banco com dados de desenvolvimento |
| `npm run db:studio`   | Abre o Prisma Studio                        |

---

## 🛠️ Stack

| Responsabilidade | Tecnologia  |
| ---------------- | ----------- |
| Runtime          | Node.js 20+ |
| Framework HTTP   | Express     |
| Linguagem        | TypeScript  |
| ORM              | Prisma      |
| Banco de dados   | SQLite      |
| Validação        | Zod         |
| Containerização  | Docker      |

---

## ⚙️ Variáveis de Ambiente

| Variável       | Exemplo         | Descrição                         |
| -------------- | --------------- | --------------------------------- |
| `DATABASE_URL` | `file:./dev.db` | URL de conexão com o banco SQLite |
| `PORT`         | `3000`          | Porta utilizada pela API          |

> O arquivo `.env` é necessário para executar comandos locais que dependem dessas variáveis, como `db:migrate`, `db:seed` e `dev`.

---

## 🔌 API

Todas as rotas utilizam o prefixo `/api`.

### Health Check

```http
GET /api/health
```

Verifica se a API está ativa.

**Resposta `200 OK`:**

```json
{
  "status": "ok",
  "service": "newnews-api",
  "timestamp": "2026-10-06T13:00:00.000Z"
}
```

### Usuários

| Método | Rota         | Descrição         |
| ------ | ------------ | ----------------- |
| `GET`  | `/api/users` | Lista os usuários |
| `POST` | `/api/users` | Cria um usuário   |

#### `POST /api/users`

**Body:**

| Campo   | Tipo     | Regras                |
| ------- | -------- | --------------------- |
| `email` | `string` | E-mail válido e único |
| `name`  | `string` | 1–120 caracteres      |

Exemplo:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"User"}'
```

---

## ⚠️ Respostas de Erro

### `400 Bad Request`

Dados enviados na requisição são inválidos.

```json
{
  "error": "Invalid request body",
  "issues": []
}
```

### `404 Not Found`

A rota ou recurso solicitado não existe.

```json
{
  "error": "Not found"
}
```

### `500 Internal Server Error`

Ocorreu um erro interno inesperado.

```json
{
  "error": "Internal server error"
}
```

---

## 🗄️ Banco de Dados

O schema do Prisma está em:

```text
prisma/schema.prisma
```

Criar uma nova migration:

```bash
npm run db:migrate -- --name nome_da_migration
```

Abrir o Prisma Studio:

```bash
npm run db:studio
```

---

## 📂 Estrutura de Pastas

```text
backend/
├── prisma/
│   ├── migrations/     # Migrations do banco
│   ├── schema.prisma  # Schema do Prisma
│   └── seed.ts        # Dados iniciais
│
├── src/
│   ├── config/         # Configurações da aplicação
│   ├── lib/            # Dependências compartilhadas
│   ├── routes/         # Rotas da API
│   ├── app.ts          # Configuração do Express
│   └── server.ts       # Inicialização do servidor
│
├── .env.example
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

---

## 📐 Convenções

### Organização

* **`routes/`** → define os endpoints e recebe as requisições HTTP.
* **`config/`** → concentra configurações e variáveis de ambiente.
* **`lib/`** → concentra instâncias e dependências compartilhadas.
* **`prisma/`** → contém schema, migrations e seed do banco.
* **`app.ts`** → configura a aplicação Express.
* **`server.ts`** → inicializa o servidor HTTP.

### Nomenclatura

* Arquivos → `camelCase` quando representarem módulos simples.
* Rotas → nomes no plural para recursos (`users`, `news`).
* Variáveis e funções → `camelCase`.
* Tipos e interfaces → `PascalCase`.
* Constantes → `UPPER_SNAKE_CASE` quando forem constantes globais.

### Validação

A validação de entradas deve ser feita com **Zod** antes que os dados sejam processados pela aplicação ou enviados ao banco.

### Banco de dados

Alterações no schema devem ser realizadas através de **migrations do Prisma**, evitando alterações manuais no banco de desenvolvimento.
