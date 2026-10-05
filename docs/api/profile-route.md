### **Parâmetros da rota GET /api/user/profile**

---

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





### **Fluxograma da rota `/api/user/profile`:**
---
**Resumo:** diagrama de fluxo da rota Profile

<img src="diagrams/profile-Route.svg" height="1000">

