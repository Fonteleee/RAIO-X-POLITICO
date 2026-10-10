# 🏛️ Figuras Políticas | Observatório Cívico & Dossiê Eleitoral 2026

[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg)](LICENSE)
[![Compliance: Res. TSE 23.732/2024](https://img.shields.io/badge/TSE-Res.%2023.732%2F2024-emerald.svg)](https://www.tse.jus.br/)
[![Eleições](https://img.shields.io/badge/Elei%C3%A7%C3%B5es%20Gerais-04%2F10%2F2026-purple.svg)](https://raioxpolitico.org)

> Plataforma independente de transparência pública. O **Figuras Políticas** exibe **indicadores oficiais** de políticos brasileiros — cada um com valor bruto, comparação entre pares da mesma Casa ou cargo, link da fonte e data de coleta. Não há nota geral nem ranking composto.

---

## 🎯 Proposta

Responder com dados verificáveis a perguntas objetivas do eleitor:
1. **Ele comparece?** Presença em sessões e participação em votações nominais (Câmara e Senado).
2. **Quanto gasta da cota parlamentar?** Total anual da CEAP comparado ao teto oficial da UF.
3. **O que produziu?** Projetos como primeiro autor e propostas transformadas em lei.
4. **Está disputando 2026?** Cargo, número, partido e resultado oficial do TSE.

---

## ✨ Funcionalidades

### 1. 📊 Indicadores oficiais (sem nota composta)
- Cards por indicador: rótulo, valor, detalhe, barra de percentil ("melhor que X% dos deputados federais"), fonte com link e data.
- Sem dado oficial verificável, o site mostra **"Dado indisponível — sem fonte oficial verificável"** — nunca um valor padrão.

### 2. 🗂️ Dossiê do político
- **Indicadores:** painel principal com todos os indicadores disponíveis.
- **Situação do mandato** em destaque (em exercício, licenciado, sem mandato, falecido ou não verificado).
- **Eleição 2026:** cargo disputado, número, partido e resultado do 1º turno (04/10/2026) segundo o TSE; 2º turno em 25/10/2026.
- **Avisos de revisão** quando a verificação automática encontra divergências.
- Abas de **Presença**, **Cota parlamentar (CEAP)**, **Projetos de lei** e **Emendas** aparecem apenas quando há dado oficial.

### 3. 🏆 Ranking por indicador e por grupo
- Escolha o grupo (Deputados, Senadores, Governadores, Prefeitos) e o indicador; a lista é ordenada pelo valor bruto.
- Ficam fora do ranking quem não tem o indicador e os perfis **sem mandato, falecidos ou não verificados** (eles continuam na busca e no feed, com o selo de situação).

### 4. ⚔️ Comparador
- Indicadores lado a lado, com fonte e percentil. Cargos diferentes são exibidos sem declarar "vencedor".

### 5. 🃏 Figurinhas
- Até 3 indicadores oficiais com fonte. Sem indicador disponível, a figurinha mostra apenas cargo e situação.

---

## ⚖️ Marco Legal

| Legislação | Dispositivo Aplicável | Aplicação na Plataforma |
|---|---|---|
| **Constituição Federal de 1988** | Art. 5º, XXXIII; Art. 37 | Publicidade e acesso à informação pública. |
| **Lei de Acesso à Informação (LAI)** | Lei nº 12.527/2011 | Consumo de dados abertos dos três Poderes. |
| **LGPD** | Lei nº 13.709/2018, Art. 7º, § 4º | Tratamento de dados tornados públicos por agentes políticos. |
| **Lei das Eleições** | Art. 33 da Lei nº 9.504/1997 | O site não é pesquisa eleitoral. |

---

## 📐 Metodologia: indicadores oficiais e fontes

O site **não calcula nota geral**. A antiga "pontuação" (e o radar de eixos como integridade, eficiência, coerência e viabilidade) foi removida porque eram valores fixos, sem fonte, que não diferenciavam ninguém (ver `docs/ESTUDO_SCORES_E_DADOS_REAIS.md`).

Cada indicador (`cand.indicators.<chave>`) traz `valor`, `unidade`, `rotulo`, `detalhe`, `percentil`, `grupoComparacao`, `fonte`, `url`, `consultadoEm` e `ano`.

| Indicador | Chave | Fonte oficial | Leitura |
|---|---|---|---|
| Presença em sessões | `presenca` | Câmara dos Deputados (relatório de presença) | % de sessões deliberativas com presença |
| Participação em votações | `participacaoVotacoes` | Senado Federal (votações nominais) | % de votações nominais com voto registrado |
| Cota parlamentar (CEAP) | `cotaParlamentar` | Câmara dos Deputados (arquivo oficial da CEAP) | R$ gastos no ano; percentil maior = mais econômico |
| Produção legislativa | `producaoLegislativa` | Câmara / Senado (proposições) | Projetos como primeiro autor e leis aprovadas |
| Emendas parlamentares | `emendas` | Portal da Transparência (CGU) | Valores empenhados e pagos |
| Gasto com pessoal | `gastoPessoal` | Tesouro Nacional (Siconfi) | % da receita corrente líquida (Executivo) |

**Percentil entre pares:** percentual de políticos do mesmo grupo (mesma Casa ou cargo) com resultado pior. Só se compara quem tem o mesmo cargo e o dado disponível. Para a cota parlamentar, maior percentil significa gasto menor.

**Situação do mandato** (`cand.status.situacao`): `em_exercicio`, `licenciado`, `sem_mandato`, `falecido` ou `nao_verificado`. Apenas `em_exercicio` e `licenciado` entram no ranking.

**O que foi removido por não ter fonte verificável:** nota geral, radar e eixos, "penalidade judicial", fórmulas de pesos, coerência, viabilidade, visão sistêmica, eficácia pragmática, índice de produtividade (IPR), "capacidade política", resumos e pareceres de IA com juízo de valor, checagens de falas e de debates.

---

## 🚀 Como Executar o Projeto Localmente

### Passo a Passo

1. **Clonar o Repositório:**
```bash
git clone git@github.com:Fonteleee/RAIO-X-POLITICO.git
cd RAIO-X-POLITICO
```

2. **Executar Servidor Local:**

*Via Python:*
```bash
python -m http.server 8080
```

*Ou via Node (npx):*
```bash
npx serve .
```

### Scripts úteis

| Comando | Função |
|---|---|
| `npm test` | Testes (inclui regressões de sintaxe inline, links, SEO e segurança) |
| `npm run build:css` | Compila o Tailwind (`css/tw-app.css`, `css/tw-dossie.css`) — rodar após criar classes novas |
| `node scripts/smoke_site.js http://localhost:8080` | Smoke em navegador real (`FULL=1` testa todos os dossiês) |
| `node scripts/sanitize_data.js` | Remove conteúdo padronizado/placeholder dos dados |
| `node scripts/optimize_images.js` | Reduz fotos para 640px |

3. **Acessar no Navegador:**
```
http://localhost:8080/index.html
```

---

## 🤖 Indexação por IA & AI-SEO (`llms.txt`)

O projeto implementa o padrão aberto **`llms.txt`** e dados estruturados **Schema.org JSON-LD**, permitindo que motores de busca por IA (Perplexity, SearchGPT, Google Gemini, Claude) utilizem o Figuras Políticas como fonte primária confiável nas Eleições de 2026.

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**.

---
**Observatório Figuras Políticas • Eleições Gerais de 04 de Outubro de 2026**