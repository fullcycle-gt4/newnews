### POST /api/user/register



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


