# Frontend — New News

Aplicação web do New News, construída com **React + JavaScript + Vite**.

> **Antes de começar:** abra a pasta `frontend/` diretamente na sua IDE (não o repositório raiz). Isso garante que linting, IntelliSense e extensões funcionem corretamente.

---

## 🚀 Primeiros Passos

```bash
npm install   # instala as dependências
npm run dev   # inicia o servidor em http://localhost:5173
```

---

## 🧰 Scripts

| Script            | O que faz                            |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desenvolvimento (Vite)   |
| `npm run build`   | Build de produção em `dist/`         |
| `npm run preview` | Pré-visualiza o build localmente     |
| `npm run lint`    | Verifica problemas de código (Oxlint)|
| `npm run format`  | Formata o código (Prettier)          |

---

## 🛠️ Stack

| Responsabilidade    | Tecnologia       |
| ------------------- | ---------------- |
| UI                  | React 19         |
| Bundler             | Vite             |
| Roteamento          | React Router DOM |
| Estado global       | Zustand          |
| HTTP Client         | Axios            |
| Servidor web (prod) | Caddy            |
| Linter              | Oxlint           |
| Formatador          | Prettier         |

---

## 📂 Estrutura de Pastas

```text
src/
├── assets/       # Arquivos estáticos (imagens, fontes, ícones)
├── components/   # Componentes reutilizáveis entre páginas
├── hooks/        # Custom hooks (lógica reutilizável com estado)
├── mocks/        # Dados estáticos para desenvolvimento sem API
├── pages/        # Uma pasta por rota; cada página é um componente
├── services/     # Funções de chamadas HTTP, organizadas por domínio
├── stores/       # Estado global com Zustand, um arquivo por domínio
├── utils/        # Funções puras utilitárias (sem side effects)
├── App.jsx       # Ponto de entrada da UI e definição de rotas
├── index.css     # Reset CSS e variáveis globais
└── main.jsx      # Monta o React no DOM
```

---

## 📐 Convenções

**Imports:** sempre use o alias `@/` no lugar de caminhos relativos.
```js
// ✅ correto
import Button from '@/components/Button'

// ❌ evitar
import Button from '../../components/Button'
```

**Nomenclatura:**
- Componentes → `PascalCase`, um por arquivo (ex: `NewsCard.jsx`)
- Hooks → prefixo `use` (ex: `useNewsFeed.js`)
- Stores → sufixo `Store` (ex: `stores/newsStore.js`)
- Serviços → sufixo `Service` (ex: `services/newsService.js`)
