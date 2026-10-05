### **Fluxo de alimentação do `News Database`**

---

**Resumo:** processo responsável por coletar notícias da API, colocá-las em uma fila de processamento, normalizar os dados recebidos, validar as informações, remover notícias duplicadas e, por fim, armazenar os registros válidos no banco de dados.

**Etapas do processamento:**

* **News API:** fonte responsável por fornecer as notícias.
* **News Queue:** fila responsável por desacoplar a coleta do processamento das notícias.
* **Normalizer:** normaliza os dados recebidos da API para o formato utilizado internamente pela aplicação.
* **Validator:** verifica se os dados normalizados atendem aos requisitos necessários para armazenamento.
* **Deduplicator:** identifica e descarta notícias que já foram processadas ou armazenadas.
* **News Database:** armazena as notícias após a conclusão das etapas de processamento.

**Fluxo de processamento:**

```text
News API
   ↓
News Queue
   ↓
Normalizer
   ↓
Validator
   ↓
Deduplicator
   ↓
News Database
```

**Fluxograma:**

<img src="diagrams/news-collection-diagram.svg" height="700">
