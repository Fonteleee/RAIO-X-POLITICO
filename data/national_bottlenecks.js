/**
 * Raio-X Político 2026 - Observatório dos 30 Maiores Gargalos Nacionais do Brasil
 * Mapeamento analítico e suprapartidário dos nós estruturais que afetam múltiplos estados e municípios.
 */

const NATIONAL_AXES = {
  saude: {
    id: 'saude',
    name: 'Saúde Pública & SUS',
    icon: 'heart-pulse',
    color: 'rose',
    description: 'Atendimento de média e alta complexidade, suprimento de insumos e cobertura nos vazios sanitários.'
  },
  saneamento: {
    id: 'saneamento',
    name: 'Saneamento, Recursos Hídricos & Meio Ambiente',
    icon: 'droplets',
    color: 'emerald',
    description: 'Universalização do esgoto, segurança hídrica no semiárido, desmatamento e resíduos sólidos.'
  },
  educacao: {
    id: 'educacao',
    name: 'Educação Básica, Técnica & Juventude',
    icon: 'graduation-cap',
    color: 'purple',
    description: 'Evasão no ensino médio, analfabetismo funcional infantil, infraestrutura escolar e formação tecnológica.'
  },
  seguranca: {
    id: 'seguranca',
    name: 'Segurança Pública, Fronteiras & Sistema Penal',
    icon: 'shield-alert',
    color: 'amber',
    description: 'Combate a facções criminosas, fiscalização de fronteiras, taxa de elucidação de crimes e superlotação.'
  },
  economia: {
    id: 'economia',
    name: 'Economia, Tributação, Logística & Custo Brasil',
    icon: 'trending-up',
    color: 'sky',
    description: 'Complexidade tributária, gargalo ferroviário/logístico, custo de energia e endividamento familiar.'
  },
  governanca: {
    id: 'governanca',
    name: 'Governança Pública, Pacto Federativo & Previdência',
    icon: 'scale',
    color: 'indigo',
    description: 'Dívida dos estados com a União, fila de benefícios do INSS, privilégios salariais e judicialização.'
  }
};

const NATIONAL_BOTTLENECKS = [
  // EIXO 1: SAÚDE PÚBLICA & SUS (1 a 5)
  {
    id: 1,
    axisId: 'saude',
    title: 'Filas de Média e Alta Complexidade no SUS',
    diagnosis: 'Mais de 1 milhão de cidadãos aguardam até anos para consultas com médicos especialistas, exames de ressonância/tomografia e cirurgias eletivas ortopédicas e cardiovasculares.',
    impact: 'Agravamento de quadros clínicos reversíveis, incapacitação produtiva precoce e sobrecarga crônica dos prontos-socorros municipais.',
    competence: 'Tripartite (União, Estados e Municípios)',
    affectedRegions: 'Nacional (Crítico nas Regiões Norte, Nordeste e periferias das grandes metrópoles)',
    suggestedSolution: 'Consórcios interfederativos de saúde, regulação unificada por inteligência de dados, telemedicina de alta resolução e mutirões de contratação complementar via tabela SUS ajustada.',
    urgency: 'Crítica',
    systemicWeight: 100
  },
  {
    id: 2,
    axisId: 'saude',
    title: 'Desabastecimento Oncológico e Medicamentos de Alto Custo',
    diagnosis: 'Falhas logísticas e entraves burocráticos no Ministério da Saúde e secretarias estaduais causam interrupção no fornecimento contínuo de quimioterápicos, imunobiológicos e remédios para doenças raras.',
    impact: 'Perda da janela terapêutica de cura para pacientes oncológicos e judicialização bilionária e desordenada da saúde.',
    competence: 'Federal e Estadual (Art. 198 da CF/88)',
    affectedRegions: 'Nacional (Todos os 26 Estados e Distrito Federal)',
    suggestedSolution: 'Centralização de compras estratégicas com entrega fracionada rastreada por blockchain, estoque regulador nacional de segurança e simplificação da Conitec.',
    urgency: 'Crítica',
    systemicWeight: 95
  },
  {
    id: 3,
    axisId: 'saude',
    title: 'Vazios Sanitários e Concentração de Especialistas',
    diagnosis: 'Cerca de 60% dos médicos especialistas estão concentrados nas capitais do Sul e Sudeste, deixando municípios do interior e regiões ribeirinhas desprovidos de pediatras, ginecologistas e cardiologistas.',
    impact: 'Cidadãos obrigados a viajar centenas de quilômetros em ambulâncias no modelo de TFD (Tratamento Fora de Domicílio) para consultas básicas.',
    competence: 'Federal e Municipal (Art. 30 e 198 da CF/88)',
    affectedRegions: 'Norte, Nordeste e Centro-Oeste interiorano',
    suggestedSolution: 'Plano de Carreira de Estado para médicos do SUS em regiões remotas com abatimento de FIES, infraestrutura diagnóstica local e expansão da residência médica no interior.',
    urgency: 'Alta',
    systemicWeight: 90
  },
  {
    id: 4,
    axisId: 'saude',
    title: 'Crise de Saúde Mental e Déficit de Leitos / CAPS',
    diagnosis: 'Explosão de casos de depressão, ansiedade e ideação suicida pós-pandemia sem rede física compatível de Centros de Atenção Psicossocial (CAPS) e leitos de retaguarda.',
    impact: 'Aumento de afastamentos previdenciários, superlotação de emergências psiquiátricas e desamparo de famílias de dependentes químicos.',
    competence: 'Municipal e Estadual (Pactuação SUS)',
    affectedRegions: 'Nacional (Forte incidência em capitais e polos industriais)',
    suggestedSolution: 'Ampliação da rede de CAPS III e IV com funcionamento 24h, integração da saúde mental nas escolas públicas e custeio federal per capita ampliado.',
    urgency: 'Alta',
    systemicWeight: 85
  },
  {
    id: 5,
    axisId: 'saude',
    title: 'Insolvência das Santas Casas e Hospitais Filantrópicos',
    diagnosis: 'Defasagem histórica de mais de 15 anos da Tabela de Procedimentos do SUS, gerando endividamento bilionário de entidades filantrópicas que respondem por mais de 50% dos atendimentos hospitalares.',
    impact: 'Fechamento de maternidades, UTIs pediátricas e leitos de retaguarda em centenas de cidades do interior.',
    competence: 'Federal (Tabela de Financiamento do SUS)',
    affectedRegions: 'Nacional (Mais de 1.800 hospitais em todo o Brasil)',
    suggestedSolution: 'Instituição de indexador automático de inflação médica na Tabela SUS, remuneração por desfecho clínico e securitização das dívidas bancárias das Santas Casas com bancos públicos.',
    urgency: 'Alta',
    systemicWeight: 88
  },

  // EIXO 2: SANEAMENTO, RECURSOS HÍDRICOS & MEIO AMBIENTE (6 a 10)
  {
    id: 6,
    axisId: 'saneamento',
    title: 'Universalização do Esgoto e Despoluição de Bacias',
    diagnosis: 'Mais de 90 milhões de brasileiros não têm acesso à coleta e tratamento de esgoto, violando a dignidade humana e despejando resíduos in natura em rios e mananciais.',
    impact: 'Internações infantis em massa por doenças de veiculação hídrica e poluição crônica de represas de abastecimento urbano.',
    competence: 'Municipal e Regional (Lei Federal nº 14.026/2020)',
    affectedRegions: 'Norte (apenas 14% tratado), Nordeste e periferias urbanas de todas as regiões',
    suggestedSolution: 'Aceleração de leilões de concessão e PPPs regionais de saneamento, segurança jurídica contra retrocessos regulatórios e criação do Fundo Garantidor de Infraestrutura Sanitária.',
    urgency: 'Crítica',
    systemicWeight: 100
  },
  {
    id: 7,
    axisId: 'saneamento',
    title: 'Insegurança Hídrica no Semiárido e Zonas Rurais',
    diagnosis: 'Milhões de sertanejos e agricultores familiares ainda dependem da rota de carros-pipa por falta de canais secundários de distribuição da Transposição do São Francisco e adutoras locais.',
    impact: 'Paralisia da agricultura familiar, perda de rebanhos e dependência clientelista de água em anos eleitorais.',
    competence: 'Federal e Estadual (Codevasf / DNOCS / Governos Estaduais)',
    affectedRegions: 'Semiárido Nordestino (BA, PE, CE, PB, RN, PI, AL, SE e Norte de MG)',
    suggestedSolution: 'Conclusão prioritária dos ramais associados do Rio São Francisco (Ramal do Apodi, Ramal do Salgado), microadutoras pressurizadas e perfuração de poços artesianos com dessalinizadores solares.',
    urgency: 'Alta',
    systemicWeight: 92
  },
  {
    id: 8,
    axisId: 'saneamento',
    title: 'Lixões a Céu Aberto e Inércia na Reciclagem',
    diagnosis: 'Mais de 2.500 municípios ainda operam lixões a céu aberto, descumprindo a Política Nacional de Resíduos Sólidos e contaminando lençóis freáticos com chorume.',
    impact: 'Contaminação de mananciais, proliferação de vetores de doenças e exclusão socioeconômica de cooperativas de catadores.',
    competence: 'Municipal com apoio Federal/Estadual',
    affectedRegions: 'Nacional (Especialmente municípios com menos de 50 mil habitantes)',
    suggestedSolution: 'Consórcios intermunicipais para aterros sanitários regionais de biogás, desoneração da cadeia da reciclagem e cobrança tarifária justa para sustentabilidade do serviço.',
    urgency: 'Alta',
    systemicWeight: 84
  },
  {
    id: 9,
    axisId: 'saneamento',
    title: 'Desmatamento Ilegal e Queimadas nos Biomas',
    diagnosis: 'Avanço do corte raso ilegal de madeira e queimadas criminosas na Amazônia e Cerrado, degradando bacias hidrográficas e ameaçando o ciclo de chuvas que abastece o agronegócio e a matriz hidrelétrica.',
    impact: 'Perda de biodiversidade, sanções comerciais internacionais contra commodities brasileiras e crise hídrica nas hidrelétricas do Sudeste.',
    competence: 'Federal e Estadual (Ibama / ICMBio / Secretarias Estaduais de Meio Ambiente)',
    affectedRegions: 'Amazônia Legal e Cerrado (MT, PA, RO, AM, MA, TO, GO)',
    suggestedSolution: 'Rastreabilidade total da cadeia da carne e grãos por satélite, bloqueio de crédito rural para áreas embargadas, fortalecimento do policiamento florestal e pagamento por serviços ambientais.',
    urgency: 'Crítica',
    systemicWeight: 96
  },
  {
    id: 10,
    axisId: 'saneamento',
    title: 'Resiliência Urbana a Enchentes e Deslizamentos',
    diagnosis: 'Ocupação irregular de encostas íngremes e várzeas de rios sem drenagem e contenção geotécnica, gerando catástrofes humanitárias previsíveis a cada temporada de chuvas extremas.',
    impact: 'Centenas de mortes de cidadãos vulneráveis por ano, destruição de pontes e prejuízos econômicos bilionários para prefeituras.',
    competence: 'Municipal e Estadual com Defesa Civil Nacional',
    affectedRegions: 'Litoral de SP e RJ, Região Serrana Fluminense, Vale do Taquari (RS), Região Metropolitana de Recife e BH',
    suggestedSolution: 'Mapeamento geológico de risco georreferenciado, obras estruturais de micro e macrodrenagem, parques lineares inundáveis e plano habitacional compulsório para realocação segura.',
    urgency: 'Alta',
    systemicWeight: 90
  },

  // EIXO 3: EDUCAÇÃO BÁSICA, TÉCNICA & JUVENTUDE (11 a 15)
  {
    id: 11,
    axisId: 'educacao',
    title: 'Evasão Escolar no Ensino Médio e Geração Nem-Nem',
    diagnosis: 'Cerca de 500 mil jovens abandonam anualmente a escola entre o 1º e o 3º ano do Ensino Médio para trabalhar informalmente, somando mais de 10 milhões de jovens que nem trabalham nem estudam.',
    impact: 'Aprisionamento intergeracional da pobreza, queda da produtividade do trabalho nacional e aumento da vulnerabilidade ao recrutamento pelo crime organizado.',
    competence: 'Estadual (Art. 211, § 2º da CF/88)',
    affectedRegions: 'Nacional (Crítico no Nordeste e periferias urbanas)',
    suggestedSolution: 'Expansão e consolidação do programa de poupança/bolsa permanência do Ensino Médio, escola em tempo integral com itinerários profissionalizantes alinhados às vocações econômicas regionais.',
    urgency: 'Crítica',
    systemicWeight: 98
  },
  {
    id: 12,
    axisId: 'educacao',
    title: 'Analfabetismo Funcional Infantil e Déficit de Alfabetização',
    diagnosis: 'Mais de 50% dos alunos do 2º ano do Ensino Fundamental na rede pública não sabem ler ou escrever textos simples, comprometendo irremediavelmente todo o ciclo escolar subsequente.',
    impact: 'Estudantes que chegam ao 9º ano sem compreender enunciados matemáticos ou interpretar notícias, perpetuando o atraso cognitivo.',
    competence: 'Municipal com Regime de Colaboração Estadual (Inep / MEC)',
    affectedRegions: 'Nacional (Forte disparidade entre capitais do Sul e interiores do Norte/Nordeste)',
    suggestedSolution: 'Generalização nacional do modelo cearense de alfabetização na idade certa (ICMS Educacional premiando municípios por aprendizado), material didático estruturado e formação de professores.',
    urgency: 'Crítica',
    systemicWeight: 96
  },
  {
    id: 13,
    axisId: 'educacao',
    title: 'Sucateamento da Infraestrutura Escolar e Exclusão Digital',
    diagnosis: 'Milhares de escolas públicas rurais e periféricas sequer possuem saneamento, quadra esportiva coberta ou acesso à internet de alta velocidade para fins pedagógicos.',
    impact: 'Desestímulo pedagógico, exclusão digital dos estudantes de baixa renda frente às exigências da economia moderna e baixos índices de aprendizado.',
    competence: 'Municipal e Estadual (FNDE / MEC)',
    affectedRegions: 'Norte e Nordeste interiorano, áreas rurais e quilombolas/indígenas',
    suggestedSolution: 'Conectividade universal em banda larga via fibra e satélite de baixa órbita, laboratórios de informática ativos, padrão mínimo nacional de infraestrutura com bloqueio de repasses para prefeituras omissas.',
    urgency: 'Alta',
    systemicWeight: 88
  },
  {
    id: 14,
    axisId: 'educacao',
    title: 'Descompasso do Ensino Profissionalizante com o Mercado',
    diagnosis: 'Menos de 11% dos estudantes do Ensino Médio brasileiro têm acesso à formação técnica profissional (contra mais de 45% na OCDE), com currículos muitas vezes defasados em relação à economia digital.',
    impact: 'Falta de mão de obra qualificada para indústrias, agronegócio e tecnologia, convivendo com altas taxas de desemprego juvenil.',
    competence: 'Federal e Estadual (Institutos Federais / Senai / Senac / Redes Estaduais)',
    affectedRegions: 'Nacional',
    suggestedSolution: 'Duplicação das vagas nos Institutos Federais e escolas técnicas estaduais, currículos elaborados em parceria direta com setores produtivos locais (TI, bioeconomia, energias renováveis e agro).',
    urgency: 'Alta',
    systemicWeight: 86
  },
  {
    id: 15,
    axisId: 'educacao',
    title: 'Fuga de Cérebros e Baixo Investimento Produtivo em P&D',
    diagnosis: 'Brasil investe pouco mais de 1% do PIB em Pesquisa e Desenvolvimento (menos da metade dos países da OCDE), empurrando mestres e doutores qualificados para o exterior.',
    impact: 'Perda de patentes, submissão tecnológica internacional e incapacidade de criar pólos industriais de alta tecnologia de capital nacional.',
    competence: 'Federal (CNPq / Capes / Finep / MCTI)',
    affectedRegions: 'Nacional (Universidades públicas de todo o país)',
    suggestedSolution: 'Reajuste perene e não contingenciável de bolsas de pós-graduação, incentivo fiscal agressivo para empresas que investem em inovação acadêmica (Lei do Bem ampliada) e desburocratização de importação de insumos científicos.',
    urgency: 'Média',
    systemicWeight: 80
  },

  // EIXO 4: SEGURANÇA PÚBLICA, FRONTEIRAS & JUSTIÇA PENAL (16 a 20)
  {
    id: 16,
    axisId: 'seguranca',
    title: 'Domínio Territorial do Crime Organizado e Facções',
    diagnosis: 'Facções criminosas controlam territórios urbanos inteiros, impõem toque de recolher, cobram pedágio sobre serviços essenciais (gás, internet, transporte) e lavam dinheiro no sistema financeiro legal.',
    impact: 'Cidadãos reféns em suas comunidades, corrosão do Estado Democrático de Direito e penetração do crime na política institucional local.',
    competence: 'Federal e Estadual (Polícia Federal, PRF, Polícias Militares e Civis)',
    affectedRegions: 'Nacional (Crítico no RJ, SP, BA, CE, RN e rotas logísticas fluviais do Norte)',
    suggestedSolution: 'Integração real de inteligência no Susp (Sistema Único de Segurança Pública), força-tarefa permanente de asfixia financeira e confisco de bens (Coaf/PF) e isolamento dos líderes em presídios federais sem contato com faccionados.',
    urgency: 'Crítica',
    systemicWeight: 100
  },
  {
    id: 17,
    axisId: 'seguranca',
    title: 'Vulnerabilidade das Fronteiras Secas e Portos',
    diagnosis: 'Mais de 16 mil quilômetros de fronteiras terrestres com os maiores produtores mundiais de cocaína contam com efetivo insuficiente de policiamento, transformando portos brasileiros em plataformas de exportação para a Europa.',
    impact: 'Entrada massiva de fuzis automáticos e entorpecentes que abastecem a guerra urbana nas cidades brasileiras.',
    competence: 'Federal (Polícia Federal, Receita Federal e Forças Armadas)',
    affectedRegions: 'Fronteiras com Bolívia, Colômbia, Peru e Paraguai; Portos de Santos, Paranaguá, Salvador e Itajaí',
    suggestedSolution: 'Operacionalização integral do Sisfron (Sistema Integrado de Monitoramento de Fronteiras) com radares e drones de longo alcance, scanners 100% automatizados em contêineres e acordos binacionais de persecução penal.',
    urgency: 'Crítica',
    systemicWeight: 95
  },
  {
    id: 18,
    axisId: 'seguranca',
    title: 'Baixíssima Taxa de Elucidação de Homicídios',
    diagnosis: 'Menos de 35% dos homicídios dolosos cometidos no Brasil são solucionados com identificação e condenação dos autores, contra mais de 80% na média dos países desenvolvidos.',
    impact: 'Sensação de impunidade absoluta, estímulo à repetição do crime violento e desconfiança da população nas polícias investigativas.',
    competence: 'Estadual (Polícias Civis e Institutos de Perícia Técnico-Científica)',
    affectedRegions: 'Nacional (Crítico em estados do Norte e Nordeste onde a resolução não atinge 20%)',
    suggestedSolution: 'Modernização e autonomia dos departamentos de homicídios, banco nacional integrado de perfis balísticos e genéticos (DNA), e investimento pesado em perícia papiloscópica e tecnológica.',
    urgency: 'Alta',
    systemicWeight: 90
  },
  {
    id: 19,
    axisId: 'seguranca',
    title: 'Superlotação Carcerária e Presídios como Faculdades do Crime',
    diagnosis: 'Sistema penitenciário opera com déficit de mais de 250 mil vagas, misturando presos provisórios de baixa periculosidade com criminosos de alta periculosidade de facções.',
    impact: 'Falta de ressocialização, taxas de reincidência superiores a 70% e rebeliões orquestradas de dentro das penitenciárias.',
    competence: 'Estadual com financiamento do Fundo Penitenciário Nacional (Funpen)',
    affectedRegions: 'Nacional (Todos os Estados)',
    suggestedSolution: 'Separação rigorosa de presos por periculosidade, trabalho e estudo obrigatórios para remição de pena, expansão de audiências de custódia com tornozeleira para crimes sem violência e bloqueio de sinal celular 100% blindado.',
    urgency: 'Alta',
    systemicWeight: 88
  },
  {
    id: 20,
    axisId: 'seguranca',
    title: 'Violência contra a Mulher e Epidemia de Feminicídio',
    diagnosis: 'Crescimento contínuo de agressões domésticas e feminicídios, associado à insuficiência de Delegacias Especializadas de Atendimento à Mulher (DEAMs) 24h e descumprimento de medidas protetivas.',
    impact: 'Milhares de mulheres assassinadas em ambiente doméstico e desestruturação de órfãos de feminicídio sem suporte do Estado.',
    competence: 'Estadual e Municipal com apoio Federal',
    affectedRegions: 'Nacional',
    suggestedSolution: 'Tornozeleira eletrônica obrigatória no agressor com alerta simultâneo em aplicativo no celular da vítima, DEAMs funcionando 24h em todas as comarcas de médio porte e acolhimento habitacional de emergência.',
    urgency: 'Alta',
    systemicWeight: 92
  },

  // EIXO 5: ECONOMIA, TRIBUTAÇÃO, LOGÍSTICA & CUSTO BRASIL (21 a 25)
  {
    id: 21,
    axisId: 'economia',
    title: 'Insegurança Jurídica Tributária e Risco de Alíquota Alta do IVA',
    diagnosis: 'Manicômio tributário de normas de ICMS/ISS gerando contencioso administrativo e judicial superior a R$ 5 trilhões, com risco de a reforma tributária fixar alíquota neutra do IVA acima de 28% devido a exceções de lobbies corporativos.',
    impact: 'Penalização da indústria nacional, perda de competitividade e perda de mais de 1.500 horas de trabalho por empresa apenas para calcular impostos.',
    competence: 'Federal e Estadual (Emenda Constitucional nº 132/2023 e Leis Complementares)',
    affectedRegions: 'Nacional (Setor produtivo, comércio e serviços de todo o país)',
    suggestedSolution: 'Regulamentação enxuta do IBS/CBS sem proliferação de regimes especiais privilegiados, cashback eficiente para os mais pobres e simplificação do contencioso fiscal.',
    urgency: 'Crítica',
    systemicWeight: 96
  },
  {
    id: 22,
    axisId: 'economia',
    title: 'Gargalo Logístico: Dependência Rodoviária e Déficit Ferroviário',
    diagnosis: 'Mais de 65% das cargas brasileiras transitam por rodovias com asfalto deteriorado, enquanto a malha ferroviária responde por menos de 15% dos transportes e sofre com concessões subutilizadas.',
    impact: 'Frete até 40% mais caro que nos concorrentes globais, perda de competitividade dos grãos no Centro-Oeste e alto índice de acidentes e mortes nas estradas.',
    competence: 'Federal (ANTT / Dnit / Ministério dos Transportes)',
    affectedRegions: 'Corredores de escoamento do Centro-Oeste para os Portos de Santos, Paranaguá e Arco Norte',
    suggestedSolution: 'Destravamento do marco legal das ferrovias por autorização, renegociação dos contratos de concessão ferroviária com exigência de investimentos imediatos e expansão da cabotagem costeira (BR do Mar).',
    urgency: 'Crítica',
    systemicWeight: 94
  },
  {
    id: 23,
    axisId: 'economia',
    title: 'Custo da Energia Elétrica e Encargos Setoriais Abusivos',
    diagnosis: 'A conta de luz dos brasileiros está entre as mais caras do mundo devido ao acúmulo de subsídios cruzados, encargos setoriais (CDE) e contratações compulsórias de térmicas aprovadas no Congresso.',
    impact: 'Asfixia do orçamento das famílias de classe média e baixa e perda de competitividade da indústria eletrointensiva nacional.',
    competence: 'Federal (Aneel / Ministério de Minas e Energia / Congresso Nacional)',
    affectedRegions: 'Nacional (Consumidores residenciais e indústrias em todas as 27 UFs)',
    suggestedSolution: 'Expurgo de jabutis legislativos que encarecem a tarifa, abertura do mercado livre de energia para baixa tensão e extinção progressiva dos subsídios distorcivos da Conta de Desenvolvimento Energético.',
    urgency: 'Alta',
    systemicWeight: 90
  },
  {
    id: 24,
    axisId: 'economia',
    title: 'Superendividamento das Famílias e Juros Extorsivos de Crédito',
    diagnosis: 'Mais de 70 milhões de brasileiros com o nome negativado no Serasa devido ao spread bancário e taxas escorchantes no rotativo do cartão de crédito e cheque especial.',
    impact: 'Paralisia do consumo interno, inadimplência e adoecimento financeiro de milhões de lares trabalhadores.',
    competence: 'Federal (Banco Central / Conselho Monetário Nacional)',
    affectedRegions: 'Nacional (Forte impacto nas classes C, D e E)',
    suggestedSolution: 'Consolidação de programas estruturantes de renegociação de dívidas com desconto, aumento da concorrência bancária via Open Finance e educação financeira no ensino fundamental.',
    urgency: 'Alta',
    systemicWeight: 88
  },
  {
    id: 25,
    axisId: 'economia',
    title: 'Desindustrialização Precoce e Baixa Produtividade',
    diagnosis: 'A participação da indústria de transformação no PIB brasileiro caiu para menos de 12% nas últimas três décadas, reduzindo empregos formais qualificados e gerando dependência de produtos manufaturados importados.',
    impact: 'Estagnação da renda per capita média do trabalhador brasileiro e baixa complexidade econômica.',
    competence: 'Federal (MDIC / Ministério da Fazenda / BNDES)',
    affectedRegions: 'São Paulo, Minas Gerais, Rio de Janeiro, Rio Grande do Sul e polos industriais de Manaus e Nordeste',
    suggestedSolution: 'Depreciação acelerada de maquinários modernos, política industrial focada em transição energética (hidrogênio verde, baterias e biotecnologia) e desoneração permanente da folha de pagamento.',
    urgency: 'Média',
    systemicWeight: 85
  },

  // EIXO 6: GESTÃO PÚBLICA, PACTO FEDERATIVO & PREVIDÊNCIA (26 a 30)
  {
    id: 26,
    axisId: 'governanca',
    title: 'Asfixia Fiscal dos Estados pela Dívida com a União',
    diagnosis: 'Estados como RJ, MG, RS, GO e outros acumulam dívidas impagáveis de centenas de bilhões de reais indexadas ao IPCA + 4%, consumindo fatias astronômicas do orçamento que deveriam ir para saúde e policiamento.',
    impact: 'Atraso de salários de servidores estaduais, paralisia de investimentos em estradas e hospitais e dependência de socorros temporários da União.',
    competence: 'Federal (Senado Federal - Art. 52 da CF/88 e Ministério da Fazenda)',
    affectedRegions: 'Sudeste, Sul e Centro-Oeste (com impacto em toda a federação)',
    suggestedSolution: 'Aprovação no Congresso de novo marco de repactuação da dívida estadual com abatimento de juros condicionado à aplicação obrigatória da economia em ensino técnico e infraestrutura logística.',
    urgency: 'Crítica',
    systemicWeight: 98
  },
  {
    id: 27,
    axisId: 'governanca',
    title: 'Fila de Benefícios do INSS e Envelhecimento Populacional',
    diagnosis: 'Mais de 1,5 milhão de trabalhadores incapacitados ou idosos aguardam perícia médica e análise de aposentadoria por meses, com o envelhecimento demográfico acelerado pressionando as contas previdenciárias.',
    impact: 'Desespero social de doentes e idosos sem renda e aumento das despesas com sentenças judiciais previdenciárias.',
    competence: 'Federal (Ministério da Previdência / INSS)',
    affectedRegions: 'Nacional',
    suggestedSolution: 'Automatização das concessões por cruzamento de dados biométricos e do SUS, teleperícia médica estruturada e bônus de produtividade estrito aos servidores por redução real do estoque de pedidos.',
    urgency: 'Alta',
    systemicWeight: 92
  },
  {
    id: 28,
    axisId: 'governanca',
    title: 'Supersalários e Privilégios Corporativos nos Três Poderes',
    diagnosis: 'Verbas indenizatórias e "penduricalhos" (auxílios moradia, alimentação retroativo, licença-prêmio convertida em dinheiro) permitem que milhares de servidores de cúpula recebam remunerações acima de R$ 100 mil/mês furando o teto constitucional.',
    impact: 'Indignação moral do contribuinte, erosão da legitimidade dos Três Poderes e despesa pública de bilhões de reais sem qualquer contrapartida de produtividade.',
    competence: 'Federal (Congresso Nacional - PL dos Extratetos / STF e CNJ)',
    affectedRegions: 'Nacional (Cúpula do Judiciário, Ministério Público, Legislativo e Executivo)',
    suggestedSolution: 'Aprovação imediata do PL dos Extratetos com tipificação expressa de quais parcelas submetem-se ao teto do STF e nulidade de atos administrativos que criem verbas indenizatórias camufladas.',
    urgency: 'Alta',
    systemicWeight: 90
  },
  {
    id: 29,
    axisId: 'governanca',
    title: 'Hiperjudicialização e Lentidão que Paralisam Investimentos',
    diagnosis: 'O Brasil é o país com maior número de processos judiciais em tramitação no mundo (mais de 80 milhões de ações ativas), com liminares judiciais e impugnações de órgãos de controle que paralisam concessões de obras por anos.',
    impact: 'Insegurança jurídica para investidores estrangeiros, custo advocatício e atraso de décadas na entrega de portos, rodovias e aeroportos.',
    competence: 'Federal (STF / STJ / CNJ / TCU / AGU)',
    affectedRegions: 'Nacional',
    suggestedSolution: 'Fortalecimento da arbitragem pública e mediação prévia em contratos de infraestrutura, súmulas vinculantes automáticas para matérias repetitivas e responsabilização de litigações protelatórias.',
    urgency: 'Média',
    systemicWeight: 84
  },
  {
    id: 30,
    axisId: 'governanca',
    title: 'Fragmentação de Cadastros e Apagão de Interoperabilidade',
    diagnosis: 'Ministérios, governos estaduais e municípios operam bancos de dados isolados que não conversam entre si, gerando fraudes em benefícios sociais e obrigando o cidadão a apresentar certidões repetitivas.',
    impact: 'Fraude de bilhões de reais em benefícios sociais (como Bolsa Família e BPC) e burocracia infernal para o cidadão comum.',
    competence: 'Federal (Ministério da Gestão e Inovação / Dataprev / Serpro)',
    affectedRegions: 'Nacional',
    suggestedSolution: 'Unificação obrigatória de cadastros públicos sob a base nacional da Carteira de Identidade Nacional (CIN) com biometria facial, auditoria preditiva por IA em benefícios sociais e aplicação da LAI.',
    urgency: 'Média',
    systemicWeight: 82
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NATIONAL_AXES,
    NATIONAL_BOTTLENECKS
  };
}
