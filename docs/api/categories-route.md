### **Parâmetros da rota GET /api/categories=...**

---

**Resumo:** retorna o feed de notícias filtrado por uma categoria específica.

**Parâmetros da query string:**

- `category` (obrigatório): string

**Exemplo de request:**

```http
GET /api/categories=tecnologia HTTP/1.1
Content-Type: application/json
```

**Exemplo de chamada com `curl`:**

```bash
curl -X GET "http://localhost:3000/api/categories=tecnologia" \
  -H "Content-Type: application/json"
```

**Resposta de sucesso:**

- Código: `200 OK`

```json
{
  "success": true,
  "data": {
    "news": [
      {
        "id": 101,
        "title": "Novo avanço na inteligência artificial",
        "category": "tecnologia",
        "summary": "Investigadores descobriram uma nova forma de otimizar redes neuronais..."
      },
      {
        "id": 105,
        "title": "Lançamento do novo smartphone",
        "category": "tecnologia",
        "summary": "A nova geração de dispositivos móveis chega ao mercado na próxima semana..."
      }
    ]
  }
}
```

**Respostas de erro:**

- `400 Bad Request`: parâmetro de categoria inválido ou malformado

*(Nota: Uma categoria válida sem notícias retorna `200 OK` com uma lista de "news" vazia)*


### **Fluxograma do filtro de categoria:**
---
**Resumo:** diagrama de fluxo da filtragem de notícias por categoria a partir do menu lateral.

<img src="diagrams/categories-diagram.svg" height="1000">
