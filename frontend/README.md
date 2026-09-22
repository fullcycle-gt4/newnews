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

| Script            | O que faz                              |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (Vite)     |
| `npm run build`   | Build de produção em `dist/`           |
| `npm run preview` | Pré-visualiza o build localmente       |
| `npm run lint`    | Verifica problemas de código (Oxlint)  |
| `npm run format`  | Formata o código (Prettier)            |

---

## 🛠️ Stack

| Responsabilidade | Tecnologia         |
| ---------------- | ------------------ |
| UI               | React 19           |
| Bundler          | Vite               |
| Roteamento       | React Router DOM 7 |
| Estado global    | Zustand 5          |
| HTTP Client      | Axios              |
| Estilo           | Bootstrap 5        |
| Ícones           | Tabler Icons React |
| Linter           | Oxlint             |
| Formatador       | Prettier           |

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz de `frontend/` se precisar sobrescrever os padrões:

| Variável             | Padrão  | Descrição                                              |
| -------------------- | ------- | ------------------------------------------------------ |
| `VITE_API_BASE_URL`  | `/api`  | URL base da API backend                                |
| `VITE_USE_MOCK`      | `true`  | `false` desativa o modo mock e usa a API real          |
| `VITE_MOCK_DELAY_MS` | `250`   | Delay artificial das respostas mock (em milissegundos) |

> Por padrão, o app roda em **modo mock** — sem precisar de um backend em execução.

---

## 📂 Estrutura de Pastas

```text
src/
├── assets/       # Arquivos estáticos (imagens, fontes, ícones)
├── components/   # Componentes reutilizáveis entre páginas
├── hooks/        # Custom hooks (lógica reutilizável com estado)
├── mocks/        # Dados e adaptador mock para desenvolvimento sem API
├── pages/        # Uma pasta por rota; cada página é um componente
├── services/     # Chamadas HTTP organizadas por domínio (facade pattern)
├── stores/       # Estado global com Zustand, um arquivo por domínio
├── utils/        # Funções utilitárias puras (config, datas)
├── App.jsx       # Componente raiz e definição de rotas
├── index.css     # Reset CSS e variáveis globais
└── main.jsx      # Monta o React no DOM
```

Cada pasta é um **módulo** com um `index.js` barrel que centraliza as exportações.

---

## 📐 Convenções

### Imports

Use sempre o alias `@/` no lugar de caminhos relativos. Para importações **entre módulos**, use sempre o barrel (`index.js`) da pasta de destino:

```js
// ✅ correto — cross-module via barrel
import { useNavigationStore } from '@/stores'
import Navbar from '@/components/Navbar'

// ✅ correto — intra-módulo (dentro da mesma pasta)
import { useToastStore } from './toastStore.js'

// ❌ evitar — cross-module sem barrel
import { useNavigationStore } from '@/stores/navigationStore.js'
import Navbar from '@/components/Navbar/Navbar.jsx'
```

### Nomenclatura

- Componentes → `PascalCase`, um por arquivo (ex: `NewsCard.jsx`)
- Hooks → prefixo `use` (ex: `useNewsFeed.js`)
- Stores → sufixo `Store` (ex: `stores/bookmarksStore.js`)
- Serviços → sufixo `Service` (ex: `services/newsService.js`)
