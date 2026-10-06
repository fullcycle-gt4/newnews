### **Parâmetros da rota POST /api/auth/register**

---

**Resumo:** cria uma nova conta de usuário.



**Parâmetros do corpo da requisição:**

- `name` (obrigatório): string

- `email` (obrigatório): string

- `password` (obrigatório): string



**Exemplo de request:**

```http
header
POST /api/auth/register HTTP/1.1
Content-Type: application/json
```

```json
json
{
  "name": "User test",
  "email": "user_test@test.com",
  "password": "Test_123456"
}

```

**Exemplo de chamada com `curl`:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User test",
    "email": "user_test@test.com",
    "password": "Test_123456"
  }'
```


**Resposta de sucesso:**

- Código: `201 Created`



```json

{

  "success": true,

  "data": {

    "user": {

      "id": 2,

      "name": "User Test",

      "email": "user_test@test.com",

      "avatar": null

    },

    "token": "jwt-token"

  }

}

```



**Respostas de erro:**

- `400 Bad Request`: campos inválidos ou ausentes

- `409 Conflict`: e-mail já cadastrado





### **Fluxograma da rota `api/auth/register`:**
---
**Resumo:** diagrama de fluxo da rota register

<img src="diagrams/register-diagram.svg" height="1000">

