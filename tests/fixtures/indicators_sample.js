// Fixture do contrato de dados de indicadores oficiais (usado nos testes de UI).
// Valores ilustrativos apenas para teste — não são dados reais de nenhuma pessoa.
const base = {
  party: 'XYZ', number: '0000', state: 'SP', city: 'São Paulo', avatar: 'favicon.svg'
};

const deputadoComIndicadores = Object.assign({}, base, {
  id: 'fx-deputado-1', name: 'Pessoa Teste Um', position: 'Deputado Federal',
  status: { situacao: 'em_exercicio', mandatoAtual: 'Deputado Federal', fonte: 'Câmara dos Deputados' },
  tse2026: { cargo: 'Deputado Federal', uf: 'SP', numero: '1234', partido: 'XYZ', situacaoTurno: 'Eleito por QP', turno: 1, fonte: 'TSE', consultadoEm: '2026-10-08' },
  reviewAlerts: [{ tipo: 'identidade', mensagem: 'Número de urna divergente do cadastro anterior.', fonte: 'TSE' }],
  indicators: {
    presenca: { valor: 97.5, unidade: '%', rotulo: 'Presença em sessões deliberativas', detalhe: '156 de 160 sessões', percentil: 72, grupoComparacao: 'Deputados federais', fonte: 'Câmara dos Deputados', url: 'https://www.camara.leg.br/deputados/1', consultadoEm: '2026-10-09', ano: 2025 },
    cotaParlamentar: { valor: 300000, unidade: 'R$', rotulo: 'Cota parlamentar usada', detalhe: '60% do teto anual', percentil: 80, grupoComparacao: 'Deputados federais', fonte: 'Câmara dos Deputados', url: 'https://www.camara.leg.br/cotas', consultadoEm: '2026-10-09', ano: 2025 },
    producaoLegislativa: { valor: 12, unidade: 'qtd', rotulo: 'Projetos como primeiro autor', detalhe: '2 transformados em lei', percentil: 55, grupoComparacao: 'Deputados federais', fonte: 'Câmara dos Deputados', url: 'https://www.camara.leg.br', consultadoEm: '2026-10-09', ano: 2025,
      destaques: [{ sigla: 'PL', numero: '100', ano: 2025, ementa: 'Ementa de teste.', situacao: 'Em tramitação', url: 'https://www.camara.leg.br/proposicoes/1' }] }
  }
});

const deputadoMenor = Object.assign({}, base, {
  id: 'fx-deputado-2', name: 'Pessoa Teste Dois', position: 'Deputada Federal',
  status: { situacao: 'licenciado', mandatoAtual: 'Deputada Federal', fonte: 'Câmara dos Deputados' },
  indicators: {
    presenca: { valor: 80, unidade: '%', rotulo: 'Presença em sessões deliberativas', detalhe: '128 de 160 sessões', percentil: 20, grupoComparacao: 'Deputados federais', fonte: 'Câmara dos Deputados', url: 'https://www.camara.leg.br/deputados/2', consultadoEm: '2026-10-09', ano: 2025 }
  }
});

const falecido = Object.assign({}, base, {
  id: 'fx-prefeito-falecido', name: 'Pessoa Teste Três', position: 'Prefeito',
  status: { situacao: 'falecido', mandatoAtual: '', fonte: 'Wikidata' },
  indicators: {
    gastoPessoal: { valor: 45, unidade: '%', rotulo: 'Gasto com pessoal', detalhe: '% da RCL', percentil: 50, grupoComparacao: 'Prefeitos', fonte: 'Siconfi', url: 'https://siconfi.tesouro.gov.br', consultadoEm: '2026-10-09', ano: 2025 }
  }
});

const semIndicadores = Object.assign({}, base, { id: 'fx-senador', name: 'Pessoa Teste Quatro', position: 'Senador' });

module.exports = { deputadoComIndicadores, deputadoMenor, falecido, semIndicadores, todos: [deputadoComIndicadores, deputadoMenor, falecido, semIndicadores] };
