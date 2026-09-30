
Este documento define as orientações para projetar a API do backend e documentar seus endpoints em Markdown.

## 1. Mapeamento de Requisitos e Fluxos da Tela

1. **Listar as Telas e Componentes**: Identifique quais dados cada tela do frontend precisa exibir e quais ações o usuário pode realizar (ex.: listar produtos, cadastrar cliente, filtrar por data).
2. **Identificar o Tipo de Operação**: Classifique as ações da interface em operações CRUD (Criar, Ler, Atualizar, Deletar) ou ações de negócio específicas (ex.: *processar pagamento*, *enviar e-mail*).

## 2. Escolha do Estilo Arquitetural

Defina a abordagem de comunicação que melhor atende o frontend:

- **REST**: Ideal para a maioria das aplicações web/mobile com recursos bem definidos e endpoints estáticos (`GET /users`, `POST /orders`).
- **GraphQL**: Recomendado quando o frontend precisa de alta flexibilidade para solicitar apenas os campos necessários, evitando múltiplos *fetches* ou tráfego excessivo de dados (*over-fetching*/*under-fetching*).
- **WebSockets / gRPC**: Indicado para comunicação em tempo real (ex.: chats, notificações push, dashboards ao vivo).

## 3. Definição do Contrato das Rotas (URL e Métodos HTTP)

Em seu arquivo Markdown, padronize a convenção de nomes e os recursos:

- Use substantivos no plural para recursos (`/api/v1/products`).
- Associe os métodos HTTP corretos:
  - `GET`: Recuperar dados.
  - `POST`: Criar novos recursos.
  - `PUT` / `PATCH`: Atualização total ou parcial.
  - `DELETE`: Remover recursos.

## 4. Modelagem de Payloads, Query Params e Respostas

Para cada endpoint no Markdown, especifique o formato exato das requisições e respostas em JSON:

- **Entrada**: Defina *headers* necessários (ex.: `Authorization: Bearer <token>`), *query parameters* (`?page=1&limit=10`) e o corpo do JSON com os tipos de dados e obrigatoriedade de cada campo.
- **Saída (Sucesso)**: Modele o JSON de retorno e o status HTTP correspondente (`200 OK`, `201 Created`).
- **Tratamento de Erros**: Padronize a estrutura dos erros (`400 Bad Request`, `401 Unauthorized`, `404 Not Found`) para que o frontend saiba exatamente como exibir as mensagens na interface:

```json
{
  "error": true,
  "code": "INVALID_INPUT",
  "message": "O campo email é obrigatório.",
  "fields": { "email": "Preenchimento obrigatório" }
}
```

## 5. Regras de Paginação, Filtro e Ordenação

Defina como o frontend consumirá listas extensas para evitar problemas de performance:

- **Estrutura de Paginação**: Escolha entre paginação por offset (`page=1&limit=20`) ou baseada em cursor (`cursor=xyz`).
- **Metadados de Resposta**:

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 150,
    "totalPages": 8
  }
}
```

## 6. Estrutura Modelo em Markdown

O padrão a seguir deve ser usado para documentar cada endpoint:

````markdown
## 1. Listar Usuários

- **Rota:** `/api/v1/users`
- **Método:** `GET`
- **Autenticação:** Requerida (`Bearer Token`)

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `page` | Integer | Não | Número da página (Default: 1) |
| `limit` | Integer | Não | Itens por página (Default: 10) |

### Resposta de Sucesso (`200 OK`)
```json
{
  "data": [
    {
      "id": "usr_123",
      "name": "Maria Silva",
      "email": "maria@example.com"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 1
  }
}

```

### Resposta de Erro (`401 Unauthorized`)

```json
{
  "code": "UNAUTHORIZED",
  "message": "Token de acesso ausente ou inválido."
}
```
```
