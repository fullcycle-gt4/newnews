# New News 📰

O **New News** centraliza notícias de diversas plataformas em um único lugar, mantendo você sempre atualizado com os conteúdos mais relevantes para o seu dia a dia.

---

## 📂 Estrutura do Projeto

```text
newnews/
├── compose.yaml        # Orquestração da aplicação via Docker Compose
└── frontend/           # Aplicação web frontend (React + Vite + Caddy)
```

> ℹ️ **Nota:** O projeto futuramente contará com um módulo dedicado de **backend** para gerenciamento e integração de notícias.

---

## 🚀 Como Executar o Projeto

> **Nota:** Certifique-se de executar todos os comandos a partir da **raiz do projeto**.

### Opção 1: Via Docker (Ambiente Containerizado)

Inicie a aplicação utilizando Docker Compose:

```bash
docker compose up --build
```

Após a inicialização, acesse [http://localhost:8080](http://localhost:8080) no seu navegador.

### Opção 2: Desenvolvimento Local (via npm)

Rode o servidor de desenvolvimento do frontend localmente com o Vite:

```bash
# Acesse a pasta do frontend e instale as dependências
cd frontend
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Após a inicialização, acesse o endereço informado no terminal (geralmente [http://localhost:5173](http://localhost:5173)).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, JavaScript e Vite
- **Servidor Web:** Caddy
- **Containerização:** Docker e Docker Compose
- **Qualidade de Código:** Oxlint