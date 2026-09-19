# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Leitores gerais que buscam um agregador centralizado, rápido e organizado de notícias diárias provenientes de múltiplas fontes em uma única interface.

## Product Purpose

O **New News** centraliza conteúdos e manchetes para manter as pessoas informadas com facilidade. O sucesso do produto significa oferecer consumo de informação ágil, navegação fluida por categorias, busca em tempo real e capacidade de salvar notícias para leitura posterior.

## Positioning

Agregação multi-plataforma simplificada com foco em uma experiência de leitura limpa, sem distrações e com gerenciamento local de notícias salvas, aliada a uma arquitetura pronta para integração com um backend dedicado de curadoria de notícias.

## Operating Context

Aplicação web responsiva acessada em navegadores desktop e móveis. O fluxo principal envolve navegação por feed de notícias com destaque (hero article), filtros por categorias, busca por palavras-chave, abertura de notícias em modal detalhado, marcação de lidas/salvas e alertas via toast notifications.

## Capabilities and Constraints

- **Stack Técnica**: Frontend React 19, Vite, Bootstrap 5 e Tabler Icons. Servidor Caddy para produção e orquestração Docker Compose.
- **Gerenciamento de Estado**: React Context API (`UserContext`, `ThemeContext`, `ToastContext`, `NavigationContext`, `BookmarksContext`).
- **Arquitetura de Módulos**: Frontend em `frontend/`, com previsão de módulo backend futuro para agregação e processamento de dados.
- **Idioma**: Interface em Português (pt-BR).

## Brand Commitments

- **Nome**: New News 📰
- **Tom de Voz**: Informativo, ágil, acolhedor e direto.

## Evidence on Hand

- Código-fonte React em [frontend/src](file:///home/vinicius/Projects/newnews/frontend/src) contendo componentes de interface (`Navbar`, `Sidebar`, `CategoryFilter`, `NewsCard`, `HeroCard`, `ArticleModal`, `EmptyState`).
- Especificação de ambiente e execução em [README.md](file:///home/vinicius/Projects/newnews/README.md).

## Product Principles

1. **Velocidade de Consumo**: A interface deve priorizar escaneabilidade imediata e acesso direto às manchetes principais.
2. **Leitura Sem Distrações**: Manter a experiência focada no conteúdo com hierarquia visual clara e layouts limpos.
3. **Organização e Descoberta**: Facilitar a navegação intuitiva por temas, pesquisa instantânea e acesso aos itens salvos pelo usuário.
4. **Modularidade e Prontidão**: Manter contratos limpos nos componentes e estado para facilitar a conexão com o módulo backend.
