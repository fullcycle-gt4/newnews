# Rotas necessárias para alimentar o frontend



Este documento descreve as rotas da API que o frontend do New News precisa consumir para funcionar com o fluxo atual de notícias, perfil do usuário e notificações.



## Base da API



- Base URL: `/api`

- Configuração: `frontend/src/utils/config.js`

- Modo mock: `VITE_USE_MOCK`



---



## 1. Documentação Swagger-like por rota



### 1.1 GET /api/categories



**Resumo:** retorna as categorias disponíveis e os itens de navegação do menu.



**Parâmetros:**

- Nenhum



**Resposta de sucesso:**

- Código: `200 OK`



```json

{

  "success": true,

  "data": ["Todos", "Futebol", "Tecnologia", "Política", "Economia"],

  "navItems": [

    { "id": "inicio", "label": "Início", "category": null },

    { "id": "futebol", "label": "Futebol", "category": "Futebol" }

  ]

}

```



**Respostas de erro:**

<!-- - `500 Internal Server Error`: falha no servidor -->



---



### 1.2 GET /api/news



**Resumo:** retorna o feed de notícias com filtros, paginação e busca.



**Parâmetros de query:**

- `category` (opcional): string, categoria da notícia

- `query` (opcional): string, termo da busca

- `page` (opcional): number, página atual

- `limit` (opcional): number, quantidade por página



**Exemplo:**



```http

GET /api/news?category=Tecnologia&query=ia&page=1&limit=12

```



**Resposta de sucesso:**

- Código: `200 OK`



```json

{

  "success": true,

  "data": [

    {

      "id": 1,

      "title": "Nova IA promete revolucionar a forma como trabalhamos",

      "summary": "Resumo da notícia",

      "category": "Tecnologia",

      "image": "https://...",

      "author": "Redação",

      "source": "Portal New News",

      "publishedAt": "2026-09-28T12:00:00Z",

      "readTime": "3 min de leitura",

      "isHero": true

    }

  ],

  "meta": {

    "total": 120,

    "hasMore": true

  }

}

```



**Respostas de erro:**

- `400 Bad Request`: parâmetros inválidos

<!-- - `500 Internal Server Error`: erro ao consultar notícias -->



---



### 1.3 GET /api/news/trending



**Resumo:** retorna a notícia em destaque da página inicial.



**Parâmetros:**

- Nenhum



**Resposta de sucesso:**

- Código: `200 OK`



```json

{

  "success": true,

  "data": {

    "id": 7,

    "title": "Notícia em destaque",

    "summary": "Resumo principal",

    "category": "Mundo",

    "image": "https://...",

    "author": "Redação",

    "source": "Portal New News",

    "publishedAt": "2026-09-28T08:00:00Z",

    "readTime": "4 min de leitura"

  }

}

```



**Respostas de erro:**

<!-- - `404 Not Found`: sem notícia em destaque -->

<!-- - `500 Internal Server Error`: falha interna -->



---



### 1.4 GET /api/news/:id



**Resumo:** retorna os detalhes completos de uma notícia específica.



**Parâmetros de rota:**

- `id` (obrigatório): number, identificador da notícia



**Exemplo:**



```http

GET /api/news/42

```



**Resposta de sucesso:**

- Código: `200 OK`



```json

{

  "success": true,

  "data": {

    "id": 42,

    "title": "Título da notícia",

    "summary": "Resumo da matéria",

    "content": "Texto completo da reportagem",

    "category": "Economia",

    "image": "https://...",

    "author": "Redação",

    "source": "Portal New News",

    "publishedAt": "2026-09-28T15:00:00Z",

    "readTime": "5 min de leitura"

  }

}

```



**Respostas de erro:**

- `404 Not Found`: notícia não encontrada

- `400 Bad Request`: erro ao buscar notícia



---



### 1.5 GET /api/news/:id/related



**Resumo:** retorna notícias relacionadas a uma matéria principal.



**Parâmetros de rota:**

- `id` (obrigatório): number, identificador da notícia



**Parâmetros de query:**

- `limit` (opcional): number, quantidade de notícias relacionadas



**Exemplo:**



```http

GET /api/news/42/related?limit=3

```



**Resposta de sucesso:**

- Código: `200 OK`



```json

{

  "success": true,

  "data": [

    {

      "id": 43,

      "title": "Notícia relacionada",

      "category": "Economia",

      "image": "https://..."

    }

  ]

}

```



**Respostas de erro:**

<!-- - `404 Not Found`: notícia principal não existe -->

<!-- - `500 Internal Server Error`: falha na busca de relacionados -->



---



### 1.6 POST /api/user/register



**Resumo:** cria uma nova conta de usuário.



**Parâmetros do corpo da requisição:**

- `name` (obrigatório): string

- `email` (obrigatório): string

- `password` (obrigatório): string



**Exemplo de request:**



```json

{

  "name": "João Silva",

  "email": "joao@teste.com",

  "password": "123456"

}

```



**Resposta de sucesso:**

- Código: `201 Created`



```json

{

  "success": true,

  "data": {

    "id": 2,

    "name": "João Silva",

    "email": "joao@teste.com",

    "avatar": null

  }

}

```



**Respostas de erro:**

- `400 Bad Request`: campos inválidos ou ausentes

- `409 Conflict`: e-mail já cadastrado

<!-- - `500 Internal Server Error`: falha no cadastro -->



---



### 1.7 GET /api/user/profile



**Resumo:** retorna os dados do usuário autenticado.



**Parâmetros:**

- Token de autenticação no header, normalmente `Authorization: Bearer <token>`



**Resposta de sucesso:**

- Código: `200 OK`



```json

{

  "success": true,

  "data": {

    "id": 1,

    "name": "Usuário Teste",

    "email": "usuario@teste.com",

    "avatar": null

  }

}

```



**Respostas de erro:**

- `401 Unauthorized`: token ausente ou inválido

- `404 Not Found`: informações inválidas

<!-- - `500 Internal Server Error`: erro interno -->



---



### 1.8 GET /api/user/notifications



**Resumo:** retorna as notificações do usuário autenticado.



**Parâmetros:**

- Token de autenticação no header, normalmente `Authorization: Bearer <token>`



**Resposta de sucesso:**

- Código: `200 OK`



```json

{

  "success": true,

  "data": [

    {

      "id": 1,

      "title": "Seleção Brasileira confirma novos convocados",

      "category": "Futebol",

      "timeAgo": "12m atrás"

    }

  ]

}

```



**Respostas de erro:**

- `401 Unauthorized`: usuário não autenticado

<!-- - `500 Internal Server Error`: falha na recuperação das notificações -->



---



## 2. Diagrama de rotas



```mermaid

flowchart LR

    A[Frontend] -->|GET| B[/api/categories]

    A -->|GET| C[/api/news]

    A -->|GET| D[/api/news/trending]

    A -->|GET| E[/api/news/:id]

    A -->|GET| F[/api/news/:id/related]

    A -->|POST| G[/api/user/register]

    A -->|GET| H[/api/user/profile]

    A -->|GET| I[/api/user/notifications]
    A -->|POST| J[/api/auth/login]
    A -->|POST| K[/api/auth/register]



    B -->|200 OK| B1[Categorias + navItems]

    C -->|200 OK| C1[Feed + meta]

    D -->|200 OK| D1[Notícia destaque]

    E -->|200 OK| E1[Detalhes da notícia]

    F -->|200 OK| F1[Relacionadas]

    G -->|201 Created| G1[Usuário criado]

    H -->|200 OK| H1[Perfil]

    I -->|200 OK| I1[Notificações]
    J -->|200 OK| J1[Token + usuário]
    K -->|201 Created| K1[Usuário criado]

```



## 3. Observações de contrato



- Todas as rotas de sucesso devem retornar um objeto com `success` e `data`.

- Em caso de erro, o backend deve responder com status HTTP apropriado e mensagem clara.

- O frontend já espera um padrão de resposta baseado em `success`, `data` e `meta` quando necessário.



Se quiser, este documento pode ser transformado posteriormente em um formato compatível com Swagger/OpenAPI, pronto para uso em um arquivo `.yaml` ou `.json`.

## 3. Rotas obrigatórias



O frontend já possui telas para login e cadastro, mesmo que ainda não tenham integração completa com a API. Portanto, estas rotas seriam naturais para futuras implementações:



### POST /api/auth/login



```json

{

  "email": "usuario@teste.com",

  "password": "123456"

}

```



Resposta esperada:



```json

{

  "success": true,

  "data": {

    "user": {

      "id": 1,

      "name": "Usuário Teste",

      "email": "usuario@teste.com"

    },

    "token": "jwt-token"

  }

}

```



### POST /api/auth/register



```json

{

  "name": "Novo Usuário",

  "email": "novo@teste.com",

  "password": "123456"

}

```



Resposta esperada:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 2,
      "name": "Novo Usuário",
      "email": "novo@teste.com"
    },
    "token": "jwt-token"
  }
}
```

### POST /api/auth/logout



Opcional para encerrar sessão em backend.



---



## 4. Mapa de consumo do frontend

| Fluxo | Método | Rota principal | Como é usada |
| --- | --- | --- | --- |
| Home | `GET` | `/api/news` | Carrega o feed principal. |
| Destaque | `GET` | `/api/news/trending` | Exibe a notícia principal. |
| Filtro por categoria | `GET` | `/api/news?category=...` | Filtra as notícias por categoria. |
| Pesquisa | `GET` | `/api/news?query=...` | Busca notícias por texto. |
| Página de notícia | `GET` | `/api/news/:id` | Exibe os detalhes do artigo. |
| Relacionados | `GET` | `/api/news/:id/related` | Exibe cards de notícias relacionadas. |
| Categorias | `GET` | `/api/categories` | Preenche o menu e os filtros. |
| Perfil | `GET` | `/api/user/profile` | Exibe os dados do usuário autenticado. |
| Notificações | `GET` | `/api/user/notifications` | Exibe os alertas do usuário. |
| Login | `POST` | `/api/auth/login` | Autentica o usuário e retorna o token de acesso. |
| Cadastro | `POST` | `/api/auth/register` | Cria a conta e retorna os dados do usuário. |





