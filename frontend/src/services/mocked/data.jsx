import avatar01 from './images/avatar/avatar01.jpg'
import avatar02 from './images/avatar/avatar02.jpg'

function getCategories() {
    return [
        { id: 101, name: 'Futebol', description: 'Notícias de futebol', icon: '⚽' },
        { id: 102, name: 'Esportes', description: 'Notícias de esportes', icon: '🏅' },
        { id: 103, name: 'Tecnologia', description: 'Notícias de tecnologia', icon: '💻' },
        { id: 104, name: 'Games', description: 'Notícias de games', icon: '🎮' },
        { id: 105, name: 'Comida', description: 'Notícias de comida', icon: '🍔' },
        { id: 106, name: 'Entretenimento', description: 'Notícias de entretenimento', icon: '🎬' },
        { id: 107, name: 'Música', description: 'Notícias de música', icon: '🎵' },
        { id: 108, name: 'Política', description: 'Notícias de política', icon: '🏛️' },
        { id: 109, name: 'Economia', description: 'Notícias de economia', icon: '📊' },
        { id: 110, name: 'Brasil', description: 'Notícias do Brasil', icon: '🇧🇷' },
        { id: 111, name: 'Mundo', description: 'Notícias do mundo', icon: '🌍' }
    ]
}

function getUsers() {
    return [
        {
            "id": 1,
            "name": "José Silva",
            "email": "jose.silva@example.com",
            "passwordHash": "$2b$10$e8T7g0J5X7.eN5H/g6y0u.R7hY9vX8z1b2c3d4e5f6g7h8i9j0k1l",
            "avatarUrl": avatar01,
            "createdAt": "2026-02-10T14:20:00Z",
            "preferences": {
                "emailNotifications": true,
                "darkMode": true,
                "favoriteCategoriesIds": [103, 108, 110]
            }
        },
        {
            "id": 2,
            "name": "Beatriz Santos",
            "email": "beatriz.santos@example.com",
            "passwordHash": "$2b$10$x9Y8z7a6b5c4d3e2f1g0h.K9m8N7p6Q5r4S3t2U1v0W9x8Y7z6A5B",
            "avatarUrl": avatar02,
            "createdAt": "2026-05-18T09:15:00Z",
            "preferences": {
                "emailNotifications": false,
                "darkMode": false,
                "favoriteCategoriesIds": [103, 109, 111]
            }
        }
    ]
}

function getNews() {
    return [
        {
            "id": 1,
            "title": "Final do Campeonato Continental Definida",
            "slug": "final-do-campeonato-continental-definida",
            "shortSummary": "Equipes rivais se enfrentam na grande final após semifinais eletrizantes.",
            "fullContent": "Após partidas intensas nas semifinais, a grande final do campeonato continental foi definida. Ambas as equipes chegam em excelente fase, prometendo um duelo tático de alto nível e grande público no estádio municipal.",
            "imageUrl": "https://picsum.photos/seed/final-do-campeonato-c/800/450",
            "imageAlt": "Torcida com bandeiras comemorando no estádio",
            "categoryId": 101,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 2,
            "title": "Novo Talento da Base Assina Contrato Profissional",
            "slug": "novo-talento-da-base-assina-contrato-profissional",
            "shortSummary": "Jovem promessa de 17 anos firma vínculo de quatro anos com a equipe principal.",
            "fullContent": "A diretoria do clube anunciou a assinatura do primeiro contrato profissional de sua maior promessa das categorias de base. O atacante de 17 anos destacou-se nos torneios juvenis e já integra os treinos do time principal.",
            "imageUrl": "https://picsum.photos/seed/novo-talento-da-base-/800/450",
            "imageAlt": "Jovem jogador assinando contrato com camisa do time",
            "categoryId": 101,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 3,
            "title": "Uso do VAR Passa por Novas Atualizações de Regra",
            "slug": "uso-do-var-passa-por-novas-atualizacoes-de-regra",
            "shortSummary": "Comissão de arbitragem implementa respostas mais ágeis em impedimentos.",
            "fullContent": "A comissão internacional de arbitragem anunciou novas diretrizes para a utilização do árbitro de vídeo. O objetivo é reduzir o tempo de paralisação nas partidas e dar maior transparência às decisões tomadas em campo.",
            "imageUrl": "https://picsum.photos/seed/uso-do-var-passa-por-/800/450",
            "imageAlt": "Árbitro consultando o monitor do VAR na beira do gramado",
            "categoryId": 101,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 4,
            "title": "Atleta Quebra Recorde Mundial nos 100m Rasos",
            "slug": "atleta-quebra-recorde-mundial-nos-100m-rasos",
            "shortSummary": "Marca histórica foi alcançada durante o meeting internacional de atletismo.",
            "fullContent": "Em uma corrida espetacular, o velocista superou a marca anterior em dois centésimos de segundo. A conquista foi celebrada por entusiastas do esporte no mundo inteiro, consolidando seu nome na história do atletismo.",
            "imageUrl": "https://picsum.photos/seed/atleta-quebra-record/800/450",
            "imageAlt": "Atleta comemorando com a bandeira nacional após cruzar a linha de chegada",
            "categoryId": 102,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 5,
            "title": "Seleção de Basquete Garante Vaga no Mundial",
            "slug": "selecao-de-basquete-garante-vaga-no-mundial",
            "shortSummary": "Vitória decisiva nos últimos segundos assegurou a classificação antecipada.",
            "fullContent": "Com uma cesta nos últimos três segundos de jogo, a seleção nacional garantiu sua participação no próximo Campeonato Mundial. A partida foi marcada pelo equilíbrio e por um desempenho impecável da defesa nos quartos finais.",
            "imageUrl": "https://picsum.photos/seed/selecao-de-basquete-/800/450",
            "imageAlt": "Jogadores de basquete comemorando vitória na quadra",
            "categoryId": 102,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 6,
            "title": "Crescimento dos Esportes Aquáticos Atrai Novos Praticantes",
            "slug": "crescimento-dos-esportes-aquaticos-atrai-novos-praticantes",
            "shortSummary": "Natação e polo aquático registram aumento recorde de matrículas em academias.",
            "fullContent": "Estudos recentes apontam um crescimento de 35% na busca por modalidades aquáticas nos últimos doze meses. Especialistas atribuem a alta à busca por atividades de baixo impacto e ao sucesso dos atletas nacionais em competições externas.",
            "imageUrl": "https://picsum.photos/seed/crescimento-dos-espo/800/450",
            "imageAlt": "Piscina olímpica com nadadores alinhados nos blocos de partida",
            "categoryId": 102,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 7,
            "title": "Avanços da IA na Medicina Diagnóstica",
            "slug": "avancos-da-ia-na-medicina-diagnostica",
            "shortSummary": "Novos modelos de inteligência artificial ajudam a identificar diagnósticos precoces com mais de 95% de precisão...",
            "fullContent": "Novos modelos de inteligência artificial ajudam a identificar diagnósticos precoces com mais de 95% de precisão. Em testes clínicos recentes, a ferramenta analisou milhares de exames de imagem em segundos, reduzindo drasticamente o tempo de espera por laudos e auxiliando equipes médicas na tomada de decisões em casos complexos.",
            "imageUrl": "https://picsum.photos/seed/avancos-da-ia-na-med/800/450",
            "imageAlt": "Médico analisando dados de diagnóstico em um tablet",
            "categoryId": 103,
            "publishedAt": "2026-09-15T14:30:00Z",
            "isPublished": true
        },
        {
            "id": 8,
            "title": "Nova Geração de Processadores Promete 40% Mais Eficiência",
            "slug": "nova-geracao-de-processadores-promete-40-mais-eficiencia",
            "shortSummary": "Arquitetura de 2 nanômetros melhora desempenho e reduz consumo energético.",
            "fullContent": "A nova linha de chips anunciada nesta semana traz avanços significativos no processamento de dados e na gestão de energia. A tecnologia é voltada tanto para servidores de alta performance quanto para dispositivos móveis ultrafinos.",
            "imageUrl": "https://picsum.photos/seed/nova-geracao-de-proc/800/450",
            "imageAlt": "Placa de circuito integrado e microprocessador iluminado",
            "categoryId": 103,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 9,
            "title": "Avanços em Computação Quântica Superam Expectativas",
            "slug": "avancos-em-computacao-quantica-superam-expectativas",
            "shortSummary": "Pesquisadores conseguem manter estabilidade de qubits por tempo recorde.",
            "fullContent": "Um grupo internacional de cientistas alcançou um novo marco na computação quântica ao manter a coerência de qubits por mais de dez minutos. A descoberta abre caminho para simulações moleculares e criptografia ultra-segura no futuro.",
            "imageUrl": "https://picsum.photos/seed/avancos-em-computac/800/450",
            "imageAlt": "Laboratório de alta tecnologia com processador quântico",
            "categoryId": 103,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 10,
            "title": "Novo RPG de Ficção Científica Revela Trailer Comercial",
            "slug": "novo-rpg-de-ficcao-cientifica-revela-trailer-comercial",
            "shortSummary": "Gráficos em fotorrealismo e vasto mapa explorável impressionam comunidade.",
            "fullContent": "O aguardado título de ficção científica ganhou seu primeiro vídeo estendido de gameplay. Desenvolvido em motor gráfico de última geração, o jogo promete liberdade total de exploração planetária e narrativas ramificadas.",
            "imageUrl": "https://picsum.photos/seed/novo-rpg-de-ficcao-/800/450",
            "imageAlt": "Pessoa jogando videogame com controle iluminado por LEDs",
            "categoryId": 104,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 11,
            "title": "Mundial de E-sports Quebra Recordes de Audiência",
            "slug": "mundial-de-e-sports-quebra-recordes-de-audiencia",
            "shortSummary": "Transmissão online ultrapassa marca de 5 milhões de espectadores simultâneos.",
            "fullContent": "A grande final do campeonato mundial de jogos eletrônicos bateu recordes absolutos de transmissão ao vivo. A arena lotada na Ásia recebeu equipes de seis continentes em uma disputa emocionante disputada em cinco rodadas.",
            "imageUrl": "https://picsum.photos/seed/mundial-de-e-sports/800/450",
            "imageAlt": "Arena de e-sports lotada com telas gigantes e luzes coloridas",
            "categoryId": 104,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 12,
            "title": "Consoles Portáteis Ganham Espaço no Mercado Global",
            "slug": "consoles-portateis-ganham-espaco-no-mercado-global",
            "shortSummary": "Aumento na oferta de hardware dedicado impulsiona vendas no segmento.",
            "fullContent": "O segmento de dispositivos portáteis para jogos registrou um crescimento vertiginoso nos últimos dois anos. Fabricantes continuam investindo em modelos capazes de rodar títulos de grande porte nativamente e via nuvem.",
            "imageUrl": "https://picsum.photos/seed/consoles-portateis-g/800/450",
            "imageAlt": "Mãos segurando um console portátil exibindo um jogo colorido",
            "categoryId": 104,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 13,
            "title": "Consumo de Alimentos Orgânicos Cresce no País",
            "slug": "consumo-de-alimentos-organicos-cresce-no-pais",
            "shortSummary": "Aumento da busca por alimentação saudável impulsiona mercado de feiras e produtores locais.",
            "fullContent": "Relatórios do setor alimentício apontam uma alta de 18% na venda de produtos orgânicos no último ano. A maior conscientização sobre saúde e a ampliação das redes de distribuição direta do campo para a mesa foram os principais fatores determinantes.",
            "imageUrl": "https://picsum.photos/seed/consumo-de-alimentos/800/450",
            "imageAlt": "Feira ao ar livre com cestas cheias de frutas e vegetais orgânicos fresquinhos",
            "categoryId": 105,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 14,
            "title": "Festival Gastronômico Celebra Culinária Regional",
            "slug": "festival-gastronomico-celebra-culinaria-regional",
            "shortSummary": "Evento reúne chefs renomados e pratos típicos da gastronomia local em praça pública.",
            "fullContent": "O festival gastronômico anual abriu suas portas neste final de semana com mais de 40 estandes de alta culinária. Os visitantes puderam saborear releituras de pratos tradicionais, assistir a aulas-show com chefs premiados e degustar produtos artesanais.",
            "imageUrl": "https://picsum.photos/seed/festival-gastronomic/800/450",
            "imageAlt": "Prato gourmet decorado servido em mesa de restaurante",
            "categoryId": 105,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 15,
            "title": "Pesquisa Desenvolve Embalagens Comestíveis para Alimentos",
            "slug": "pesquisa-desenvolve-embalagens-comestiveis-para-alimentos",
            "shortSummary": "Inovação feita a partir de biopolímeros promete reduzir o uso de plástico no setor alimentar.",
            "fullContent": "Cientistas apresentaram uma película protetora totalmente biodegradável e comestível para envolver frutas e produtos frescos. A solução estende a vida útil dos alimentos nas prateleiras e reduz drasticamente o descarte de plásticos descartáveis.",
            "imageUrl": "https://picsum.photos/seed/pesquisa-desenvolve-/800/450",
            "imageAlt": "Mãos de pesquisador segurando maçã com película protetora biodegradável",
            "categoryId": 105,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 16,
            "title": "Festival Internacional de Cinema Anuncia Vencedores",
            "slug": "festival-internacional-de-cinema-anuncia-vencedores",
            "shortSummary": "Produção independente surpreende ao levar o prêmio principal da noite.",
            "fullContent": "A cerimônia de encerramento do festival consagrou obras focadas em temas sociais e inovação visual. O longa-metragem vencedor, produzido com baixo orçamento, foi aclamado pela crítica por sua direção impecável e atuações marcantes.",
            "imageUrl": "https://picsum.photos/seed/festival-internacio/800/450",
            "imageAlt": "Tapete vermelho de festival de cinema com holofotes e câmeras",
            "categoryId": 106,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 17,
            "title": "Série de Ficção É Renovada para Terceira Temporada",
            "slug": "serie-de-ficcao-e-renovada-para-terceira-temporada",
            "shortSummary": "Sucesso de público garante continuidade da história no catálogo de streaming.",
            "fullContent": "Após alcançar o topo das produções mais assistidas na semana de estreia, a aclamada série de mistério teve sua renovação confirmada pela produtora. As gravações do novo ciclo devem começar no início do próximo semestre.",
            "imageUrl": "https://picsum.photos/seed/serie-de-ficcao-e-r/800/450",
            "imageAlt": "Claquete de cinema em um set de filmagem com luzes ao fundo",
            "categoryId": 106,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 18,
            "title": "Exposição Imersiva sobre Arte Moderna Chega à Cidade",
            "slug": "exposicao-imersiva-sobre-arte-moderna-chega-a-cidade",
            "shortSummary": "Projeções em 360 graus e realidade aumentada encantam visitantes de todas as idades.",
            "fullContent": "Uma nova experiência cultural promete transportar os visitantes para dentro das obras dos maiores mestres da pintura moderna. A atração conta com salas interativas e trilha sonora original composta especialmente para a exposição.",
            "imageUrl": "https://picsum.photos/seed/exposicao-imersiva-/800/450",
            "imageAlt": "Visitante observando projeções artísticas coloridas em uma sala escura",
            "categoryId": 106,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 19,
            "title": "Anunciada Turnê de Reunião de Banda Lendária dos Anos 90",
            "slug": "anunciada-turne-de-reuniao-de-banda-lendaria-dos-anos-90",
            "shortSummary": "Grupo confirma apresentações em dez países após pausa de mais de uma década.",
            "fullContent": "Os fãs de rock tiveram uma grande surpresa com o anúncio oficial da turnê de reencontro da banda. Os ingressos para os primeiros shows em arenas começam a ser vendidos já na próxima semana com expectativa de esgotar em poucas horas.",
            "imageUrl": "https://picsum.photos/seed/anunciada-turne-de-/800/450",
            "imageAlt": "Palco de show de rock com fumaça, luzes e plateia com mãos para cima",
            "categoryId": 107,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 20,
            "title": "Lançamentos em Vinil Registram Maior Volume de Vendas das Últimas Décadas",
            "slug": "lancamentos-em-vinil-registram-maior-volume-de-vendas-das-ultimas-decadas",
            "shortSummary": "Formatos analógicos ganham mercado impulsionados por colecionadores e jovens.",
            "fullContent": "O mercado de discos de vinil continua em ascensão, superando marcas históricas de vendas. Artistas contemporâneos têm apostado em edições especiais e coloridas para atrair tanto velhos entusiastas quanto novas gerações de ouvintes.",
            "imageUrl": "https://picsum.photos/seed/lancamentos-em-vini/800/450",
            "imageAlt": "Disco de vinil girando em um toca-discos vintage",
            "categoryId": 107,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 21,
            "title": "Plataformas de Streaming Testam Áudio em Altíssima Definição",
            "slug": "plataformas-de-streaming-testam-audio-em-altissima-definicao",
            "shortSummary": "Novos formatos sem compressão prometem fidelidade de estúdio para ouvintes exigentes.",
            "fullContent": "Empresas de transmissão de áudio anunciaram a expansão de seus catálogos com qualidade lossless e áudio espacial. A novidade visa atender audiófilos que buscam captar cada detalhe das produções musicais mais recentes.",
            "imageUrl": "https://picsum.photos/seed/plataformas-de-stre/800/450",
            "imageAlt": "Pessoa usando fones de ouvido profissionais ouvindo música",
            "categoryId": 107,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 22,
            "title": "Congresso Aprova Nova Lei de Incentivo à Inovação",
            "slug": "congresso-aprova-nova-lei-de-incentivo-a-inovacao",
            "shortSummary": "Medida simplifica investimentos em startups e pesquisas científicas universitárias.",
            "fullContent": "O plenário aprovou o projeto de lei que moderniza a legislação de incentivo à tecnologia e inovação no país. O texto segue para sanção executiva e prevê isenções fiscais para empresas que investirem em P&D nacional.",
            "imageUrl": "https://picsum.photos/seed/congresso-aprova-no/800/450",
            "imageAlt": "Fachada do prédio do Congresso Nacional iluminada ao entardecer",
            "categoryId": 108,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 23,
            "title": "Cúpula Internacional Debatida Ações Contra Mudanças Climáticas",
            "slug": "cupula-internacional-debatida-acoes-contra-mudancas-climaticas",
            "shortSummary": "Líderes globais buscam acordo para redução de emissões de carbono até 2030.",
            "fullContent": "Representantes de dezenas de nações estão reunidos para discutir metas ambientais mais severas. A pauta principal inclui o financiamento de energias renováveis em países em desenvolvimento e a preservação de florestas tropicais.",
            "imageUrl": "https://picsum.photos/seed/cupula-internaciona/800/450",
            "imageAlt": "Mesa de conferência internacional com bandeiras de diversos países",
            "categoryId": 108,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 24,
            "title": "Reforma Administrativa Avança nas Comissões Temáticas",
            "slug": "reforma-administrativa-avanca-nas-comissoes-tematicas",
            "shortSummary": "Proposta busca digitalizar serviços públicos e reestruturar carreiras do funcionalismo.",
            "fullContent": "Debates no comitê especial avançaram no consenso sobre diretrizes de eficiência e transparência no setor público. O relatório final deve ser submetido à votação no plenário nas próximas semanas.",
            "imageUrl": "https://picsum.photos/seed/reforma-administrat/800/450",
            "imageAlt": "Plenário durante sessão de votação e debates legislativos",
            "categoryId": 108,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 25,
            "title": "Banco Central Reduz Taxa de Juros para Estimular Mercado",
            "slug": "banco-central-reduz-taxa-de-juros-para-estimular-mercado",
            "shortSummary": "Decisão do comitê de política monetária atende às expectativas de analistas.",
            "fullContent": "Em reunião ordinária, o comitê reduziu a taxa básica de juros em meio à desaceleração da inflação e estabilidade cambial. A medida visa baratear o crédito para empresas e famílias, impulsionando a atividade econômica nos próximos trimestres.",
            "imageUrl": "https://picsum.photos/seed/banco-central-reduz/800/450",
            "imageAlt": "Gráfico financeiro com setas indicando subida e moedas sobre a mesa",
            "categoryId": 109,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 26,
            "title": "Setor de Serviços Registra Alta no Último Trimestre",
            "slug": "setor-de-servicos-registra-alta-no-ultimo-trimestre",
            "shortSummary": "Crescimento impulsionado por turismo, gastronomia e tecnologia da informação.",
            "fullContent": "O indicador do setor de serviços mostrou uma expansão de 2,8% em relação ao trimestre anterior. O bom desempenho ajudou a manter baixas as taxas de desemprego e elevou a confiança dos empresários para o fim do ano.",
            "imageUrl": "https://picsum.photos/seed/setor-de-servicos-r/800/450",
            "imageAlt": "Fachada de edifícios comerciais em centro financeiro urbano",
            "categoryId": 109,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 27,
            "title": "Exportações do Agronegócio Bate Recorde Histórico",
            "slug": "exportacoes-do-agronegocio-bate-recorde-historico",
            "shortSummary": "Demanda externa por grãos e proteína animal eleva superávit da balança comercial.",
            "fullContent": "Dados do Ministério do Comércio Exterior apontam que o agronegócio atingiu seu maior volume de exportações na série histórica. O aumento nas vendas para o mercado asiático foi o principal motor desse crescimento expressivo.",
            "imageUrl": "https://picsum.photos/seed/exportacoes-do-agro/800/450",
            "imageAlt": "Colheitadeira em campo de cultivo durante o pôr do sol",
            "categoryId": 109,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 28,
            "title": "Programa de Reflorestamento Recupera Milhares de Hectares",
            "slug": "programa-de-reflorestamento-recupera-milhares-de-hectares",
            "shortSummary": "Iniciativa comunitária e governamental replanta espécies nativas na Mata Atlântica.",
            "fullContent": "Projetos de restauração ambiental alcançaram a marca de 50 mil hectares de floresta nativa replantados nos últimos três anos. A ação conta com trabalho conjunto de ONGs, governos locais e comunidades tradicionais.",
            "imageUrl": "https://picsum.photos/seed/programa-de-reflore/800/450",
            "imageAlt": "Muda de árvore sendo plantada em área de restauração ambiental",
            "categoryId": 110,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 29,
            "title": "Inauguração de Linha de Trem Urbano Reduz Tempo de Deslocamento",
            "slug": "inauguracao-de-linha-de-trem-urbano-reduz-tempo-de-deslocamento",
            "shortSummary": "Novo trecho beneficia mais de 200 mil passageiros diariamente na região metropolitana.",
            "fullContent": "O novo sistema de transporte sobre trilhos começou a operar em fase de testes nesta semana. A obra promete reduzir em até 40 minutos o tempo gasto pelos trabalhadores nos trajetos entre a periferia e o centro da metrópole.",
            "imageUrl": "https://picsum.photos/seed/inauguracao-de-linh/800/450",
            "imageAlt": "Trem moderno de passageiros chegando à estação recém-inaugurada",
            "categoryId": 110,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 30,
            "title": "Turismo Interno Cresce com Valorização de Roteiros Nacionais",
            "slug": "turismo-interno-cresce-com-valorizacao-de-roteiros-nacionais",
            "shortSummary": "Destinos no Nordeste e no Centro-Oeste lideram a preferência dos viajantes.",
            "fullContent": "Pesquisas do setor hoteleiro revelam um aumento substancial na busca por viagens dentro do território nacional. Praias paradisíacas e o ecoturismo na Chapada figuram no topo da lista dos destinos mais procurados para as férias.",
            "imageUrl": "https://picsum.photos/seed/turismo-interno-cre/800/450",
            "imageAlt": "Praia paradisíaca do litoral brasileiro com coqueiros e mar cristalino",
            "categoryId": 110,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 31,
            "title": "Missão Espacial Envia Primeiras Imagens de Lua de Júpiter",
            "slug": "missao-espacial-envia-primeiras-imagens-de-lua-de-jupiter",
            "shortSummary": "Sonda científica captura detalhes inéditos da superfície congelada de Europa.",
            "fullContent": "A agência espacial internacional divulguou hoje fotografias de altíssima resolução capturadas pela sonda em órbita do sistema joviano. Os dados preliminares confirmam a presença de plumas de água expelidas da crosta de gelo.",
            "imageUrl": "https://picsum.photos/seed/missao-espacial-env/800/450",
            "imageAlt": "Renderização artística de sonda espacial orbitando um planeta gigante",
            "categoryId": 111,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 32,
            "title": "Acordo Histórico Comercial Unifica Regras de Exportação na Europa",
            "slug": "acordo-historico-comercial-unifica-regras-de-exportacao-na-europa",
            "shortSummary": "Pacto entre blocos visa desburocratizar trocas de mercadorias e tecnologias.",
            "fullContent": "Após longas rodadas de negociação, representantes diplomáticos assinaram o tratado que padroniza tarifas e exigências sanitárias para bens manufaturados. A expectativa é movimentar centenas de bilhões de euros no mercado global.",
            "imageUrl": "https://picsum.photos/seed/acordo-historico-co/800/450",
            "imageAlt": "Aperto de mãos entre diplomatas em frente a bandeiras internacionais",
            "categoryId": 111,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        },
        {
            "id": 33,
            "title": "Avanço em Usinas de Energia Solar Flutuante Ganha Espaço Global",
            "slug": "avanco-em-usinas-de-energia-solar-flutuante-ganha-espaco-global",
            "shortSummary": "Projetos instalados em reservatórios aumentam eficiência e preservam recursos hídricos.",
            "fullContent": "Diversos países têm adotado parques solares montados sobre lâminas d'água em represas e lagos artificiais. Além de gerar energia limpa, a estrutura reduz a evaporação da água e se beneficia do resfriamento natural dos painéis.",
            "imageUrl": "https://picsum.photos/seed/avanco-em-usinas-de/800/450",
            "imageAlt": "Painéis solares flutuantes instalados na superfície de um grande lago",
            "categoryId": 111,
            "publishedAt": "2026-09-16T12:00:00Z",
            "isPublished": true
        }
    ]
}

export { getUsers, getCategories, getNews }