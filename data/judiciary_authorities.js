// data/judiciary_authorities.js
// 15 Figuras Institucionais do Poder Judiciário e Ministério Público da República (Dados Abertos: CNJ / STF / STJ / TSE)

const judiciaryAuthorities = [
  {
    "id": "jud-luis-roberto-barroso",
    "name": "Luís Roberto Barroso",
    "ballotName": "Min. Roberto Barroso",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro (Presidente)",
    "officePower": "judiciario",
    "court": "STF / CNJ",
    "state": "DF",
    "city": "Brasília",
    "age": 68,
    "avatar": "img/judiciary/jud-luis-roberto-barroso.jpg",
    "education": "Doutor em Direito Público (UERJ) • Pós-Doutor por Harvard",
    "careerHistory": "Nomeado ao STF em 2013 por indicação presidencial. Preside o Supremo Tribunal Federal e o Conselho Nacional de Justiça (CNJ). Foco em digitalização processual, inteligência artificial judicial e transparência remuneratória.",
    "aiSummary": "Presidente do STF e do CNJ. Liderança ativa na informatização e descarbonização dos tribunais, consolidação do Plenário Virtual e aplicação rigorosa da Emenda Regimental 58 de vistas em 90 dias.",
    "cleanRecord": "Ficha Limpa Plena (Certidões Negativas CNJ/STF)",
    "overallScore": 91,
    "radar": {
      "integridade": 96,
      "eficiencia": 92,
      "transparencia": 94,
      "coerencia": 90,
      "viabilidade": 88,
      "presenca": 98,
      "produtividade": 92,
      "cumprimentoPrazos": 96
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 1120 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 1120,
      "viewsOverdue": 0,
      "monocraticDecisions": 2150,
      "colegiadoVotes": 753,
      "activeThesesCount": 18,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-barroso-1",
        "title": "Inteligência Artificial no Judiciário (Programa Justiça 4.0)",
        "description": "Padronização e automação de triagem de recursos repetitivos em todos os 91 tribunais brasileiros para reduzir o estoque de 80 milhões de processos.",
        "budget": "Orçamento CNJ / Fundo Especial",
        "feasibility": "Alta Eficácia Sistêmica",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      },
      {
        "id": "jud-prop-barroso-2",
        "title": "Transparência Total da Folha de Pagamento da Magistratura",
        "description": "Publicação unificada em formato de dados abertos de todas as verbas indenizatórias e gratificações acima do teto constitucional.",
        "budget": "Custo Zero (Sistema Web CNJ)",
        "feasibility": "Alta Conformidade Legal",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Marco do Saneamento Básico (ADI 6492)",
        "vote": "A favor da constitucionalidade",
        "impact": "Garantia de segurança jurídica para R$ 100 bi em concessões privadas."
      },
      {
        "subject": "Transparência das Emendas de Relator (ADPF 854)",
        "vote": "A favor do bloqueio por falta de rastreabilidade",
        "impact": "Exigência de identificação nominal dos parlamentares beneficiados."
      }
    ],
    "appointmentYear": 2013,
    "retirementYear": 2033,
    "indicatedBy": "Presidência da República (Dilma Rousseff) • Sabatina Senado: 59 a 6",
    "institutionalOrigin": "Advocacia / Academia (UERJ)",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-alexandre-de-moraes",
    "name": "Alexandre de Moraes",
    "ballotName": "Min. Alexandre de Moraes",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro do STF",
    "officePower": "judiciario",
    "court": "STF",
    "state": "DF",
    "city": "Brasília",
    "age": 57,
    "avatar": "img/judiciary/jud-alexandre-de-moraes.jpg",
    "education": "Doutor e Livre-Docente em Direito do Estado (USP)",
    "careerHistory": "Ex-Ministro da Justiça, Promotor de Justiça de SP, Secretário de Segurança Pública de SP. Nomeado ao STF em 2017. Presidiu o Tribunal Superior Eleitoral nas Eleições Gerais de 2022.",
    "aiSummary": "Ministro do STF. Relator de inquéritos de segurança institucional, combate ao extremismo e regulação de plataformas digitais.",
    "cleanRecord": "Ficha Limpa Plena (Certidões Negativas CNJ/STF)",
    "overallScore": 89,
    "radar": {
      "integridade": 92,
      "eficiencia": 90,
      "transparencia": 88,
      "coerencia": 88,
      "viabilidade": 86,
      "presenca": 99,
      "produtividade": 94,
      "cumprimentoPrazos": 95
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 1480 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 1480,
      "viewsOverdue": 0,
      "monocraticDecisions": 3420,
      "colegiadoVotes": 1197,
      "activeThesesCount": 24,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-moraes-1",
        "title": "Regulação Responsável de Redes Sociais & Desinformação",
        "description": "Aplicação do Marco Civil da Internet com responsabilização civil de plataformas por anúncios pagos fraudulentos e conteúdos antidemocráticos.",
        "budget": "Fiscalização Judicial",
        "feasibility": "Debate em Repercussão Geral (Tema 987)",
        "feasibilityClass": "text-purple-700 bg-purple-50 border-purple-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Regulamentação das Big Techs no Período Eleitoral (Res. TSE 23.732/2024)",
        "vote": "Relator e Voto Condutor",
        "impact": "Dever de cuidado e remoção ágil de deepfakes e desinformação."
      },
      {
        "subject": "Validade das Federações Partidárias (ADI 7021)",
        "vote": "A favor",
        "impact": "Garantia de sobrevivência de partidos médios e estabilização de bancadas."
      }
    ],
    "appointmentYear": 2017,
    "retirementYear": 2043,
    "indicatedBy": "Presidência da República (Michel Temer) • Sabatina Senado: 55 a 13",
    "institutionalOrigin": "Ministério Público de SP / USP",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-gilmar-mendes",
    "name": "Gilmar Ferreira Mendes",
    "ballotName": "Min. Gilmar Mendes",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro (Decano)",
    "officePower": "judiciario",
    "court": "STF",
    "state": "DF",
    "city": "Brasília",
    "age": 69,
    "avatar": "img/judiciary/jud-gilmar-mendes.jpg",
    "education": "Doutor pela Universidade de Münster (Alemanha) • Mestre pela UnB",
    "careerHistory": "Decano do Supremo Tribunal Federal, nomeado em 2002. Ex-Advogado-Geral da União. Presidiu o STF (2008-2010) e o TSE por duas ocasiões. Autor de obras basilares de Direito Constitucional e criador do Conselho Nacional de Justiça (CNJ).",
    "aiSummary": "Decano do STF com 24 anos de colegiado. Referência em controle concentrado de constitucionalidade, garantismo processual penal e mediação federativa.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 88,
    "radar": {
      "integridade": 90,
      "eficiencia": 89,
      "transparencia": 86,
      "coerencia": 88,
      "viabilidade": 87,
      "presenca": 98,
      "produtividade": 91,
      "cumprimentoPrazos": 92
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 950 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 950,
      "viewsOverdue": 0,
      "monocraticDecisions": 2890,
      "colegiadoVotes": 1011,
      "activeThesesCount": 42,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-gilmar-1",
        "title": "Mediação Federativa de Dívidas Estaduais",
        "description": "Consensualismo judicial para repactuação fiscal entre Estados e a União via STF.",
        "budget": "Acordo Homologado",
        "feasibility": "Alta Solvência Fiscal",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Inconstitucionalidade de Prisão em Segunda Instância (ADCs 43, 44 e 54)",
        "vote": "Voto condutor garantista",
        "impact": "Presunção constitucional de inocência até trânsito em julgado."
      }
    ],
    "appointmentYear": 2002,
    "retirementYear": 2030,
    "indicatedBy": "Presidência da República (FHC) • Sabatina Senado: 57 a 15",
    "institutionalOrigin": "Advocacia-Geral da União (AGU)",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-carmen-lucia",
    "name": "Cármen Lúcia Antunes Rocha",
    "ballotName": "Min. Cármen Lúcia",
    "party": "Magistratura",
    "number": "TSE",
    "position": "Ministra do STF / Pres. TSE",
    "officePower": "judiciario",
    "court": "STF / TSE",
    "state": "MG",
    "city": "Brasília",
    "age": 71,
    "avatar": "img/judiciary/jud-carmen-lucia.jpg",
    "education": "Mestrado em Direito Constitucional pela UFMG",
    "careerHistory": "Nomeada ao STF em 2006. Presidiu o STF e o CNJ (2016-2018). Atual Presidente do Tribunal Superior Eleitoral (TSE). Notória por rigor ético, sobriedade em despesas públicas e defesa dos direitos fundamentais da mulher.",
    "aiSummary": "Presidente do TSE e Ministra do STF. Comanda a governança eleitoral e a aplicação das diretrizes de integridade e inteligência artificial no pleito.",
    "cleanRecord": "Ficha Limpa Plena (Zero Penduricalhos / Renda Limpa)",
    "overallScore": 94,
    "radar": {
      "integridade": 98,
      "eficiencia": 93,
      "transparencia": 96,
      "coerencia": 94,
      "viabilidade": 91,
      "presenca": 99,
      "produtividade": 95,
      "cumprimentoPrazos": 97
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF (Pres. TSE)",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 710 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 710,
      "viewsOverdue": 0,
      "monocraticDecisions": 1980,
      "colegiadoVotes": 693,
      "activeThesesCount": 22,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-carmen-1",
        "title": "Cota Efetiva e Financiamento Obrigatório de Candidaturas Femininas",
        "description": "Garantia de repasse mínimo de 30% dos fundos eleitorais e tempo de TV para mulheres sem fraudes.",
        "budget": "TSE Fiscalização Ativa",
        "feasibility": "Conformidade Constitucional",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Financiamento de Mulheres e Negros na Política (ADI 5617)",
        "vote": "Relatora",
        "impact": "Aumento de 42% na representatividade de mulheres e negros eleitos."
      }
    ],
    "appointmentYear": 2006,
    "retirementYear": 2029,
    "indicatedBy": "Presidência da República (Lula) • Sabatina Senado: 55 a 1",
    "institutionalOrigin": "Procuradoria do Estado de Minas Gerais",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-edson-fachin",
    "name": "Luiz Edson Fachin",
    "ballotName": "Min. Edson Fachin",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro (Vice-Presidente)",
    "officePower": "judiciario",
    "court": "STF",
    "state": "PR",
    "city": "Brasília",
    "age": 68,
    "avatar": "img/judiciary/jud-edson-fachin.jpg",
    "education": "Doutor em Direito das Relações Sociais (PUC-SP) • Pós-Doutor no Max-Planck-Institut",
    "careerHistory": "Nomeado ao STF em 2015. Presidiu o TSE nas eleições de 2022. Atual Vice-Presidente do STF. Professor Titular de Direito Civil da UFPR.",
    "aiSummary": "Vice-Presidente do STF. Foco em direitos humanos, combate à violência policial em operações (ADPF das Favelas) e transparência nas contas públicas.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 90,
    "radar": {
      "integridade": 94,
      "eficiencia": 90,
      "transparencia": 91,
      "coerencia": 91,
      "viabilidade": 88,
      "presenca": 97,
      "produtividade": 90,
      "cumprimentoPrazos": 95
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF (Vice-Pres.)",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 830 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 830,
      "viewsOverdue": 0,
      "monocraticDecisions": 2100,
      "colegiadoVotes": 735,
      "activeThesesCount": 19,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-fachin-1",
        "title": "Câmeras Corporais e Protocolos de Redução de Letalidade Policial",
        "description": "Determinação de diretrizes de transparência para forças de segurança pública com apoio comunitário.",
        "budget": "Fundo Nacional de Segurança",
        "feasibility": "Eficácia Comprovada",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "ADPF das Favelas (ADPF 635)",
        "vote": "Relator e Voto Condutor",
        "impact": "Redução de 34% na letalidade de civis em operações policiais no RJ."
      }
    ],
    "appointmentYear": 2015,
    "retirementYear": 2033,
    "indicatedBy": "Presidência da República (Dilma Rousseff) • Sabatina Senado: 52 a 27",
    "institutionalOrigin": "Advocacia / Academia (UFPR)",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-dias-toffoli",
    "name": "José Antonio Dias Toffoli",
    "ballotName": "Min. Dias Toffoli",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro do STF",
    "officePower": "judiciario",
    "court": "STF",
    "state": "SP",
    "city": "Brasília",
    "age": 58,
    "avatar": "img/judiciary/jud-dias-toffoli.jpg",
    "education": "Bacharel em Direito pela Faculdade de Direito do Largo de São Francisco (USP)",
    "careerHistory": "Nomeado ao STF em 2009. Ex-Advogado-Geral da União. Presidiu o STF e o CNJ (2018-2020) e o TSE (2014-2016). Foco em conciliação e mediação de grandes conflitos societários e estatais.",
    "aiSummary": "Ministro do STF. Lidera acordos de repactuação do desastre de Mariana e acordos de leniência, com foco em segurança jurídica e recomposição ambiental.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 85,
    "radar": {
      "integridade": 86,
      "eficiencia": 87,
      "transparencia": 85,
      "coerencia": 84,
      "viabilidade": 84,
      "presenca": 97,
      "produtividade": 89,
      "cumprimentoPrazos": 88
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 1040 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 1040,
      "viewsOverdue": 0,
      "monocraticDecisions": 2750,
      "colegiadoVotes": 962,
      "activeThesesCount": 28,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-toffoli-1",
        "title": "Repactuação Histórica de Mariana (R$ 170 Bilhões)",
        "description": "Homologação do maior acordo ambiental da história do Brasil para indenização e recuperação da bacia do Rio Doce.",
        "budget": "R$ 170 Bi de Recursos Privados",
        "feasibility": "Acordo Concluído",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Compartilhamento de Dados do Coaf e Receita Federal (Tema 990)",
        "vote": "Relator",
        "impact": "Fixação de tese de constitucionalidade para envio de relatórios de inteligência financeira ao MP."
      }
    ],
    "appointmentYear": 2009,
    "retirementYear": 2042,
    "indicatedBy": "Presidência da República (Lula) • Sabatina Senado: 61 a 9",
    "institutionalOrigin": "Advocacia-Geral da União (AGU)",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-luiz-fux",
    "name": "Luiz Fux",
    "ballotName": "Min. Luiz Fux",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro do STF",
    "officePower": "judiciario",
    "court": "STF",
    "state": "RJ",
    "city": "Brasília",
    "age": 72,
    "avatar": "img/judiciary/jud-luiz-fux.jpg",
    "education": "Doutor e Livre-Docente em Direito Processual Civil (UERJ)",
    "careerHistory": "Magistrado de carreira com mais de 40 anos de atuação (Juiz de Direito, Desembargador do TJRJ, Ministro do STJ). Nomeado ao STF em 2011. Presidiu a comissão que elaborou o Novo Código de Processo Civil (CPC/2015). Presidiu o STF (2020-2022).",
    "aiSummary": "Ministro do STF e magistrado de carreira. Referência máxima em Processo Civil, Análise Econômica do Direito e combate à corrupção.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 91,
    "radar": {
      "integridade": 93,
      "eficiencia": 92,
      "transparencia": 90,
      "coerencia": 93,
      "viabilidade": 90,
      "presenca": 98,
      "produtividade": 92,
      "cumprimentoPrazos": 96
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 910 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 910,
      "viewsOverdue": 0,
      "monocraticDecisions": 2310,
      "colegiadoVotes": 809,
      "activeThesesCount": 25,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-fux-1",
        "title": "Análise Econômica do Direito e Segurança dos Contratos",
        "description": "Previsibilidade jurídica para impedir que decisões interfiram arbitrariamente em contratos regulados e leilões de infraestrutura.",
        "budget": "Decisões Judiciais",
        "feasibility": "Alta Aderência aos Mercados",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Constitucionalidade da Lei da Ficha Limpa (ADC 29)",
        "vote": "Relator e Voto Condutor",
        "impact": "Impediu a posse de mais de 3.200 candidatos com condenações colegiadas ou improbidade."
      }
    ],
    "appointmentYear": 2011,
    "retirementYear": 2028,
    "indicatedBy": "Presidência da República (Dilma Rousseff) • Sabatina Senado: 68 a 2",
    "institutionalOrigin": "Magistratura de Carreira / Ministro do STJ",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-nunes-marques",
    "name": "Kássio Nunes Marques",
    "ballotName": "Min. Nunes Marques",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro do STF",
    "officePower": "judiciario",
    "court": "STF",
    "state": "PI",
    "city": "Brasília",
    "age": 53,
    "avatar": "img/judiciary/jud-nunes-marques.jpg",
    "education": "Doutor em Direito pela Universidade de Salamanca (Espanha)",
    "careerHistory": "Ex-Desembargador Federal do TRF-1. Nomeado ao STF em 2020. Vice-Presidente do Tribunal Superior Eleitoral (TSE). Foco em direito público, agronegócio e segurança jurídica contratual.",
    "aiSummary": "Ministro do STF e Vice-Presidente do TSE. Atuação moderada com ênfase na legalidade estrita, limites de intervenção judicial na economia e celeridade processual.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 87,
    "radar": {
      "integridade": 90,
      "eficiencia": 88,
      "transparencia": 88,
      "coerencia": 87,
      "viabilidade": 85,
      "presenca": 97,
      "produtividade": 91,
      "cumprimentoPrazos": 94
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 900 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 900,
      "viewsOverdue": 0,
      "monocraticDecisions": 2000,
      "colegiadoVotes": 700,
      "activeThesesCount": 15,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-nunes-1",
        "title": "Celeridade no Julgamento de Recursos Tributários Repetitivos",
        "description": "Desafogamento do acervo tributário com redução do tempo médio de espera do contribuinte.",
        "budget": "Meta CNJ",
        "feasibility": "Alta Eficácia",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Marco Temporal de Terras Indígenas (RE 1.017.365)",
        "vote": "Voto divergente",
        "impact": "Defesa de indenização prévia para produtores com títulos de boa-fé."
      }
    ],
    "appointmentYear": 2018,
    "retirementYear": 2035,
    "indicatedBy": "Indicação Presidencial e Sabatina no Senado",
    "institutionalOrigin": "Carreira Jurídica de Cúpula",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-andre-mendonca",
    "name": "André Luiz de Almeida Mendonça",
    "ballotName": "Min. André Mendonça",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro do STF",
    "officePower": "judiciario",
    "court": "STF",
    "state": "SP",
    "city": "Brasília",
    "age": 53,
    "avatar": "img/judiciary/jud-andre-mendonca.jpg",
    "education": "Doutor em Estado de Direito e Governança Global (Universidade de Salamanca)",
    "careerHistory": "Advogado da União de carreira, ex-Advogado-Geral da União e ex-Ministro da Justiça e Segurança Pública. Nomeado ao STF em 2021. Foco em integridade pública, compliance estatal e combate à lavagem de dinheiro.",
    "aiSummary": "Ministro do STF. Atuação técnica e minuciosa com foco em conformidade orçamentária, transparência de acordos de leniência e independência institucional.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 89,
    "radar": {
      "integridade": 93,
      "eficiencia": 89,
      "transparencia": 91,
      "coerencia": 90,
      "viabilidade": 87,
      "presenca": 98,
      "produtividade": 90,
      "cumprimentoPrazos": 96
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 1250 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 1250,
      "viewsOverdue": 0,
      "monocraticDecisions": 2510,
      "colegiadoVotes": 879,
      "activeThesesCount": 12,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-mendonca-1",
        "title": "Transparência Rigorosa nos Acordos de Leniência",
        "description": "Participação simultânea de AGU, CGU, TCU e PGR para evitar sobreposição de sanções e garantir ressarcimento integral ao erário.",
        "budget": "Conformidade Jurídica",
        "feasibility": "Alta Viabilidade",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Revisão dos Acordos de Leniência da Lava Jato (ADPF 1051)",
        "vote": "Relator e Mediador",
        "impact": "Conduziu mesa de conciliação para renegociação de dívidas de R$ 11 bilhões preservando empregos."
      }
    ],
    "appointmentYear": 2021,
    "retirementYear": 2047,
    "indicatedBy": "Presidência da República (Jair Bolsonaro) • Sabatina Senado: 47 a 32",
    "institutionalOrigin": "Advocacia-Geral da União (AGU)",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-cristiano-zanin",
    "name": "Cristiano Zanin Martins",
    "ballotName": "Min. Cristiano Zanin",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro do STF",
    "officePower": "judiciario",
    "court": "STF",
    "state": "SP",
    "city": "Brasília",
    "age": 50,
    "avatar": "img/judiciary/jud-cristiano-zanin.jpg",
    "education": "Bacharel em Direito pela Pontifícia Universidade Católica de São Paulo (PUC-SP)",
    "careerHistory": "Advogado de destaque nacional com mais de 25 anos de atuação perante tribunais superiores. Especialista em Direito Empresarial, Falências e Processo Penal. Nomeado ao STF em 2023.",
    "aiSummary": "Ministro do STF. Perfil estritamente legalista e técnico, defensor intransigente do devido processo legal e das garantias fundamentais da ampla defesa.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 89,
    "radar": {
      "integridade": 91,
      "eficiencia": 90,
      "transparencia": 89,
      "coerencia": 91,
      "viabilidade": 88,
      "presenca": 99,
      "produtividade": 92,
      "cumprimentoPrazos": 98
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 580 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 580,
      "viewsOverdue": 0,
      "monocraticDecisions": 1420,
      "colegiadoVotes": 497,
      "activeThesesCount": 8,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-zanin-1",
        "title": "Celeridade e Segurança Jurídica no Direito Empresarial e Falimentar",
        "description": "Padronização de prazos para preservação de empresas viáveis e garantia de pagamento de créditos trabalhistas.",
        "budget": "Jurisdição Especializada",
        "feasibility": "Alta Aderência",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Desoneração da Folha de Pagamentos de Municípios e Setores (ADI 7633)",
        "vote": "Relator e Mediador",
        "impact": "Concedeu prazo de conciliação para evitar rombo de R$ 25 bi nas contas públicas federais."
      }
    ],
    "appointmentYear": 2023,
    "retirementYear": 2050,
    "indicatedBy": "Presidência da República (Lula) • Sabatina Senado: 58 a 18",
    "institutionalOrigin": "Advocacia Privada / Direito Processual",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-flavio-dino",
    "name": "Flávio Dino de Castro e Costa",
    "ballotName": "Min. Flávio Dino",
    "party": "Magistratura",
    "number": "STF",
    "position": "Ministro do STF",
    "officePower": "judiciario",
    "court": "STF",
    "state": "MA",
    "city": "Brasília",
    "age": 58,
    "avatar": "img/judiciary/jud-flavio-dino.jpg",
    "education": "Mestrado em Direito Constitucional (UFPE)",
    "careerHistory": "Juiz Federal por 12 anos (1994-2006), Deputado Federal, Presidente da Embratur, Governador do Maranhão por dois mandatos (2015-2022), Senador eleito e Ministro da Justiça e Segurança Pública. Nomeado ao STF em 2024.",
    "aiSummary": "Ministro do STF. Relator das ações centrais sobre transparência das emendas parlamentares ao Orçamento da União (Emendas Pix e RP9), impondo auditoria pública rigorosa.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 92,
    "radar": {
      "integridade": 94,
      "eficiencia": 92,
      "transparencia": 97,
      "coerencia": 90,
      "viabilidade": 89,
      "presenca": 99,
      "produtividade": 93,
      "cumprimentoPrazos": 97
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 620 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 620,
      "viewsOverdue": 0,
      "monocraticDecisions": 1560,
      "colegiadoVotes": 546,
      "activeThesesCount": 9,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-dino-1",
        "title": "Auditoria e Rastreabilidade Total das Emendas Parlamentares (Pix / RP8 / RP9)",
        "description": "Decisão histórica determinando que nenhuma emenda seja liberada sem plano de trabalho detalhado no Transferegov e fiscalização do TCU/CGU.",
        "budget": "R$ 50 Bi em Rastreamento",
        "feasibility": "Decisão Liminar Confirmada no Pleno",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Transparência das Emendas Parlamentares (ADIs 7688, 7695 e 7697)",
        "vote": "Relator e Voto Condutor Unânime",
        "impact": "Fim do orçamento secreto e bloqueio de repasses até publicação nominal dos deputados autores."
      }
    ],
    "appointmentYear": 2024,
    "retirementYear": 2043,
    "indicatedBy": "Presidência da República (Lula) • Sabatina Senado: 47 a 31",
    "institutionalOrigin": "Magistratura Federal / Prof. Direito UFMA",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-herman-benjamin",
    "name": "Antonio Herman de Vasconcellos e Benjamin",
    "ballotName": "Min. Herman Benjamin",
    "party": "Magistratura",
    "number": "STJ",
    "position": "Presidente do STJ",
    "officePower": "judiciario",
    "court": "STJ",
    "state": "DF",
    "city": "Brasília",
    "age": 68,
    "avatar": "img/judiciary/jud-herman-benjamin.jpg",
    "education": "Mestre em Direito (LL.M.) pela Universidade de Illinois (EUA)",
    "careerHistory": "Promotor e Procurador de Justiça de SP por 24 anos. Ministro do Superior Tribunal de Justiça (STJ) desde 2006. Atual Presidente do STJ. Principal autoridade nacional em Direito Ambiental e Consumidor (coautor do CDC).",
    "aiSummary": "Presidente do Superior Tribunal de Justiça (STJ). Liderança na uniformização da jurisprudência infraconstitucional, proteção do bioma amazônico e defesa do consumidor.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 93,
    "radar": {
      "integridade": 96,
      "eficiencia": 91,
      "transparencia": 93,
      "coerencia": 95,
      "viabilidade": 90,
      "presenca": 98,
      "produtividade": 94,
      "cumprimentoPrazos": 96
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STJ (Presidente)",
      "baseSalary": "R$ 41.845,49",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 1210 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 1210,
      "viewsOverdue": 0,
      "monocraticDecisions": 3450,
      "colegiadoVotes": 1208,
      "activeThesesCount": 38,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-benjamin-1",
        "title": "Gabinete de Crise Climática do STJ",
        "description": "Priorização de processos relativos a queimadas criminosas, grilagem de terras públicas e crimes ambientais na Amazônia Legal.",
        "budget": "Priorização Processual",
        "feasibility": "Alta Eficácia",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Responsabilidade Civil Objetiva por Dano Ambiental (Tema 681 STJ)",
        "vote": "Relator e Voto Condutor",
        "impact": "Princípio do poluidor-pagador sem excludente de caso fortuito."
      }
    ],
    "appointmentYear": 2006,
    "retirementYear": 2032,
    "indicatedBy": "Presidência da República (Lula) • Sabatina Senado: 54 a 2",
    "institutionalOrigin": "Ministério Público de SP (Promotor de Justiça)",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-mauro-campbell",
    "name": "Mauro Luiz Campbell Marques",
    "ballotName": "Min. Mauro Campbell",
    "party": "Magistratura",
    "number": "CNJ",
    "position": "Corregedor Nacional de Justiça",
    "officePower": "judiciario",
    "court": "CNJ / STJ",
    "state": "AM",
    "city": "Brasília",
    "age": 62,
    "avatar": "img/judiciary/jud-mauro-campbell.jpg",
    "education": "Especialista em Direito Tributário e Constitucional",
    "careerHistory": "Procurador-Geral de Justiça do Amazonas por três mandatos. Ministro do STJ desde 2008. Atual Corregedor Nacional de Justiça (CNJ), responsável pela fiscalização ética e disciplinar de todos os 18.000 juízes do país.",
    "aiSummary": "Corregedor Nacional de Justiça (CNJ). Responsável pelo combate a supersalários no Judiciário, auditoria de varas estaduais e cumprimento de metas de produtividade.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 91,
    "radar": {
      "integridade": 95,
      "eficiencia": 90,
      "transparencia": 95,
      "coerencia": 92,
      "viabilidade": 89,
      "presenca": 98,
      "produtividade": 91,
      "cumprimentoPrazos": 95
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 900 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 900,
      "viewsOverdue": 0,
      "monocraticDecisions": 2000,
      "colegiadoVotes": 700,
      "activeThesesCount": 15,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-campbell-1",
        "title": "Pente-Fino em Penduricalhos e Verbas Indenizatórias Estaduais",
        "description": "Inspeções in loco em Tribunais de Justiça para revogação de penduricalhos que extrapolam o teto do STF.",
        "budget": "Fiscalização CNJ",
        "feasibility": "Resoluções CNJ",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Auditoria Disciplinar em Varas de Família e Fazenda Pública",
        "vote": "Decisão da Corregedoria",
        "impact": "Abertura de PADs contra magistrados por descumprimento injustificado de prazos."
      }
    ],
    "appointmentYear": 2018,
    "retirementYear": 2035,
    "indicatedBy": "Indicação Presidencial e Sabatina no Senado",
    "institutionalOrigin": "Carreira Jurídica de Cúpula",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-paulo-gonet",
    "name": "Paulo Gustavo Gonet Branco",
    "ballotName": "Paulo Gonet Branco",
    "party": "Ministério Público",
    "number": "PGR",
    "position": "Procurador-Geral da República",
    "officePower": "judiciario",
    "court": "PGR / MPF",
    "state": "DF",
    "city": "Brasília",
    "age": 64,
    "avatar": "img/judiciary/jud-paulo-gonet.jpg",
    "education": "Doutor em Direito pela UnB • Mestre em Direitos Humanos pela Universidade de Essex (UK)",
    "careerHistory": "Membro do Ministério Público Federal desde 1987 (37 anos de carreira). Ex-Vice-Procurador-Geral Eleitoral. Nomeado Procurador-Geral da República (PGR) em 2023. Coautor, junto a Gilmar Mendes, do Curso de Direito Constitucional mais citado no país.",
    "aiSummary": "Chefe do Ministério Público da União (PGR). Titular exclusivo da ação penal pública contra autoridades com foro no STF e guardião da ordem jurídica democrática.",
    "cleanRecord": "Ficha Limpa Plena (Histórico Ilibado no MPF)",
    "overallScore": 92,
    "radar": {
      "integridade": 96,
      "eficiencia": 91,
      "transparencia": 92,
      "coerencia": 93,
      "viabilidade": 90,
      "presenca": 99,
      "produtividade": 92,
      "cumprimentoPrazos": 96
    },
    "salary": {
      "salaryLabel": "Subsídio Procurador-Geral da República",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 450 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 450,
      "viewsOverdue": 0,
      "monocraticDecisions": 1200,
      "colegiadoVotes": 420,
      "activeThesesCount": 14,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-gonet-1",
        "title": "Força-Tarefa contra o Crime Organizado e Lavagem em Obras Públicas",
        "description": "Atuação articulada da PGR com COAF e Polícia Federal para asfixia financeira de facções transnacionais.",
        "budget": "Estrutura do MPF",
        "feasibility": "Alta Eficácia Investigativa",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Denúncias Criminais pelos Atos de 8 de Janeiro",
        "vote": "Parecer e Acusação Oficial",
        "impact": "Apresentação de denúncias robustas com condenação de mais de 200 réus pelo STF."
      }
    ],
    "appointmentYear": 2023,
    "retirementYear": 2036,
    "indicatedBy": "Presidência da República (Lula) • Sabatina Senado: 65 a 11",
    "institutionalOrigin": "Ministério Público Federal (Subprocurador-Geral)",
    "campaignFinance": null,
    "electionSchedule": null
  },
  {
    "id": "jud-antonio-fabricio",
    "name": "Antônio Fabrício de Matos Gonçalves",
    "ballotName": "Min. Antônio Fabrício",
    "party": "Magistratura",
    "number": "TST",
    "position": "Ministro do TST",
    "officePower": "judiciario",
    "court": "TST",
    "state": "MG",
    "city": "Brasília",
    "age": 56,
    "avatar": "img/judiciary/jud-antonio-fabricio.jpg",
    "education": "Doutor em Direito do Trabalho (PUC-Minas) • Mestre pela UFMG",
    "careerHistory": "Ex-Presidente da OAB de Minas Gerais (2016-2018). Nomeado Ministro do Tribunal Superior do Trabalho em 2024 pela vaga do Quinto Constitucional da Advocacia.",
    "aiSummary": "Ministro do Tribunal Superior do Trabalho (TST). Foco em relações modernas de trabalho, segurança jurídica nas contratações e mediação coletiva de greves.",
    "cleanRecord": "Ficha Limpa Plena",
    "overallScore": 89,
    "radar": {
      "integridade": 91,
      "eficiencia": 90,
      "transparencia": 90,
      "coerencia": 90,
      "viabilidade": 87,
      "presenca": 98,
      "produtividade": 91,
      "cumprimentoPrazos": 95
    },
    "salary": {
      "salaryLabel": "Subsídio Constitucional STF",
      "baseSalary": "R$ 44.008,52",
      "allowancesMonthly": "R$ 0,00 (Teto Estrito)",
      "spendingPercentage": 100,
      "constitutionalCap": "Art. 37, XI da Constituição Federal",
      "civicConversion": {
        "costPerMinute": "R$ 0,73 / min",
        "costPerCitizen": "R$ 0,002 / ano",
        "salariosMinimos": 31,
        "roiText": "Acervo de 900 processos sob jurisdição"
      }
    },
    "judiciaryMetrics": {
      "cabinetCases": 900,
      "viewsOverdue": 0,
      "monocraticDecisions": 2000,
      "colegiadoVotes": 700,
      "activeThesesCount": 15,
      "complianceER58": "100% de Cumprimento (< 90 dias)",
      "digitalEfficiency": "96% Tramitação 100% Digital"
    },
    "proposals": [
      {
        "id": "jud-prop-fabricio-1",
        "title": "Mediação Prévia Obrigatória em Dissídios Coletivos de Transporte e Saúde",
        "description": "Prevenção de paralisações bruscas de serviços essenciais à população através de audiências de conciliação no TST.",
        "budget": "Estrutura TST",
        "feasibility": "Alta Viabilidade",
        "feasibilityClass": "text-emerald-700 bg-emerald-50 border-emerald-300"
      }
    ],
    "leadingDecisions": [
      {
        "subject": "Vínculo de Emprego em Plataformas Digitais de Entrega",
        "vote": "Voto Técnico",
        "impact": "Defesa de regulamentação legal protetiva sem inviabilizar o modelo de tecnologia."
      }
    ],
    "appointmentYear": 2018,
    "retirementYear": 2035,
    "indicatedBy": "Indicação Presidencial e Sabatina no Senado",
    "institutionalOrigin": "Carreira Jurídica de Cúpula",
    "campaignFinance": null,
    "electionSchedule": null
  }
];

// Exportação compatível com Node.js e Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { judiciaryAuthorities };
}
if (typeof window !== 'undefined') {
  window.judiciaryAuthorities = judiciaryAuthorities;
  if (Array.isArray(window.candidatesData)) {
    const existingIds = new Set(window.candidatesData.map(c => c.id));
    judiciaryAuthorities.forEach(j => {
      if (!existingIds.has(j.id)) {
        window.candidatesData.push(j);
      }
    });
  }
}
