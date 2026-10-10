# Estudo: eixos de pontuação, dados reais e verificação automática

> Data do estudo: 10/10/2026 (após o 1º turno de 04/10/2026).
> Base: código do site (`dossie.html`, `js/*.js`), `data/candidates.js` (214 perfis) e consultas reais às fontes oficiais listadas na seção 5. Todas as afirmações numéricas abaixo foram medidas, não estimadas.

## Resumo executivo

1. **A pontuação geral não mede nada.** `overallScore` é uma constante gravada no arquivo de dados — nenhuma linha de código a calcula. Varia de 60 a 82, com desvio-padrão de **1,7 ponto** e apenas **13 valores distintos** para 214 pessoas. Os seis eixos do radar também são constantes sem origem.
2. **Os eixos contradizem os dados reais que já temos.** "Eficiência CEAP" não tem relação com a cota de verdade (correlação −0,21; Kim Kataguiri usa 30% do teto e recebe 69, Tabata Amaral usa 100% e recebe 78). A presença exibida diverge da oficial (Carlos Jordy: 92% no site, **99,17%** na Câmara).
3. **O site mostra nove fórmulas diferentes** para a mesma nota, e a tela de "composição matemática" inventa uma "penalidade judicial" igual à diferença entre a soma e a nota gravada.
4. **Todos os dados que faltam têm fonte oficial automatizável**, testada neste estudo: presença (relatório oficial por deputado), projetos de lei, emendas (Portal da Transparência), cargo/número/resultado 2026 (TSE), situação fiscal dos governos (Tesouro/Siconfi).
5. **Há erros graves de identidade fora do Legislativo**: Fuad Noman (falecido em 26/03/2025) aparece como prefeito em exercício com nota 74; Geraldo Alckmin (vice-presidente) e Fernando Haddad (ministro) aparecem como "Governador". Dos 159 perfis encontrados no TSE 2026, **116 (73%) têm número de urna errado** e **54 têm cargo de 2026 errado**.

Recomendação: substituir a nota única e o radar por **indicadores oficiais exibidos com fonte e comparados com os pares** (mesma Casa/cargo), e trocar tudo o que não tem fonte por "dado indisponível". O plano de implementação está na seção 6.

---

## 1. Eixos de pontuação: o que existe hoje

### 1.1 Nove definições concorrentes

| Onde aparece | Eixos e pesos | Observação |
|---|---|---|
| README | Integridade 40%, Eficiência 25%, Transparência 15%, Coerência 10%, Presença 10% | Reproduz a nota exata em só 17 de 214 perfis |
| `llms.txt` (versão antiga) | 7 critérios com outros pesos (25/20/15/10/15/15) | Já removido |
| Dossiê — fórmula Legislativo | Integridade 25, Leis 20, Transparência 15, Coerência 15, Viabilidade 15, Presença 10 | Exata em 23 de 170 |
| Dossiê — fórmula Executivo | Gestão Fiscal 25, Obras 20, Integridade 20, Transparência 15, Indicadores Sociais 10, Eficácia 10 | Exata em 22 de 44 |
| Dossiê — radar Legislativo | Integridade, Eficiência CEAP, Transparência, Coerência, **Leis Estruturantes = `productivityScore`**, **Visão Sistêmica** | Eixos diferentes da fórmula ao lado |
| Dossiê — radar "sem mandato" | Integridade, Eficiência de Gastos, Transparência, Coerência, Aptidão Técnica, Visão Sistêmica | — |
| Dossiê — radar Executivo | Capag A=95 / B=82 / outro=68; Obras = 92 se >100 obras senão 84 | Mapeamento arbitrário |
| Comparador | Integridade, Eficiência Legislativa, Transparência de Gastos, Coerência Discursiva, Viabilidade, Presença | Outra combinação |
| Ranking (integridade) | 50% "Ficha Limpa" + 50% veracidade em debates | Usa os debates que eram inventados |

O mesmo número aparece com nomes diferentes conforme a tela, e o usuário não tem como saber qual fórmula vale.

### 1.2 A "penalidade judicial" é calculada de trás para a frente

Em `dossie.html` (`generateScoreBreakdownHtml`):

```js
const penalty = cand.legalIntegrity?.penaltyPoints
  || (cand.overallScore < Math.round(subtotal) ? Math.round(subtotal) - cand.overallScore : 0);
```

Quando a soma ponderada fica acima da nota gravada, a diferença é exibida como **"Penalidade Judicial"**. Ou seja, o site atribui a pessoas reais uma punição judicial que não existe, só para a conta fechar. Quando a soma fica abaixo, a tela mostra a soma e uma nota final diferente, sem explicação.

### 1.3 Medições sobre os 214 perfis

| Campo | Faixa | Desvio-padrão | Valores distintos |
|---|---|---|---|
| `overallScore` | 60–82 | **1,7** | 13 |
| integridade | 54–88 | 3,0 | 14 |
| eficiência | 56–88 | 4,0 | 26 |
| transparência | 60–85 | 1,8 | 12 |
| coerência | 68–86 | 2,5 | 14 |
| viabilidade | 62–85 | 3,3 | 16 |
| presença | 0–96 | 21,4 | 21 |

Uma nota que varia menos de 2 pontos entre 214 políticos não diferencia ninguém; o ranking é praticamente aleatório.

### 1.4 Os eixos são reais? Comparação com as fontes oficiais

| Eixo | Existe fonte para o valor atual? | Confronto com dado real |
|---|---|---|
| Eficiência (CEAP) | Não | Correlação com % do teto realmente usado: **−0,21** (n=101). Kim 30% → 69; Tabata 100% → 78 |
| Transparência | Não | Correlação com % do teto: 0,07 |
| Presença | Não | Jordy: site 92% / radar 83; Câmara: **99,17%** (120 de 121 dias) |
| Integridade | Não | Correlação com `ethicsDetailed.integrityScore` do próprio arquivo: 0,10. Os processos que a alimentavam eram padronizados e já foram removidos |
| Coerência | Não | Nenhuma base de "fidelidade às teses" existe |
| Viabilidade orçamentária | Não | Não há análise de custeio das propostas no arquivo |
| Leis estruturantes / IPR | Não | `productivityScore` também é constante (63–86) |
| Gestão fiscal (Executivo) | Não | Capag e RGF existem no Tesouro, mas os valores não vieram de lá |

**Conclusão do eixo a eixo:** nenhum dos eixos exibidos hoje é derivado de dado verificável. Os conceitos de presença, uso da cota, produção legislativa e gestão fiscal são **bons e mensuráveis**; integridade, coerência e viabilidade, do jeito que estão definidos, **não são mensuráveis de forma objetiva** e expõem o site a risco jurídico.

---

## 2. Proposta de metodologia (substitui nota única e radar)

Princípios:

- **Só indicador com fonte oficial**, exibido com link, data de coleta e valor bruto (ex.: "120 de 121 dias").
- **Comparação com os pares**, não nota absoluta: percentil dentro da mesma Casa/cargo ("mais presente que 82% dos deputados"). Evita misturar governador com deputado.
- **Dado ausente é "indisponível"**, nunca um valor padrão (hoje o código usa `|| 90`, `|| 85` etc.).
- **Sem juízo de valor sobre integridade.** Mostrar apenas fatos públicos: situação do registro no TSE e links de consulta de certidões.

### 2.1 Indicadores do Legislativo (deputados e senadores)

| Indicador | Definição | Fonte |
|---|---|---|
| Presença em plenário | Dias com presença ÷ dias com sessão deliberativa; faltas justificadas e não justificadas | Câmara: relatório oficial (Ato da Mesa 191/2017). Senado: participação em votações nominais |
| Uso da cota (CEAP/CEAPS) | Total do ano ÷ (teto mensal da UF × 12) | Câmara: arquivo em lote + API (já implantado). Senado: `despesa_ceaps_AAAA.csv` |
| Produção legislativa | PL/PLP/PEC como **primeiro autor** na legislatura; quantos viraram norma jurídica | Câmara: `proposicoes` + `proposicoesAutores` (`ordemAssinatura=1`). Senado: `/senador/{id}/autorias?primeiroAutor=S` |
| Emendas ao orçamento | Valor empenhado e pago por ano; % em "Transferências Especiais" (emenda Pix, menos rastreável) | Portal da Transparência (download "Emendas parlamentares") |

### 2.2 Indicadores do Executivo (governadores e prefeitos)

| Indicador | Definição | Fonte |
|---|---|---|
| Gasto com pessoal | % da Receita Corrente Líquida (limite LRF 49% estados / 54% municípios) | Siconfi — RGF (API do Tesouro) |
| Capacidade de pagamento | Nota Capag (A–D) | Tesouro Transparente |
| Execução de investimentos | Investimentos liquidados ÷ previstos | Siconfi — RREO |

### 2.3 Nota composta (opcional)

Se uma nota única for mantida, ela deve ser **a média simples dos percentis dos indicadores disponíveis daquele perfil**, com a fórmula exibida e o número de indicadores usados ("nota baseada em 3 de 4 indicadores"). Nunca combinar Executivo com Legislativo no mesmo ranking.

---

## 3. Presença, projetos de lei e emendas: viabilidade testada

### 3.1 Presença — Câmara

- **Fonte oficial:** `https://www.camara.leg.br/deputados/{id}/presenca-plenario/{ano}` (HTML renderizado no servidor; não exige navegador).
- Traz o quadro-resumo oficial: sessões, faltas não justificadas, dias com sessão, dias com presença, faltas justificadas e não justificadas.
- Exemplo medido (Carlos Jordy, 2025): 127 sessões, 121 dias, **120 dias presentes (99,17%)**, 0 justificadas, 1 não justificada.
- **Descartado:** calcular a partir de `eventosPresencaDeputados-AAAA.csv`. O mesmo deputado sai com 117 de 127 sessões, porque o arquivo não reproduz a regra oficial por dia nem as sessões conjuntas.
- Custo: 1 requisição por deputado por ano (~130/ano), com pausa entre elas.

### 3.2 Presença — Senado

- Não há quadro oficial de presença por dia na API. Proxy honesto: participação em votações nominais (`/dadosabertos/votacao?ano=AAAA&codigoParlamentar={id}`), rotulado como "participação em votações nominais".

### 3.3 Projetos de lei

- API: `/proposicoes?idDeputadoAutor={id}&siglaTipo=PL&dataApresentacaoInicio=2023-02-01&itens=1` devolve o total no link `last` (Jordy: 44 PLs como autor ou coautor).
- Para separar **autoria principal** de coassinatura, usar `proposicoesAutores-AAAA.csv` (`ordemAssinatura`, `proponente`) e `proposicoes-AAAA.csv` (`ultimoStatus_descricaoSituacao`, ex.: "Transformado em Norma Jurídica"). São ~130 MB por ano; viável no GitHub Actions uma vez por semana.
- Os campos atuais `bills.highlightList` e `authoredBillsDetailed` devem ser regenerados a partir daí (número, ementa, situação e link oficial).

### 3.4 Emendas

- `https://portaldatransparencia.gov.br/download-de-dados/emendas-parlamentares/UNICO` (ZIP de 32 MB, 94.663 emendas de 2014 a 2026).
- Chave: "Código do Autor da Emenda" + "Nome do Autor" (ex.: CARLOS JORDY, código 3930). Exemplo 2025: R$ 37,3 milhões empenhados, R$ 21,4 milhões pagos.
- Permite preencher `parliamentaryAmendments` com valores reais e calcular o `directPixPct` real (tipo "Transferências Especiais").

### 3.5 CEAP — lições já aplicadas em produção

- O filtro `ano` da API de despesas devolve lista vazia sem `idLegislatura`, o que zerou a cota de todos os deputados na primeira versão (corrigido).
- O arquivo em lote parou de incluir "PASSAGEM AÉREA - SIGEPA" a partir de ago/2025; os documentos faltantes são buscados na API mês a mês.
- O mesmo `codDocumento` se repete entre trechos de um bilhete, então a deduplicação só exclui códigos já presentes no lote.
- Resultado conferido com o portal da Câmara: Carlos Jordy R$ 524.534,61 e Kim Kataguiri R$ 153.657,78 (iguais ao centavo), Tabata Amaral com diferença de R$ 0,10.

---

## 4. Verificação automática dos perfis do Executivo e de quem não é parlamentar

### 4.1 O que o TSE resolve

O arquivo `consulta_cand_2026.zip` (atualizado em 10/10/2026) já traz o resultado do 1º turno (`DS_SIT_TOT_TURNO`).

| Medição sobre os 214 perfis | Resultado |
|---|---|
| Encontrados como candidatos em 2026 (nome civil exato ou nome de urna + UF) | 159 |
| Número de urna diferente do TSE | **116** |
| Partido diferente | 14 |
| Cargo disputado em 2026 diferente do exibido | **54** |
| Resultado 1º turno | 22 eleitos, 73 eleitos por QP/média, 19 suplentes, 40 não eleitos, 1 no 2º turno (Eduardo Paes), Lula e Flávio Bolsonaro no 2º turno presidencial |

Exemplos de correção automática: Sergio Moro disputou o Governo do PR (eleito); Marcel van Hattem, o Senado pelo RS (eleito); Tabata Amaral, nº 4040 e não 4000.

### 4.2 Quem não é candidato em 2026 (55 perfis)

Cadeia de fontes, em ordem de autoridade:

1. **Mandato atual:** TSE 2022 (governadores, senadores, deputados eleitos) e TSE 2024 (prefeitos e vereadores eleitos).
2. **Exercício efetivo:** APIs da Câmara e do Senado (titular, licença, vacância) — já implantado.
3. **Eventos posteriores à eleição** (morte, renúncia, posse em ministério, cassação): **Wikidata** (cargo com data de início e fim, data de óbito), sempre marcado como fonte secundária e enviado para revisão quando divergir do TSE.

Casos confirmados neste estudo com Wikidata:

- **Fuad Noman** — falecido em 26/03/2025; o site o exibe como prefeito em exercício com nota 74.
- **Geraldo Alckmin** — vice-presidente (2023–2026); o site diz "Governador".
- **Ratinho Júnior** — governador do PR (2023–2026), não candidato em 2026.
- **Ricardo Nunes** — prefeito de São Paulo (2025–2028).

### 4.3 Política para divergências

- TSE e APIs das Casas **corrigem automaticamente** cargo, partido, número, UF e foto.
- Wikidata **nunca corrige sozinho**: gera um item no relatório "revisar" e coloca um aviso no perfil.
- Perfis sem nenhuma fonte (nem TSE, nem Casa, nem Wikidata) saem do ranking e da busca até revisão manual.

---

## 5. Fontes testadas (todas responderam em 10/10/2026)

| Fonte | Endereço |
|---|---|
| Câmara — CEAP em lote | `https://www.camara.leg.br/cotas/Ano-AAAA.csv.zip` |
| Câmara — API de dados abertos | `https://dadosabertos.camara.leg.br/api/v2` |
| Câmara — presença oficial | `https://www.camara.leg.br/deputados/{id}/presenca-plenario/{ano}` |
| Câmara — proposições em lote | `https://dadosabertos.camara.leg.br/arquivos/proposicoes/csv/proposicoes-AAAA.csv` (+ `proposicoesAutores`) |
| Câmara — teto da CEAP por UF (2026) | `https://www.camara.leg.br/transparencia/gastos-parlamentares` |
| Teto da CEAP 2025 | https://www.itatiaia.com.br/politica/saiba-quanto-cada-deputado-federal-pode-gastar-com-a-cota-parlamentar/ (confere com 2026 ÷ 1,1375 em todas as UFs; reajuste do [Ato da Mesa 244/2026](https://www2.camara.leg.br/legin/int/atomes/2026/atodamesa-244-20-fevereiro-2026-798720-publicacaooriginal-178157-cd-mesa.html)) |
| Senado — lista, autorias, votações | `https://legis.senado.leg.br/dadosabertos` |
| Senado — CEAPS | `https://www.senado.leg.br/transparencia/LAI/verba/despesa_ceaps_AAAA.csv` |
| Portal da Transparência — emendas | `https://portaldatransparencia.gov.br/download-de-dados/emendas-parlamentares/UNICO` |
| TSE — candidaturas e resultado | `https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_AAAA.zip` |
| TSE — bens declarados | `https://cdn.tse.jus.br/estatistica/sead/odsele/bem_candidato/bem_candidato_2026.zip` |
| Tesouro — Siconfi (RGF/RREO) | `https://apidatalake.tesouro.gov.br/ords/siconfi/tt/rgf` (ex.: SP 2025 = 41,29% da RCL com pessoal) |
| Wikidata (secundária) | `https://query.wikidata.org/sparql` |

---

## 6. Plano de implementação

| Fase | Entrega | Arquivos | Esforço |
|---|---|---|---|
| **1. Identidade (urgente)** | `scripts/verify_tse.js`: cargo/número/partido/resultado 2026 pelo TSE; mandato atual pelo TSE 2022/2024; alertas do Wikidata (óbito, cargo atual). Corrige Fuad Noman, Alckmin, Haddad e os 116 números | novo script + `verification_report.json` | 1 dia |
| **2. Presença real** | Câmara: relatório oficial por deputado. Senado: participação em votações nominais. Substitui `attendance` e remove o padrão `|| 94` | `scripts/lib/camara_presenca.js`, `verify_official.js` | 1 dia |
| **3. Produção legislativa e emendas** | PLs como primeiro autor e leis aprovadas; emendas empenhadas/pagas e % Pix | `scripts/lib/proposicoes.js`, `scripts/lib/emendas.js` | 2 dias |
| **4. Executivo** | Siconfi (pessoal/RCL, investimentos) e Capag | `scripts/lib/siconfi.js` | 1–2 dias |
| **5. Nova metodologia na UI** | Remove nota fixa, radar e "penalidade judicial"; exibe indicadores com fonte e percentil entre pares; ranking por indicador e por Casa/cargo | `dossie.html`, `js/ranking.js`, `js/comparator.js`, `js/stickers.js`, README | 2–3 dias |
| **6. Automação** | Workflow semanal rodando as fases 1–4, abrindo PR com o relatório de mudanças (em vez de commit direto) | `.github/workflows/` | 0,5 dia |

Riscos e cuidados:

- Fontes oficiais mudam de formato sem aviso (já aconteceu com a CEAP). Cada script deve validar contagens mínimas e abortar sem gravar se algo vier vazio, e os testes devem barrar valores zerados em massa.
- O relatório de presença da Câmara é HTML: respeitar intervalo entre requisições e identificar o robô no User-Agent.
- Figurinhas, comparador e ranking dependem dos campos atuais; a fase 5 precisa de testes de tela (o `smoke_site.js` já cobre os dossiês).

## 7. Decisões pendentes

1. **Nota única:** manter uma nota composta só com indicadores reais (seção 2.3) ou exibir apenas os indicadores e percentis, sem nota?
2. **Campos sem fonte** (coerência, viabilidade, "visão sistêmica", análises de propostas, resumos de IA): ocultar ou manter marcados como "conteúdo editorial, não verificado"?
3. **Perfis sem mandato e sem candidatura** (ex.: Fuad Noman): retirar do site ou manter como perfil histórico, fora do ranking?
