# Guia para adicionar novas rotas

Este documento mostra como criar e registrar novas rotas na API NewNews.

## Arquitetura atual

As rotas são organizadas por recurso:

```text
src/
├── app.ts
├── lib/
│   └── prisma.ts
└── routes/
    ├── health.ts
    └── users.ts
```

Cada arquivo de rota exporta um `Router` do Express. O arquivo
[`src/app.ts`](./src/app.ts) registra esse router em um prefixo da API.

Por exemplo, o router de usuários é registrado assim:

```ts
app.use("/api/users", usersRouter);
```

Com isso, uma rota `GET /` declarada em `users.ts` fica disponível como
`GET /api/users`.

## Passo a passo

### 1. Criar o arquivo da rota

Crie um arquivo em `src/routes/`. Para exemplificar, vamos criar rotas de
notícias:

```text
src/routes/news.ts
```

### 2. Criar o router

Use `Router` para manter as rotas do recurso isoladas:

```ts
import { Router } from "express";

export const newsRouter = Router();

newsRouter.get("/", (_request, response) => {
	response.json({ data: [] });
});
```

### 3. Registrar o router no `app.ts`

Importe o router e registre-o com o prefixo desejado:

```ts
import { newsRouter } from "./routes/news.js";

app.use("/api/news", newsRouter);
```

A rota criada estará disponível em:

```text
GET http://localhost:3000/api/news
```

O projeto usa módulos ESM. Por isso, imports locais devem usar a extensão
`.js`, mesmo quando o arquivo de origem é TypeScript.

## Validando dados com Zod

Os dados recebidos do cliente devem ser validados antes de serem usados. Para
um corpo JSON, use `safeParse`:

```ts
import { Router } from "express";
import { z } from "zod";

const createNewsSchema = z.object({
	title: z.string().trim().min(1).max(200),
	summary: z.string().trim().min(1).max(500),
	category: z.string().trim().min(1).max(80),
});

export const newsRouter = Router();

newsRouter.post("/", (request, response) => {
	const result = createNewsSchema.safeParse(request.body);

	if (!result.success) {
		response.status(400).json({
			error: "Invalid request body",
			issues: result.error.issues,
		});
		return;
	}

	response.status(201).json({ data: result.data });
});
```

### Parâmetros de rota

Para validar um parâmetro como `/api/news/:id`:

```ts
const idSchema = z.coerce.number().int().positive();

newsRouter.get("/:id", (request, response) => {
	const result = idSchema.safeParse(request.params.id);

	if (!result.success) {
		response.status(400).json({
			error: "Invalid news id",
			issues: result.error.issues,
		});
		return;
	}

	response.json({ data: { id: result.data } });
});
```

### Parâmetros de consulta

Para validar filtros e paginação:

```ts
const listNewsSchema = z.object({
	category: z.string().trim().min(1).optional(),
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().max(100).default(20),
});

newsRouter.get("/", (request, response) => {
	const result = listNewsSchema.safeParse(request.query);

	if (!result.success) {
		response.status(400).json({
			error: "Invalid query parameters",
			issues: result.error.issues,
		});
		return;
	}

	response.json({ data: [], meta: result.data });
});
```

## Usando Prisma em uma rota

O cliente Prisma compartilhado está em
[`src/lib/prisma.ts`](./src/lib/prisma.ts). Importe-o na rota e trate erros
assíncronos com `try/catch`, encaminhando o erro para o middleware global com
`next(error)`:

```ts
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const newsRouter = Router();

newsRouter.get("/", async (_request, response, next) => {
	try {
		const news = await prisma.news.findMany({
			orderBy: { publishedAt: "desc" },
		});

		response.json({ data: news });
	} catch (error) {
		next(error);
	}
});
```

Esse exemplo pressupõe que o model `News` já exista no
[`prisma/schema.prisma`](./prisma/schema.prisma). Depois de alterar o schema:

```bash
npm run db:migrate -- --name add_news
npm run db:generate
```

## Exemplo completo

O exemplo a seguir combina validação, Prisma e tratamento de erro:

```ts
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const createNewsSchema = z.object({
	title: z.string().trim().min(1).max(200),
	summary: z.string().trim().min(1).max(500),
	category: z.string().trim().min(1).max(80),
});

export const newsRouter = Router();

newsRouter.get("/", async (_request, response, next) => {
	try {
		const news = await prisma.news.findMany({
			orderBy: { publishedAt: "desc" },
		});

		response.json({ data: news });
	} catch (error) {
		next(error);
	}
});

newsRouter.post("/", async (request, response, next) => {
	const result = createNewsSchema.safeParse(request.body);

	if (!result.success) {
		response.status(400).json({
			error: "Invalid request body",
			issues: result.error.issues,
		});
		return;
	}

	try {
		const news = await prisma.news.create({
			data: result.data,
		});

		response.status(201).json({ data: news });
	} catch (error) {
		next(error);
	}
});
```

Depois, registre o router no `app.ts`:

```ts
import { newsRouter } from "./routes/news.js";

app.use("/api/news", newsRouter);
```

## Testando a nova rota

Inicie a API:

```bash
npm run dev
```

Liste os registros:

```bash
curl http://localhost:3000/api/news
```

Crie um registro:

```bash
curl -X POST http://localhost:3000/api/news \
	-H "Content-Type: application/json" \
	-d '{"title":"Nova notícia","summary":"Resumo da notícia","category":"Tecnologia"}'
```

Compile o projeto para verificar tipos e imports:

```bash
npm run build
```

## Criando um arquivo de seed

Seeds são scripts usados para inserir dados iniciais ou dados de
desenvolvimento no banco. No Prisma 7, o caminho do seed é configurado em
[`prisma.config.ts`](./prisma.config.ts):

```ts
export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
		seed: "tsx prisma/seed.ts",
	},
	datasource: {
		url: process.env.DATABASE_URL,
	},
});
```

### 1. Criar `prisma/seed.ts`

O seed deve carregar as variáveis de ambiente, criar o adapter do banco e
instanciar o Prisma Client:

```ts
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is required to run the seed");
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

const users = [
	{
		email: "ana.silva@newnews.com",
		name: "Ana Silva",
	},
	{
		email: "bruno.santos@newnews.com",
		name: "Bruno Santos",
	},
];

try {
	for (const user of users) {
		await prisma.user.upsert({
			where: { email: user.email },
			update: { name: user.name },
			create: user,
		});
	}

	console.log(`Seed concluído: ${users.length} usuários processados.`);
} finally {
	await prisma.$disconnect();
}
```

O `upsert` procura o registro pelo campo único `email`. Se o usuário já
existir, atualiza o nome; caso contrário, cria um novo registro. Dessa forma,
o seed pode ser executado várias vezes sem duplicar dados.

### 2. Garantir o script no `package.json`

Adicione um comando para executar o seed:

```json
{
	"scripts": {
		"db:seed": "prisma db seed"
	}
}
```

### 3. Aplicar a migration e executar o seed

Execute as migrations antes do seed para garantir que a tabela utilizada já
exista:

```bash
npm run db:migrate
npm run db:generate
npm run db:seed
```

Se estiver aplicando migrations já criadas em outro ambiente, use:

```bash
npx prisma migrate deploy
npm run db:seed
```

Para conferir os registros inseridos, consulte a rota de usuários:

```bash
curl http://localhost:3000/api/users
```

## Convenções recomendadas

- Organize cada recurso em seu próprio arquivo dentro de `src/routes/`.
- Use nomes no plural para os recursos, como `/api/users` e `/api/news`.
- Valide corpos, parâmetros e query strings com Zod.
- Retorne `400` para entradas inválidas.
- Retorne `201` após criar um recurso.
- Encaminhe erros inesperados com `next(error)`.
- Não exponha detalhes internos de erros nas respostas HTTP.
- Use `response.json({ data: ... })` para respostas de sucesso.
- Use imports locais com extensão `.js`.
