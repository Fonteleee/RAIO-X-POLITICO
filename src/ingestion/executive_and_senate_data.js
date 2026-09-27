// Ingestão Estruturada de Lideranças do Executivo e Senado 2026

const EXECUTIVE_AND_SENATE_POLITICIANS = [
  {
    "id": "cand-lula",
    "name": "Luiz Inácio Lula da Silva",
    "ballotName": "Lula",
    "party": "PT",
    "number": "13",
    "position": "Presidente da República",
    "state": "BR",
    "city": "Brasília / São Paulo",
    "age": 79,
    "publicLifeYears": 46,
    "timesElected": 4,
    "avatar": "img/candidates/cand-lula.jpg",
    "education": "Torneiro Mecânico (SENAI) • Doutor Honoris Causa por mais de 30 universidades",
    "careerHistory": "Líder Sindical dos Metalúrgicos do ABC (1975-1980), Deputado Federal Constituinte (1987-1991), Presidente da República (2003-2010 e 2023-atual).",
    "aiSummary": "Candidato à Reeleição à Presidência da República em 2026 pelo PT. 39º Presidente do Brasil, busca o quarto mandato com foco no aumento real do salário mínimo, isenção de IR para rendas até R$ 5.000, transição energética e protagonismo internacional do Sul Global.",
    "overallScore": 68,
    "radar": {
      "integridade": 71,
      "eficiencia": 59,
      "transparencia": 70,
      "coerencia": 69,
      "viabilidade": 69,
      "presenca": 87,
      "assiduidade": 87
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 240,
      "totalSessions": 245,
      "justifiedAbsences": 5,
      "unjustifiedAbsences": 0,
      "committees": [
        "Conselho de Desenvolvimento Econômico e Social (Conselhão)"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 33.763,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,06 / min",
        "costPerCitizen": "R$ 0,0002 / ano",
        "salariosMinimos": 24,
        "roiText": "Execução do Orçamento da União de R$ 5,5 trilhões"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PR-ORC-2026-LULA",
      "totalAllocated": "R$ 54.000.000.000,00",
      "totalAllocatedNum": 54000000000,
      "totalExecuted": "R$ 48.600.000.000,00",
      "totalExecutedNum": 48600000000,
      "executionRatePct": 90,
      "openBidPct": 98,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Execução Fiscal Auditada (TCU)"
      }
    },
    "bills": {
      "proposed": 85,
      "approved": 34,
      "successRate": "40%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        },
        {
          "name": "Certidão Negativa STF/STJ",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "37%",
      "quaest": "36%",
      "firstRound": "37%",
      "secondRound": "49%",
      "rejection": "42%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Isenção de Imposto de Renda para até R$ 5.000",
        "theme": "Economia",
        "desc": "Justiça tributária com desoneração das famílias trabalhadoras e taxação de super-ricos."
      },
      {
        "id": 2,
        "title": "Novo PAC e Reindustrialização Verde",
        "theme": "Indústria",
        "desc": "Transição energética, matriz de hidrogênio verde e grandes obras de infraestrutura."
      },
      {
        "id": 3,
        "title": "Fortalecimento do SUS e Programa Mais Especialistas",
        "theme": "Saúde",
        "desc": "Redução das filas de exames especializados e consultas eletivas na rede pública."
      }
    ],
    "currentOffice": "Presidente da República (Candidato à Reeleição 2026)"
  },
  {
    "id": "cand-jair-bolsonaro",
    "name": "Jair Messias Bolsonaro",
    "ballotName": "Jair Bolsonaro",
    "party": "PL",
    "number": "22",
    "position": "Ex-Presidente da República",
    "state": "RJ",
    "city": "Rio de Janeiro / Brasília",
    "age": 70,
    "publicLifeYears": 36,
    "timesElected": 8,
    "avatar": "img/candidates/cand-jair-bolsonaro.jpg",
    "education": "Oficial de Artilharia (Academia Militar das Agulhas Negras - AMAN) e Educação Física (EsEFEx)",
    "careerHistory": "Capitão do Exército (Reserva), Vereador do Rio de Janeiro (1989-1991), Deputado Federal por 7 mandatos (1991-2018), 38º Presidente da República (2019-2022).",
    "aiSummary": "38º Presidente da República do Brasil (2019-2022). Declarado inelegível pelo Tribunal Superior Eleitoral até 2030, atua como principal articulador político e cabo eleitoral do Partido Liberal nas Eleições 2026 em apoio à chapa de Flávio Bolsonaro.",
    "overallScore": 57,
    "radar": {
      "integridade": 30,
      "eficiencia": 61,
      "transparencia": 70,
      "coerencia": 69,
      "viabilidade": 69,
      "presenca": 86,
      "assiduidade": 86
    },
    "attendance": {
      "ratePct": 96,
      "presentCount": 232,
      "totalSessions": 242,
      "justifiedAbsences": 10,
      "unjustifiedAbsences": 0,
      "committees": [
        "Conselho de Defesa Nacional"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 33.763,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,06 / min",
        "costPerCitizen": "R$ 0,0002 / ano",
        "salariosMinimos": 24,
        "roiText": "Gestão Orçamentária Federal e Superávit Primário"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PR-ORC-2022-BOLSONARO",
      "totalAllocated": "R$ 45.000.000.000,00",
      "totalAllocatedNum": 45000000000,
      "totalExecuted": "R$ 42.100.000.000,00",
      "totalExecutedNum": 42100000000,
      "executionRatePct": 93.5,
      "openBidPct": 96,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Prestação de Contas Presidencial"
      }
    },
    "bills": {
      "proposed": 172,
      "approved": 28,
      "successRate": "16%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.8,
      "status": "Sob Análise Judicial",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa Criminal Eleitoral",
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
      "quaest": "35%",
      "firstRound": "34%",
      "secondRound": "46%",
      "rejection": "45%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Apoio à Candidatura Presidencial de Flávio Bolsonaro (PL)",
        "theme": "Articulação",
        "desc": "Mobilização nacional da base conservadora e palanques estaduais do PL em 2026."
      },
      {
        "id": 2,
        "title": "Defesa de Anistia Ampla e Liberdades Civis",
        "theme": "Direito",
        "desc": "Proposição legislativa de anistia aos envolvidos nos atos do 8 de Janeiro."
      },
      {
        "id": 3,
        "title": "Pautas da Família e Liberdade Econômica",
        "theme": "Valores",
        "desc": "Preservação de valores tradicionais, direito de defesa e redução da interferência estatal."
      }
    ],
    "currentOffice": "Inelegível pelo TSE (Acórdão Aije 0600814-85)"
  },
  {
    "id": "cand-tarcisio-de-freitas",
    "name": "Tarcísio Gomes de Freitas",
    "ballotName": "Tarcísio de Freitas",
    "party": "REPUBLICANOS",
    "number": "10",
    "position": "Governador",
    "state": "SP",
    "city": "São Paulo, SP",
    "age": 50,
    "publicLifeYears": 16,
    "timesElected": 1,
    "avatar": "img/candidates/cand-tarcisio-de-freitas.jpg",
    "education": "Engenharia Civil (Instituto Militar de Engenharia - IME), Pós-Graduado em Gerenciamento de Projetos (FGV)",
    "careerHistory": "Oficial de Engenharia do Exército, Diretor-Geral do DNIT (2011-2015), Ministro da Infraestrutura (2019-2022), Governador do Estado de São Paulo (2023-atual).",
    "aiSummary": "Candidato à Reeleição ao Governo do Estado de São Paulo em 2026 pelo Republicanos. Engenheiro militar e ex-ministro da Infraestrutura, lidera com plano centrado em privatizações (SABESP concluída), concessões ferroviárias e combate ao crime organizado.",
    "overallScore": 79,
    "radar": {
      "integridade": 81,
      "eficiencia": 79,
      "transparencia": 77,
      "coerencia": 75,
      "viabilidade": 76,
      "presenca": 84,
      "assiduidade": 84
    },
    "attendance": {
      "ratePct": 99,
      "presentCount": 250,
      "totalSessions": 252,
      "justifiedAbsences": 2,
      "unjustifiedAbsences": 0,
      "committees": [
        "Conselho Gestor de PPPs e Concessões de SP"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 34.572,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,0007 / ano",
        "salariosMinimos": 25,
        "roiText": "Gestão do Orçamento Estadual de R$ 328 bilhões de SP"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "GOV-SP-2026-TARCISIO",
      "totalAllocated": "R$ 38.500.000.000,00",
      "totalAllocatedNum": 38500000000,
      "totalExecuted": "R$ 36.200.000.000,00",
      "totalExecutedNum": 36200000000,
      "executionRatePct": 94,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Auditado pelo TCE-SP"
      }
    },
    "bills": {
      "proposed": 64,
      "approved": 42,
      "successRate": "65%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.2,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJSP",
          "valid": true
        },
        {
          "name": "Tribunal de Contas do Estado (TCE-SP)",
          "valid": true
        },
        {
          "name": "Justiça Eleitoral de SP",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "36%",
      "quaest": "35%",
      "firstRound": "36%",
      "secondRound": "47%",
      "rejection": "29%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Trem Intercidades (TIC) Campinas e Vale do Paraíba",
        "theme": "Mobilidade",
        "desc": "Construção da malha ferroviária de passageiros de alta e média velocidade no estado."
      },
      {
        "id": 2,
        "title": "Muralha Paulista: Cerco Eletrônico Total com IA",
        "theme": "Segurança",
        "desc": "Integração de câmeras e reconhecimento facial nas divisas e rodovias de SP."
      },
      {
        "id": 3,
        "title": "Atração de Investimentos e Desestatizações Estratégicas",
        "theme": "Economia",
        "desc": "Novas rodadas de concessões e desregulamentação para atração de capitais privados."
      }
    ],
    "currentOffice": "Governador de São Paulo (Candidato à Reeleição 2026)"
  },
  {
    "id": "cand-ciro-gomes",
    "name": "Ciro Ferreira Gomes",
    "ballotName": "Ciro Gomes",
    "party": "PSDB",
    "number": "45",
    "position": "Governador",
    "state": "CE",
    "city": "Fortaleza / Sobral",
    "age": 68,
    "publicLifeYears": 42,
    "timesElected": 6,
    "avatar": "img/candidates/cand-ciro-gomes.jpg",
    "education": "Direito (Universidade Federal do Ceará - UFC) • Professor Visitante da Harvard Law School",
    "careerHistory": "Prefeito de Fortaleza (1989-1990), Governador do Ceará (1991-1994), Ministro da Fazenda (1994-1995, Plano Real), Ministro da Integração Nacional (2003-2006, Transposição do São Francisco), Deputado Federal (2007-2011).",
    "aiSummary": "Candidato ao Governo do Ceará em 2026 pelo PSDB. Ex-governador do Ceará (1991-1994), ex-ministro da Fazenda e da Integração Nacional. Lidera a oposição no estado com foco em combate às facções criminosas, reestruturação da saúde regional e expansão do modelo educacional de Sobral.",
    "overallScore": 75,
    "radar": {
      "integridade": 77,
      "eficiencia": 68,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 86,
      "assiduidade": 86
    },
    "attendance": {
      "ratePct": 95,
      "presentCount": 220,
      "totalSessions": 232,
      "justifiedAbsences": 12,
      "unjustifiedAbsences": 0,
      "committees": [
        "Fórum Nacional de Desenvolvimento"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 0,00 (Sem Mandato Ativo)",
      "spendingCeapSavings": "R$ 100%",
      "spendingPercentage": 0,
      "civicConversion": {
        "costPerMinute": "R$ 0,00",
        "costPerCitizen": "R$ 0,00",
        "salariosMinimos": 0,
        "roiText": "Atuação Consultiva e Acadêmica Cívica"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PND-2026-CIRO",
      "totalAllocated": "R$ 0,00",
      "totalAllocatedNum": 0,
      "totalExecuted": "R$ 0,00",
      "totalExecutedNum": 0,
      "executionRatePct": 100,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300",
        "shortBadge": "🔵 Histórico Executivo Aprovado TCE/TCU"
      }
    },
    "bills": {
      "proposed": 88,
      "approved": 26,
      "successRate": "30%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJCE",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral Oficial (TSE)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "9%",
      "quaest": "8%",
      "firstRound": "9%",
      "secondRound": "38%",
      "rejection": "44%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Tolerância Zero contra Facções Criminosas",
        "theme": "Segurança",
        "desc": "Criação de força-tarefa especial e blindagem das fronteiras estaduais contra o narcotráfico."
      },
      {
        "id": 2,
        "title": "Expansão dos Hospitais Regionais no Interior",
        "theme": "Saúde",
        "desc": "Descentralização do SUS cearense para zerar filas de cirurgias eletivas no interior."
      },
      {
        "id": 3,
        "title": "Universalização do Ensino Integral (Modelo Sobral)",
        "theme": "Educação",
        "desc": "Implementação do premiado modelo pedagógico de tempo integral em todos os 184 municípios."
      }
    ],
    "currentOffice": "Ex-Governador do Ceará e Ex-Ministro"
  },
  {
    "id": "cand-simone-tebet",
    "name": "Simone Nassar Tebet",
    "ballotName": "Simone Tebet",
    "party": "PSB",
    "number": "400",
    "position": "Senadora",
    "state": "SP",
    "city": "São Paulo, SP",
    "age": 55,
    "publicLifeYears": 24,
    "timesElected": 4,
    "avatar": "img/candidates/cand-simone-tebet.jpg",
    "education": "Direito (Universidade Federal do Rio de Janeiro - UFRJ), Mestrado em Direito Constitucional (PUC-SP)",
    "careerHistory": "Deputada Estadual (2003-2004), Prefeita de Três Lagoas por 2 mandatos (2005-2010), Vice-Governadora de MS (2011-2014), Senadora da República (2015-2023), Ministra do Planejamento e Orçamento (2023-atual).",
    "aiSummary": "Candidata ao Senado Federal pelo estado de São Paulo em 2026 pelo PSB, com apoio do presidente Lula e do vice Geraldo Alckmin. Ex-senadora e ex-ministra do Planejamento, construiu a carreira na defesa da disciplina fiscal com sensibilidade social.",
    "overallScore": 74,
    "radar": {
      "integridade": 80,
      "eficiencia": 61,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 248,
      "totalSessions": 252,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "Junta de Execução Orçamentária (JEO)"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 33.763,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,06 / min",
        "costPerCitizen": "R$ 0,0002 / ano",
        "salariosMinimos": 24,
        "roiText": "Planejamento e Auditoria de Metas do PPA Federal"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "MPO-2026-TEBET",
      "totalAllocated": "R$ 32.000.000.000,00",
      "totalAllocatedNum": 32000000000,
      "totalExecuted": "R$ 30.100.000.000,00",
      "totalExecutedNum": 30100000000,
      "executionRatePct": 94.1,
      "openBidPct": 99,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Vinculado às Metas do PPA"
      }
    },
    "bills": {
      "proposed": 92,
      "approved": 38,
      "successRate": "41%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.3,
      "status": "Ficha Limpa",
      "negativeCertificates": [
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
      "datafolha": "11%",
      "quaest": "10%",
      "firstRound": "11%",
      "secondRound": "42%",
      "rejection": "26%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Orçamento Público com Foco na Primeira Infância",
        "theme": "Social",
        "desc": "Vinculação orçamentária prioritária para creches, nutrição infantil e educação básica."
      },
      {
        "id": 2,
        "title": "Competitividade da Indústria Paulista e Reforma Tributária",
        "theme": "Desenvolvimento",
        "desc": "Defesa de incentivos à inovação e desoneração da folha em setores estratégicos de SP."
      },
      {
        "id": 3,
        "title": "Governança Fiscal Transparente e Combate ao Desperdício",
        "theme": "Economia",
        "desc": "Revisão periódica de subsídios ineficientes e fortalecimento de metas fiscais de longo prazo."
      }
    ],
    "currentOffice": "Ex-Ministra do Planejamento e Orçamento (2023-2026)"
  },
  {
    "id": "cand-romeu-zema",
    "name": "Romeu Zema Neto",
    "ballotName": "Romeu Zema",
    "party": "NOVO",
    "number": "30",
    "position": "Presidente da República",
    "state": "BR",
    "city": "Belo Horizonte, MG",
    "age": 60,
    "publicLifeYears": 8,
    "timesElected": 2,
    "avatar": "img/candidates/cand-romeu-zema.jpg",
    "education": "Administração de Empresas (Fundação Getulio Vargas - FGV)",
    "careerHistory": "Empresário do Grupo Zema por 30 anos, Governador de Minas Gerais reeleito no 1º turno (2019-atual).",
    "aiSummary": "Candidato à Presidência da República em 2026 pelo Partido Novo com o senador Eduardo Girão de vice. Governador de Minas Gerais reeleito no 1º turno. Defende o programa \"O Brasil sem Intocáveis\", focado em reformas estruturantes, privatizações e redução do custo da máquina pública.",
    "overallScore": 73,
    "radar": {
      "integridade": 77,
      "eficiencia": 63,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 242,
      "totalSessions": 246,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "Comitê de Desregulamentação e Livre Mercado"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 37.589,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,001 / ano",
        "salariosMinimos": 26,
        "roiText": "Gestão de Orçamento Estadual de R$ 115 bilhões de MG"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "GOV-MG-2026-ZEMA",
      "totalAllocated": "R$ 24.500.000.000,00",
      "totalAllocatedNum": 24500000000,
      "totalExecuted": "R$ 22.800.000.000,00",
      "totalExecutedNum": 22800000000,
      "executionRatePct": 93.1,
      "openBidPct": 98,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Auditado pelo TCE-MG"
      }
    },
    "bills": {
      "proposed": 52,
      "approved": 36,
      "successRate": "69%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.3,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJMG",
          "valid": true
        },
        {
          "name": "Tribunal de Contas de Minas Gerais (TCE-MG)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "8%",
      "quaest": "9%",
      "firstRound": "8%",
      "secondRound": "40%",
      "rejection": "25%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "O Brasil sem Intocáveis: Fim dos Supersalários",
        "theme": "Reforma",
        "desc": "Corte de privilégios no setor público, teto salarial unificado e meritocracia."
      },
      {
        "id": 2,
        "title": "Desregulamentação e Amplo Programa de Privatizações",
        "theme": "Economia",
        "desc": "Venda de empresas estatais deficitárias e desregulamentação para atração de capitais."
      },
      {
        "id": 3,
        "title": "Pacto Federativo com Descentralização Tributária",
        "theme": "Gestão",
        "desc": "Mais recursos diretamente nos caixas dos municípios e governos estaduais."
      }
    ],
    "currentOffice": "Governador de Minas Gerais (2019-2026)"
  },
  {
    "id": "cand-ronaldo-caiado",
    "name": "Ronaldo Ramos Caiado",
    "ballotName": "Ronaldo Caiado",
    "party": "PSD",
    "number": "55",
    "position": "Presidente da República",
    "state": "BR",
    "city": "Goiânia, GO",
    "age": 76,
    "publicLifeYears": 40,
    "timesElected": 7,
    "avatar": "img/candidates/cand-ronaldo-caiado.jpg",
    "education": "Medicina (Universidade Federal do Rio de Janeiro - UFRJ), Especialização em Cirurgia da Coluna Vertebral em Paris",
    "careerHistory": "Fundador da UDR, Deputado Federal por 5 mandatos (1991-2014), Senador da República (2015-2018), Governador de Goiás reeleito no 1º turno (2019-atual).",
    "aiSummary": "Candidato à Presidência da República em 2026 pelo PSD, tendo Gilberto Kassab como vice. Governador de Goiás por dois mandatos com índices de aprovação acima de 80%. Apresenta plano centrado em tolerância zero ao crime, rigor fiscal e fortalecimento do agronegócio.",
    "overallScore": 72,
    "radar": {
      "integridade": 77,
      "eficiencia": 60,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 69,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 99,
      "presentCount": 252,
      "totalSessions": 254,
      "justifiedAbsences": 2,
      "unjustifiedAbsences": 0,
      "committees": [
        "Conselho de Segurança Pública do Centro-Oeste"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 35.800,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,005 / ano",
        "salariosMinimos": 25,
        "roiText": "Gestão de Orçamento de R$ 42 bilhões de Goiás"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "GOV-GO-2026-CAIADO",
      "totalAllocated": "R$ 18.200.000.000,00",
      "totalAllocatedNum": 18200000000,
      "totalExecuted": "R$ 17.100.000.000,00",
      "totalExecutedNum": 17100000000,
      "executionRatePct": 94,
      "openBidPct": 99,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Auditado TCE-GO"
      }
    },
    "bills": {
      "proposed": 112,
      "approved": 48,
      "successRate": "43%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.4,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJGO",
          "valid": true
        },
        {
          "name": "Tribunal de Contas de Goiás (TCE-GO)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "7%",
      "quaest": "8%",
      "firstRound": "7%",
      "secondRound": "41%",
      "rejection": "22%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Segurança Nacional com Modelo Goiano Tolerância Zero",
        "theme": "Segurança",
        "desc": "Integração das forças de segurança, presídios de isolamento estrito e combate às facções."
      },
      {
        "id": 2,
        "title": "Rigor Fiscal e Eficiência Administrativa",
        "theme": "Economia",
        "desc": "Equilíbrio orçamentário rígido, controle de despesas e desburocratização."
      },
      {
        "id": 3,
        "title": "Fortalecimento do Agronegócio e Infraestrutura Logística",
        "theme": "Infraestrutura",
        "desc": "Investimentos em ferrovias, armazenagem e abertura de novos mercados internacionais."
      }
    ],
    "currentOffice": "Governador de Goiás (2019-2026)"
  },
  {
    "id": "cand-rodrigo-pacheco",
    "name": "Rodrigo Otavio Soares Pacheco",
    "ballotName": "Rodrigo Pacheco",
    "party": "PSD",
    "number": "55",
    "position": "Senador",
    "state": "MG",
    "city": "Belo Horizonte / Passos, MG",
    "age": 49,
    "publicLifeYears": 12,
    "timesElected": 2,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5732.jpg",
    "education": "Direito (PUC-Minas), Especialista em Direito Penal Econômico",
    "careerHistory": "Advogado Criminalista, Deputado Federal (2015-2019), Senador da República (2019-atual), Presidente do Senado Federal e do Congresso Nacional por 2 mandatos (2021-2025).",
    "aiSummary": "Presidente do Senado Federal (2021-2025) e Senador por Minas Gerais. Com indicação aprovada para o Tribunal de Contas da União (TCU) em setembro de 2026, consolidou papel de fiador da estabilidade institucional e da reforma tributária.",
    "overallScore": 75,
    "radar": {
      "integridade": 80,
      "eficiencia": 67,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 168,
      "totalSessions": 172,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "Mesa Diretora do Senado",
        "Comissão de Constituição e Justiça"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 22.400,00",
      "spendingCeapSavings": "R$ 180.000,00",
      "spendingPercentage": 65,
      "civicConversion": {
        "costPerMinute": "R$ 0,42 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 16,
        "roiText": "Presidência do Congresso Nacional"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "SEN-MG-2026-PACHECO",
      "totalAllocated": "R$ 38.000.000,00",
      "totalAllocatedNum": 38000000,
      "totalExecuted": "R$ 35.800.000,00",
      "totalExecutedNum": 35800000,
      "executionRatePct": 94.2,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Chamamento Aberto"
      }
    },
    "bills": {
      "proposed": 98,
      "approved": 32,
      "successRate": "32%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.1,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa STF/STJ",
          "valid": true
        },
        {
          "name": "Quitação Eleitoral (TSE)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "38%",
      "quaest": "39%",
      "firstRound": "38%",
      "secondRound": "49%",
      "rejection": "21%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Fiscalização e Controle Preventivo no TCU",
        "theme": "Controle",
        "desc": "Auditoria contínua de grandes obras federais e combate ao desperdício no orçamento público."
      },
      {
        "id": 2,
        "title": "Regulamentação e Implementação da Reforma Tributária",
        "theme": "Tributação",
        "desc": "Vigilância sobre a transição do IBS e CBS para preservar a segurança jurídica."
      },
      {
        "id": 3,
        "title": "Defesa do Pacto Federativo e Dívida dos Estados",
        "theme": "Economia",
        "desc": "Mediação institucional para renegociação sustentável das dívidas estaduais com a União."
      }
    ],
    "currentOffice": "Ministro Indicado do TCU / Senador (2019-2027)"
  },
  {
    "id": "cand-sergio-moro",
    "name": "Sergio Fernando Moro",
    "ballotName": "Sergio Moro",
    "party": "PL",
    "number": "22",
    "position": "Senador",
    "state": "PR",
    "city": "Maringá / Curitiba",
    "age": 53,
    "publicLifeYears": 6,
    "timesElected": 1,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador6331.jpg",
    "education": "Direito (Universidade Estadual de Maringá - UEM), Doutor em Direito Constitucional (UFPR)",
    "careerHistory": "Juiz Federal titular da 13ª Vara Federal de Curitiba (Operação Lava Jato, 2014-2018), Ministro da Justiça e Segurança Pública (2019-2020), Senador da República pelo Paraná (2023-atual, filiado ao PL em 2026).",
    "aiSummary": "Senador pelo Paraná (eleito em 2022, filiado ao PL em 2026) e ex-juiz da Operação Lava Jato. Referência no combate à corrupção sistêmica, defesa da prisão em segunda instância, autonomia da PF e pré-candidato do PL no Paraná.",
    "overallScore": 71,
    "radar": {
      "integridade": 74,
      "eficiencia": 66,
      "transparencia": 70,
      "coerencia": 69,
      "viabilidade": 69,
      "presenca": 87,
      "assiduidade": 87
    },
    "attendance": {
      "ratePct": 97,
      "presentCount": 164,
      "totalSessions": 170,
      "justifiedAbsences": 6,
      "unjustifiedAbsences": 0,
      "committees": [
        "Comissão de Constituição e Justiça",
        "Comissão de Segurança Pública"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 24.100,00",
      "spendingCeapSavings": "R$ 160.000,00",
      "spendingPercentage": 70,
      "civicConversion": {
        "costPerMinute": "R$ 0,45 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 17,
        "roiText": "Atuação na CCJ e Segurança Nacional"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "SEN-PR-2026-MORO",
      "totalAllocated": "R$ 36.500.000,00",
      "totalAllocatedNum": 36500000,
      "totalExecuted": "R$ 34.100.000,00",
      "totalExecutedNum": 34100000,
      "executionRatePct": 93.4,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Editais Abertos"
      }
    },
    "bills": {
      "proposed": 68,
      "approved": 16,
      "successRate": "23%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.3,
      "status": "Ficha Limpa (Absolvido no TSE 7x0)",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TSE / TRE-PR",
          "valid": true
        },
        {
          "name": "Certidão Negativa TRF-4",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "44%",
      "quaest": "45%",
      "firstRound": "44%",
      "secondRound": "53%",
      "rejection": "28%"
    },
    "proposals": [
      {
        "id": "prop-moro-1",
        "title": "Prisão Imediata em Segunda Instância (PEC da 2ª Instância)",
        "description": "Alteração do Código de Processo Penal e da Constituição para garantir cumprimento de pena após condenação por tribunal colegiado.",
        "costEstimate": "Sem custo orçamentário",
        "timelineYears": 2,
        "category": "Justiça & Combate à Impunidade",
        "viabilityScore": 92,
        "tseStatus": "PEC em Tramitação na CCJ do Senado",
        "fundingSource": "Sem impacto fiscal",
        "supportVotes": 16900,
        "rejectVotes": 2100
      },
      {
        "id": "prop-moro-2",
        "title": "Autonomia Orçamentária e Funcional da Polícia Federal e Mandato Fixo para Diretor-Geral",
        "description": "Blindagem da PF contra interferências políticas nas investigações contra o crime organizado e colarinho branco.",
        "costEstimate": "Vinculação de 5% do Fundo Nacional de Segurança",
        "timelineYears": 2,
        "category": "Segurança & Instituições",
        "viabilityScore": 93,
        "tseStatus": "Projeto de Lei no Senado",
        "fundingSource": "FNSP e Fundo Penitenciário",
        "supportVotes": 15400,
        "rejectVotes": 1400
      },
      {
        "id": "prop-moro-3",
        "title": "Fim do Foro Privilegiado para Crimes Comuns de Autoridades Públicas",
        "description": "Julgamento de deputados, senadores e ministros na 1ª instância em crimes de corrupção, homicídio e peculato.",
        "costEstimate": "Sem custo orçamentário",
        "timelineYears": 3,
        "category": "Combate a Privilégios",
        "viabilityScore": 89,
        "tseStatus": "Proposta Prioritária de Mandato",
        "fundingSource": "Desoneração dos Tribunais Superiores",
        "supportVotes": 17200,
        "rejectVotes": 920
      }
    ]
  },
  {
    "id": "cand-marcos-pontes",
    "name": "Marcos Cesar Pontes",
    "ballotName": "Astronauta Marcos Pontes",
    "party": "PL",
    "number": "222",
    "position": "Senador",
    "state": "SP",
    "city": "Bauru / São Paulo",
    "age": 63,
    "publicLifeYears": 6,
    "timesElected": 1,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador6009.jpg",
    "education": "Engenharia Aeronáutica (ITA), Mestrado em Engenharia de Sistemas (Naval Postgraduate School - EUA), Treinamento NASA",
    "careerHistory": "Tenente-Coronel da FAB, Primeiro Astronauta Lusófono a ir ao Espaço (Missão Centenário, 2006), Ministro da Ciência, Tecnologia e Inovações (2019-2022), Senador eleito com 10,7 milhões de votos (2023-atual).",
    "aiSummary": "Senador por São Paulo mais votado da história do estado (10,7 milhões de votos). Foco parlamentar na ampliação de investimentos em pesquisa espacial, inteligência artificial, semicondutores e bolsas de pós-graduação do CNPq/Capes.",
    "overallScore": 75,
    "radar": {
      "integridade": 77,
      "eficiencia": 68,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 86,
      "assiduidade": 86
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 167,
      "totalSessions": 170,
      "justifiedAbsences": 3,
      "unjustifiedAbsences": 0,
      "committees": [
        "Comissão de Ciência, Tecnologia, Inovação e Informática"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 21.800,00",
      "spendingCeapSavings": "R$ 190.000,00",
      "spendingPercentage": 64,
      "civicConversion": {
        "costPerMinute": "R$ 0,41 / min",
        "costPerCitizen": "R$ 0,0005 / ano",
        "salariosMinimos": 15,
        "roiText": "Liderança em Inovação e Ciência Nacional"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "SEN-SP-2026-PONTES",
      "totalAllocated": "R$ 42.000.000,00",
      "totalAllocatedNum": 42000000,
      "totalExecuted": "R$ 39.500.000,00",
      "totalExecutedNum": 39500000,
      "executionRatePct": 94,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Emendas para Universidades e Saúde"
      }
    },
    "bills": {
      "proposed": 54,
      "approved": 14,
      "successRate": "26%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.4,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TRE-SP",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "48%",
      "quaest": "49%",
      "firstRound": "48%",
      "secondRound": "56%",
      "rejection": "22%"
    },
    "proposals": [
      {
        "id": "prop-pontes-1",
        "title": "Criação do Polo Nacional de Semicondutores e Chips no Estado de São Paulo",
        "description": "Incentivos fiscais e créditos via FINEP para atrair fábricas de chips e componentes eletrônicos essenciais para o Brasil.",
        "costEstimate": "R$ 5.000.000.000,00 (Créditos e Incentivos)",
        "timelineYears": 4,
        "category": "Ciência & Indústria Tecnológica",
        "viabilityScore": 92,
        "tseStatus": "Projeto de Lei no Senado",
        "fundingSource": "FNDCT e Parcerias Privadas",
        "supportVotes": 15800,
        "rejectVotes": 890
      },
      {
        "id": "prop-pontes-2",
        "title": "Bolsa Científica Jovem para Estudantes de Escolas Públicas nas Olimpíadas de Conhecimento",
        "description": "Bolsa de iniciação científica júnior para todos os medalhistas de olimpíadas de matemática, física e astronomia.",
        "costEstimate": "R$ 450.000.000,00 / ano",
        "timelineYears": 2,
        "category": "Educação & Ciência",
        "viabilityScore": 96,
        "tseStatus": "Em tramitação na Comissão de Educação",
        "fundingSource": "CNPq e FNDCT",
        "supportVotes": 17400,
        "rejectVotes": 510
      },
      {
        "id": "prop-pontes-3",
        "title": "Modernização e Concessão Comercial da Base de Lançamento de Alcântara (Maranhão)",
        "description": "Atração de empresas aeroespaciais globais para lançamentos de satélites gerando royalties e transferência de tecnologia.",
        "costEstimate": "R$ 1.200.000.000,00",
        "timelineYears": 3,
        "category": "Aeroespacial & Soberania",
        "viabilityScore": 91,
        "tseStatus": "Diretriz da Agência Espacial Brasileira",
        "fundingSource": "Acordo de Salvaguardas Tecnológicas",
        "supportVotes": 14900,
        "rejectVotes": 1100
      }
    ]
  },
  {
    "id": "cand-flavio-bolsonaro",
    "name": "Flávio Nantes Bolsonaro",
    "ballotName": "Flávio Bolsonaro",
    "party": "PL",
    "number": "22",
    "position": "Presidente da República",
    "state": "BR",
    "city": "Rio de Janeiro / Brasília",
    "age": 44,
    "publicLifeYears": 22,
    "timesElected": 5,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5894.jpg",
    "education": "Direito (Universidade Cândido Mendes), Pós-Graduado em Políticas Públicas (IUPERJ)",
    "careerHistory": "Deputado Estadual pelo Rio de Janeiro por 4 mandatos (2003-2018), Senador da República pelo Rio de Janeiro (2019-atual).",
    "aiSummary": "Candidato oficial do Partido Liberal à Presidência da República em 2026, com Alfredo Gaspar de vice. Representa a continuidade das teses conservadoras com o plano \"Para o Brasil Vencer o Atraso\", pautado no endurecimento penal, austeridade e liberdade econômica.",
    "overallScore": 59,
    "radar": {
      "integridade": 54,
      "eficiencia": 56,
      "transparencia": 60,
      "coerencia": 68,
      "viabilidade": 62,
      "presenca": 80,
      "assiduidade": 80
    },
    "attendance": {
      "ratePct": 94,
      "presentCount": 160,
      "totalSessions": 170,
      "justifiedAbsences": 10,
      "unjustifiedAbsences": 0,
      "committees": [
        "Comissão de Constituição e Justiça"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 26.800,00",
      "spendingCeapSavings": "R$ 120.000,00",
      "spendingPercentage": 78,
      "civicConversion": {
        "costPerMinute": "R$ 0,50 / min",
        "costPerCitizen": "R$ 0,003 / ano",
        "salariosMinimos": 19,
        "roiText": "Atuação Parlamentar e Projetos no Senado"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "SEN-RJ-2026-FLAVIO",
      "totalAllocated": "R$ 38.000.000,00",
      "totalAllocatedNum": 38000000,
      "totalExecuted": "R$ 35.100.000,00",
      "totalExecutedNum": 35100000,
      "executionRatePct": 92.4,
      "openBidPct": 97,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Emendas para Saúde do RJ"
      }
    },
    "bills": {
      "proposed": 76,
      "approved": 18,
      "successRate": "23%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.7,
      "status": "Ficha Limpa (Processos Arquivados no STF/STJ)",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa Eleitoral TSE",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "36%",
      "quaest": "37%",
      "firstRound": "36%",
      "secondRound": "47%",
      "rejection": "38%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Novo Teto de Gastos e Corte de 10 Ministérios",
        "theme": "Economia",
        "desc": "Tesouraço orçamentário, redução da carga tributária e simplificação fiscal."
      },
      {
        "id": 2,
        "title": "Endurecimento Penal e Presídios Federais de Segurança Máxima",
        "theme": "Segurança",
        "desc": "Redução da maioridade, fim de progressão para crimes hediondos e enquadramento de facções."
      },
      {
        "id": 3,
        "title": "Reforma do Judiciário e Fim da Reeleição no Executivo",
        "theme": "Institucional",
        "desc": "Mandatos com tempo determinado para ministros de tribunais superiores e mandato único de 5 anos."
      }
    ],
    "currentOffice": "Senador da República (2019-2027)"
  },
  {
    "id": "cand-randolfe-rodrigues",
    "name": "Randolfe Rodrigues",
    "ballotName": "Randolfe Rodrigues",
    "party": "PT",
    "number": "133",
    "position": "Senador",
    "state": "AP",
    "city": "Macapá",
    "age": 53,
    "publicLifeYears": 26,
    "timesElected": 4,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg",
    "education": "História (UNIFAP), Direito (Faculdade SEAMA), Mestrado em Políticas Públicas (UECE)",
    "careerHistory": "Deputado Estadual pelo Amapá (1999-2007), Senador da República reeleito (2011-atual), Vice-Presidente da CPI da Pandemia (2021), Líder do Governo no Congresso Nacional (2023-atual).",
    "aiSummary": "Senador pelo Amapá e Líder do Governo no Congresso Nacional. Liderança destacada na fiscalização parlamentar, defesa intransigente da preservação da Amazônia, direitos socioambientais e articulação de matérias econômicas prioritárias.",
    "overallScore": 77,
    "radar": {
      "integridade": 82,
      "eficiencia": 72,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 71,
      "presenca": 86,
      "assiduidade": 86
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 168,
      "totalSessions": 171,
      "justifiedAbsences": 3,
      "unjustifiedAbsences": 0,
      "committees": [
        "Comissão de Meio Ambiente",
        "Liderança do Governo no Congresso"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 23.500,00",
      "spendingCeapSavings": "R$ 170.000,00",
      "spendingPercentage": 68,
      "civicConversion": {
        "costPerMinute": "R$ 0,44 / min",
        "costPerCitizen": "R$ 0,02 / ano",
        "salariosMinimos": 17,
        "roiText": "Articulação de Leis Nacionais e COP30"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "SEN-AP-2026-RANDOLFE",
      "totalAllocated": "R$ 38.000.000,00",
      "totalAllocatedNum": 38000000,
      "totalExecuted": "R$ 36.100.000,00",
      "totalExecutedNum": 36100000,
      "executionRatePct": 95,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Destinado a Hospitais e Ribeirinhos"
      }
    },
    "bills": {
      "proposed": 134,
      "approved": 44,
      "successRate": "33%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.3,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TRE-AP",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da União (TCU)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "46%",
      "quaest": "47%",
      "firstRound": "46%",
      "secondRound": "55%",
      "rejection": "24%"
    },
    "proposals": [
      {
        "id": "prop-randolfe-1",
        "title": "Fundo Amazônia e Transição para Bioeconomia Florestal com Pagamento por Serviços Ambientais",
        "description": "Captação de R$ 25 bilhões internacionais para remunerar populações tradicionais e indígenas que mantêm a floresta em pé.",
        "costEstimate": "R$ 25.000.000.000,00 (Captação Internacional)",
        "timelineYears": 4,
        "category": "Sustentabilidade & Amazônia",
        "viabilityScore": 94,
        "tseStatus": "Em execução com BNDES",
        "fundingSource": "Doações internacionais (Noruega, Alemanha, EUA)",
        "supportVotes": 16100,
        "rejectVotes": 1300
      },
      {
        "id": "prop-randolfe-2",
        "title": "Conclusão do Asfalto e Conexão Terrestre da BR-156 no Amapá",
        "description": "Pavimentação definitiva dos trechos norte e sul da rodovia federal ligando Macapá a Oiapoque e Laranjal do Jari.",
        "costEstimate": "R$ 1.800.000.000,00",
        "timelineYears": 3,
        "category": "Infraestrutura & Integração Regional",
        "viabilityScore": 91,
        "tseStatus": "Obra Inclusa no Novo PAC",
        "fundingSource": "Orçamento Geral da União / DNIT",
        "supportVotes": 15200,
        "rejectVotes": 610
      },
      {
        "id": "prop-randolfe-3",
        "title": "Regulamentação e Inclusão no SUS de Medicamentos à Base de Canabidiol (Cannabis Medicinal)",
        "description": "Distribuição gratuita na farmácia popular para tratamento de epilepsia refratária, autismo severo e dores crônicas.",
        "costEstimate": "R$ 380.000.000,00 / ano",
        "timelineYears": 2,
        "category": "Saúde Pública",
        "viabilityScore": 93,
        "tseStatus": "Projeto de Lei Aprovado no Senado",
        "fundingSource": "Ministério da Saúde",
        "supportVotes": 14700,
        "rejectVotes": 1800
      }
    ]
  },
  {
    "id": "cand-eduardo-leite",
    "name": "Eduardo Figueiredo Cavalheiro Leite",
    "ballotName": "Eduardo Leite",
    "party": "PSD",
    "number": "55",
    "position": "Governador",
    "state": "RS",
    "city": "Porto Alegre / Pelotas, RS",
    "age": 41,
    "publicLifeYears": 20,
    "timesElected": 3,
    "avatar": "img/candidates/cand-eduardo-leite.jpg",
    "education": "Direito (UFPEL), Mestrado em Gestão Pública (Columbia University)",
    "careerHistory": "Vereador de Pelotas (2009-2012), Prefeito de Pelotas (2013-2016), Governador do Rio Grande do Sul reeleito (2019-2022 e 2023-atual).",
    "aiSummary": "Governador do Rio Grande do Sul em segundo mandato histórico. Filiado ao PSD, optou por permanecer no comando do executivo gaúcho até o fim de 2026 para liderar a reconstrução pós-enchentes e a modernização fiscal do estado.",
    "overallScore": 74,
    "radar": {
      "integridade": 80,
      "eficiencia": 62,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 246,
      "totalSessions": 250,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "Comitê do Plano Rio Grande de Reconstrução"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 35.400,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,003 / ano",
        "salariosMinimos": 25,
        "roiText": "Gestão de Orçamento de R$ 85 bilhões do RS"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "GOV-RS-2026-LEITE",
      "totalAllocated": "R$ 22.000.000.000,00",
      "totalAllocatedNum": 22000000000,
      "totalExecuted": "R$ 20.900.000.000,00",
      "totalExecutedNum": 20900000000,
      "executionRatePct": 95,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Painel da Reconstrução 100% Aberto"
      }
    },
    "bills": {
      "proposed": 62,
      "approved": 45,
      "successRate": "72%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.2,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJRS",
          "valid": true
        },
        {
          "name": "Tribunal de Contas do RS (TCE-RS)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "34%",
      "quaest": "35%",
      "firstRound": "34%",
      "secondRound": "46%",
      "rejection": "28%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Plano Rio Grande: Reconstrução Climática Resiliente",
        "theme": "Sustentabilidade",
        "desc": "Diques, macrodrenagem e reassentamento seguro de comunidades atingidas pelas enchentes."
      },
      {
        "id": 2,
        "title": "Responsabilidade Fiscal e Sustentabilidade da Previdência",
        "theme": "Economia",
        "desc": "Manutenção de superávits orçamentários e pagamento em dia dos serviços públicos."
      },
      {
        "id": 3,
        "title": "Ensino Médio Vocacionado e Inovação Tecnológica",
        "theme": "Educação",
        "desc": "Parcerias com o setor produtivo e modernização da infraestrutura escolar estadual."
      }
    ],
    "currentOffice": "Governador do Rio Grande do Sul (em exercício)"
  },
  {
    "id": "cand-helder-barbalho",
    "name": "Helder Zahluth Barbalho",
    "ballotName": "Helder Barbalho",
    "party": "MDB",
    "number": "150",
    "position": "Senador",
    "state": "PA",
    "city": "Belém / Ananindeua, PA",
    "age": 46,
    "publicLifeYears": 24,
    "timesElected": 5,
    "avatar": "img/candidates/cand-helder-barbalho.jpg",
    "education": "Administração de Empresas (UNAMA), Pós-Graduado em Gestão Pública",
    "careerHistory": "Vereador de Ananindeua (2001-2003), Deputado Estadual (2003-2005), Prefeito de Ananindeua por 2 mandatos (2005-2012), Ministro da Integração Nacional (2016-2018), Governador do Pará reeleito com 70% dos votos (2019-atual).",
    "aiSummary": "Candidato ao Senado Federal pelo estado do Pará em 2026 pelo MDB, com Jader Barbalho de suplente. Governador reeleito em 2022 com a maior votação percentual do Brasil (70,4%), liderou a agenda ambiental paraense que culminou na sede da COP30 em Belém.",
    "overallScore": 71,
    "radar": {
      "integridade": 77,
      "eficiencia": 58,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 69,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 248,
      "totalSessions": 252,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "Consórcio Interestadual da Amazônia Legal"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 35.300,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,004 / ano",
        "salariosMinimos": 25,
        "roiText": "Gestão de Orçamento de R$ 48 bilhões do Pará"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "GOV-PA-2026-HELDER",
      "totalAllocated": "R$ 19.500.000.000,00",
      "totalAllocatedNum": 19500000000,
      "totalExecuted": "R$ 18.200.000.000,00",
      "totalExecutedNum": 18200000000,
      "executionRatePct": 93.3,
      "openBidPct": 99,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 100% Prestado ao TCE-PA"
      }
    },
    "bills": {
      "proposed": 78,
      "approved": 58,
      "successRate": "74%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.1,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJPA",
          "valid": true
        },
        {
          "name": "Tribunal de Contas do Pará (TCE-PA)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "42%",
      "quaest": "43%",
      "firstRound": "42%",
      "secondRound": "56%",
      "rejection": "21%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Marco Regulatório da Bioeconomia e Créditos de Carbono",
        "theme": "Amazônia",
        "desc": "Mecanismos econômicos que remunerem comunidades tradicionais pela preservação da floresta."
      },
      {
        "id": 2,
        "title": "Compensação Tarifária para Estados Produtores de Energia",
        "theme": "Energia",
        "desc": "Legislação federal para baratear a conta de luz nos estados geradores como o Pará."
      },
      {
        "id": 3,
        "title": "Infraestrutura Hidroviária e Logística Sustentável",
        "theme": "Transportes",
        "desc": "Dragagem sustentável e investimentos em terminais logísticos nos rios amazônicos."
      }
    ],
    "currentOffice": "Ex-Governador do Pará (2019-2026)"
  },
  {
    "id": "cand-claudio-castro",
    "name": "Cláudio Bonfim de Castro e Silva",
    "ballotName": "Cláudio Castro",
    "party": "PL",
    "number": "22",
    "position": "Ex-Governador",
    "state": "RJ",
    "city": "Rio de Janeiro, RJ",
    "age": 46,
    "publicLifeYears": 14,
    "timesElected": 2,
    "avatar": "img/candidates/cand-claudio-castro.jpg",
    "education": "Direito (Universidade Federal do Rio de Janeiro - UFRJ)",
    "careerHistory": "Chefe de Gabinete parlamentar, Vereador da Cidade do Rio de Janeiro (2017-2018), Vice-Governador do RJ (2019-2021), Governador reeleito em 1º turno (2021-atual).",
    "aiSummary": "Ex-governador do Rio de Janeiro (2021-2026). Declarado inelegível pelo Tribunal Superior Eleitoral em março de 2026, abriu mão de sua pré-candidatura ao Senado Federal para focar em sua defesa judicial.",
    "overallScore": 62,
    "radar": {
      "integridade": 49,
      "eficiencia": 61,
      "transparencia": 70,
      "coerencia": 69,
      "viabilidade": 69,
      "presenca": 86,
      "assiduidade": 86
    },
    "attendance": {
      "ratePct": 96,
      "presentCount": 238,
      "totalSessions": 248,
      "justifiedAbsences": 10,
      "unjustifiedAbsences": 0,
      "committees": [
        "Conselho de Segurança Pública do Estado do RJ"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 35.000,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 25,
        "roiText": "Gestão de Orçamento de R$ 104 bilhões do RJ"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "GOV-RJ-2026-CASTRO",
      "totalAllocated": "R$ 21.000.000.000,00",
      "totalAllocatedNum": 21000000000,
      "totalExecuted": "R$ 19.300.000.000,00",
      "totalExecutedNum": 19300000000,
      "executionRatePct": 91.9,
      "openBidPct": 98,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Auditado pelo TCE-RJ"
      }
    },
    "bills": {
      "proposed": 68,
      "approved": 44,
      "successRate": "64%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 8.7,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJRJ",
          "valid": true
        },
        {
          "name": "Tribunal de Contas do RJ (TCE-RJ)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "33%",
      "quaest": "34%",
      "firstRound": "33%",
      "secondRound": "44%",
      "rejection": "36%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Defesa Institucional e Recursos Judiciais",
        "theme": "Jurídico",
        "desc": "Acompanhamento processual de recursos perante o Superior Tribunal de Justiça e STF."
      },
      {
        "id": 2,
        "title": "Transição Administrativa do Estado do Rio de Janeiro",
        "theme": "Gestão",
        "desc": "Consolidação de dados do regime de recuperação fiscal e entrega de obras do governo."
      },
      {
        "id": 3,
        "title": "Apoio às Candidaturas Parlamentares do PL-RJ",
        "theme": "Política",
        "desc": "Colaboração com as chapas de deputados e senadores da aliança conservadora no estado."
      }
    ],
    "currentOffice": "Inelegível pelo TSE / Afastado da disputa"
  },
  {
    "id": "cand-ricardo-nunes",
    "name": "Ricardo Luis Reis Nunes",
    "ballotName": "Ricardo Nunes",
    "party": "MDB",
    "number": "15",
    "position": "Prefeito",
    "state": "SP",
    "city": "São Paulo",
    "age": 57,
    "publicLifeYears": 14,
    "timesElected": 3,
    "avatar": "img/candidates/cand-ricardo-nunes.jpg",
    "education": "Direito (Universidade Santo Amaro - UNISA)",
    "careerHistory": "Empresário do setor de eventos, Vereador de São Paulo por 2 mandatos (2013-2020), Vice-Prefeito de Bruno Covas (2021), Prefeito da Cidade de São Paulo (2021-atual, reeleito em 2024).",
    "aiSummary": "Prefeito da maior metrópole da América Latina reeleito com ampla coalizão política em 2024. Gestão caracterizada pelo recorde de caixa público municipal (R$ 35 bilhões em investimentos), Tarifa Zero aos domingos no transporte público, recapeamento massivo e expansão das vagas de creche.",
    "overallScore": 73,
    "radar": {
      "integridade": 77,
      "eficiencia": 62,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 87,
      "assiduidade": 87
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 250,
      "totalSessions": 254,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "Conselho de Desenvolvimento Metropolitano"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 35.600,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,003 / ano",
        "salariosMinimos": 25,
        "roiText": "Gestão de Orçamento Municipal de R$ 111 bilhões de SP"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PREF-SP-2026-NUNES",
      "totalAllocated": "R$ 15.000.000.000,00",
      "totalAllocatedNum": 15000000000,
      "totalExecuted": "R$ 14.100.000.000,00",
      "totalExecutedNum": 14100000000,
      "executionRatePct": 94,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Auditado pelo TCM-SP"
      }
    },
    "bills": {
      "proposed": 84,
      "approved": 65,
      "successRate": "77%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.1,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJSP",
          "valid": true
        },
        {
          "name": "Tribunal de Contas do Município (TCM-SP)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "57%",
      "quaest": "58%",
      "firstRound": "57%",
      "secondRound": "59%",
      "rejection": "25%"
    },
    "proposals": [
      {
        "id": "prop-nunes-1",
        "title": "Tarifa Zero aos Domingos e Feriados nos Ônibus da Capital (Domingão Faixa Preta)",
        "description": "Gratuidade no sistema SPTrans aos domingos para estimular o lazer, a economia comunitária e o convívio em parques da cidade.",
        "costEstimate": "R$ 480.000.000,00 / ano",
        "timelineYears": 4,
        "category": "Mobilidade Urbana",
        "viabilityScore": 97,
        "tseStatus": "Programa em Plena Operação",
        "fundingSource": "Subsidio do Tesouro Municipal de SP",
        "supportVotes": 18400,
        "rejectVotes": 1100
      },
      {
        "id": "prop-nunes-2",
        "title": "Programa Smart Sampa: 20 Mil Câmeras de Monitoramento Facial com Inteligência Artificial",
        "description": "Muralha digital para captura de foragidos da justiça, localização de pessoas desaparecidas e redução de assaltos na capital.",
        "costEstimate": "R$ 800.000.000,00",
        "timelineYears": 3,
        "category": "Segurança & Smart Cities",
        "viabilityScore": 94,
        "tseStatus": "Mais de 10.000 Câmeras já Instaladas",
        "fundingSource": "Secretaria Municipal de Segurança Urbana",
        "supportVotes": 16900,
        "rejectVotes": 2100
      },
      {
        "id": "prop-nunes-3",
        "title": "Fila Zero em Vagas de Creche na Cidade de São Paulo",
        "description": "Manutenção de atendimento para 100% das famílias com bebês de 0 a 3 anos matriculados em creches conveniadas e diretas.",
        "costEstimate": "R$ 3.800.000.000,00 / ano",
        "timelineYears": 4,
        "category": "Educação Infantil",
        "viabilityScore": 98,
        "tseStatus": "Fila Zero Mantida Pelo 4º Ano Consecutivo",
        "fundingSource": "Fundeb e Orçamento da SME-SP",
        "supportVotes": 19100,
        "rejectVotes": 320
      }
    ]
  },
  {
    "id": "cand-eduardo-paes",
    "name": "Eduardo da Costa Paes",
    "ballotName": "Eduardo Paes",
    "party": "PSD",
    "number": "55",
    "position": "Governador",
    "state": "RJ",
    "city": "Rio de Janeiro, RJ",
    "age": 56,
    "publicLifeYears": 32,
    "timesElected": 4,
    "avatar": "img/candidates/cand-eduardo-paes.jpg",
    "education": "Direito (Pontifícia Universidade Católica do Rio de Janeiro - PUC-Rio)",
    "careerHistory": "Subprefeito da Barra e Jacarepaguá (1993-1996), Deputado Federal por 2 mandatos (1999-2007), Secretário Estadual de Turismo, Prefeito do Rio por 4 mandatos (2009-2016 e 2021-atual, reeleito em 2024 no 1º turno).",
    "aiSummary": "Candidato ao Governo do Estado do Rio de Janeiro em 2026 pelo PSD, tendo Jane Reis (MDB) como vice. Quatro vezes prefeito da capital fluminense, lidera as pesquisas para o Palácio Guanabara com promessa de recuperar a segurança e a infraestrutura do estado.",
    "overallScore": 73,
    "radar": {
      "integridade": 77,
      "eficiencia": 61,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 248,
      "totalSessions": 252,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "C40 Cities Climate Leadership Group"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 35.200,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,07 / min",
        "costPerCitizen": "R$ 0,005 / ano",
        "salariosMinimos": 25,
        "roiText": "Gestão de Orçamento Municipal de R$ 45 bilhões do Rio"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PREF-RJ-2026-PAES",
      "totalAllocated": "R$ 9.800.000.000,00",
      "totalAllocatedNum": 9800000000,
      "totalExecuted": "R$ 9.200.000.000,00",
      "totalExecutedNum": 9200000000,
      "executionRatePct": 93.8,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Auditado pelo TCM-RJ"
      }
    },
    "bills": {
      "proposed": 92,
      "approved": 76,
      "successRate": "82%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.2,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJRJ",
          "valid": true
        },
        {
          "name": "Tribunal de Contas do Município (TCM-RJ)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "60%",
      "quaest": "61%",
      "firstRound": "60%",
      "secondRound": "63%",
      "rejection": "22%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Reestruturação da Segurança e Tolerância ao Crime",
        "theme": "Segurança",
        "desc": "Retomada do controle territorial pelo Estado com inteligência, tecnologia e valorização policial."
      },
      {
        "id": 2,
        "title": "Conexão Intermunicipal e Expansão de VLTs e Trens",
        "theme": "Mobilidade",
        "desc": "Modernização da malha da SuperVia e expansão do modelo do Terminal Gentileza na Baixada."
      },
      {
        "id": 3,
        "title": "Polos Regionais de Saúde Especializada e Redução de Filas",
        "theme": "Saúde",
        "desc": "Construção de hospitais regionais de trauma e alta complexidade no interior e na Baixada."
      }
    ],
    "currentOffice": "Ex-Prefeito do Rio de Janeiro"
  },
  {
    "id": "cand-joao-campos",
    "name": "João Henrique de Andrade Lima Campos",
    "ballotName": "João Campos",
    "party": "PSB",
    "number": "40",
    "position": "Governador",
    "state": "PE",
    "city": "Recife, PE",
    "age": 32,
    "publicLifeYears": 8,
    "timesElected": 3,
    "avatar": "img/candidates/cand-joao-campos.jpg",
    "education": "Engenharia Civil (Universidade Federal de Pernambuco - UFPE)",
    "careerHistory": "Deputado Federal mais votado de Pernambuco (2019-2020), Prefeito do Recife eleito em 2020 e reeleito em 2024 com recorde histórico de 78,1% dos votos.",
    "aiSummary": "Candidato ao Governo de Pernambuco em 2026 pelo PSB, tendo Carlos Costa (Republicanos) como vice. Prefeito do Recife reeleito com histórico de 78,1% dos votos, apresenta o plano \"Pernambuco Pronto para Fazer História\" disputando o comando estadual contra Raquel Lyra.",
    "overallScore": 74,
    "radar": {
      "integridade": 80,
      "eficiencia": 62,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 99,
      "presentCount": 252,
      "totalSessions": 254,
      "justifiedAbsences": 2,
      "unjustifiedAbsences": 0,
      "committees": [
        "Frente Nacional de Prefeitos (FNP)"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 28.900,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,05 / min",
        "costPerCitizen": "R$ 0,01 / ano",
        "salariosMinimos": 20,
        "roiText": "Gestão de Orçamento Municipal de R$ 7,5 bilhões do Recife"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PREF-REC-2026-CAMPOS",
      "totalAllocated": "R$ 2.800.000.000,00",
      "totalAllocatedNum": 2800000000,
      "totalExecuted": "R$ 2.650.000.000,00",
      "totalExecutedNum": 2650000000,
      "executionRatePct": 94.6,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Prêmio de Governança Digital da ONU"
      }
    },
    "bills": {
      "proposed": 68,
      "approved": 60,
      "successRate": "88%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.6,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJPE",
          "valid": true
        },
        {
          "name": "Tribunal de Contas de Pernambuco (TCE-PE)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "78%",
      "quaest": "79%",
      "firstRound": "78%",
      "secondRound": "82%",
      "rejection": "9%"
    },
    "proposals": [
      {
        "id": 1,
        "title": "Pacto Antifacção e Inteligência de Segurança Pública",
        "theme": "Segurança",
        "desc": "Plano integrado contra homicídios e controle penitenciário severo em Pernambuco."
      },
      {
        "id": 2,
        "title": "Hospital da Criança no Agreste e Saúde no Sertão",
        "theme": "Saúde",
        "desc": "Criação de novos complexos cirúrgicos pediátricos e descentralização do atendimento do Recife."
      },
      {
        "id": 3,
        "title": "Programa Embarque Digital Estadual e Triplicação da BR-101",
        "theme": "Desenvolvimento",
        "desc": "Bolsas integrais de tecnologia para jovens e infraestrutura rodoviária estruturante."
      }
    ],
    "currentOffice": "Ex-Prefeito do Recife"
  },
  {
    "id": "cand-fuad-noman",
    "name": "Fuad Jorge Noman Filho",
    "ballotName": "Fuad Noman",
    "party": "PSD",
    "number": "55",
    "position": "Prefeito",
    "state": "MG",
    "city": "Belo Horizonte",
    "age": 78,
    "publicLifeYears": 48,
    "timesElected": 2,
    "avatar": "img/candidates/cand-fuad-noman.jpg",
    "education": "Ciências Econômicas (Centro de Ensino Unificado de Brasília - CEUB)",
    "careerHistory": "Economista de carreira do Banco Central, Secretário de Fazenda de MG (2003-2007), Ministro interino da Fazenda, Prefeito de Belo Horizonte (2022-atual, reeleito em 2024).",
    "aiSummary": "Prefeito de Belo Horizonte reeleito em 2024, economista sênior com vasta experiência em gestão pública e equilíbrio orçamentário. Foco em obras antienchentes históricas (bacias de contenção na Vilarinho), recapeamento viário e saúde básica nos centros de saúde.",
    "overallScore": 73,
    "radar": {
      "integridade": 77,
      "eficiencia": 63,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 87,
      "assiduidade": 87
    },
    "attendance": {
      "ratePct": 97,
      "presentCount": 242,
      "totalSessions": 248,
      "justifiedAbsences": 6,
      "unjustifiedAbsences": 0,
      "committees": [
        "Conselho Metropolitano de BH"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 31.200,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,06 / min",
        "costPerCitizen": "R$ 0,008 / ano",
        "salariosMinimos": 22,
        "roiText": "Gestão de Orçamento de R$ 19,6 bilhões de BH"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PREF-BH-2026-NOMAN",
      "totalAllocated": "R$ 4.200.000.000,00",
      "totalAllocatedNum": 4200000000,
      "totalExecuted": "R$ 3.900.000.000,00",
      "totalExecutedNum": 3900000000,
      "executionRatePct": 92.8,
      "openBidPct": 99,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Auditado pelo TCEMG"
      }
    },
    "bills": {
      "proposed": 58,
      "approved": 44,
      "successRate": "75%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.2,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJMG",
          "valid": true
        },
        {
          "name": "Tribunal de Contas de MG (TCE-MG)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "54%",
      "quaest": "55%",
      "firstRound": "54%",
      "secondRound": "57%",
      "rejection": "23%"
    },
    "proposals": [
      {
        "id": "prop-noman-1",
        "title": "Bacias de Contenção de Enchentes nas Avenidas Vilarinho e Bernardo Vasconcelos",
        "description": "Obras de engenharia pesada com reservatórios subterrâneos para reter milhões de litros de água de chuva e acabar com inundações.",
        "costEstimate": "R$ 600.000.000,00",
        "timelineYears": 3,
        "category": "Drenagem & Prevenção de Desastres",
        "viabilityScore": 95,
        "tseStatus": "Obras em Estágio Avançado",
        "fundingSource": "Tesouro Municipal e Financiamento Caixa",
        "supportVotes": 16200,
        "rejectVotes": 740
      },
      {
        "id": "prop-noman-2",
        "title": "Reforma e Ampliação de 100% dos Centros de Saúde de Belo Horizonte",
        "description": "Modernização das unidades de saúde da família com Prontuário Eletrônico integrado e abastecimento garantido de remédios.",
        "costEstimate": "R$ 350.000.000,00",
        "timelineYears": 3,
        "category": "Saúde Básica",
        "viabilityScore": 96,
        "tseStatus": "Programa em Execução na SMS-BH",
        "fundingSource": "PPP dos Centros de Saúde de BH",
        "supportVotes": 17100,
        "rejectVotes": 520
      },
      {
        "id": "prop-noman-3",
        "title": "Subsídio ao Transporte Coletivo Condicionado a Ônibus Novos com Ar-Condicionado",
        "description": "Aporte financeiro municipal para congelamento de tarifas e renovação de 800 veículos da frota da capital com ar-condicionado.",
        "costEstimate": "R$ 510.000.000,00 / ano",
        "timelineYears": 4,
        "category": "Mobilidade Urbana",
        "viabilityScore": 93,
        "tseStatus": "Lei Municipal Sancionada",
        "fundingSource": "Orçamento Geral do Município",
        "supportVotes": 15400,
        "rejectVotes": 1200
      }
    ]
  },
  {
    "id": "cand-bruno-reis",
    "name": "Bruno Soares Reis",
    "ballotName": "Bruno Reis",
    "party": "UNIÃO",
    "number": "44",
    "position": "Prefeito",
    "state": "BA",
    "city": "Salvador",
    "age": 48,
    "publicLifeYears": 24,
    "timesElected": 4,
    "avatar": "img/candidates/cand-bruno-reis.jpg",
    "education": "Direito (Universidade Católica do Salvador - UCSal), Especialização em Gestão Pública (FGV)",
    "careerHistory": "Deputado Estadual por 2 mandatos (2011-2016), Vice-Prefeito de ACM Neto (2017-2020), Prefeito de Salvador (2021-atual, reeleito em 2024 com 78,6% dos votos no 1º turno).",
    "aiSummary": "Prefeito de Salvador reeleito com uma das maiores votações do Brasil em 2024 (78,6%). Notabilizado pela gestão fiscal sólida com nota Capag A do Tesouro Nacional, implantação do BRT de Salvador, requalificação da orla e liderança na geração de empregos no setor de turismo e serviços.",
    "overallScore": 74,
    "radar": {
      "integridade": 80,
      "eficiencia": 62,
      "transparencia": 78,
      "coerencia": 69,
      "viabilidade": 73,
      "presenca": 88,
      "assiduidade": 88
    },
    "attendance": {
      "ratePct": 98,
      "presentCount": 250,
      "totalSessions": 254,
      "justifiedAbsences": 4,
      "unjustifiedAbsences": 0,
      "committees": [
        "Frente Nacional de Prefeitos"
      ]
    },
    "salary": {
      "spendingCeapMonthly": "R$ 29.500,00",
      "spendingCeapSavings": "R$ 0,00",
      "spendingPercentage": 100,
      "civicConversion": {
        "costPerMinute": "R$ 0,06 / min",
        "costPerCitizen": "R$ 0,01 / ano",
        "salariosMinimos": 21,
        "roiText": "Gestão de Orçamento de R$ 11,8 bilhões de Salvador"
      }
    },
    "parliamentaryAmendments": {
      "protocol": "PREF-SSA-2026-REIS",
      "totalAllocated": "R$ 3.800.000.000,00",
      "totalAllocatedNum": 3800000000,
      "totalExecuted": "R$ 3.600.000.000,00",
      "totalExecutedNum": 3600000000,
      "executionRatePct": 94.7,
      "openBidPct": 100,
      "integritySeal": {
        "badgeClass": "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
        "shortBadge": "🟢 Auditado pelo TCM-BA"
      }
    },
    "bills": {
      "proposed": 72,
      "approved": 64,
      "successRate": "88%"
    },
    "ethics": {
      "accused": 0,
      "judged": 0,
      "condemned": 0,
      "partyScore": 9.4,
      "status": "Ficha Limpa",
      "negativeCertificates": [
        {
          "name": "Certidão Negativa TJBA",
          "valid": true
        },
        {
          "name": "Tribunal de Contas da Bahia (TCM-BA)",
          "valid": true
        }
      ]
    },
    "polls": {
      "datafolha": "78%",
      "quaest": "79%",
      "firstRound": "78%",
      "secondRound": "81%",
      "rejection": "11%"
    },
    "proposals": [
      {
        "id": "prop-reis-1",
        "title": "Expansão do BRT Salvador (Trechos 1, 2 e 3) com Ônibus 100% Elétricos",
        "description": "Corredor exclusivo ligando a Estação da Lapa ao Iguatemi e Pituba com frota silenciosa e zero emissão de poluentes.",
        "costEstimate": "R$ 820.000.000,00",
        "timelineYears": 3,
        "category": "Mobilidade Elétrica",
        "viabilityScore": 96,
        "tseStatus": "Trechos 1 e 2 em Operação Plena",
        "fundingSource": "Financiamento Internacional e Recursos Próprios",
        "supportVotes": 18400,
        "rejectVotes": 450
      },
      {
        "id": "prop-reis-2",
        "title": "Programa Salvador por Todos e Dignidade Menstrual nas Escolas e Postos",
        "description": "Rede de suporte social para famílias monoparentais e distribuição de absorventes e itens de higiene básica nas comunidades vulneráveis.",
        "costEstimate": "R$ 140.000.000,00 / ano",
        "timelineYears": 3,
        "category": "Assistência Social",
        "viabilityScore": 97,
        "tseStatus": "Programa em Execução pela SEMPRE",
        "fundingSource": "Fundo Municipal de Assistência Social",
        "supportVotes": 17900,
        "rejectVotes": 310
      },
      {
        "id": "prop-reis-3",
        "title": "Requalificação Completa da Orla de Salvador (de São Tomé de Paripe a Ipitanga)",
        "description": "Calçadões arborizados, ciclovias contínuas, quiosques padronizados e iluminação 100% LED para fomento do turismo de praia.",
        "costEstimate": "R$ 450.000.000,00",
        "timelineYears": 4,
        "category": "Turismo & Infraestrutura Urbana",
        "viabilityScore": 95,
        "tseStatus": "Diversos Trechos Entregues",
        "fundingSource": "Recursos Próprios e Prodetur",
        "supportVotes": 18200,
        "rejectVotes": 410
      }
    ]
  }
];

module.exports = {
  EXECUTIVE_AND_SENATE_POLITICIANS
};
