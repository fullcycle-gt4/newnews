### **Parâmetros da rota POST /api/auth/login**

---

**Resumo:** autentica uma conta de usuário existente e retorna um token de acesso.

**Parâmetros do corpo da requisição:**

- `email` (obrigatório): string
- `password` (obrigatório): string

**Exemplo de request:**

    ```http
    POST /api/auth/login HTTP/1.1
    Content-Type: application/json
    ```

    ```json
    {
      "email": "user_test@test.com",
      "password": "Test_123456"
    }
    ```

**Exemplo de chamada com `curl`:**

    ```bash
    curl -X POST http://localhost:3000/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{
        "email": "user_test@test.com",
        "password": "Test_123456"
      }'
    ```

**Resposta de sucesso:**

- Código: `200 OK`

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
- `401 Unauthorized`: e-mail ou senha incorretos
- `404 Not Found`: usuário não encontrado

### **Fluxograma da rota `api/auth/login`**
---

**Resumo:** diagrama de fluxo da rota login.

<img src="diagrams/login-route.svg" height="1000">