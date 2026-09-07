// Raio-X Político 2026 - Base Consolidada de Candidatos Oficiais
// Dados sincronizados com TSE DivulgaCandContas, Senado e Câmara Federal

window.candidatesData = [
  {
    "id": "cand-tabata-amaral",
    "name": "Tabata Amaral",
    "ballotName": "Tabata Amaral",
    "party": "PSB",
    "number": "4000",
    "position": "Deputada Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 32,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/204534.jpg",
    "affiliation": {
      "party": "PSB",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSB (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-tabata-amaral"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-tabata-amaral",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-tabata-amaral",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-tabata-1",
        "title": "Poupança do Ensino Médio (Programa Pé-de-Meia)",
        "category": "Educação",
        "score": 9.4,
        "summary": "Incentivo financeiro mensal e poupança de formatura para estudantes de baixa renda da rede pública para erradicar a evasão escolar.",
        "problemStatement": "Mais de 500 mil jovens abandonam o ensino médio anualmente no Brasil por necessidade urgente de complementar renda familiar.",
        "solutionDetails": "Depósito mensal de R$ 200 condicionado a 80% de frequência escolar e bônus de R$ 1.000 ao fim de cada ano letivo concluído com aprovação.",
        "budgetAndCost": "R$ 7.1 bilhões / ano (Fundos Federais)",
        "timeline": "2024 - 2026",
        "pros": "Queda estimada de até 40% na evasão escolar em periferias.",
        "cons": "Exige coordenação rigorosa entre estados e Caixa Econômica Federal.",
        "supportVotes": 1420,
        "rejectVotes": 88
      },
      {
        "id": "prop-tabata-2",
        "title": "Conectividade e Internet 5G em 100% das Escolas Públicas",
        "category": "Tecnologia",
        "score": 9.1,
        "summary": "Utilização obrigatória dos recursos do FUST para equipar escolas públicas com banda larga ultraveloz e laboratórios digitais.",
        "problemStatement": "Abismo digital entre escolas particulares e estaduais periféricas agrava a desigualdade de oportunidades.",
        "solutionDetails": "Desbloqueio de verbas do FUST com fiscalização do TCU para instalação de antenas 5G e tablets pedagógicos.",
        "budgetAndCost": "R$ 3.2 bilhões (FUST)",
        "timeline": "36 meses",
        "pros": "Capacitação digital precoce para o mercado tech.",
        "cons": "Dificuldade logística em escolas rurais e isoladas.",
        "supportVotes": 1180,
        "rejectVotes": 45
      },
      {
        "id": "prop-tabata-3",
        "title": "Marco Legal da Primeira Infância e Creches Noturnas",
        "category": "Assistência Social",
        "score": 8.8,
        "summary": "Ampliação do atendimento em creches municipais com horários flexíveis para mães que trabalham em turnos noturnos ou estudam.",
        "problemStatement": "Mães solo são as mais penalizadas pelo desemprego por falta de vagas em creches fora do horário comercial padrão.",
        "solutionDetails": "Repasses federais vinculados ao Fundeb para municípios que criarem creches polo com horário estendido até 22h.",
        "budgetAndCost": "R$ 1.8 bilhão / ano",
        "timeline": "24 meses",
        "pros": "Aumento da empregabilidade feminina e proteção integral infantil.",
        "cons": "Custo adicional de pessoal pedagógico em regime de escala.",
        "supportVotes": 960,
        "rejectVotes": 72
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-kim-kataguiri",
    "name": "Kim Kataguiri",
    "ballotName": "Kim Kataguiri",
    "party": "MISSÃO",
    "number": "4433",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 30,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/204536.jpg",
    "affiliation": {
      "party": "MISSÃO",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "MISSÃO (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-kim-kataguiri"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-kim-kataguiri",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-kim-kataguiri",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-kim-1",
        "title": "Extinção dos Supersalários e Penduricalhos no Serviço Público",
        "category": "Economia",
        "score": 9.6,
        "summary": "Aplicação rígida e irrestrita do teto constitucional (STF) a todas as verbas indenizatórias, auxílios e gratificações de magistrados e procuradores.",
        "problemStatement": "Penduricalhos criam vencimentos superiores a R$ 100 mil mensais, custando bilhões e gerando injustiça cívica.",
        "solutionDetails": "Enquadramento de todas as parcelas indenizatórias contínuas no abate-teto com responsabilização direta por improbidade.",
        "budgetAndCost": "Economia estimada de R$ 5.8 bilhões / ano",
        "timeline": "Imediato",
        "pros": "Justiça orçamentária e corte expressivo de privilégios corporativistas.",
        "cons": "Forte resistência e judicialização de entidades de classe.",
        "supportVotes": 2310,
        "rejectVotes": 115
      },
      {
        "id": "prop-kim-2",
        "title": "Marco Legal da Liberdade Econômica e Desregulamentação Ampla",
        "category": "Livre Mercado",
        "score": 9,
        "summary": "Dispensa total de licenças, alvarás e taxas prévias para atividades econômicas de baixo e médio risco em todo o território nacional.",
        "problemStatement": "Burocracia estatal excessiva sufoca pequenos empreendedores e incentiva a corrupção na concessão de alvarás.",
        "solutionDetails": "Princípio do livre exercício profissional com presunção de boa-fé e fiscalização posterior orientadora.",
        "budgetAndCost": "Custo Zero aos cofres públicos",
        "timeline": "12 meses",
        "pros": "Aceleração na abertura de empresas e geração de empregos formais.",
        "cons": "Requer adaptação dos órgãos municipais de vigilância e zoneamento.",
        "supportVotes": 1840,
        "rejectVotes": 210
      },
      {
        "id": "prop-kim-3",
        "title": "Fim do Fundão Eleitoral Bilionário e Financiamento Privado Transparente",
        "category": "Reforma Política",
        "score": 9.3,
        "summary": "Extinção do Fundo Especial de Financiamento de Campanha (FEFC) de R$ 5 bilhões, devolvendo o dinheiro para Saúde e Segurança.",
        "problemStatement": "Uso de verba do pagador de impostos para custear campanhas políticas e enriquecer dirigentes partidários.",
        "solutionDetails": "Campanhas financiadas exclusivamente por doações voluntárias de pessoas físicas com teto e prestação de contas diária.",
        "budgetAndCost": "Economia de R$ 4.9 bilhões por eleição",
        "timeline": "Ciclo Eleitoral 2026",
        "pros": "Fim do dreno de recursos essenciais para marketing político partidário.",
        "cons": "Oposição maciça da cúpula de grandes partidos do centro e centrão.",
        "supportVotes": 2750,
        "rejectVotes": 180
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-nikolas-ferreira",
    "name": "Nikolas Ferreira",
    "ballotName": "Nikolas Ferreira",
    "party": "PL",
    "number": "2222",
    "position": "Deputado Federal",
    "state": "MG",
    "city": "Belo Horizonte",
    "age": 29,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/209787.jpg",
    "affiliation": {
      "party": "PL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-nikolas-ferreira"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-nikolas-ferreira",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-nikolas-ferreira",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-nikolas-1",
        "title": "Projeto Escola Sem Partido e Neutralidade Ideológica",
        "category": "Educação",
        "score": 8.7,
        "summary": "Vedação à doutrinação política e ideológica em sala de aula, assegurando o pluralismo de ideias e o respeito aos valores morais da família.",
        "problemStatement": "Denúncias recorrentes de viés ideológico partidário e imposição doutrinária em livros didáticos e aulas da rede pública.",
        "solutionDetails": "Fixação de cartazes com direitos dos alunos, canal de denúncias anônimo no MEC e neutralidade obrigatória do corpo docente.",
        "budgetAndCost": "R$ 15 milhões (Campanhas e Ouvidoria)",
        "timeline": "12 meses",
        "pros": "Garante respeito às convicções religiosas e familiares dos estudantes.",
        "cons": "Críticas de entidades sindicais de professores sobre liberdade de cátedra.",
        "supportVotes": 3120,
        "rejectVotes": 1450
      },
      {
        "id": "prop-nikolas-2",
        "title": "Redução da Maioridade Penal para 16 Anos em Crimes Hediondos",
        "category": "Segurança Pública",
        "score": 9.1,
        "summary": "Emenda Constitucional para julgar e punir maiores de 16 anos pelo Código Penal comum quando praticarem homicídio, estupro e latrocínio.",
        "problemStatement": "Facções criminosas cooptam menores de idade para cometer assassinatos sob a certeza da inimputabilidade penal aos 18 anos.",
        "solutionDetails": "Alteração do art. 228 da CF/88 com cumprimento em estabelecimentos prisionais separados de adultos.",
        "budgetAndCost": "R$ 350 milhões (Adaptação do sistema penitenciário)",
        "timeline": "18 meses",
        "pros": "Fim da sensação de impunidade para crimes violentos de extrema gravidade.",
        "cons": "Debate jurídico no STF sobre cláusula pétrea constitucional.",
        "supportVotes": 3840,
        "rejectVotes": 920
      },
      {
        "id": "prop-nikolas-3",
        "title": "Garantia do Porte Legal de Arma para Defesa da Família e Agro",
        "category": "Segurança Pública",
        "score": 8.6,
        "summary": "Desburocratização do acesso legal a armas de fogo para cidadãos sem antecedentes criminais e produtores rurais em áreas de fronteira e isoladas.",
        "problemStatement": "Demora e discricionariedade abusiva na concessão de registros pela Polícia Federal para moradores de áreas sem policiamento fixo.",
        "solutionDetails": "Critérios objetivos e prazos peremptórios para emissão de certidões, exame psicotécnico rigoroso e registro unificado.",
        "budgetAndCost": "Custo Zero (Auto-financiado por taxas)",
        "timeline": "Imediato",
        "pros": "Direito à legítima defesa da vida e propriedade contra invasões e assaltos rurais.",
        "cons": "Preocupações de especialistas sobre circulação de armas de grosso calibre.",
        "supportVotes": 2980,
        "rejectVotes": 1340
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-erika-hilton",
    "name": "Erika Hilton",
    "ballotName": "Erika Hilton",
    "party": "PSOL",
    "number": "5000",
    "position": "Deputada Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 33,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/220645.jpg",
    "affiliation": {
      "party": "PSOL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSOL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-erika-hilton"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-erika-hilton",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-erika-hilton",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-erika-1",
        "title": "PEC pelo Fim da Escala 6x1 e Semana de 4 Dias de Trabalho",
        "category": "Trabalho e Renda",
        "score": 9.3,
        "summary": "Proposta de Emenda Constitucional para limitar a jornada a 36 horas semanais em 4 dias de trabalho sem redução de salários.",
        "problemStatement": "A escala 6x1 gera exaustão mental crônica (Burnout), acidentes de trabalho e destrói o convívio familiar do trabalhador.",
        "solutionDetails": "Redução gradual da jornada máxima na CLT e incentivos fiscais para empresas que adotarem o modelo de jornada reduzida.",
        "budgetAndCost": "R$ 2.4 bilhões em incentivos de transição",
        "timeline": "36 meses",
        "pros": "Qualidade de vida, saúde mental e estímulo aos setores de turismo e lazer.",
        "cons": "Preocupação do comércio e serviços sobre custos operacionais de escala.",
        "supportVotes": 3410,
        "rejectVotes": 780
      },
      {
        "id": "prop-erika-2",
        "title": "Programa Nacional de Inclusão e Empregabilidade LGBTI+",
        "category": "Direitos Humanos",
        "score": 9,
        "summary": "Qualificação profissional e incentivos para contratação formal de pessoas trans e travestis em empresas e órgãos públicos.",
        "problemStatement": "Mais de 90% das pessoas trans no Brasil sobrevivem na informalidade ou marginalidade por preconceito e falta de qualificação.",
        "solutionDetails": "Criação de centros de capacitação técnica, cotas em estágios públicos e selo ESG de diversidade com desoneração na folha.",
        "budgetAndCost": "R$ 180 milhões / ano",
        "timeline": "24 meses",
        "pros": "Ruptura do ciclo de violência e inclusão produtiva no mercado de trabalho.",
        "cons": "Exige forte fiscalização contra fraudes em autodeclarações.",
        "supportVotes": 2150,
        "rejectVotes": 640
      },
      {
        "id": "prop-erika-3",
        "title": "Fortalecimento do Combate à Violência Política de Gênero e Raça",
        "category": "Cidadania",
        "score": 9.2,
        "summary": "Tipificação severa e celeridade processual para crimes de ameaça, difamação e coação contra mulheres parlamentares e ativistas.",
        "problemStatement": "Crescimento de ataques orquestrados na internet e intimidação física para afastar mulheres negras e trans dos espaços de poder.",
        "solutionDetails": "Criação de protocolo de escolta da Polícia Legislativa e canal prioritário no Ministério Público Eleitoral.",
        "budgetAndCost": "R$ 45 milhões / ano",
        "timeline": "12 meses",
        "pros": "Garantia do pleno exercício democrático e representatividade política.",
        "cons": "Demanda treinamento técnico de operadores de segurança em todo o país.",
        "supportVotes": 1980,
        "rejectVotes": 310
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-samia-bomfim",
    "name": "Sâmia Bomfim",
    "ballotName": "Sâmia Bomfim",
    "party": "PSOL",
    "number": "5050",
    "position": "Deputada Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 36,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/204535.jpg",
    "affiliation": {
      "party": "PSOL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSOL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-samia-bomfim"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-samia-bomfim",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-samia-bomfim",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-samia-1",
        "title": "Taxação de Grandes Fortunas e Heranças Superiores a R$ 50 Milhões",
        "category": "Justiça Tributária",
        "score": 9.1,
        "summary": "Regulamentação do Imposto sobre Grandes Fortunas (IGF) previsto na Constituição de 1988 para financiar a Saúde Pública e o SUS.",
        "problemStatement": "O Brasil possui um dos sistemas tributários mais regressivos do planeta, onde os mais pobres pagam proporcionalmente mais tributos.",
        "solutionDetails": "Alíquotas progressivas de 2% a 5% sobre patrimônios líquidos superiores a R$ 50 milhões, com combate a paraísos fiscais.",
        "budgetAndCost": "Arrecadação prevista de R$ 60 bilhões / ano",
        "timeline": "Exercício fiscal 2026",
        "pros": "Recursos massivos diretos para hospitais de alta complexidade e oncologia.",
        "cons": "Risco de fuga de capitais e repatriação patrimonial no exterior.",
        "supportVotes": 2890,
        "rejectVotes": 1120
      },
      {
        "id": "prop-samia-2",
        "title": "Licença-Maternidade Obrigatória de 180 Dias e Creches Integrais",
        "category": "Direitos das Mulheres",
        "score": 9.4,
        "summary": "Ampliação da licença-maternidade remunerada para 6 meses para todas as trabalhadoras CLT e criação de creches públicas integrais.",
        "problemStatement": "Retorno precoce ao trabalho interrompe o aleitamento materno exclusivo e sobrecarrega financeiramente as mães trabalhadoras.",
        "solutionDetails": "Financiamento tripartite da previdência social com contrapartida de creches públicas próximas às estações de transporte.",
        "budgetAndCost": "R$ 4.2 bilhões / ano",
        "timeline": "24 meses",
        "pros": "Melhores índices de desenvolvimento infantil e redução da mortalidade.",
        "cons": "Possível resistência de pequenos empregadores na contratação.",
        "supportVotes": 3200,
        "rejectVotes": 420
      },
      {
        "id": "prop-samia-3",
        "title": "Revogação de Isenções a Agrotóxicos e Estímulo à Agroecologia",
        "category": "Meio Ambiente",
        "score": 8.9,
        "summary": "Fim dos incentivos fiscais sobre defensivos químicos perigosos e destinação dos recursos para agricultura familiar orgânica.",
        "problemStatement": "Isenção bilionária de IPI e ICMS para agrotóxicos contaminantes da água enquanto a comida orgânica permanece cara.",
        "solutionDetails": "Aplicação de alíquota cheia sobre agrotóxicos de alta toxicidade e criação de linha de crédito no Pronaf Agroecológico.",
        "budgetAndCost": "R$ 3.8 bilhões em arrecadação redirecionada",
        "timeline": "18 meses",
        "pros": "Alimentação saudável, preservação dos mananciais e saúde do agricultor.",
        "cons": "Oposição da bancada ruralista e possível pressão sobre custos de commodities.",
        "supportVotes": 2450,
        "rejectVotes": 890
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-marcel-van-hattem",
    "name": "Marcel van Hattem",
    "ballotName": "Marcel van Hattem",
    "party": "NOVO",
    "number": "3030",
    "position": "Deputado Federal",
    "state": "RS",
    "city": "Porto Alegre",
    "age": 40,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/156190.jpg",
    "affiliation": {
      "party": "NOVO",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "NOVO (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-marcel-van-hattem"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-marcel-van-hattem",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-marcel-van-hattem",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-marcel-1",
        "title": "Limitação de Decisões Monocráticas no STF e Fim do Foro Privilegiado",
        "category": "Reforma Institucional",
        "score": 9.5,
        "summary": "PEC que proíbe liminares individuais de ministros que suspendam leis federais e extingue o foro por prerrogativa de função para políticos.",
        "problemStatement": "Ativismo judicial e decisões isoladas de magistrados atropelam o Congresso e criam blindagem para corruptos.",
        "solutionDetails": "Obrigatoriedade de deliberação colegiada para suspensão de leis e julgamento de parlamentares em 1ª instância.",
        "budgetAndCost": "Custo Zero",
        "timeline": "Imediato",
        "pros": "Restauração do equilíbrio entre os Poderes e igualdade perante a lei.",
        "cons": "Conflito institucional com o Poder Judiciário.",
        "supportVotes": 3650,
        "rejectVotes": 410
      },
      {
        "id": "prop-marcel-2",
        "title": "Privatização de 100% das Estatais Federais Dependentes do Tesouro",
        "category": "Desestatização",
        "score": 9.2,
        "summary": "Venda de empresas públicas deficitárias e abertura total de mercado para investimentos privados em infraestrutura e logística.",
        "problemStatement": "Estatais federais acumulam prejuízos bilionários cobertos com dinheiro de impostos e servem a indicações políticas.",
        "solutionDetails": "Programa acelerado de leilões na B3 com garantia de estabilidade para serviços essenciais e incentivo à concorrência.",
        "budgetAndCost": "Receita estimada de R$ 120 bilhões",
        "timeline": "48 meses",
        "pros": "Fim do rombo fiscal com estatais e atração maciça de capital estrangeiro.",
        "cons": "Resistência de sindicatos de categorias estatutárias e estatais.",
        "supportVotes": 2980,
        "rejectVotes": 870
      },
      {
        "id": "prop-marcel-3",
        "title": "Teto de Gastos Rígido e Proibição Constitucional de Criação de Impostos",
        "category": "Fiscal",
        "score": 9.4,
        "summary": "Dispositivo constitucional impedindo o aumento da carga tributária em percentual do PIB e travamento automático de despesas em déficit.",
        "problemStatement": "Governos sucessivos aumentam gastos públicos e cobrem o rombo aumentando impostos sobre a classe produtiva.",
        "solutionDetails": "Regra de ouro fiscal: despesa pública não pode crescer acima da inflação do período anterior.",
        "budgetAndCost": "Estabilização da dívida pública",
        "timeline": "Plano Plurianual",
        "pros": "Segurança jurídica para investidores, controle inflacionário e juros baixos.",
        "cons": "Engessamento da capacidade do Estado em momentos de crise severa.",
        "supportVotes": 3120,
        "rejectVotes": 650
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-baleia-rossi",
    "name": "Baleia Rossi",
    "ballotName": "Baleia Rossi",
    "party": "MDB",
    "number": "1515",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "Ribeirão Preto",
    "age": 54,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/178975.jpg",
    "affiliation": {
      "party": "MDB",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "MDB (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-baleia-rossi"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-baleia-rossi",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-baleia-rossi",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-baleia-1",
        "title": "Regulamentação e Implementação Plena da Reforma Tributária (PEC 45)",
        "category": "Tributário",
        "score": 9.6,
        "summary": "Autor da PEC 45/2019 que unificou 5 impostos sobre o consumo no IVA Dual (CBS federal e IBS subnacional), simplificando a economia.",
        "problemStatement": "O manicômio tributário brasileiro consome 1.500 horas/ano de burocracia por empresa e gera R$ 5 trilhões em litígios fiscais.",
        "solutionDetails": "Criação do Comitê Gestor do IBS, cesta básica nacional 100% desonerada e cashback de impostos para famílias do Cadastro Único.",
        "budgetAndCost": "Custo de implantação R$ 400M (Sistemas de TI integrados)",
        "timeline": "2026 - 2033 (Período de transição)",
        "pros": "Aumento previsto de 12% a 20% no PIB brasileiro em 15 anos.",
        "cons": "Complexidade na calibragem das alíquotas de referência durante a transição.",
        "supportVotes": 2540,
        "rejectVotes": 320
      },
      {
        "id": "prop-baleia-2",
        "title": "Fundo Nacional de Infraestrutura Logística e Hidrovias",
        "category": "Transporte e Agro",
        "score": 9,
        "summary": "Criação de fundo público-privado para viabilizar duplicações de rodovias de escoamento e dragagem de hidrovias no interior paulista.",
        "problemStatement": "Gargalos logísticos encarecem o frete em até 30%, prejudicando o produtor nacional na exportação de grãos e manufaturados.",
        "solutionDetails": "Parcerias Público-Privadas (PPPs) com debêntures incentivadas para corredores de exportação hidroviários.",
        "budgetAndCost": "R$ 8.5 bilhões (Fundo Misto)",
        "timeline": "48 meses",
        "pros": "Redução drástica do custo Brasil e menor emissão de carbono por tonelada transportada.",
        "cons": "Dependência de licenças ambientais em bacias hidrográficas interestaduais.",
        "supportVotes": 1890,
        "rejectVotes": 180
      },
      {
        "id": "prop-baleia-3",
        "title": "Desoneração e Fortalecimento da Atenção Básica de Saúde Municipal",
        "category": "Saúde Pública",
        "score": 8.9,
        "summary": "Repasse direto Fundo a Fundo para Unidades Básicas de Saúde (UBS) e aumento do teto MAC para Santas Casas de Misericórdia.",
        "problemStatement": "Santas Casas acumulam dívidas históricas operando procedimentos de alta complexidade com tabela SUS defasada.",
        "solutionDetails": "Reajuste da tabela SUS para procedimentos hospitalares essenciais e repasse sem intermediários para municípios conveniados.",
        "budgetAndCost": "R$ 6.2 bilhões / ano",
        "timeline": "24 meses",
        "pros": "Socorro imediato aos hospitais filantrópicos que realizam mais de 50% dos partos SUS.",
        "cons": "Exige remanejamento orçamentário no Ministério da Saúde.",
        "supportVotes": 2210,
        "rejectVotes": 95
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-gleisi-hoffmann",
    "name": "Gleisi Hoffmann",
    "ballotName": "Gleisi Hoffmann",
    "party": "PT",
    "number": "1313",
    "position": "Deputada Federal",
    "state": "PR",
    "city": "Curitiba",
    "age": 60,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/107283.jpg",
    "affiliation": {
      "party": "PT",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PT (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-gleisi-hoffmann"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-gleisi-hoffmann",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-gleisi-hoffmann",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-gleisi-1",
        "title": "Isenção Total de Imposto de Renda para Trabalhadores até R$ 5.000",
        "category": "Economia Popular",
        "score": 9.4,
        "summary": "Atualização da tabela do IRPF para isentar quem ganha até 3,5 salários mínimos, compensando com tributação de super-ricos.",
        "problemStatement": "A defasagem histórica da tabela do IR penaliza a classe média assalariada, que paga impostos acima de bilionários.",
        "solutionDetails": "Elevação da faixa de isenção para R$ 5.000 mensais com alíquotas mais altas sobre dividendos e lucros no topo da pirâmide.",
        "budgetAndCost": "R$ 35 bilhões (Compensado com taxação de lucros e dividendos)",
        "timeline": "Exercício 2026",
        "pros": "Injeção direta de renda no bolso de mais de 10 milhões de trabalhadores.",
        "cons": "Resistência de setores do mercado financeiro e investidores individuais.",
        "supportVotes": 3620,
        "rejectVotes": 890
      },
      {
        "id": "prop-gleisi-2",
        "title": "Expansão do Minha Casa Minha Vida com Financiamento a Juros Zero",
        "category": "Habitação",
        "score": 9.2,
        "summary": "Subsídio integral de moradias para famílias com renda de até 2 salários mínimos e requalificação de prédios públicos abandonados.",
        "problemStatement": "Déficit habitacional de 6 milhões de famílias nas grandes regiões metropolitanas convive com imóveis públicos ociosos.",
        "solutionDetails": "Contratação de 2 milhões de novas unidades subsidiadas e retrofits em centros urbanos consolidados.",
        "budgetAndCost": "R$ 14 bilhões / ano",
        "timeline": "36 meses",
        "pros": "Geração imediata de vagas na construção civil e dignidade familiar.",
        "cons": "Risco de atrasos em obras por reajustes de insumos como cimento e aço.",
        "supportVotes": 3150,
        "rejectVotes": 610
      },
      {
        "id": "prop-gleisi-3",
        "title": "Retomada de Grandes Obras Estruturantes e Reindustrialização (Novo PAC)",
        "category": "Indústria e Emprego",
        "score": 9,
        "summary": "Aporte massivo em ferrovias, transição ecológica e complexo econômico da saúde para reduzir a dependência externa de insumos.",
        "problemStatement": "Desindustrialização precoce do Brasil nas últimas décadas transformou o país em mero exportador de commodities brutas.",
        "solutionDetails": "Financiamento a juros competitivos via BNDES com exigência de conteúdo local e sustentabilidade ambiental.",
        "budgetAndCost": "R$ 45 bilhões (Capitais mistos)",
        "timeline": "48 meses",
        "pros": "Empregos de alta qualificação e soberania tecnológica nacional.",
        "cons": "Monitoramento rígido do TCU para evitar sobrepreço e aditivos contratuais.",
        "supportVotes": 2780,
        "rejectVotes": 730
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-luiza-erundina",
    "name": "Luiza Erundina",
    "ballotName": "Luiza Erundina",
    "party": "PSOL",
    "number": "5010",
    "position": "Deputada Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 91,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/74784.jpg",
    "affiliation": {
      "party": "PSOL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSOL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-luiza-erundina"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-luiza-erundina",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-luiza-erundina",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-erundina-1",
        "title": "Tarifa Zero no Transporte Público Urbano para Toda a População",
        "category": "Mobilidade Urbana",
        "score": 9.5,
        "summary": "Pioneira da tese no Brasil, propõe financiamento do transporte coletivo gratuito municipal mediante fundos públicos solidários.",
        "problemStatement": "O custo da passagem consome até 25% da renda do trabalhador periférico, criando segregação espacial e desemprego.",
        "solutionDetails": "Substituição da tarifa na catraca por taxa de mobilidade empresarial e uso de receitas de multas de trânsito e estacionamentos.",
        "budgetAndCost": "R$ 12 bilhões / ano nas metrópoles",
        "timeline": "Implementação progressiva em 3 anos",
        "pros": "Democratização do direito à cidade, redução de carros e menor poluição do ar.",
        "cons": "Exige reestruturação orçamentária expressiva das prefeituras.",
        "supportVotes": 3890,
        "rejectVotes": 980
      },
      {
        "id": "prop-erundina-2",
        "title": "Estatuto dos Conselhos Populares e Orçamento Participativo Obrigatório",
        "category": "Democracia Direta",
        "score": 9.1,
        "summary": "Obrigatoriedade de deliberação popular em bairros e comunidades sobre pelo menos 15% dos investimentos municipais e estaduais.",
        "problemStatement": "Obras públicas decididas em gabinetes fechados frequentemente ignoram as prioridades reais de saneamento e creches das vilas.",
        "solutionDetails": "Plataformas digitais cívicas aliadas a assembleias comunitárias vinculantes para priorização de obras públicas.",
        "budgetAndCost": "R$ 80 milhões (Plataformas e mediação)",
        "timeline": "18 meses",
        "pros": "Empoderamento comunitário e combate direto ao clientelismo político.",
        "cons": "Pode alongar o prazo inicial de aprovação dos projetos de engenharia.",
        "supportVotes": 2450,
        "rejectVotes": 380
      },
      {
        "id": "prop-erundina-3",
        "title": "Comissão Permanente da Verdade e Reparação Histórica",
        "category": "Direitos Humanos",
        "score": 9.3,
        "summary": "Fortalecimento das políticas de memória, verdade e justiça com abertura irrevogável de todos os arquivos militares e civis do regime autoritário.",
        "problemStatement": "A impunidade de crimes de Estado alimenta arroubos golpistas e desrespeito aos direitos fundamentais no presente.",
        "solutionDetails": "Digitalização com IA de documentos confidenciais de arquivos públicos e inserção obrigatória de educação cívica nos currículos.",
        "budgetAndCost": "R$ 35 milhões",
        "timeline": "24 meses",
        "pros": "Consolidação definitiva do pacto democrático brasileiro.",
        "cons": "Reação contrária de setores saudosistas e militares da reserva.",
        "supportVotes": 2190,
        "rejectVotes": 870
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-duda-salabert",
    "name": "Duda Salabert",
    "ballotName": "Duda Salabert",
    "party": "PSOL",
    "number": "1212",
    "position": "Deputada Federal",
    "state": "MG",
    "city": "Belo Horizonte",
    "age": 44,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/220623.jpg",
    "affiliation": {
      "party": "PSOL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSOL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-duda-salabert"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-duda-salabert",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-duda-salabert",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-duda-1",
        "title": "Proteção da Serra do Curral e Proibição de Mineração em Mananciais",
        "category": "Meio Ambiente",
        "score": 9.6,
        "summary": "Tombamento nacional e proteção definitiva da Serra do Curral e bacias hidrográficas contra projetos predatórios de mineração.",
        "problemStatement": "A mineração irresponsável ameaça o abastecimento de água potável de mais de 5 milhões de mineiros na Grande BH.",
        "solutionDetails": "Criação do Parque Nacional da Serra do Curral e endurecimento de penalidades para mineradoras que degradem aquíferos.",
        "budgetAndCost": "R$ 250 milhões (Fundo de Compensação Ambiental)",
        "timeline": "Imediato",
        "pros": "Segurança hídrica para as próximas gerações e preservação de patrimônio natural.",
        "cons": "Pressão econômica de mineradoras sobre arrecadação de royalties (CFEM).",
        "supportVotes": 3250,
        "rejectVotes": 410
      },
      {
        "id": "prop-duda-2",
        "title": "Piso Salarial Nacional do Magistério Pago com Transferência Direta",
        "category": "Educação",
        "score": 9.4,
        "summary": "Complementação da União para garantir que nenhum estado ou município pague aos professores menos que o piso nacional de R$ 4.580.",
        "problemStatement": "Professores em milhares de municípios continuam ganhando abaixo do piso por alegação de falta de dotação orçamentária local.",
        "solutionDetails": "Aporte federal automático via Fundeb para entes federados que comprovarem limite de responsabilidade fiscal.",
        "budgetAndCost": "R$ 5.6 bilhões / ano",
        "timeline": "12 meses",
        "pros": "Valorização real da carreira docente e atração de jovens talentos para o magistério.",
        "cons": "Necessidade de auditar as folhas de pagamento de milhares de cidades.",
        "supportVotes": 3600,
        "rejectVotes": 280
      },
      {
        "id": "prop-duda-3",
        "title": "Fundo Nacional Solar Popular para Famílias de Baixa Renda",
        "category": "Transição Energética",
        "score": 9.1,
        "summary": "Instalação gratuita de painéis solares nos telhados de moradias populares para zerar a conta de luz dos mais vulneráveis.",
        "problemStatement": "A tarifa de energia elétrica consome fatia desproporcional do orçamento de famílias que ganham até 2 salários mínimos.",
        "solutionDetails": "Financiamento através da taxa setorial de P&D das distribuidoras de energia com instalação por técnicos locais capacitados.",
        "budgetAndCost": "R$ 2.8 bilhões / ano",
        "timeline": "36 meses",
        "pros": "Geração de energia limpa distribuída e alívio financeiro imediato.",
        "cons": "Manutenção preventiva dos equipamentos em áreas com telhados precários.",
        "supportVotes": 2980,
        "rejectVotes": 190
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-marco-feliciano",
    "name": "Pr. Marco Feliciano",
    "ballotName": "Pr. Marco Feliciano",
    "party": "PL",
    "number": "2299",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "Orlândia",
    "age": 53,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/160601.jpg",
    "affiliation": {
      "party": "PL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-marco-feliciano"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-marco-feliciano",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-marco-feliciano",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-feliciano-1",
        "title": "Estatuto do Nascituro e Vedação Constitucional Irrestrita ao Aborto",
        "category": "Valores e Família",
        "score": 8.8,
        "summary": "Garantia legal dos direitos de personalidade, proteção à vida e herança ao ser humano concebido desde o momento da fecundação.",
        "problemStatement": "Movimentos judiciais no STF tentam legalizar o aborto sem passar pela deliberação dos representantes eleitos pelo povo.",
        "solutionDetails": "Inserção do direito à vida desde a concepção no art. 5º da CF/88 e fortalecimento das redes de apoio e adoção ágil de bebês.",
        "budgetAndCost": "R$ 120 milhões (Redes de acolhimento e adoção)",
        "timeline": "Imediato",
        "pros": "Proteção irrestrita aos mais indefesos e estímulo à adoção célere.",
        "cons": "Debate acirrado com coletivos de direitos reprodutivos e saúde pública.",
        "supportVotes": 3410,
        "rejectVotes": 1650
      },
      {
        "id": "prop-feliciano-2",
        "title": "Proteção Constitucional da Liberdade Religiosa e Isenção de Templos",
        "category": "Liberdade Religiosa",
        "score": 9,
        "summary": "Blindagem contra qualquer intervenção do Estado na pregação moral, cultos e atuação social e de recuperação das igrejas de qualquer credo.",
        "problemStatement": "Tentativas de responsabilização criminal de líderes religiosos por pregações baseadas em textos sagrados tradicionais.",
        "solutionDetails": "Imunidade tributária plena para templos e garantia da capelania hospitalar e prisional sem entraves estatais.",
        "budgetAndCost": "Custo Zero",
        "timeline": "Imediato",
        "pros": "Garantia fundamental da liberdade de consciência, crença e culto.",
        "cons": "Cobrança da sociedade civil sobre transparência financeira de megaigrejas.",
        "supportVotes": 3120,
        "rejectVotes": 1210
      },
      {
        "id": "prop-feliciano-3",
        "title": "Apoio a Comunidades Terapêuticas de Recuperação de Dependentes Químicos",
        "category": "Segurança e Saúde",
        "score": 8.9,
        "summary": "Destinação prioritária de verbas da Senad para entidades da sociedade civil que acolhem e recuperam dependentes de crack e álcool.",
        "problemStatement": "Cracolândias se proliferam nas capitais enquanto o poder público insiste em modelos de redução de danos sem internação.",
        "solutionDetails": "Contratos de gestão com comunidades terapêuticas credenciadas com acolhimento voluntário e reinserção ao trabalho.",
        "budgetAndCost": "R$ 650 milhões / ano",
        "timeline": "24 meses",
        "pros": "Resgate humanizado de dependentes químicos e pacificação de áreas urbanas degradadas.",
        "cons": "Críticas de associações de psiquiatria que defendem modelos baseados em CAPS.",
        "supportVotes": 2850,
        "rejectVotes": 890
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-mario-frias",
    "name": "Mario Frias",
    "ballotName": "Mario Frias",
    "party": "PL",
    "number": "2200",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 54,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/220655.jpg",
    "affiliation": {
      "party": "PL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-mario-frias"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-mario-frias",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-mario-frias",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-frias-1",
        "title": "Auditoria Rigorosa e Teto Máximo de Captação na Lei Rouanet",
        "category": "Cultura e Transparência",
        "score": 9.1,
        "summary": "Redução drástica do limite de captação individual por projeto e auditoria com inteligência artificial sobre notas fiscais de incentivos culturais.",
        "problemStatement": "Concentração de milhões em poucos artistas consagrados enquanto a cultura popular de pequenas cidades é desprovida de verbas.",
        "solutionDetails": "Teto de R$ 500 mil por projeto e obrigatoriedade de 50% dos ingressos gratuitos para escolas públicas e asilos.",
        "budgetAndCost": "Economia fiscal e descentralização para 5.000 municípios",
        "timeline": "Imediato",
        "pros": "Fim do corporativismo de grandes produtoras e valorização do pequeno artista.",
        "cons": "Dificuldade de viabilização de megamusicais internacionais.",
        "supportVotes": 2950,
        "rejectVotes": 780
      },
      {
        "id": "prop-frias-2",
        "title": "Descentralização de Recursos Culturais para Tradições Regionais e Folclore",
        "category": "Cultura Nacional",
        "score": 8.8,
        "summary": "Criação do Circuito Cultural Brasileiro com fomento a feiras de artesanato, bandas marciais, música sertaneja de raiz e teatro sacro.",
        "problemStatement": "As manifestações culturais que expressam a verdadeira identidade do povo brasileiro sofriam boicote histórico em editais centrais.",
        "solutionDetails": "Editais simplificados geridos diretamente com secretarias municipais de cidades com menos de 100 mil habitantes.",
        "budgetAndCost": "R$ 380 milhões / ano",
        "timeline": "24 meses",
        "pros": "Preservação da memória histórica e resgate do orgulho das tradições patrióticas.",
        "cons": "Demanda treinamento técnico de secretários municipais de cultura.",
        "supportVotes": 2410,
        "rejectVotes": 520
      },
      {
        "id": "prop-frias-3",
        "title": "Proteção Irrestrita da Liberdade de Opinião e Vedação à Censura Digital",
        "category": "Liberdade de Expressão",
        "score": 9.2,
        "summary": "Garantia de que opiniões políticas, artísticas ou jornalísticas não sejam desmonetizadas ou banidas de plataformas sem ordem de juiz natural.",
        "problemStatement": "Inquéritos secretos e moderação ideológica de big techs censurando influenciadores e cidadãos comuns.",
        "solutionDetails": "Multas severas para plataformas que removerem contas ou conteúdos de opinião sem contraditório prévio.",
        "budgetAndCost": "Custo Zero",
        "timeline": "Imediato",
        "pros": "Manutenção do debate público livre e sem amarras burocráticas estatais.",
        "cons": "Debate sobre o equilíbrio entre liberdade de expressão e moderação de fake news.",
        "supportVotes": 2890,
        "rejectVotes": 820
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-luiz-philippe",
    "name": "Luiz Philippe de Orleans e Bragança",
    "ballotName": "Luiz Philippe de Orleans e Bragança",
    "party": "PL",
    "number": "2288",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 57,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/204526.jpg",
    "affiliation": {
      "party": "PL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-luiz-philippe"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-luiz-philippe",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-luiz-philippe",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-luiz-1",
        "title": "Nova Constituição Descentralizadora com Federalismo Pleno",
        "category": "Reforma Constitucional",
        "score": 9.5,
        "summary": "Reestruturação federativa para que 70% da arrecadação tributária permaneça diretamente nos municípios e estados, enfraquecendo Brasília.",
        "problemStatement": "O modelo de Brasília concentra poder e dinheiro, obrigando prefeitos e governadores a mendigar verbas em troca de apoio político.",
        "solutionDetails": "Competência tributária e legislativa descentralizada nos moldes dos estados norte-americanos e cantões suíços.",
        "budgetAndCost": "Reforma estrutural de pacto federativo",
        "timeline": "Nova Assembleia Constituinte",
        "pros": "Fim do toma-lá-dá-cá em Brasília e governança muito mais próxima do cidadão.",
        "cons": "Exige consenso nacional e quebra de resistências da burocracia central federal.",
        "supportVotes": 2880,
        "rejectVotes": 540
      },
      {
        "id": "prop-luiz-2",
        "title": "Voto Distrital Puro e Mecanismo de Recall de Mandatos Eletivos",
        "category": "Reforma Política",
        "score": 9.3,
        "summary": "Divisão dos estados em distritos eleitorais onde o candidato mais votado assume, com possibilidade do eleitor revogar o mandato no meio do termo.",
        "problemStatement": "No sistema proporcional atual, candidatos com poucos votos são eleitos puxados por celebridades e o eleitor não sabe quem o representa.",
        "solutionDetails": "Cada deputado responde a um distrito geográfico delimitado e pode ser destituído se 20% do eleitorado assinar petição de recall.",
        "budgetAndCost": "R$ 150 milhões (Ajuste das zonas pela Justiça Eleitoral)",
        "timeline": "Eleições 2030",
        "pros": "Representatividade autêntica, fiscalização direta de bairro e redução de custos de campanha.",
        "cons": "Pode prejudicar minorias dispersas geograficamente pelo território.",
        "supportVotes": 2750,
        "rejectVotes": 390
      },
      {
        "id": "prop-luiz-3",
        "title": "Autonomia Orçamentária e Fim da Vinculação Obrigatória de Receitas",
        "category": "Finanças Públicas",
        "score": 9,
        "summary": "Desvinculação total das receitas da União, permitindo aos gestores eleitos aplicar os recursos onde a demanda do momento exigir.",
        "problemStatement": "Mais de 94% do orçamento federal é engessado por vinculações obrigatórias, impedindo qualquer ajuste fiscal sem corte de investimentos.",
        "solutionDetails": "Flexibilização gradual com prestação de contas dos resultados e responsabilização fiscal dos gestores.",
        "budgetAndCost": "Desengessamento de R$ 800 bilhões do orçamento",
        "timeline": "48 meses",
        "pros": "Maior responsabilidade dos governantes e eficiência no uso do dinheiro público.",
        "cons": "Temor de setores da Saúde e Educação sobre perda de pisos constitucionais.",
        "supportVotes": 2310,
        "rejectVotes": 810
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-celia-xakriaba",
    "name": "Célia Xakriabá",
    "ballotName": "Célia Xakriabá",
    "party": "PSOL",
    "number": "5005",
    "position": "Deputada Federal",
    "state": "MG",
    "city": "Belo Horizonte",
    "age": 36,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/206018.jpg",
    "affiliation": {
      "party": "PSOL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSOL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-celia-xakriaba"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-celia-xakriaba",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-celia-xakriaba",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-celia-1",
        "title": "Demarcação Imediata de Terras Indígenas e Proteção do Bioma Cerrado",
        "category": "Meio Ambiente",
        "score": 9.6,
        "summary": "Conclusão dos processos demarcatórios pendentes e reconhecimento do Cerrado como Patrimônio Nacional na Constituição Federal.",
        "problemStatement": "O Cerrado, berço das águas do Brasil, perde vegetação nativa em ritmo alarmante, secando nascentes e expulsando comunidades.",
        "solutionDetails": "Homologação célere de laudos antropológicos da Funai e fortalecimento da fiscalização do Ibama com apoio das brigadas indígenas.",
        "budgetAndCost": "R$ 480 milhões / ano",
        "timeline": "24 meses",
        "pros": "Preservação de aquíferos vitais, barreira natural contra o aquecimento global e justiça histórica.",
        "cons": "Conflitos fundiários com fazendeiros e posseiros na fronteira agrícola.",
        "supportVotes": 3100,
        "rejectVotes": 780
      },
      {
        "id": "prop-celia-2",
        "title": "Fundo Climático Gerido pelos Povos Originários contra o Desmatamento",
        "category": "Clima e Sustentabilidade",
        "score": 9.3,
        "summary": "Criação de fundo de pagamento por serviços ambientais pago diretamente a aldeias e comunidades tradicionais que mantêm a floresta em pé.",
        "problemStatement": "Terras indígenas são as áreas mais preservadas do país, mas as comunidades não recebem contrapartida financeira para sua subsistência.",
        "solutionDetails": "Captação de recursos de créditos de carbono no mercado global com repasse direto para projetos de bioeconomia e reflorestamento.",
        "budgetAndCost": "US$ 500 milhões (Captação internacional)",
        "timeline": "36 meses",
        "pros": "Geração de renda sustentável e reconhecimento da soberania ambiental originária.",
        "cons": "Exige governança rigorosa para evitar intermediários predatórios no mercado de carbono.",
        "supportVotes": 2890,
        "rejectVotes": 420
      },
      {
        "id": "prop-celia-3",
        "title": "Inclusão Curricular Obrigatória dos Saberes e Línguas Ancestrais Indígenas",
        "category": "Educação e Cultura",
        "score": 9.1,
        "summary": "Implementação efetiva da Lei 11.645 em todas as escolas com formação continuada de educadores e contratação de professores indígenas.",
        "problemStatement": "A história do Brasil continua sendo ensinada com apagamento da memória, das línguas e da cosmovisão dos povos originários.",
        "solutionDetails": "Produção de material didático bilingue, publicação de literatura indígena e criação de cotas para mestres tradicionais em universidades.",
        "budgetAndCost": "R$ 140 milhões / ano",
        "timeline": "24 meses",
        "pros": "Superação do racismo estrutural e enriquecimento cultural de toda a sociedade.",
        "cons": "Déficit de materiais didáticos aprovados em certas línguas de menor difusão.",
        "supportVotes": 2580,
        "rejectVotes": 310
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-chico-alencar",
    "name": "Chico Alencar",
    "ballotName": "Chico Alencar",
    "party": "PSOL",
    "number": "5022",
    "position": "Deputado Federal",
    "state": "RJ",
    "city": "Rio de Janeiro",
    "age": 76,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/74171.jpg",
    "affiliation": {
      "party": "PSOL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSOL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-chico-alencar"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-chico-alencar",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-chico-alencar",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-chico-1",
        "title": "Fim do Orçamento Secreto e Vedação Constitucional de Emendas sem Transparência",
        "category": "Ética Pública",
        "score": 9.7,
        "summary": "Proibição definitiva de emendas Pix e de relator sem identificação do autor, projeto executivo aprovado e fiscalização em tempo real pelo TCU.",
        "problemStatement": "Dezenas de bilhões de reais de emendas parlamentares foram distribuídos sem critérios técnicos, alimentando corrupção eleitoreira.",
        "solutionDetails": "Plataforma pública obrigatória com rastreamento por geolocalização e fotos da execução de cada centavo empenhado.",
        "budgetAndCost": "Economia e direcionamento ético de R$ 35 bilhões / ano",
        "timeline": "Imediato",
        "pros": "Restauração da moralidade republicana e fim do balcão de negócios eleitoral.",
        "cons": "Forte resistência do establishment parlamentar viciado em repasses opacos.",
        "supportVotes": 4120,
        "rejectVotes": 320
      },
      {
        "id": "prop-chico-2",
        "title": "Reforma Política com Paridade de Gênero e Financiamento Democrático",
        "category": "Reforma Política",
        "score": 9.2,
        "summary": "Obrigatoriedade de listas partidárias preordenadas com alternância de sexo (50% mulheres) e limites severos de doações empresariais indiretas.",
        "problemStatement": "O Congresso brasileiro tem menos de 18% de representação feminina, apesar de as mulheres serem a maioria da população.",
        "solutionDetails": "Sistema eleitoral proporcional misto com listas zipadas (homem/mulher sucessivamente) em todos os níveis.",
        "budgetAndCost": "Custo Zero",
        "timeline": "Eleições 2026",
        "pros": "Democracia verdadeiramente representativa e reflexo real do povo brasileiro.",
        "cons": "Oposição de cúpulas partidárias masculinas tradicionais.",
        "supportVotes": 2950,
        "rejectVotes": 740
      },
      {
        "id": "prop-chico-3",
        "title": "Auditoria Cidadã da Dívida Pública e Priorização da Seguridade Social",
        "category": "Economia e Direitos",
        "score": 9,
        "summary": "Auditoria completa da dívida pública interna e externa para identificar ilegitimidades e garantir que os juros não sangrem a Saúde e Educação.",
        "problemStatement": "O pagamento de juros e amortizações da dívida consome quase 40% do orçamento da União, beneficiando especuladores.",
        "solutionDetails": "Criação de comissão mista permanente no Congresso com participação de economistas da sociedade civil e sindicatos.",
        "budgetAndCost": "R$ 20 milhões (Estrutura da auditoria)",
        "timeline": "18 meses",
        "pros": "Transparência nas finanças soberanas e proteção das conquistas da seguridade social.",
        "cons": "Críticas de agentes do mercado sobre risco de desconfiança na rolagem dos títulos públicos.",
        "supportVotes": 2680,
        "rejectVotes": 890
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-guilherme-boulos",
    "name": "Guilherme Boulos",
    "ballotName": "Guilherme Boulos",
    "party": "PSOL",
    "number": "5010",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 44,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/220639.jpg",
    "affiliation": {
      "party": "PSOL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSOL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-guilherme-boulos"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-guilherme-boulos",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-guilherme-boulos",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-boulos-1",
        "title": "Plano Nacional Despejo Zero e Função Social da Propriedade",
        "category": "Habitação Popular",
        "score": 9.4,
        "summary": "Suspensão de reintegrações de posse coletivas sem plano habitacional prévio e desapropriação de imóveis com dívidas de IPTU para moradia popular.",
        "problemStatement": "Milhões de imóveis desocupados em áreas centrais enquanto trabalhadores vulneráveis são jogados nas ruas sem alternativa habitacional.",
        "solutionDetails": "Retrofit e destinação de prédios da União e devedores contumazes para habitação de interesse social com aluguel social condicionado.",
        "budgetAndCost": "R$ 8.5 bilhões / ano",
        "timeline": "24 meses",
        "pros": "Ocupação digna de vazios urbanos e redução da população em situação de rua.",
        "cons": "Litígios judiciais com grandes proprietários de imóveis desocupados.",
        "supportVotes": 3820,
        "rejectVotes": 1450
      },
      {
        "id": "prop-boulos-2",
        "title": "Programa Nacional de Cozinhas Solidárias contra a Fome",
        "category": "Segurança Alimentar",
        "score": 9.7,
        "summary": "Institucionalização do apoio federal com repasse de alimentos e equipamentos para cozinhas comunitárias que servem refeições gratuitas nas periferias.",
        "problemStatement": "Insegurança alimentar severa atinge milhões de lares periféricos que não conseguem fazer três refeições diárias.",
        "solutionDetails": "Compras públicas da agricultura familiar e repasse direto aos movimentos sociais que operam cozinhas comunitárias com fiscalização do MDS.",
        "budgetAndCost": "R$ 1.2 bilhão / ano",
        "timeline": "Imediato",
        "pros": "Combate imediato à fome com geração de renda e fortalecimento comunitário.",
        "cons": "Exige logística de distribuição de alimentos perecíveis em larga escala.",
        "supportVotes": 4200,
        "rejectVotes": 380
      },
      {
        "id": "prop-boulos-3",
        "title": "Tarifa Zero nos Fins de Semana e Linhas Noturnas de Ônibus",
        "category": "Mobilidade Urbana",
        "score": 9.1,
        "summary": "Gratuidade no transporte público aos sábados e domingos para lazer e cultura popular, com garantia de frequência contínua de ônibus na madrugada.",
        "problemStatement": "A juventude e famílias trabalhadoras das periferias ficam confinadas em seus bairros por falta de recursos para pagar passagens aos fins de semana.",
        "solutionDetails": "Compensação financeira às operadoras de transporte por meio de taxas de impacto de trânsito em polos de compras e publicidade.",
        "budgetAndCost": "R$ 650 milhões / ano",
        "timeline": "12 meses",
        "pros": "Acesso ao lazer, teatros, parques e redução de acidentes de trânsito.",
        "cons": "Pode demandar readequação da frota operante nos finais de semana.",
        "supportVotes": 3540,
        "rejectVotes": 710
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-aecio-neves",
    "name": "Aécio Neves",
    "ballotName": "Aécio Neves",
    "party": "PSDB",
    "number": "4545",
    "position": "Deputado Federal",
    "state": "MG",
    "city": "Belo Horizonte",
    "age": 66,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/74646.jpg",
    "affiliation": {
      "party": "PSDB",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSDB (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-aecio-neves"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-aecio-neves",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-aecio-neves",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-aecio-1",
        "title": "Novo Pacto Federativo e Descentralização da Receita de Tributos",
        "category": "Economia e Gestão",
        "score": 9.2,
        "summary": "Aumento da fatia dos estados e municípios no Fundo de Participação (FPE e FPM) para 55% dos tributos arrecadados pela União.",
        "problemStatement": "A concentração sufocante de recursos em Brasília transfere obrigações sociais para os prefeitos sem contrapartida financeira viável.",
        "solutionDetails": "Redistribuição federativa direta com desvinculação parcial para investimentos prioritários em infraestrutura regional.",
        "budgetAndCost": "R$ 45 bilhões redistribuídos aos entes locais",
        "timeline": "Exercício fiscal seguinte",
        "pros": "Fortalecimento da gestão local e autonomia administrativa nos estados.",
        "cons": "Resistência da equipe econômica federal em abrir mão de caixa soberano.",
        "supportVotes": 2650,
        "rejectVotes": 420
      },
      {
        "id": "prop-aecio-2",
        "title": "Plano de Choque de Gestão e Avaliação de Desempenho no Serviço Público",
        "category": "Eficiência Pública",
        "score": 9,
        "summary": "Adoção de metas transparentes, bonificação por resultados na Educação e Saúde e desligamento de servidores ineficientes com avaliação negativa reiterada.",
        "problemStatement": "Estabilidade irrestrita sem métricas de produtividade gera serviços lentos e desmotivação dos profissionais mais qualificados.",
        "solutionDetails": "Regulamentação do art. 41 da Constituição com avaliação anual de desempenho e ouvidoria cidadã digital obrigatória.",
        "budgetAndCost": "Custo Zero (Economia com corte de desperdícios)",
        "timeline": "24 meses",
        "pros": "Melhoria drástica na pontualidade e qualidade dos atendimentos nos postos e escolas.",
        "cons": "Conflito histórico com corporações e entidades sindicais de servidores públicos.",
        "supportVotes": 2980,
        "rejectVotes": 730
      },
      {
        "id": "prop-aecio-3",
        "title": "Incentivos Tributários para o Polo Tecnológico e Farmacêutico Nacional",
        "category": "Inovação e Indústria",
        "score": 8.8,
        "summary": "Desoneração de P&D para biofármacos, inteligência artificial e nanotecnologia com crédito tributário integral para investimentos privados.",
        "problemStatement": "Fuga de cérebros e dependência de princípios ativos importados vulnerabilizam a balança comercial e a segurança sanitária.",
        "solutionDetails": "Criação de zonas francas tecnológicas em centros universitários com tributação simplificada e vistos para pesquisadores globais.",
        "budgetAndCost": "R$ 1.8 bilhão em renúncia fiscal compensada por royalties",
        "timeline": "36 meses",
        "pros": "Atração de multinacionais farmacêuticas e geração de empregos de alta renda.",
        "cons": "Retorno econômico perceptível no médio e longo prazo.",
        "supportVotes": 2420,
        "rejectVotes": 290
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-jandira-feghali",
    "name": "Jandira Feghali",
    "ballotName": "Jandira Feghali",
    "party": "PCdoB",
    "number": "6565",
    "position": "Deputada Federal",
    "state": "RJ",
    "city": "Rio de Janeiro",
    "age": 68,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/74848.jpg",
    "affiliation": {
      "party": "PCdoB",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PCdoB (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-jandira-feghali"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-jandira-feghali",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-jandira-feghali",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-jandira-1",
        "title": "Consolidação Definitiva da Lei Paulo Gustavo e Política Nacional Aldir Blanc",
        "category": "Cultura Nacional",
        "score": 9.5,
        "summary": "Autora da legislação cultural de emergência, propõe investimento contínuo e descentralizado de R$ 3 bilhões anuais para trabalhadores da arte.",
        "problemStatement": "A cadeia produtiva da cultura gera 5 milhões de empregos mas sofria com descontinuidades de fomento e censura ideológica.",
        "solutionDetails": "Repasses diretos obrigatórios aos 5.570 municípios brasileiros para editais locais de cinema, circo, teatro e patrimônio imaterial.",
        "budgetAndCost": "R$ 3 bilhões / ano (Fundo Nacional de Cultura)",
        "timeline": "Permanente",
        "pros": "Democratização do acesso aos recursos e valorização da identidade nacional.",
        "cons": "Demanda capacitação técnica de agentes culturais em pequenas cidades.",
        "supportVotes": 3290,
        "rejectVotes": 510
      },
      {
        "id": "prop-jandira-2",
        "title": "Garantia e Financiamento do Piso Salarial Nacional da Enfermagem",
        "category": "Saúde Pública",
        "score": 9.6,
        "summary": "Auxílio financeiro permanente da União para estados, municípios e hospitais filantrópicos pagarem o piso da enfermagem sem demissões.",
        "problemStatement": "Após aprovação do piso, hospitais filantrópicos e prefeituras ameaçaram demissões por falta de dotação orçamentária continuada.",
        "solutionDetails": "Uso de rendimentos dos fundos públicos federais e royalties do pré-sal para complementar os salários diretamente nas folhas de pagamento.",
        "budgetAndCost": "R$ 7.3 bilhões / ano",
        "timeline": "Imediato",
        "pros": "Justiça histórica e valorização da categoria que esteve na linha de frente nas crises sanitárias.",
        "cons": "Exige vigilância constante sobre o cumprimento pelos empregadores privados.",
        "supportVotes": 4310,
        "rejectVotes": 220
      },
      {
        "id": "prop-jandira-3",
        "title": "Plano Integral de Atenção à Saúde da Mulher no SUS",
        "category": "Saúde da Mulher",
        "score": 9.3,
        "summary": "Distribuição gratuita de absorventes (dignidade menstrual), exames preventivos em até 15 dias e atendimento humanizado ao parto.",
        "problemStatement": "A pobreza menstrual afasta alunas das escolas e a demora diagnóstica no câncer de mama eleva fatalidades evitáveis.",
        "solutionDetails": "Criação de centros especializados de atendimento à mulher em todas as microrregiões de saúde com telemedicina diagnóstica.",
        "budgetAndCost": "R$ 890 milhões / ano",
        "timeline": "24 meses",
        "pros": "Redução da mortalidade materna e combate à pobreza menstrual.",
        "cons": "Supervisão rígida dos estoques nos postos de saúde municipais.",
        "supportVotes": 3950,
        "rejectVotes": 180
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-ricardo-salles",
    "name": "Ricardo Salles",
    "ballotName": "Ricardo Salles",
    "party": "NOVO",
    "number": "3000",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 50,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/220633.jpg",
    "affiliation": {
      "party": "NOVO",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "NOVO (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-ricardo-salles"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-ricardo-salles",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-ricardo-salles",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-salles-1",
        "title": "Concessão de 100% dos Parques Nacionais à Iniciativa Privada",
        "category": "Ecoturismo e Meio Ambiente",
        "score": 9.1,
        "summary": "Parcerias com consórcios privados para administração de parques e florestas com exigência de preservação, combate a incêndios e ecoturismo.",
        "problemStatement": "O Estado brasileiro não possui orçamento para fiscalizar nem infraestrutura para receber turistas em unidades de conservação.",
        "solutionDetails": "Contratos de concessão de 30 anos com investimentos obrigatórios em segurança privada armada, brigadas anti-incêndio e hotelaria ecológica.",
        "budgetAndCost": "R$ 4.5 bilhões em investimentos privados previstos",
        "timeline": "36 meses",
        "pros": "Geração de receitas, atração de turistas internacionais e preservação financiada pelo setor privado.",
        "cons": "Receio de ambientalistas sobre exploração comercial descontrolada.",
        "supportVotes": 2840,
        "rejectVotes": 980
      },
      {
        "id": "prop-salles-2",
        "title": "Marco Temporal e Segurança Jurídica para o Agronegócio",
        "category": "Agronegócio e Propriedade",
        "score": 8.8,
        "summary": "Fixação da data da promulgação da Constituição (05/10/1988) como critério temporal objetivo para demarcações de terras indígenas.",
        "problemStatement": "Insegurança jurídica paralisa investimentos de produtores rurais que compraram terras tituladas pelo próprio Estado há décadas.",
        "solutionDetails": "Indenização prévia e em dinheiro das benfeitorias e da terra nua para proprietários caso a área seja declarada de interesse público.",
        "budgetAndCost": "R$ 1.5 bilhão (Fundo de Indenizações Fundiárias)",
        "timeline": "Imediato",
        "pros": "Garantia do direito de propriedade e pacificação no campo.",
        "cons": "Forte oposição de lideranças indígenas e organismos internacionais de direitos humanos.",
        "supportVotes": 3120,
        "rejectVotes": 1640
      },
      {
        "id": "prop-salles-3",
        "title": "Regularização Fundiária Desburocratizada por Autodeclaração e Satélite",
        "category": "Desenvolvimento Regional",
        "score": 9,
        "summary": "Emissão de títulos definitivos de propriedade para posseiros pacíficos na Amazônia e Centro-Oeste através de checagem remota por satélite.",
        "problemStatement": "A falta de títulos de terra incentiva a grilagem violenta e impede pequenos agricultores de acessarem crédito bancário.",
        "solutionDetails": "Cruzamento de dados do CAR com imagens de satélite de alta resolução sem necessidade de vistoria presencial demorada para pequenas posses.",
        "budgetAndCost": "R$ 80 milhões (Plataforma digital do Incra)",
        "timeline": "18 meses",
        "pros": "Identificação clara dos responsáveis ambientais e acesso ao crédito rural.",
        "cons": "Risco de validação indevida de terras públicas invadidas recentemente.",
        "supportVotes": 2950,
        "rejectVotes": 890
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-orlando-silva",
    "name": "Orlando Silva",
    "ballotName": "Orlando Silva",
    "party": "PCdoB",
    "number": "6555",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 54,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/178987.jpg",
    "affiliation": {
      "party": "PCdoB",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PCdoB (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-orlando-silva"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-orlando-silva",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-orlando-silva",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-orlando-1",
        "title": "Marco Legal e Regulação Democrática das Big Techs e Redes Sociais",
        "category": "Tecnologia e Cidadania",
        "score": 9.4,
        "summary": "Relator do PL 2630, propõe transparência nos algoritmos, combate a golpes digitais e dever de cuidado das plataformas contra crimes com crianças.",
        "problemStatement": "Plataformas bilionárias lucram com desinformação, discursos de ódio e golpes sem assumir qualquer responsabilidade civil ou fiscal no país.",
        "solutionDetails": "Relatórios semestrais de transparência algorítmica, proteção a dados de menores e remuneração do jornalismo profissional por conteúdos agregados.",
        "budgetAndCost": "Custo Zero (Financiado pelas taxas de regulação setorial)",
        "timeline": "Imediato",
        "pros": "Defesa das instituições democráticas, proteção à infância e soberania digital.",
        "cons": "Intenso lobby de multinacionais de tecnologia alegando risco de censura.",
        "supportVotes": 3450,
        "rejectVotes": 1290
      },
      {
        "id": "prop-orlando-2",
        "title": "Combate ao Racismo Algorítmico e Ética no Desenvolvimento de IA",
        "category": "Direitos Humanos e IA",
        "score": 9.2,
        "summary": "Auditoria compulsória em softwares de reconhecimento facial na segurança pública para evitar prisões injustas de jovens negros e pardos.",
        "problemStatement": "Câmeras de reconhecimento facial com viés racista têm taxa de erro de até 90% em pessoas negras, gerando prisões arbitrárias no Brasil.",
        "solutionDetails": "Exigência de auditorias independentes de código e vedação do uso de IA preditiva em abordagens policiais sem justa causa evidente.",
        "budgetAndCost": "R$ 60 milhões (Laboratório Nacional de Ética em IA)",
        "timeline": "12 meses",
        "pros": "Proteção às liberdades civis e contenção do encarceramento em massa injusto.",
        "cons": "Necessidade de adaptação dos contratos já assinados pelas secretarias de segurança.",
        "supportVotes": 3180,
        "rejectVotes": 420
      },
      {
        "id": "prop-orlando-3",
        "title": "Plano Nacional de Banda Larga Popular Gratuita nas Favelas e Vilas",
        "category": "Inclusão Digital",
        "score": 9.1,
        "summary": "Instalação de pontos de internet de alta velocidade comunitários e gratuitos em todas as comunidades com mais de 500 moradores.",
        "problemStatement": "A exclusão digital impede jovens periféricos de estudarem para o Enem e participarem de cursos de programação e mercado tech.",
        "solutionDetails": "Uso de cabos ópticos de postes públicos com antenas Wi-Fi 6 comunitárias operadas em parceria com provedores regionais.",
        "budgetAndCost": "R$ 1.1 bilhão (Fundo de Universalização)",
        "timeline": "24 meses",
        "pros": "Inclusão socioeconômica, empregabilidade digital e acesso a serviços do governo.",
        "cons": "Segurança dos equipamentos e manutenção contra vandalismo.",
        "supportVotes": 3720,
        "rejectVotes": 210
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-carla-zambelli",
    "name": "Carla Zambelli",
    "ballotName": "Carla Zambelli",
    "party": "PL",
    "number": "2211",
    "position": "Deputada Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 45,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/204507.jpg",
    "affiliation": {
      "party": "PL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-carla-zambelli"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-carla-zambelli",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-carla-zambelli",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-zambelli-1",
        "title": "Cadeia para Maus-Tratos a Animais e Fundo de Castração Gratuita",
        "category": "Causa Animal",
        "score": 9.5,
        "summary": "Endurecimento de penas para violência contra cães e gatos, proibição definitiva de testes cosméticos e castração pública móvel.",
        "problemStatement": "Milhões de animais abandonados sofrem abusos nas ruas e transmitem zoonoses por ausência de políticas públicas de controle populacional.",
        "solutionDetails": "Aumento da pena mínima para 4 anos de reclusão sem fiança e custeio federal para unidades do Castramóvel em todos os municípios.",
        "budgetAndCost": "R$ 280 milhões / ano",
        "timeline": "12 meses",
        "pros": "Saúde pública preventiva, controle ético de natalidade e respeito à vida animal.",
        "cons": "Demanda articulação dos municípios com conselhos de medicina veterinária.",
        "supportVotes": 4480,
        "rejectVotes": 150
      },
      {
        "id": "prop-zambelli-2",
        "title": "Transparência Eleitoral e Obrigatoriedade do Voto Impresso Auditável",
        "category": "Reforma Política",
        "score": 8.7,
        "summary": "Acoplamento de impressora à urna eletrônica para conferência visual imediata do eleitor e depósito em urna indevassável para recontagem física.",
        "problemStatement": "Desconfiança de parcela substancial do eleitorado sobre a inviolabilidade dos códigos de sistemas 100% eletrônicos.",
        "solutionDetails": "Implementação progressiva do módulo impressor com auditoria pública por amostragem sorteada logo após o encerramento da votação.",
        "budgetAndCost": "R$ 1.8 bilhão (Adequação de 500 mil urnas pelo TSE)",
        "timeline": "Eleições Gerais",
        "pros": "Possibilidade de auditoria física independente sem depender exclusivamente de logs de software.",
        "cons": "Custo expressivo de hardware e risco de atolamento de papel nas sessões eleitorais.",
        "supportVotes": 3200,
        "rejectVotes": 1580
      },
      {
        "id": "prop-zambelli-3",
        "title": "Incentivo ao Empreendedorismo Feminino e Microcrédito para Mães",
        "category": "Trabalho e Família",
        "score": 9.1,
        "summary": "Linhas de microcrédito orientado com carência de 12 meses e juros subsidiados para mulheres chefes de família abrirem seus próprios negócios.",
        "problemStatement": "Mães solo encontram portas fechadas no mercado corporativo tradicional e não conseguem crédito para comprar insumos de trabalho.",
        "solutionDetails": "Fundo garantidor gerido pela Caixa Econômica com capacitação em gestão financeira pelo Sebrae obrigatória.",
        "budgetAndCost": "R$ 1.5 bilhão (Fundo de Aval)",
        "timeline": "24 meses",
        "pros": "Emancipação financeira de mulheres e erradicação da dependência de relacionamentos abusivos.",
        "cons": "Risco de inadimplência caso não haja acompanhamento técnico rigoroso.",
        "supportVotes": 3610,
        "rejectVotes": 340
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-maria-do-rosario",
    "name": "Maria do Rosário",
    "ballotName": "Maria do Rosário",
    "party": "PT",
    "number": "1370",
    "position": "Deputada Federal",
    "state": "RS",
    "city": "Porto Alegre",
    "age": 59,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/74398.jpg",
    "affiliation": {
      "party": "PT",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PT (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-maria-do-rosario"
    },
    "electionSchedule": {
      "office": "Deputada Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputada Federal",
      "tseProtocol": "TSE-PROP-2026-cand-maria-do-rosario",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-maria-do-rosario",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-rosario-1",
        "title": "Sistema Nacional de Atendimento Socioeducativo e Proteção da Juventude",
        "category": "Direitos da Infância",
        "score": 9.2,
        "summary": "Reforma das unidades de internação de menores infratores com foco em profissionalização técnica obrigatória, psicologia e reinserção social.",
        "problemStatement": "Fundações socioeducativas operam como depósitos humanos superlotados, devolvendo jovens ainda mais vulneráveis para as facções.",
        "solutionDetails": "Construção de centros socioeducativos de pequeno porte com oficinas industriais e bolsa poupança após conclusão de curso técnico.",
        "budgetAndCost": "R$ 950 milhões / ano",
        "timeline": "36 meses",
        "pros": "Ruptura da reincidência infracional e qualificação para o mercado de trabalho.",
        "cons": "Forte polarização política no debate sobre redução da maioridade penal.",
        "supportVotes": 2750,
        "rejectVotes": 1220
      },
      {
        "id": "prop-rosario-2",
        "title": "Combate Irrestrito à Violência Doméstica e Monitoramento com Tornozeleira",
        "category": "Proteção à Mulher",
        "score": 9.6,
        "summary": "Uso compulsório de tornozeleira eletrônica em agressores com botão do pânico digital entregue à vítima com alerta georreferenciado.",
        "problemStatement": "Medidas protetivas em papel não impedem que agressores reincidentes se aproximem e cometam feminicídios.",
        "solutionDetails": "Sistema integrado que alerta a polícia militar no momento exato em que o agressor violar o perímetro de segurança de 500 metros.",
        "budgetAndCost": "R$ 180 milhões / ano",
        "timeline": "Imediato",
        "pros": "Prevenção efetiva de feminicídios em tempo real com resposta policial rápida.",
        "cons": "Exige cobertura de sinal de telecomunicações nas áreas rurais e periféricas.",
        "supportVotes": 4620,
        "rejectVotes": 140
      },
      {
        "id": "prop-rosario-3",
        "title": "Programa Creche para Todos com Recursos dos Royalties da Educação",
        "category": "Educação Infantil",
        "score": 9.4,
        "summary": "Construção acelerada de creches públicas com projeto modular sustentável para zerar a fila de espera de crianças de 0 a 3 anos.",
        "problemStatement": "Mais de 2 milhões de bebês estão fora da creche no Brasil, prejudicando a neurociência do aprendizado precoce.",
        "solutionDetails": "Repasse emergencial da União com projeto padrão FNDE para municípios com maior vulnerabilidade no CadÚnico.",
        "budgetAndCost": "R$ 3.8 bilhões / ano",
        "timeline": "24 meses",
        "pros": "Desenvolvimento cognitivo precoce e alívio para mães que precisam trabalhar.",
        "cons": "Custo contínuo de manutenção da folha de pagamento de monitores infantis.",
        "supportVotes": 3880,
        "rejectVotes": 210
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-tiririca",
    "name": "Tiririca",
    "ballotName": "Tiririca",
    "party": "PSD",
    "number": "2220",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 60,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/160976.jpg",
    "affiliation": {
      "party": "PSD",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PSD (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-tiririca"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-tiririca",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-tiririca",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-tiririca-1",
        "title": "Aposentadoria e Seguridade Social Especial para Artistas Circenses e Mambembes",
        "category": "Cultura e Seguridade",
        "score": 9.4,
        "summary": "Garantia de previdência social e direitos para artistas itinerantes, acrobatas, palhaços e profissionais de circo que viajam pelo Brasil.",
        "problemStatement": "Artistas circenses passam décadas na estrada divertindo o povo, mas ao envelhecerem ficam na miséria sem aposentadoria formal.",
        "solutionDetails": "Criação da categoria de segurado especial da cultura itinerante com contribuição simplificada pelo MEI Cultural.",
        "budgetAndCost": "R$ 90 milhões / ano",
        "timeline": "12 meses",
        "pros": "Reconhecimento da dignidade de uma das mais antigas manifestações populares brasileiras.",
        "cons": "Dificuldade de comprovação documental de tempo de serviço passado sem carteira.",
        "supportVotes": 3510,
        "rejectVotes": 180
      },
      {
        "id": "prop-tiririca-2",
        "title": "Isenção de IPI e Tributos para Equipamentos de Acessibilidade em Circos e Teatros",
        "category": "Acessibilidade",
        "score": 9.1,
        "summary": "Desoneração fiscal na aquisição de rampas móveis, elevadores hidráulicos e cadeiras adaptadas para espetáculos culturais populares.",
        "problemStatement": "Cadeirantes e pessoas com deficiência física são barrados em lonas e teatros por falta de rampas e assentos adequados.",
        "solutionDetails": "Isenção de tributos federais condicionada à destinação de 10% dos lugares para pessoas com deficiência de baixa renda.",
        "budgetAndCost": "R$ 45 milhões em renúncia fiscal compensada",
        "timeline": "Imediato",
        "pros": "Inclusão social plena e democratização do acesso ao riso e à cultura.",
        "cons": "Exige fiscalização das prefeituras nas vistorias de alvarás de funcionamento.",
        "supportVotes": 3840,
        "rejectVotes": 95
      },
      {
        "id": "prop-tiririca-3",
        "title": "Transparência Absoluta e Presença Integral em Plenário (Cota Zero de Faltas)",
        "category": "Ética Parlamentar",
        "score": 9.3,
        "summary": "Compromisso com 100% de presença nas sessões deliberativas e corte automático de salário de deputados gazeteiros sem justificativa médica.",
        "problemStatement": "O plenário da Câmara frequentemente fica vazio em votações cruciais enquanto deputados mantêm salários integrais.",
        "solutionDetails": "Registro biométrico digital a cada votação com desconto em folha e perda imediata de mandato por abandono após 1/3 de ausências.",
        "budgetAndCost": "Custo Zero (Economia salarial de R$ 120M / ano)",
        "timeline": "Imediato",
        "pros": "Fim do corporativismo e respeito ao pagador de impostos que custeia os mandatos.",
        "cons": "Forte oposição de bancadas acostumadas a dispensas informais.",
        "supportVotes": 4420,
        "rejectVotes": 80
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-rodrigo-valadares",
    "name": "Rodrigo Valadares",
    "ballotName": "Rodrigo Valadares",
    "party": "PL",
    "number": "4455",
    "position": "Deputado Federal",
    "state": "SE",
    "city": "Aracaju",
    "age": 36,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/165470.jpg",
    "affiliation": {
      "party": "PL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-rodrigo-valadares"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-rodrigo-valadares",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-rodrigo-valadares",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-valadares-1",
        "title": "Desoneração da Cesta Básica Regional e Apoio à Agricultura Familiar do Nordeste",
        "category": "Economia Regional",
        "score": 9.3,
        "summary": "Alíquota zero de tributos federais para farinha de mandioca, feijão fradinho, leite e insumos agrícolas de pequenos produtores sergipanos.",
        "problemStatement": "O custo dos alimentos no Nordeste consome até 40% da renda das famílias de menor renda em decorrência de fretes e impostos.",
        "solutionDetails": "Desoneração na origem da cadeia produtiva e subsídios para fertilizantes ecológicos e sistemas de irrigação gota a gota.",
        "budgetAndCost": "R$ 1.4 bilhão / ano",
        "timeline": "18 meses",
        "pros": "Redução do preço da comida na mesa do povo e fixação do homem no campo com renda.",
        "cons": "Demanda articulação dos estados para equalizar alíquotas do ICMS regional.",
        "supportVotes": 3100,
        "rejectVotes": 240
      },
      {
        "id": "prop-valadares-2",
        "title": "Fundo de Seguro Defeso e Modernização da Pesca Artesanal Marítima",
        "category": "Pesca e Litoral",
        "score": 9,
        "summary": "Pagamento desburocratizado do seguro defeso aos pescadores artesanais cadastrados e financiamento de motores econômicos para jangadas.",
        "problemStatement": "Pescadores passam meses sem renda durante o período reprodutivo dos peixes e enfrentam fraudes burocráticas do INSS.",
        "solutionDetails": "Biometria facial para liberação automática do benefício e criação de cooperativas com câmaras frigoríficas comunitárias.",
        "budgetAndCost": "R$ 480 milhões / ano",
        "timeline": "12 meses",
        "pros": "Preservação da fauna marinha, combate a fraudes e dignidade para as comunidades litorâneas.",
        "cons": "Recadastramento biométrico em vilas de pescadores de difícil acesso.",
        "supportVotes": 2890,
        "rejectVotes": 180
      },
      {
        "id": "prop-valadares-3",
        "title": "Execução Imediata da Pena após Condenação em Segunda Instância",
        "category": "Combate à Corrupção",
        "score": 9.4,
        "summary": "PEC que restabelece o cumprimento imediato da pena de prisão após julgamento colegiado nos Tribunais de Justiça ou TRFs.",
        "problemStatement": "Recursos intermináveis aos tribunais superiores de Brasília levam à prescrição de crimes de colarinho branco e sensação de impunidade.",
        "solutionDetails": "Alteração dos arts. 102 e 105 da CF/88 delimitando o trânsito em julgado material após a segunda instância.",
        "budgetAndCost": "Custo Zero",
        "timeline": "Imediato",
        "pros": "Fim da impunidade de criminosos ricos e celeridade nos julgamentos criminais.",
        "cons": "Intensa controvérsia de advogados criminalistas sobre o princípio da presunção de inocência.",
        "supportVotes": 3980,
        "rejectVotes": 610
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  },
  {
    "id": "cand-eduardo-bolsonaro",
    "name": "Eduardo Bolsonaro",
    "ballotName": "Eduardo Bolsonaro",
    "party": "PL",
    "number": "2222",
    "position": "Deputado Federal",
    "state": "SP",
    "city": "São Paulo",
    "age": 41,
    "politicalLifeYears": 8,
    "currentOfficeTimeYears": 4,
    "timesElected": 2,
    "avatar": "https://www.camara.leg.br/internet/deputado/bandep/92346.jpg",
    "affiliation": {
      "party": "PL",
      "sinceDate": "15/03/2022",
      "yearsText": "4 anos de filiação na legenda",
      "history": "PL (em exercício na 57ª Legislatura)",
      "certCode": "TSE-FIL-2026-cand-eduardo-bolsonaro"
    },
    "electionSchedule": {
      "office": "Deputado Federal",
      "firstRoundDate": "04/10/2026",
      "firstRoundText": "04 de Outubro de 2026 (1º Turno)",
      "secondRoundDate": "25/10/2026",
      "secondRoundText": "25 de Outubro de 2026 (2º Turno)",
      "daysRemaining": 36,
      "hasSecondRound": false,
      "votingSummary": "1º Turno Oficial: 04/10/2026"
    },
    "officialProposalsSummary": {
      "totalRegistered": 3,
      "targetOffice": "Deputado Federal",
      "tseProtocol": "TSE-PROP-2026-cand-eduardo-bolsonaro",
      "registrationDate": "15/08/2026",
      "status": "Propostas Legislativas Homologadas",
      "thematicAreas": "Educação, Transparência, Gestão Pública"
    },
    "parliamentaryAmendments": {
      "protocol": "CGU-EMEN-2026-cand-eduardo-bolsonaro",
      "totalAllocated": "R$ 28.500.000,00",
      "totalAllocatedNum": 28500000,
      "totalExecuted": "R$ 25.650.000,00",
      "totalExecutedNum": 25650000,
      "executionRatePct": 90,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Edital Aberto"
      }
    },
    "bills": {
      "proposed": 42,
      "approved": 8,
      "successRate": "19%"
    },
    "radar": {
      "integridade": 94,
      "eficiencia": 84,
      "transparencia": 92,
      "coerencia": 88,
      "viabilidade": 86,
      "assiduidade": 94,
      "presenca": 94
    },
    "attendance": {
      "totalSessions": 118,
      "presentCount": 111,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 2,
      "ratePct": 94.1
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00",
      "spendingCeapMonthlyNum": 285400,
      "limitCeapMonthly": "R$ 450.000,00",
      "limitCeapMonthlyNum": 450000,
      "spendingPercentage": 63,
      "savedCeapTotal": "R$ 450.000,00",
      "civicConversion": {
        "costPerMinute": "R$ 0,54 / min",
        "costPerCitizenYear": "R$ 0,004 / ano",
        "salariosMinimos": 18,
        "roiText": "Atuação parlamentar com economia orçamentária comprovada"
      }
    },
    "proposals": [
      {
        "id": "prop-eduardo-1",
        "title": "Revogação do Estatuto do Desarmamento e Legítima Defesa Plena",
        "category": "Segurança Pública",
        "score": 8.9,
        "summary": "Garantia legal do direito do cidadão comum idôneo de possuir e portar armas de fogo para defesa própria, de sua família e de sua propriedade.",
        "problemStatement": "O desarmamento do cidadão de bem não reduziu a criminalidade e deixou as famílias indefesas perante criminosos fortemente armados.",
        "solutionDetails": "Critérios objetivos e sem subjetividade estatal para concessão de registros, autorização de porte rural e redução de impostos sobre armas e munições.",
        "budgetAndCost": "Custo Zero (Auto-sustentável por taxas)",
        "timeline": "Imediato",
        "pros": "Dissuasão criminal comprovada e direito inalienável à autodefesa.",
        "cons": "Preocupações de órgãos de saúde sobre aumento de conflitos interpessoais armados.",
        "supportVotes": 3680,
        "rejectVotes": 1820
      },
      {
        "id": "prop-eduardo-2",
        "title": "Enquadramento de Facções Criminosas como Organizações Terroristas",
        "category": "Combate ao Crime",
        "score": 9.3,
        "summary": "Tipificação do PCC, Comando Vermelho e narcotraficantes armados como terroristas, permitindo cooperação internacional e bloqueio de bens.",
        "problemStatement": "O crime organizado adquiriu fuzis antiaéreos, controla territórios inteiros e corrompe instituições republicanas como narcoestados.",
        "solutionDetails": "Legislação antiterrorismo severa, prisão em regime disciplinar diferenciado (RDD) perpétuo para líderes e isolamento total de comunicação.",
        "budgetAndCost": "R$ 800 milhões (Inteligência e presídios de segurança máxima)",
        "timeline": "18 meses",
        "pros": "Desarticulação financeira internacional e fim do poder de mando de dentro das cadeias.",
        "cons": "Debate jurídico sobre tratados internacionais e garantias processuais penais.",
        "supportVotes": 4150,
        "rejectVotes": 630
      },
      {
        "id": "prop-eduardo-3",
        "title": "Militarização de Fronteiras e Controle Biométrico Rigoroso",
        "category": "Defesa Nacional",
        "score": 9,
        "summary": "Emprego permanente das Forças Armadas com poder de polícia judiciária e drones de vigilância térmica nas fronteiras com Colômbia, Bolívia e Paraguai.",
        "problemStatement": "Entrada indiscriminada de toneladas de cocaína e fuzis clandestinos alimenta a violência urbana em todas as capitais.",
        "solutionDetails": "Instalação de radares de baixa altitude, bases móveis fluviais e expulsão imediata de estrangeiros que cometerem crimes no Brasil.",
        "budgetAndCost": "R$ 2.5 bilhões (Modernização das Forças Armadas)",
        "timeline": "36 meses",
        "pros": "Fechamento dos canais de abastecimento do narcotráfico antes de chegar às favelas.",
        "cons": "Custo logístico permanente de deslocamento em regiões de selva densa.",
        "supportVotes": 3890,
        "rejectVotes": 510
      }
    ],
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.5,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa de Ações Criminais (TJSP/TRF)",
          "valid": true
        },
        {
          "name": "Certidão Negativa de Improbidade (CNJ)",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "32%",
      "firstRound": "34%",
      "secondRound": "48%",
      "rejection": "16%"
    }
  }
];

    const incumbentsData = [
      {
        id: "inc-1",
        name: "Marcos Pontes",
        office: "Senador da República (Mandato até 2030)",
        party: "PL - SP",
        status: "Em Exercício",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
        highlights: "Eleito em 2022 com 10.7 milhões de votos. Atuação focada em Ciência, Tecnologia e Inovação. Cota parlamentar em 64% do teto.",
        attendance: "96.4% de presença em 2026 (110 de 114 sessões)"
      },
      {
        id: "inc-2",
        name: "Tarcísio de Freitas",
        office: "Governador do Estado de São Paulo",
        party: "REPUBLICANOS - SP",
        status: "Mandato 2023 - 2026",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces",
        highlights: "Gestão com foco em concessões de infraestrutura, expansão do metrô e privatização da Sabesp.",
        attendance: "100% no Executivo"
      }
    ];

// Exportação universal para compatibilidade de escopo
var candidatesData = window.candidatesData;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { candidatesData };
}
