# Mapeamento e Catálogo Técnico de Novas Fontes Oficiais & Confiáveis
## Arquitetura de Dados para Expansão da Inteligência Cívica — Raio-X Político 2026

### Sumário Executivo
Para consolidar a base de dados mais rica, robusta e irrefutável da internet brasileira sobre personalidades públicas e candidatos, identificamos e mapeamos as **melhores fontes oficiais governamentais primárias** com acesso gratuito e endpoints de Dados Abertos (API/JSON/CSV).

---

### 1. Tribunal Superior Eleitoral (TSE) — DivulgaCandContas & SPCE
* **O que fornece:**
  * Declaração de bens item a item registrada pelo candidato (imóveis, empresas, veículos, aplicações financeiras).
  * Prestação de contas de campanha em tempo real: maiores doadores, empresas contratadas e teto de gastos.
  * Certidão de quitação eleitoral e decisões colegiadas sobre deferimento de registro.
* **Endpoint / Base Oficial:**
  * API REST: `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/`
  * Portal de Dados Abertos do TSE: `https://dadosabertos.tse.jus.br/`
* **Impacto no Raio-X:** Permite calcular a **Evolução Patrimonial** do candidato entre eleições consecutivas (ex: "Patrimônio aumentou 140% em 4 anos").

---

### 2. Controladoria-Geral da União (CGU) — Portal da Transparência Federal
* **O que fornece:**
  * **Cadastro de Pessoas Expostas Politicamente (PEP):** Mapeamento oficial de vínculos de parentesco e cargos estratégicos.
  * **CEIS (Cadastro de Empresas Inidôneas e Suspensas):** Identifica se empresas de doadores ou ligadas a políticos estão proibidas de contratar com a União.
  * **CNEP (Cadastro Nacional de Empresas Punidas - Lei Anticorrupção nº 12.846/2013).**
  * **Viagens e Diárias de Ministros e Secretários de Estado.**
* **Endpoint / Base Oficial:**
  * API do Portal da Transparência: `https://api.portaldatransparencia.gov.br/swagger-ui.html`
* **Impacto no Raio-X:** Alertas de integridade automática sobre empresas contratadas com verba de gabinete ou emendas.

---

### 3. Tribunal de Contas da União (TCU) & Tribunais de Contas Estaduais (TCEs)
* **O que fornece:**
  * **Lista de Responsáveis com Contas Julgadas Irregulares (Lista do TCU para fins eleitorais - Lei da Ficha Limpa):** Relação pública de gestores que cometeram irregularidade insanável por decisão irrecorrível.
  * Julgamento de Tomadas de Contas Especiais (TCEs) e multas imputadas a ex-prefeitos e governadores.
* **Endpoint / Base Oficial:**
  * TCU Dados Abertos: `https://dados.tcu.gov.br/`
* **Impacto no Raio-X:** Alerta definitivo no Pilar de Integridade para candidatos do Poder Executivo que tiveram contas rejeitadas.

---

### 4. Conselho Nacional de Justiça (CNJ) — BNMP e Produtividade Judicial
* **O que fornece:**
  * **Banco Nacional de Mandados de Prisão (BNMP):** Consulta de mandados abertos.
  * **Painéis de Consulta Pública de Processos e Precatórios Estaduais.**
* **Impacto no Raio-X:** Garantia de informação atualizada sobre a ausência de ordens de prisão ou condenações criminais pendentes.

---

### 5. Dados Abertos do Congresso Nacional (Câmara dos Deputados & Senado Federal)
* **O que fornece:**
  * **API da Câmara:** `https://dadosabertos.camara.leg.br/api/v2/`
    * Histórico completo de discursos em plenário (áudio e transcrição textual taquigráfica).
    * Votações nominais (como votou em reformas constitucionais, marcos regulatórios e PLs).
    * Participação e relatorias em Comissões Permanentes (CCJ, CFT, etc.).
  * **API do Senado:** `https://legis.senado.leg.br/dadosabertos/`
    * Votações em sabatinas secretas e abertas, projetos de decreto legislativo e tramitação de tratados internacionais.

---

### 6. Rede Internacional de Checagem de Fatos (IFCN) — Repositórios Integrados
* **O que fornece:**
  * Checagens de debates e declarações públicas chanceladas por agências independentes signatárias do código de princípios da IFCN (*Aos Fatos, Agência Lupa, UOL Confere, Estadão Verifica* e *Fato ou Fake*).
* **Impacto no Raio-X:** Alimenta automaticamente a aba **"Falas no Debate"** com links e vereditos oficiais (Verdadeiro, Falso, Fora de Contexto).
