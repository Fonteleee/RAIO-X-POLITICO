// Raio-X Político - Base Oficial Curada Multi-Cargos
const EXECUTIVE_AND_SENATE_POLITICIANS = [
  {
    "id": "cand-lula",
    "name": "Luiz Inácio Lula da Silva",
    "ballotName": "Lula",
    "party": "PT",
    "number": "13",
    "position": "Presidente da República",
    "state": "SP",
    "city": "São Paulo / São Bernardo do Campo",
    "age": 79,
    "publicLifeYears": 46,
    "timesElected": 4,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%28ombros%29_denoise.jpg/330px-Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%28ombros%29_denoise.jpg",
    "education": "Torneiro Mecânico (SENAI) • Doutor Honoris Causa por mais de 30 universidades",
    "careerHistory": "Líder Sindical dos Metalúrgicos do ABC (1975-1980), Deputado Federal Constituinte (1987-1991), Presidente da República (2003-2010 e 2023-atual).",
    "aiSummary": "39º Presidente da República do Brasil em seu terceiro mandato histórico. Trajetória com foco em combate à fome, expansão de programas sociais (Bolsa Família, Farmácia Popular), valorização do salário mínimo e protagonismo na diplomacia climática e multilateral.",
    "overallScore": 91,
    "radar": {
      "integridade": 89,
      "eficiencia": 92,
      "transparencia": 90,
      "coerencia": 92,
      "viabilidade": 94,
      "assiduidade": 96,
      "presenca": 96
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
        "id": "prop-lula-1",
        "title": "Novo PAC (Programa de Aceleração do Crescimento) - Infraestrutura Verde & Transição Energética",
        "description": "Investimento de R$ 1,7 trilhão em ferrovias, saneamento, energia solar/eólica e habitação popular Minha Casa Minha Vida.",
        "costEstimate": "R$ 1.700.000.000.000,00",
        "timelineYears": 4,
        "category": "Infraestrutura & Energia",
        "viabilityScore": 93,
        "tseStatus": "Em Execução Orçamentária Federal",
        "fundingSource": "Orçamento Geral da União (OGU) + BNDES + Parcerias Público-Privadas",
        "supportVotes": 14200,
        "rejectVotes": 3100
      },
      {
        "id": "prop-lula-2",
        "title": "Programa Pé-de-Meia: Poupança e Incentivo Financeiro para Estudantes do Ensino Médio",
        "description": "Poupança de até R$ 9.200 por aluno de escola pública cadastrado no CadÚnico para reduzir drasticamente a evasão escolar.",
        "costEstimate": "R$ 7.100.000.000,00 / ano",
        "timelineYears": 3,
        "category": "Educação Básica",
        "viabilityScore": 95,
        "tseStatus": "Lei Sancionada nº 14.818/2024",
        "fundingSource": "Fundo Fiduciário de Apoio ao Ensino Médio (MEC)",
        "supportVotes": 18900,
        "rejectVotes": 1200
      },
      {
        "id": "prop-lula-3",
        "title": "Reforma Tributária sobre o Consumo (IVA Dual) e Isenção de Imposto de Renda até R$ 5 Mil",
        "description": "Implementação da CBS e IBS para simplificar tributos federais e estaduais, acompanhada da isenção progressiva do IRPF até R$ 5.000.",
        "costEstimate": "Neutro na arrecadação primária",
        "timelineYears": 4,
        "category": "Economia & Tributos",
        "viabilityScore": 90,
        "tseStatus": "Emenda Constitucional nº 132/2023",
        "fundingSource": "Tributação de super-ricos e fundos exclusivos",
        "supportVotes": 16500,
        "rejectVotes": 2400
      }
    ]
  },
  {
    "id": "cand-jair-bolsonaro",
    "name": "Jair Messias Bolsonaro",
    "ballotName": "Jair Bolsonaro",
    "party": "PL",
    "number": "22",
    "position": "Presidente da República",
    "state": "RJ",
    "city": "Rio de Janeiro / Brasília",
    "age": 70,
    "publicLifeYears": 36,
    "timesElected": 8,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Jair_Bolsonaro_2019_Portrait_%283x4_cropped_center%29.jpg/330px-Jair_Bolsonaro_2019_Portrait_%283x4_cropped_center%29.jpg",
    "education": "Oficial de Artilharia (Academia Militar das Agulhas Negras - AMAN) e Educação Física (EsEFEx)",
    "careerHistory": "Capitão do Exército (Reserva), Vereador do Rio de Janeiro (1989-1991), Deputado Federal por 7 mandatos (1991-2018), 38º Presidente da República (2019-2022).",
    "aiSummary": "38º Presidente da República do Brasil e principal líder do conservadorismo nacional. Gestão marcada pela aprovação da Reforma da Previdência, Lei da Liberdade Econômica, Pix pelo Banco Central, Marco do Saneamento e defesa de pautas conservadoras e armamentistas.",
    "overallScore": 89,
    "radar": {
      "integridade": 88,
      "eficiencia": 90,
      "transparencia": 88,
      "coerencia": 94,
      "viabilidade": 90,
      "assiduidade": 92,
      "presenca": 92
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
        "id": "prop-bolsonaro-1",
        "title": "Revogação de Restrições a Armas de Fogo e Blindagem Jurídica Policial (Excludente de Ilicitude)",
        "description": "Garantia de porte e posse para cidadãos sem antecedentes e proteção jurídica para policiais em serviço contra processos penais automáticos.",
        "costEstimate": "Sem custo orçamentário direto",
        "timelineYears": 2,
        "category": "Segurança Pública & Defesa",
        "viabilityScore": 89,
        "tseStatus": "Bandeira Programática Central",
        "fundingSource": "Desregulamentação e segurança jurídica",
        "supportVotes": 13900,
        "rejectVotes": 4200
      },
      {
        "id": "prop-bolsonaro-2",
        "title": "Privatização de Estatais Estratégicas (Petrobras, Correios e Portos) e Desregulamentação",
        "description": "Venda de participações acionárias e concessões integrais de infraestrutura para abatimento da dívida pública federal.",
        "costEstimate": "Geração de receitas de R$ 300 bilhões",
        "timelineYears": 4,
        "category": "Economia & Mercado",
        "viabilityScore": 88,
        "tseStatus": "Proposta Econômica Consolidada",
        "fundingSource": "Capitais privados nacionais e internacionais",
        "supportVotes": 12800,
        "rejectVotes": 4900
      },
      {
        "id": "prop-bolsonaro-3",
        "title": "Escolas Cívico-Militares em Todas as Cidades com mais de 50 Mil Habitantes",
        "description": "Ampliação do modelo de gestão compartilhada com forças de segurança para redução de violência escolar e reforço disciplinar.",
        "costEstimate": "R$ 2.500.000.000,00",
        "timelineYears": 3,
        "category": "Educação & Cidadania",
        "viabilityScore": 91,
        "tseStatus": "Programa Nacional Sancionado em 2019",
        "fundingSource": "MEC e Ministério da Defesa",
        "supportVotes": 11900,
        "rejectVotes": 5100
      }
    ]
  },
  {
    "id": "cand-tarcisio-de-freitas",
    "name": "Tarcísio Gomes de Freitas",
    "ballotName": "Tarcísio de Freitas",
    "party": "REPUBLICANOS",
    "number": "10",
    "position": "Governador",
    "state": "SP",
    "city": "São Paulo",
    "age": 50,
    "publicLifeYears": 16,
    "timesElected": 1,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Governador_do_Estado_de_S%C3%A3o_Paulo%2C_Tarc%C3%ADsio_de_Freitas_-_Foto_Oficial_%28cropped%29.jpg/330px-Governador_do_Estado_de_S%C3%A3o_Paulo%2C_Tarc%C3%ADsio_de_Freitas_-_Foto_Oficial_%28cropped%29.jpg",
    "education": "Engenharia Civil (Instituto Militar de Engenharia - IME), Pós-Graduado em Gerenciamento de Projetos (FGV)",
    "careerHistory": "Oficial de Engenharia do Exército, Diretor-Geral do DNIT (2011-2015), Ministro da Infraestrutura (2019-2022), Governador do Estado de São Paulo (2023-atual).",
    "aiSummary": "Governador de São Paulo e engenheiro militar com perfil de alta capacidade de entrega em infraestrutura. Responsável pelo maior pacote de leilões e concessões rodoviárias, ferroviárias e de saneamento do país (destaque para a desestatização da Sabesp).",
    "overallScore": 93,
    "radar": {
      "integridade": 95,
      "eficiencia": 96,
      "transparencia": 92,
      "coerencia": 92,
      "viabilidade": 95,
      "assiduidade": 96,
      "presenca": 96
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
        "id": "prop-tarcisio-1",
        "title": "Trem Intercidades (TIC Eixo Norte: SP - Campinas) e Linha 7-Rubi",
        "description": "Concessão de R$ 14,2 bilhões para trem de passageiros de média velocidade ligando a capital à Região Metropolitana de Campinas em 64 minutos.",
        "costEstimate": "R$ 14.200.000.000,00",
        "timelineYears": 5,
        "category": "Mobilidade & Ferrovias",
        "viabilityScore": 96,
        "tseStatus": "Contrato Assinado e Obra em Andamento",
        "fundingSource": "PPP com Consórcio CPTM TIC e BNDES",
        "supportVotes": 17800,
        "rejectVotes": 1400
      },
      {
        "id": "prop-tarcisio-2",
        "title": "Universalização do Saneamento Básico até 2029 pós-Desestatização da Sabesp",
        "description": "Meta contratual de antecipar em quatro anos a coleta e tratamento de 100% do esgoto em 375 municípios paulistas com R$ 68 bilhões em investimentos.",
        "costEstimate": "R$ 68.000.000.000,00",
        "timelineYears": 5,
        "category": "Saneamento & Meio Ambiente",
        "viabilityScore": 94,
        "tseStatus": "Leilão Concluído na B3",
        "fundingSource": "Sabesp Privatizada + Fundo FAUSP",
        "supportVotes": 15400,
        "rejectVotes": 3200
      },
      {
        "id": "prop-tarcisio-3",
        "title": "Novo Centro Administrativo do Governo de SP nos Campos Elíseos",
        "description": "Transferência dos órgãos estaduais do Morumbi para o centro de São Paulo para revitalizar a região central e gerar 22 mil empregos.",
        "costEstimate": "R$ 4.000.000.000,00",
        "timelineYears": 4,
        "category": "Revitalização Urbana",
        "viabilityScore": 92,
        "tseStatus": "Concurso Público de Arquitetura Homologado",
        "fundingSource": "Alienação de imóveis públicos e PPP administrativa",
        "supportVotes": 13900,
        "rejectVotes": 2100
      }
    ]
  },
  {
    "id": "cand-ciro-gomes",
    "name": "Ciro Ferreira Gomes",
    "ballotName": "Ciro Gomes",
    "party": "PDT",
    "number": "12",
    "position": "Presidente da República",
    "state": "CE",
    "city": "Fortaleza / Sobral",
    "age": 68,
    "publicLifeYears": 42,
    "timesElected": 6,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Presidente_Ciro_Gomes.png/330px-Presidente_Ciro_Gomes.png",
    "education": "Direito (Universidade Federal do Ceará - UFC) • Professor Visitante da Harvard Law School",
    "careerHistory": "Prefeito de Fortaleza (1989-1990), Governador do Ceará (1991-1994), Ministro da Fazenda (1994-1995, Plano Real), Ministro da Integração Nacional (2003-2006, Transposição do São Francisco), Deputado Federal (2007-2011).",
    "aiSummary": "Economista e jurista, proponente do Projeto Nacional de Desenvolvimento (PND). Reconhecido pela formulação de reformas estruturantes em educação básica (modelo de Sobral replicado nacionalmente) e industrialização de base tecnológica.",
    "overallScore": 92,
    "radar": {
      "integridade": 93,
      "eficiencia": 94,
      "transparencia": 92,
      "coerencia": 90,
      "viabilidade": 91,
      "assiduidade": 94,
      "presenca": 94
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
        "id": "prop-ciro-1",
        "title": "Programa Dívida Zero: Refinanciamento e Limpeza de Nome no SPC e Serasa",
        "description": "Parceria do governo federal com bancos públicos (Caixa e BB) para renegociar dívidas de 65 milhões de pessoas inadimplentes com até 90% de desconto.",
        "costEstimate": "R$ 12.000.000.000,00 (Fundo Garantidor)",
        "timelineYears": 2,
        "category": "Crédito & Cidadania",
        "viabilityScore": 94,
        "tseStatus": "Proposta Central de Plano de Governo",
        "fundingSource": "Fundo Garantidor de Operações do Tesouro",
        "supportVotes": 15300,
        "rejectVotes": 1100
      },
      {
        "id": "prop-ciro-2",
        "title": "Escola de Tempo Integral no Modelo de Sobral para 100% dos Alunos do Ensino Fundamental",
        "description": "Universalização da jornada de 8 horas diárias com merenda qualificada, ensino profissionalizante e bonificação de professores por resultado.",
        "costEstimate": "R$ 28.000.000.000,00",
        "timelineYears": 4,
        "category": "Educação Pública",
        "viabilityScore": 92,
        "tseStatus": "Metodologia Comprovada no IDEB Cearense",
        "fundingSource": "Fundeb Ampliado e Royalties de Petróleo",
        "supportVotes": 16200,
        "rejectVotes": 850
      },
      {
        "id": "prop-ciro-3",
        "title": "Complexo Industrial da Saúde e Químico para Produção Nacional de Vacinas e Remédios",
        "description": "Redução da dependência internacional de insumos farmacêuticos (IFA) e equipamentos hospitalares via encomendas tecnológicas federais.",
        "costEstimate": "R$ 18.000.000.000,00",
        "timelineYears": 4,
        "category": "Saúde & Soberania Industrial",
        "viabilityScore": 90,
        "tseStatus": "Diretriz do PND Nacional",
        "fundingSource": "BNDES e Financiadora de Estudos e Projetos (Finep)",
        "supportVotes": 14700,
        "rejectVotes": 980
      }
    ]
  },
  {
    "id": "cand-simone-tebet",
    "name": "Simone Nassar Tebet",
    "ballotName": "Simone Tebet",
    "party": "MDB",
    "number": "15",
    "position": "Presidente da República",
    "state": "MS",
    "city": "Três Lagoas / Campo Grande",
    "age": 55,
    "publicLifeYears": 24,
    "timesElected": 4,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/2024-08-28_Audi%C3%AAncia_entre_as_Ministras_Simone_Tebet_e_Luciana_Santos%2C_10_%28cropped%29.jpg/330px-2024-08-28_Audi%C3%AAncia_entre_as_Ministras_Simone_Tebet_e_Luciana_Santos%2C_10_%28cropped%29.jpg",
    "education": "Direito (Universidade Federal do Rio de Janeiro - UFRJ), Mestrado em Direito Constitucional (PUC-SP)",
    "careerHistory": "Deputada Estadual (2003-2004), Prefeita de Três Lagoas por 2 mandatos (2005-2010), Vice-Governadora de MS (2011-2014), Senadora da República (2015-2023), Ministra do Planejamento e Orçamento (2023-atual).",
    "aiSummary": "Ministra do Planejamento e Orçamento e 3ª colocada na corrida presidencial de 2022. Liderou a bancada feminina no Senado Federal, com forte reputação em responsabilidade fiscal, planejamento orçamentário transparente e rotas de integração sul-americana.",
    "overallScore": 93,
    "radar": {
      "integridade": 96,
      "eficiencia": 94,
      "transparencia": 95,
      "coerencia": 91,
      "viabilidade": 93,
      "assiduidade": 95,
      "presenca": 95
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
        "id": "prop-tebet-1",
        "title": "5 Rotas de Integração Sul-Americana e Corredor Bioceânico (Atlântico ao Pacífico)",
        "description": "Viabilização de 124 obras de rodovias, pontes e portos para baratear fretes agrícolas e industriais conectando o Centro-Oeste e o Norte aos portos do Chile e Peru.",
        "costEstimate": "R$ 50.000.000.000,00",
        "timelineYears": 4,
        "category": "Infraestrutura & Comércio Exterior",
        "viabilityScore": 94,
        "tseStatus": "Em Execução pelo Ministério do Planejamento",
        "fundingSource": "Banco de Desenvolvimento da América Latina (CAF), Fonplata e BID",
        "supportVotes": 14800,
        "rejectVotes": 890
      },
      {
        "id": "prop-tebet-2",
        "title": "Orçamento com Avaliação Periódica de Gastos (Spending Review) e Eficiência Pública",
        "description": "Revisão obrigatória de subsídios fiscais ineficientes para economizar R$ 20 a 30 bilhões por ano e redirecionar para saúde e educação infantil.",
        "costEstimate": "Economia estimada de R$ 25.000.000.000,00 / ano",
        "timelineYears": 2,
        "category": "Gestão Fiscal",
        "viabilityScore": 95,
        "tseStatus": "Marco Legal Integrado ao PPA 2024-2027",
        "fundingSource": "Corte de desonerações sem contrapartida",
        "supportVotes": 16100,
        "rejectVotes": 750
      },
      {
        "id": "prop-tebet-3",
        "title": "Igualdade Salarial entre Homens e Mulheres na Mesma Função",
        "description": "Fiscalização obrigatória por relatórios de transparência salarial com multas pesadas para empresas que descumprirem a equiparação.",
        "costEstimate": "Sem custo orçamentário",
        "timelineYears": 1,
        "category": "Direitos & Trabalho",
        "viabilityScore": 96,
        "tseStatus": "Lei Sancionada nº 14.611/2023",
        "fundingSource": "Fiscalização do Ministério do Trabalho e Emprego",
        "supportVotes": 17900,
        "rejectVotes": 620
      }
    ]
  },
  {
    "id": "cand-romeu-zema",
    "name": "Romeu Zema Neto",
    "ballotName": "Romeu Zema",
    "party": "NOVO",
    "number": "30",
    "position": "Governador",
    "state": "MG",
    "city": "Araxá / Belo Horizonte",
    "age": 60,
    "publicLifeYears": 8,
    "timesElected": 2,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Romeu_Zema%2C_December_2024_%28cropped%29.jpg/330px-Romeu_Zema%2C_December_2024_%28cropped%29.jpg",
    "education": "Administração de Empresas (Fundação Getulio Vargas - FGV)",
    "careerHistory": "Empresário do Grupo Zema por 30 anos, Governador de Minas Gerais reeleito no 1º turno (2019-atual).",
    "aiSummary": "Governador de Minas Gerais com forte apelo em gestão austera, corte de cargos comissionados, atração recorde de investimentos privados (mais de R$ 350 bilhões) e equilíbrio fiscal das contas públicas estaduais.",
    "overallScore": 92,
    "radar": {
      "integridade": 95,
      "eficiencia": 95,
      "transparencia": 92,
      "coerencia": 94,
      "viabilidade": 91,
      "assiduidade": 96,
      "presenca": 96
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
        "id": "prop-zema-1",
        "title": "Regime de Recuperação Fiscal (RRF) e Renegociação Federativa da Dívida de MG",
        "description": "Plano com a União para alongar dívida de R$ 160 bilhões em 30 anos preservando investimentos em saúde e segurança.",
        "costEstimate": "Reestruturação de R$ 160.000.000.000,00",
        "timelineYears": 4,
        "category": "Equilíbrio Fiscal",
        "viabilityScore": 91,
        "tseStatus": "Acordo Homologado no STF",
        "fundingSource": "Federalização de ativos estaduais (Cemig, Codemig, Copasa)",
        "supportVotes": 13200,
        "rejectVotes": 2400
      },
      {
        "id": "prop-zema-2",
        "title": "Programa Minas Livre para Crescer: Fim de Alvarás para 700+ Atividades Econômicas",
        "description": "Desregulamentação radical eliminando burocracia para abertura de empresas e geração de empregos em todos os municípios mineiros.",
        "costEstimate": "Custo zero (Economia de taxas)",
        "timelineYears": 2,
        "category": "Desregulamentação & Emprego",
        "viabilityScore": 97,
        "tseStatus": "Decreto Estadual em Plena Execução",
        "fundingSource": "Digitalização de processos (Jucemg Digital)",
        "supportVotes": 16800,
        "rejectVotes": 720
      },
      {
        "id": "prop-zema-3",
        "title": "Universalização do Saneamento no Vale do Jequitinhonha e Norte de Minas",
        "description": "Investimento focado na superação da pobreza hídrica em uma das regiões mais vulneráveis do estado com poços artesianos e redes de água tratada.",
        "costEstimate": "R$ 3.800.000.000,00",
        "timelineYears": 4,
        "category": "Saneamento & Desenvolvimento Regional",
        "viabilityScore": 93,
        "tseStatus": "Programa de Metas Copasa 2026",
        "fundingSource": "Copasa e Parcerias Privadas",
        "supportVotes": 15400,
        "rejectVotes": 610
      }
    ]
  },
  {
    "id": "cand-ronaldo-caiado",
    "name": "Ronaldo Ramos Caiado",
    "ballotName": "Ronaldo Caiado",
    "party": "UNIÃO",
    "number": "44",
    "position": "Governador",
    "state": "GO",
    "city": "Anápolis / Goiânia",
    "age": 76,
    "publicLifeYears": 40,
    "timesElected": 7,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Foto_oficial_do_governador_de_Goi%C3%A1s%2C_Ronaldo_Caiado_em_2023_%28ombros%29.jpg/330px-Foto_oficial_do_governador_de_Goi%C3%A1s%2C_Ronaldo_Caiado_em_2023_%28ombros%29.jpg",
    "education": "Medicina (Universidade Federal do Rio de Janeiro - UFRJ), Especialização em Cirurgia da Coluna Vertebral em Paris",
    "careerHistory": "Fundador da UDR, Deputado Federal por 5 mandatos (1991-2014), Senador da República (2015-2018), Governador de Goiás reeleito no 1º turno (2019-atual).",
    "aiSummary": "Governador de Goiás e médico cirurgião, pré-candidato declarado à Presidência. Notabilizado pelos mais altos índices de aprovação estadual do país, com destaque para a liderança em segurança pública (tolerância zero ao crime organizado) e melhor nota do Brasil no IDEB.",
    "overallScore": 94,
    "radar": {
      "integridade": 96,
      "eficiencia": 96,
      "transparencia": 93,
      "coerencia": 94,
      "viabilidade": 92,
      "assiduidade": 97,
      "presenca": 97
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
        "id": "prop-caiado-1",
        "title": "Modelo de Segurança Pública de Goiás para Nível Nacional: Tolerância Zero a Facções",
        "description": "Integração de inteligência policial, presença ostensiva maciça e desarticulação financeira total do crime organizado nas fronteiras e centros urbanos.",
        "costEstimate": "R$ 15.000.000.000,00",
        "timelineYears": 3,
        "category": "Segurança Pública",
        "viabilityScore": 95,
        "tseStatus": "Case de Sucesso Nacional Comprovado",
        "fundingSource": "Fundo Nacional de Segurança Pública (FNSP)",
        "supportVotes": 18200,
        "rejectVotes": 1100
      },
      {
        "id": "prop-caiado-2",
        "title": "Liderança Nacional no IDEB com Bolsa Estudo e Escolas Padrão Século XXI",
        "description": "Bolsa mensal de incentivo para alunos do Ensino Médio aliada a laboratórios científicos e qualificação de professores em todas as escolas públicas.",
        "costEstimate": "R$ 4.200.000.000,00",
        "timelineYears": 3,
        "category": "Educação Básica",
        "viabilityScore": 96,
        "tseStatus": "Goiás 1º Lugar no IDEB Nacional",
        "fundingSource": "Fundeb e Tesouro Estadual",
        "supportVotes": 17100,
        "rejectVotes": 640
      },
      {
        "id": "prop-caiado-3",
        "title": "Conexão Ferroviária da Ferrovia Norte-Sul aos Polos do Agronegócio Goiano",
        "description": "Ramais ferroviários conectando Rio Verde, Anápolis e Cristalina para reduzir em 30% os custos de frete dos produtores rurais.",
        "costEstimate": "R$ 8.500.000.000,00",
        "timelineYears": 4,
        "category": "Agronegócio & Logística",
        "viabilityScore": 92,
        "tseStatus": "Plano de Logística Integrada 2026",
        "fundingSource": "Concessão Privada Rumo/VLI e BNDES",
        "supportVotes": 15600,
        "rejectVotes": 730
      }
    ]
  },
  {
    "id": "cand-rodrigo-pacheco",
    "name": "Rodrigo Otavio Soares Pacheco",
    "ballotName": "Rodrigo Pacheco",
    "party": "PSD",
    "number": "555",
    "position": "Senador",
    "state": "MG",
    "city": "Belo Horizonte / Passos",
    "age": 49,
    "publicLifeYears": 12,
    "timesElected": 2,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5982.jpg",
    "education": "Direito (PUC-Minas), Especialista em Direito Penal Econômico",
    "careerHistory": "Advogado Criminalista, Deputado Federal (2015-2019), Senador da República (2019-atual), Presidente do Senado Federal e do Congresso Nacional por 2 mandatos (2021-2025).",
    "aiSummary": "Presidente do Senado Federal e do Congresso Nacional. Conduziu o Parlamento durante crises institucionais com perfil equilibrado, garantindo a aprovação da Reforma Tributária, a nova lei do Código Civil e a regulação da Inteligência Artificial.",
    "overallScore": 91,
    "radar": {
      "integridade": 93,
      "eficiencia": 92,
      "transparencia": 91,
      "coerencia": 90,
      "viabilidade": 93,
      "assiduidade": 96,
      "presenca": 96
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
        "id": "prop-pacheco-1",
        "title": "Marco Legal da Inteligência Artificial no Brasil (PL 2338/2023)",
        "description": "Diretrizes éticas, proteção contra discriminação algorítmica e fomento à inovação de IA preservando direitos autorais.",
        "costEstimate": "Sem custo orçamentário direto",
        "timelineYears": 2,
        "category": "Tecnologia & Direitos Digitais",
        "viabilityScore": 94,
        "tseStatus": "Relatório Final em Votação no Senado",
        "fundingSource": "Regulação Setorial",
        "supportVotes": 14500,
        "rejectVotes": 1100
      },
      {
        "id": "prop-pacheco-2",
        "title": "Reforma e Modernização do Código Civil Brasileiro",
        "description": "Atualização do Código de 2002 para novas regras de contratos digitais, direito de família moderno e sucessão patrimonial.",
        "costEstimate": "Custo de tramitação legislativa",
        "timelineYears": 2,
        "category": "Legislação & Cidadania",
        "viabilityScore": 92,
        "tseStatus": "Anteprojeto de Juristas Entregue ao Senado",
        "fundingSource": "Orçamento Ordinário do Congresso",
        "supportVotes": 13800,
        "rejectVotes": 1300
      },
      {
        "id": "prop-pacheco-3",
        "title": "Compensação da Dívida dos Estados com Ativos de Estatais e Energia Limpa",
        "description": "Programa federativo Propag para permitir que estados abatam dívidas com investimentos prioritários em infraestrutura.",
        "costEstimate": "Impacto de repactuação de R$ 300 bilhões",
        "timelineYears": 4,
        "category": "Pacto Federativo",
        "viabilityScore": 95,
        "tseStatus": "PLP 121/2024 em Tramitação",
        "fundingSource": "Ativos Estatais e Tesouro Nacional",
        "supportVotes": 16200,
        "rejectVotes": 890
      }
    ]
  },
  {
    "id": "cand-sergio-moro",
    "name": "Sergio Fernando Moro",
    "ballotName": "Sergio Moro",
    "party": "UNIÃO",
    "number": "444",
    "position": "Senador",
    "state": "PR",
    "city": "Maringá / Curitiba",
    "age": 53,
    "publicLifeYears": 6,
    "timesElected": 1,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5988.jpg",
    "education": "Direito (Universidade Estadual de Maringá - UEM), Doutor em Direito Constitucional (UFPR)",
    "careerHistory": "Juiz Federal titular da 13ª Vara Federal de Curitiba (Operação Lava Jato, 2014-2018), Ministro da Justiça e Segurança Pública (2019-2020), Senador da República pelo Paraná (2023-atual).",
    "aiSummary": "Senador pelo Paraná e ex-juiz da Operação Lava Jato. Principal referência parlamentar no combate à corrupção sistêmica, defesa da prisão em segunda instância, autonomia orçamentária para a Polícia Federal e endurecimento contra facções criminosas.",
    "overallScore": 92,
    "radar": {
      "integridade": 95,
      "eficiencia": 92,
      "transparencia": 93,
      "coerencia": 91,
      "viabilidade": 90,
      "assiduidade": 95,
      "presenca": 95
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
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5991.jpg",
    "education": "Engenharia Aeronáutica (ITA), Mestrado em Engenharia de Sistemas (Naval Postgraduate School - EUA), Treinamento NASA",
    "careerHistory": "Tenente-Coronel da FAB, Primeiro Astronauta Lusófono a ir ao Espaço (Missão Centenário, 2006), Ministro da Ciência, Tecnologia e Inovações (2019-2022), Senador eleito com 10,7 milhões de votos (2023-atual).",
    "aiSummary": "Senador por São Paulo mais votado da história do estado (10,7 milhões de votos). Foco parlamentar na ampliação de investimentos em pesquisa espacial, inteligência artificial, semicondutores e bolsas de pós-graduação do CNPq/Capes.",
    "overallScore": 93,
    "radar": {
      "integridade": 96,
      "eficiencia": 93,
      "transparencia": 94,
      "coerencia": 92,
      "viabilidade": 92,
      "assiduidade": 96,
      "presenca": 96
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
    "number": "222",
    "position": "Senador",
    "state": "RJ",
    "city": "Rio de Janeiro",
    "age": 44,
    "publicLifeYears": 22,
    "timesElected": 5,
    "avatar": "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5894.jpg",
    "education": "Direito (Universidade Cândido Mendes), Pós-Graduado em Políticas Públicas (IUPERJ)",
    "careerHistory": "Deputado Estadual pelo Rio de Janeiro por 4 mandatos (2003-2018), Senador da República pelo Rio de Janeiro (2019-atual).",
    "aiSummary": "Senador pelo Rio de Janeiro e líder político da bancada conservadora. Articulador da regulamentação de cassinos integrados a resorts para turismo, incentivos fiscais para o Rio de Janeiro e endurecimento penal contra facções armadas.",
    "overallScore": 88,
    "radar": {
      "integridade": 86,
      "eficiencia": 90,
      "transparencia": 88,
      "coerencia": 92,
      "viabilidade": 88,
      "assiduidade": 92,
      "presenca": 92
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
        "id": "prop-flavio-1",
        "title": "Marco dos Cassinos Integrados a Resorts para Alavancagem do Turismo e Emprego",
        "description": "Autorização legal de complexos turísticos com cassinos e hotéis com arrecadação de R$ 20 bilhões em impostos para segurança e turismo.",
        "costEstimate": "Arrecadação fiscal estimada em R$ 20.000.000.000,00",
        "timelineYears": 2,
        "category": "Turismo & Economia",
        "viabilityScore": 90,
        "tseStatus": "PL 2234/2022 Aprovado na CCJ do Senado",
        "fundingSource": "Investimentos 100% Privados",
        "supportVotes": 12400,
        "rejectVotes": 4800
      },
      {
        "id": "prop-flavio-2",
        "title": "Pena de Morte ou Prisão Perpétua para Crimes Hediondos com Morte de Policiais",
        "description": "Proposta de plebiscito nacional para inclusão de penas exemplares contra membros de facções que executam agentes públicos de segurança.",
        "costEstimate": "Sem custo orçamentário direto",
        "timelineYears": 3,
        "category": "Segurança Pública",
        "viabilityScore": 84,
        "tseStatus": "Bandeira Legislativa em Debate",
        "fundingSource": "Sem impacto fiscal",
        "supportVotes": 13900,
        "rejectVotes": 5100
      },
      {
        "id": "prop-flavio-3",
        "title": "Desoneração da Indústria Naval e do Petróleo Fluminense",
        "description": "Manutenção de incentivos do Repetro para gerar 40 mil empregos em estaleiros de Niterói, Angra e São Gonçalo.",
        "costEstimate": "R$ 3.000.000.000,00 em desonerações",
        "timelineYears": 4,
        "category": "Indústria & Petróleo",
        "viabilityScore": 92,
        "tseStatus": "Lei de Incentivo Setorial",
        "fundingSource": "Compensação com royalties do pré-sal",
        "supportVotes": 14100,
        "rejectVotes": 1200
      }
    ]
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
    "overallScore": 92,
    "radar": {
      "integridade": 95,
      "eficiencia": 93,
      "transparencia": 94,
      "coerencia": 91,
      "viabilidade": 92,
      "assiduidade": 96,
      "presenca": 96
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
    "party": "PSDB",
    "number": "45",
    "position": "Governador",
    "state": "RS",
    "city": "Pelotas / Porto Alegre",
    "age": 41,
    "publicLifeYears": 20,
    "timesElected": 3,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/09.02.2026_%E2%80%93_Eduardo_Leite_in_February_2026_-_55087496770_%283x4%29.jpg/330px-09.02.2026_%E2%80%93_Eduardo_Leite_in_February_2026_-_55087496770_%283x4%29.jpg",
    "education": "Direito (UFPEL), Mestrado em Gestão Pública (Columbia University)",
    "careerHistory": "Vereador de Pelotas (2009-2012), Prefeito de Pelotas (2013-2016), Governador do Rio Grande do Sul reeleito (2019-2022 e 2023-atual).",
    "aiSummary": "Governador do Rio Grande do Sul e primeiro reeleito da história do estado. Liderou a reconstrução do estado após as enchentes históricas de 2024 (Plano Rio Grande), além de reformas estruturais na previdência estadual e privatização de estatais deficitárias.",
    "overallScore": 92,
    "radar": {
      "integridade": 94,
      "eficiencia": 93,
      "transparencia": 95,
      "coerencia": 90,
      "viabilidade": 92,
      "assiduidade": 97,
      "presenca": 97
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
        "id": "prop-leite-1",
        "title": "Plano Rio Grande: Sistema Definitivo de Proteção Contra Cheias e Diques na Bacia do Guaíba",
        "description": "Reconstrução resiliente com modernização de bombas de drenagem, alteamento de diques e bacias de contenção para cheias milenares.",
        "costEstimate": "R$ 12.000.000.000,00",
        "timelineYears": 4,
        "category": "Adaptação Climática & Infraestrutura",
        "viabilityScore": 95,
        "tseStatus": "Fundo do Plano Rio Grande Homologado",
        "fundingSource": "Fundoprec, Apoio Federal e Empréstimos BID/Bird",
        "supportVotes": 17200,
        "rejectVotes": 890
      },
      {
        "id": "prop-leite-2",
        "title": "Reestruturação Fiscal e Pagamento em Dia do Salário de Servidores Públicos",
        "description": "Manutenção do fim do parcelamento de salários que durou 5 anos antes de sua gestão com austeridade e responsabilidade fiscal.",
        "costEstimate": "Manutenção da folha regular",
        "timelineYears": 2,
        "category": "Gestão Pública",
        "viabilityScore": 96,
        "tseStatus": "Conquista Fiscal Consolidada",
        "fundingSource": "Ajuste de Despesas e Receitas Tributárias",
        "supportVotes": 15900,
        "rejectVotes": 980
      },
      {
        "id": "prop-leite-3",
        "title": "Programa Todo Jovem na Escola: Auxílio Financeiro para 120 Mil Alunos Gaúchos",
        "description": "Bolsa mensal de incentivo vinculada a 80% de frequência escolar para reduzir a evasão de jovens vulneráveis.",
        "costEstimate": "R$ 190.000.000,00 / ano",
        "timelineYears": 3,
        "category": "Educação & Assistência",
        "viabilityScore": 94,
        "tseStatus": "Programa em Execução Plena",
        "fundingSource": "Fundo Estadual de Combate à Pobreza",
        "supportVotes": 16400,
        "rejectVotes": 620
      }
    ]
  },
  {
    "id": "cand-helder-barbalho",
    "name": "Helder Zahluth Barbalho",
    "ballotName": "Helder Barbalho",
    "party": "MDB",
    "number": "15",
    "position": "Governador",
    "state": "PA",
    "city": "Ananindeua / Belém",
    "age": 46,
    "publicLifeYears": 24,
    "timesElected": 5,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Helder_Barbalho%2C_January_2023_%28cropped%29.jpg/330px-Helder_Barbalho%2C_January_2023_%28cropped%29.jpg",
    "education": "Administração de Empresas (UNAMA), Pós-Graduado em Gestão Pública",
    "careerHistory": "Vereador de Ananindeua (2001-2003), Deputado Estadual (2003-2005), Prefeito de Ananindeua por 2 mandatos (2005-2012), Ministro da Integração Nacional (2016-2018), Governador do Pará reeleito com 70% dos votos (2019-atual).",
    "aiSummary": "Governador do Pará reeleito com a maior votação proporcional do país (70%). Líder do Consórcio Amazônia Legal e anfitrião da Conferência Mundial do Clima da ONU (COP30 em Belém, 2025), notabilizado por conciliar bioeconomia, saneamento e presença do Estado nas calhas dos rios.",
    "overallScore": 93,
    "radar": {
      "integridade": 92,
      "eficiencia": 95,
      "transparencia": 93,
      "coerencia": 93,
      "viabilidade": 95,
      "assiduidade": 97,
      "presenca": 97
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
        "id": "prop-helder-1",
        "title": "Infraestrutura da COP30 em Belém: Parque da Cidade, Porto Futuro II e Drenagem",
        "description": "Investimento de R$ 5 bilhões em requalificação urbana, hotelaria sustentável e macro-drenagem de canais na capital paraense.",
        "costEstimate": "R$ 5.000.000.000,00",
        "timelineYears": 2,
        "category": "Infraestrutura Urbana & Clima",
        "viabilityScore": 96,
        "tseStatus": "Obras da COP30 em Ritmo Acelerado",
        "fundingSource": "Governo Federal, Itaipu e Tesouro Estadual",
        "supportVotes": 16800,
        "rejectVotes": 920
      },
      {
        "id": "prop-helder-2",
        "title": "Usinas da Paz: Complexos Comunitários de Cidadania, Esporte e Combate à Violência",
        "description": "Expansão de centros integrados com mais de 70 serviços gratuitos (saúde, qualificação, cursos, teatro) nas periferias do Pará.",
        "costEstimate": "R$ 900.000.000,00",
        "timelineYears": 3,
        "category": "Segurança & Cidadania Comunitária",
        "viabilityScore": 97,
        "tseStatus": "30 Usinas em Operação Plena",
        "fundingSource": "Acordo com Mineradoras e Tesouro Estadual",
        "supportVotes": 17900,
        "rejectVotes": 510
      },
      {
        "id": "prop-helder-3",
        "title": "Rastreabilidade Individual da Pecuária e Plano Amazônia Agora (Desmatamento Zero)",
        "description": "Identificação por chip de 100% do rebanho bovino para garantir carne sustentável sem desmatamento ilegal nos mercados globais.",
        "costEstimate": "R$ 350.000.000,00",
        "timelineYears": 3,
        "category": "Agronegócio Sustentável",
        "viabilityScore": 93,
        "tseStatus": "Decreto Estadual de Rastreabilidade",
        "fundingSource": "Fundo Amazônia e Produtores Rurais",
        "supportVotes": 15400,
        "rejectVotes": 1100
      }
    ]
  },
  {
    "id": "cand-claudio-castro",
    "name": "Cláudio Bonfim de Castro e Silva",
    "ballotName": "Cláudio Castro",
    "party": "PL",
    "number": "22",
    "position": "Governador",
    "state": "RJ",
    "city": "Rio de Janeiro",
    "age": 46,
    "publicLifeYears": 14,
    "timesElected": 2,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Claudio_Castro_como_Vice_Governador_do_Rio_de_Janeiro.jpg/330px-Claudio_Castro_como_Vice_Governador_do_Rio_de_Janeiro.jpg",
    "education": "Direito (Universidade Federal do Rio de Janeiro - UFRJ)",
    "careerHistory": "Chefe de Gabinete parlamentar, Vereador da Cidade do Rio de Janeiro (2017-2018), Vice-Governador do RJ (2019-2021), Governador reeleito em 1º turno (2021-atual).",
    "aiSummary": "Governador do Estado do Rio de Janeiro reeleito no 1º turno em 2022. Conduziu o maior leilão de saneamento da história do país (Cedae), com aporte bilionário para investimentos municipais, além do programa Segurança Presente em dezenas de bairros e municípios.",
    "overallScore": 89,
    "radar": {
      "integridade": 86,
      "eficiencia": 90,
      "transparencia": 88,
      "coerencia": 90,
      "viabilidade": 91,
      "assiduidade": 94,
      "presenca": 94
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
        "id": "prop-castro-1",
        "title": "Expansão do Programa Segurança Presente para Todos os 92 Municípios Fluminenses",
        "description": "Policiamento de proximidade com policiais de folga pagos por RAS para zerar furtos em centros comerciais e áreas turísticas.",
        "costEstimate": "R$ 380.000.000,00 / ano",
        "timelineYears": 3,
        "category": "Segurança Pública",
        "viabilityScore": 94,
        "tseStatus": "Programa em 45 Bases Ativas",
        "fundingSource": "Tesouro Estadual e Fundo de Segurança",
        "supportVotes": 15400,
        "rejectVotes": 1800
      },
      {
        "id": "prop-castro-2",
        "title": "Despoluição da Baía de Guanabara com Recursos da Concessão da Cedae",
        "description": "Obras de coleta de esgoto em tempo seco e cinturões de proteção para despoluir praias da Zona Sul, Niterói e Ilha do Governador.",
        "costEstimate": "R$ 4.500.000.000,00",
        "timelineYears": 5,
        "category": "Saneamento & Meio Ambiente",
        "viabilityScore": 91,
        "tseStatus": "Metas Contratuais da Águas do Rio e Iguá",
        "fundingSource": "Concessionárias Privadas de Saneamento",
        "supportVotes": 16700,
        "rejectVotes": 1100
      },
      {
        "id": "prop-castro-3",
        "title": "Metrô Leve de Superfície (VLT Metropolitano) na Baixada Fluminense",
        "description": "Ligação sobre trilhos conectando Pavuna, São João de Meriti, Belford Roxo e Nova Iguaçu reaproveitando leitos ferroviários.",
        "costEstimate": "R$ 3.200.000.000,00",
        "timelineYears": 4,
        "category": "Mobilidade Urbana",
        "viabilityScore": 89,
        "tseStatus": "Projeto Básico em Estudo na Setrans",
        "fundingSource": "BNDES e PPP de Transporte",
        "supportVotes": 14800,
        "rejectVotes": 1400
      }
    ]
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
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Reuni%C3%A3o_com_o_Senhor_Ricardo_Nunes%2C_Prefeito_do_Munic%C3%ADpio_de_S%C3%A3o_Paulo_e_Secret%C3%A1rios_%28cropped%29.jpg/330px-Reuni%C3%A3o_com_o_Senhor_Ricardo_Nunes%2C_Prefeito_do_Munic%C3%ADpio_de_S%C3%A3o_Paulo_e_Secret%C3%A1rios_%28cropped%29.jpg",
    "education": "Direito (Universidade Santo Amaro - UNISA)",
    "careerHistory": "Empresário do setor de eventos, Vereador de São Paulo por 2 mandatos (2013-2020), Vice-Prefeito de Bruno Covas (2021), Prefeito da Cidade de São Paulo (2021-atual, reeleito em 2024).",
    "aiSummary": "Prefeito da maior metrópole da América Latina reeleito com ampla coalizão política em 2024. Gestão caracterizada pelo recorde de caixa público municipal (R$ 35 bilhões em investimentos), Tarifa Zero aos domingos no transporte público, recapeamento massivo e expansão das vagas de creche.",
    "overallScore": 92,
    "radar": {
      "integridade": 93,
      "eficiencia": 94,
      "transparencia": 92,
      "coerencia": 91,
      "viabilidade": 94,
      "assiduidade": 97,
      "presenca": 97
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
    "position": "Prefeito",
    "state": "RJ",
    "city": "Rio de Janeiro",
    "age": 56,
    "publicLifeYears": 32,
    "timesElected": 4,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Eduardo_Paes%2C_October_2024.jpg/330px-Eduardo_Paes%2C_October_2024.jpg",
    "education": "Direito (Pontifícia Universidade Católica do Rio de Janeiro - PUC-Rio)",
    "careerHistory": "Subprefeito da Barra e Jacarepaguá (1993-1996), Deputado Federal por 2 mandatos (1999-2007), Secretário Estadual de Turismo, Prefeito do Rio por 4 mandatos (2009-2016 e 2021-atual, reeleito em 2024 no 1º turno).",
    "aiSummary": "Prefeito do Rio de Janeiro reeleito no 1º turno em 2024 para seu 4º mandato. Líder da transformação olímpica da cidade (Parque Olímpico, VLT Carioca, Transolímpica), revitalização do Porto Maravilha e recuperação das finanças municipais.",
    "overallScore": 93,
    "radar": {
      "integridade": 93,
      "eficiencia": 96,
      "transparencia": 94,
      "coerencia": 92,
      "viabilidade": 95,
      "assiduidade": 97,
      "presenca": 97
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
        "id": "prop-paes-1",
        "title": "Revitalização Completa e Expansão Residencial do Porto Maravilha",
        "description": "Atração de 100 mil novos moradores para a região portuária com incentivos fiscais e prédios residenciais sustentáveis.",
        "costEstimate": "R$ 6.000.000.000,00 em investimentos privados",
        "timelineYears": 4,
        "category": "Urbanismo & Habitação",
        "viabilityScore": 96,
        "tseStatus": "Mais de 15.000 Apartamentos em Construção",
        "fundingSource": "Operação Urbana Consorciada Porto Maravilha",
        "supportVotes": 17800,
        "rejectVotes": 890
      },
      {
        "id": "prop-paes-2",
        "title": "Terminal Gentileza e Expansão da Conexão VLT ao BRT Transbrasil",
        "description": "Hub intermodal de integração de ônibus urbanos, BRT e VLT para desafogar a Avenida Brasil e o centro do Rio.",
        "costEstimate": "R$ 300.000.000,00",
        "timelineYears": 2,
        "category": "Mobilidade Urbana",
        "viabilityScore": 98,
        "tseStatus": "Terminal em Funcionamento Pleno",
        "fundingSource": "Parceria com Caixa e Recursos Municipais",
        "supportVotes": 18200,
        "rejectVotes": 650
      },
      {
        "id": "prop-paes-3",
        "title": "Super Centro Carioca de Saúde e Redução das Filas do SISREG",
        "description": "Maior complexo público municipal de especialidades médicas e cirurgias eletivas da América Latina com capacidade para 35 mil atendimentos/mês.",
        "costEstimate": "R$ 250.000.000,00 / ano",
        "timelineYears": 3,
        "category": "Saúde Especializada",
        "viabilityScore": 95,
        "tseStatus": "Complexo Inaugurado e em Operação",
        "fundingSource": "Secretaria Municipal de Saúde do Rio",
        "supportVotes": 18900,
        "rejectVotes": 510
      }
    ]
  },
  {
    "id": "cand-joao-campos",
    "name": "João Henrique de Andrade Lima Campos",
    "ballotName": "João Campos",
    "party": "PSB",
    "number": "40",
    "position": "Prefeito",
    "state": "PE",
    "city": "Recife",
    "age": 32,
    "publicLifeYears": 8,
    "timesElected": 3,
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Jo%C3%A3o_Campos_em_2_de_julho_de_2024%2C_por_Ricardo_Stuckert_%28rotation_%29.jpg/330px-Jo%C3%A3o_Campos_em_2_de_julho_de_2024%2C_por_Ricardo_Stuckert_%28rotation_%29.jpg",
    "education": "Engenharia Civil (Universidade Federal de Pernambuco - UFPE)",
    "careerHistory": "Deputado Federal mais votado de Pernambuco (2019-2020), Prefeito do Recife eleito em 2020 e reeleito em 2024 com recorde histórico de 78,1% dos votos.",
    "aiSummary": "Prefeito do Recife e engenheiro civil, reeleito em 2024 com a maior votação percentual entre todas as capitais do Brasil (78,1%). Reconhecido pela gestão inovadora em tecnologia cívica (Conecta Recife, Embarque Digital), urbanismo social com os COMPAZ e macrodrenagem de morros.",
    "overallScore": 95,
    "radar": {
      "integridade": 96,
      "eficiencia": 97,
      "transparencia": 96,
      "coerencia": 94,
      "viabilidade": 95,
      "assiduidade": 98,
      "presenca": 98
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
        "id": "prop-campos-1",
        "title": "Programa Embarque Digital: Ensino Superior Gratuito em Tecnologia para Jovens de Escola Pública",
        "description": "Financiamento de graduação completa em Análise de Sistemas e Ciência de Dados no Porto Digital com empregabilidade imediata.",
        "costEstimate": "R$ 45.000.000,00 / ano",
        "timelineYears": 4,
        "category": "Educação Superior & Tecnologia",
        "viabilityScore": 98,
        "tseStatus": "Mais de 2.000 Alunos Formados",
        "fundingSource": "Recursos Próprios da Prefeitura do Recife e Porto Digital",
        "supportVotes": 19500,
        "rejectVotes": 210
      },
      {
        "id": "prop-campos-2",
        "title": "Expansão da Rede COMPAZ (Centros Comunitários da Paz) - Prêmio ONU de Serviço Público",
        "description": "Equipamentos de acolhimento social, bibliotecas, piscinas e apoio psicológico nas áreas de maior vulnerabilidade para zerar homicídios.",
        "costEstimate": "R$ 180.000.000,00",
        "timelineYears": 3,
        "category": "Cidadania & Segurança Cidadã",
        "viabilityScore": 97,
        "tseStatus": "Reconhecido pela ONU como Melhor Serviço Público",
        "fundingSource": "Banco Interamericano de Desenvolvimento (BID)",
        "supportVotes": 19800,
        "rejectVotes": 150
      },
      {
        "id": "prop-campos-3",
        "title": "Programa ProMorar: Obras de Contenção de Encostas e Drenagem em 40 Morros do Recife",
        "description": "Maior pacote de contenção de geomantas e muros de arrimo da história da cidade para garantir risco zero de deslizamento no inverno.",
        "costEstimate": "R$ 2.000.000.000,00",
        "timelineYears": 4,
        "category": "Defesa Civil & Infraestrutura",
        "viabilityScore": 96,
        "tseStatus": "Contrato de R$ 2 Bilhões Assinado com o BID",
        "fundingSource": "Empréstimo BID e Tesouro Municipal",
        "supportVotes": 18700,
        "rejectVotes": 320
      }
    ]
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
    "avatar": "https://upload.wikimedia.org/wikipedia/commons/9/97/2024_FUAD_NOMAN_CANDIDATO_PREFEITO_MG_BELO_HORIZONTE_TSE_%28130001975610%29.jpg",
    "education": "Ciências Econômicas (Centro de Ensino Unificado de Brasília - CEUB)",
    "careerHistory": "Economista de carreira do Banco Central, Secretário de Fazenda de MG (2003-2007), Ministro interino da Fazenda, Prefeito de Belo Horizonte (2022-atual, reeleito em 2024).",
    "aiSummary": "Prefeito de Belo Horizonte reeleito em 2024, economista sênior com vasta experiência em gestão pública e equilíbrio orçamentário. Foco em obras antienchentes históricas (bacias de contenção na Vilarinho), recapeamento viário e saúde básica nos centros de saúde.",
    "overallScore": 91,
    "radar": {
      "integridade": 94,
      "eficiencia": 92,
      "transparencia": 92,
      "coerencia": 93,
      "viabilidade": 93,
      "assiduidade": 96,
      "presenca": 96
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
    "avatar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Bruno_Reis_%28foto_oficial_para_o_TSE%29.png/330px-Bruno_Reis_%28foto_oficial_para_o_TSE%29.png",
    "education": "Direito (Universidade Católica do Salvador - UCSal), Especialização em Gestão Pública (FGV)",
    "careerHistory": "Deputado Estadual por 2 mandatos (2011-2016), Vice-Prefeito de ACM Neto (2017-2020), Prefeito de Salvador (2021-atual, reeleito em 2024 com 78,6% dos votos no 1º turno).",
    "aiSummary": "Prefeito de Salvador reeleito com uma das maiores votações do Brasil em 2024 (78,6%). Notabilizado pela gestão fiscal sólida com nota Capag A do Tesouro Nacional, implantação do BRT de Salvador, requalificação da orla e liderança na geração de empregos no setor de turismo e serviços.",
    "overallScore": 94,
    "radar": {
      "integridade": 95,
      "eficiencia": 96,
      "transparencia": 95,
      "coerencia": 94,
      "viabilidade": 95,
      "assiduidade": 97,
      "presenca": 97
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

module.exports = { EXECUTIVE_AND_SENATE_POLITICIANS };
