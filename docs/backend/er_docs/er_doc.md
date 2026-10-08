# Modelo de dados

Este documento descreve as tabelas e os campos representados no diagrama
[ER_diagram.svg](./diagrams/ER_diagram.svg). O modelo representa uma aplicação de notícias com
categorias, preferências de usuários, notificações, favoritos e histórico de
leitura.

## Visão geral das relações

- Um usuário pode receber várias notificações.
- Uma notícia pode gerar várias notificações.
- Um usuário pode salvar várias notícias como favoritas.
- Uma notícia pode ser salva por vários usuários.
- Um usuário pode marcar várias notícias como lidas.
- Uma notícia pode ser lida por vários usuários.
- Um usuário possui um único registro de preferências.
- Usuários podem seguir várias categorias, e cada categoria pode ser seguida
  por vários usuários.
- Uma categoria pode classificar várias notícias.

## Tabela `CATEGORY`

Armazena as categorias usadas para organizar e filtrar as notícias.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `id` | `uuid` | `PK` | Identificador único da categoria. |
| `label` | `varchar(80)` | — | Nome ou rótulo exibido para a categoria. |
| `icon` | `varchar(16)` | — | Identificador do ícone usado na interface da categoria. |

## Tabela `NEWS`

Armazena as notícias exibidas pela aplicação.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `id` | `uuid` | `PK` | Identificador único da notícia. |
| `category_id` | `uuid` | `FK` | Referência à categoria da notícia. |
| `badgeBg` | `varchar(20)` | — | Cor ou classe visual do selo exibido na notícia. |
| `title` | `varchar(255)` | — | Título da notícia. |
| `summary` | `text` | — | Resumo curto usado em listagens e prévias. |
| `content` | `text` | — | Conteúdo completo da notícia. |
| `image_url` | `varchar(2048)` | — | Endereço da imagem associada à notícia. |
| `publishedAt` | `datetime` | — | Data e hora de publicação da notícia. |
| `author` | `varchar(120)` | — | Nome do autor da notícia. |
| `source` | `varchar(120)` | — | Veículo, site ou fonte de origem da notícia. |
| `isHero` | `boolean` | — | Indica se a notícia deve ser exibida como destaque principal. |

## Tabela `USER`

Armazena os dados básicos dos usuários da aplicação.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `id` | `uuid` | `PK` | Identificador único do usuário. |
| `name` | `varchar(120)` | — | Nome do usuário. |
| `email` | `varchar(254)` | `UK` | E-mail do usuário. A restrição `UK` impede duplicidades. |
| `avatar_url` | `varchar(2048)` | — | Endereço da imagem de avatar do usuário. |

## Tabela `USER_PREFERENCE`

Armazena as preferências de cada usuário. A tabela usa `user_id` como chave
primária e estrangeira ao mesmo tempo, formando uma relação um-para-um com
`USER`. Por isso, não é necessário um campo `id` adicional.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `user_id` | `uuid` | `PK`, `FK` | Identifica o usuário dono das preferências e referencia `USER.id`. |
| `email_notifications` | `boolean` | — | Indica se o usuário deseja receber notificações por e-mail. |
| `breaking_news` | `boolean` | — | Indica se o usuário deseja receber alertas de notícias urgentes. |
| `compact_view` | `boolean` | — | Indica se a interface deve usar uma visualização mais compacta. |
| `show_read_articles` | `boolean` | — | Indica se notícias já lidas devem continuar sendo exibidas. |
| `theme` | `varchar(10)` | — | Tema visual escolhido pelo usuário, como `light` ou `dark`. |
| `updated_at` | `datetime` | — | Data e hora da última atualização das preferências. |

## Tabela `USER_CATEGORY`

Relaciona usuários e categorias seguidas. É uma tabela de associação para
representar uma relação muitos-para-muitos entre `USER` e `CATEGORY`.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `user_id` | `uuid` | `PK`, `FK` | Identifica o usuário que segue a categoria e referencia `USER.id`. |
| `category_id` | `uuid` | `PK`, `FK` | Identifica a categoria seguida e referencia `CATEGORY.id`. |
| `created_at` | `datetime` | — | Data e hora em que o usuário começou a seguir a categoria. |

Os campos `user_id` e `category_id` formam uma chave primária composta. Assim,
o mesmo usuário não pode seguir a mesma categoria mais de uma vez.

## Tabela `NOTIFICATION`

Armazena notificações relacionadas a usuários e notícias.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `id` | `uuid` | `PK` | Identificador único da notificação. |
| `user_id` | `uuid` | `FK` | Usuário que deve receber a notificação. |
| `news_id` | `uuid` | `FK` | Notícia relacionada à notificação. |
| `created_at` | `datetime` | — | Data e hora em que a notificação foi criada. |
| `read_at` | `datetime` | — | Data e hora em que a notificação foi lida. Pode permanecer vazio enquanto não for lida. |

## Tabela `BOOKMARK`

Registra as notícias salvas pelos usuários.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `user_id` | `uuid` | `PK`, `FK` | Usuário que salvou a notícia. |
| `news_id` | `uuid` | `PK`, `FK` | Notícia salva pelo usuário. |
| `created_at` | `datetime` | — | Data e hora em que a notícia foi salva. |

Os campos `user_id` e `news_id` formam uma chave primária composta, impedindo
que o mesmo usuário salve a mesma notícia mais de uma vez.

## Tabela `READ_ARTICLE`

Registra quais notícias foram lidas por cada usuário.

| Campo | Tipo | Chaves | Finalidade |
|---|---|---|---|
| `user_id` | `uuid` | `PK`, `FK` | Usuário que leu a notícia. |
| `news_id` | `uuid` | `PK`, `FK` | Notícia que foi lida. |
| `read_at` | `datetime` | — | Data e hora em que a notícia foi marcada como lida. |

Os campos `user_id` e `news_id` formam uma chave primária composta, evitando
registros duplicados para a mesma combinação de usuário e notícia.

## Legenda das chaves

- **PK (`Primary Key`)**: chave primária. Identifica um registro de forma única.
- **FK (`Foreign Key`)**: chave estrangeira. Liga o registro a outra tabela.
- **UK (`Unique Key`)**: chave com valor único. Impede que o mesmo valor seja
  repetido na coluna.

