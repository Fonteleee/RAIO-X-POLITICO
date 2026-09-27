# Figuras Políticas — Estudo Estratégico & Arquitetura de Dados: Os Três Poderes da República

> **Status:** Aprovado & Estruturado  
> **Plataforma:** Figuras Políticas (Dados Abertos Oficiais do Brasil)  
> **Autoridade de Dados:** CNJ (DataJud / Folhas de Pagamento), STF, STJ, TSE, Tesouro Nacional (Siconfi/Capag) e Congresso Nacional.

---

## 1. Diagnóstico do Cenário Atual do Portal

### 1.1 Predominância Legislativa
- **Base Atual:** 200 candidaturas catalogadas (159 legislativas e 41 do poder executivo), além de 158 mandatários em exercício.
- **Distorção Identificada:** Indicadores como Cota Parlamentar (CEAP), Faltas Não Justificadas em Sessões Deliberativas e Emendas Parlamentares são aplicáveis estritamente a Deputados e Senadores. Em prefeitos e governadores, tais métricas geravam inconsistência quando não substituídas pelos dados de gestão fiscal da LRF.
- **Lacuna do Poder Judiciário:** Zero magistrados e chefes do Ministério Público no catálogo atual.

---

## 2. Onde Entra o Poder Judiciário e o Ministério Público?

O Judiciário não concorre em eleições de sufrágio universal, mas é o poder que define a constitucionalidade das leis, a validade dos atos do Executivo e a integridade do processo eleitoral. No portal **Figuras Políticas**, as autoridades do Judiciário entram como **"Figuras Institucionais da República"**, com indicadores cívicos de prestação de contas baseados na Lei de Acesso à Informação (Lei 12.527/2011) e resoluções do Conselho Nacional de Justiça (CNJ).

### 2.1 Indicadores Cívicos Transparentes do Judiciário (Custo Zero / Dados Abertos)
1. **Transparência Remuneratória (Subsídio Base vs. Penduricalhos)**:
   - *Fonte:* Painel de Remuneração dos Magistrados do CNJ (dados públicos mensais).
   - *Métricas:* Subsídio constitucional (teto), verbas indenizatórias, gratificações por acúmulo de função, diárias e auxílios.
2. **Produtividade Processual & Acervo do Gabinete**:
   - *Fonte:* Portal de Dados Abertos do STF e DataJud do CNJ.
   - *Métricas:* Processos em acervo, decisões monocráticas vs. julgamentos colegiados, acórdãos publicados e tempo médio de tramitação.
3. **Controle de Prazos de Vistas (Emenda Regimental nº 58 do STF)**:
   - *Regra:* Pedidos de vista devem ser devolvidos para julgamento em até 90 dias corridos.
   - *Métricas:* Vistas pendentes dentro do prazo regimental vs. vistas extrapoladas (monitoramento de retenção de pauta).
4. **Alinhamento e Impacto Constitucional**:
   - Votos em Ações Diretas de Inconstitucionalidade (ADIs), Ações Declaratórias de Constitucionalidade (ADCs) e Arguições de Descumprimento de Preceito Fundamental (ADPFs).

### 2.2 Catálogo Inicial das 15 Figuras Institucionais do Judiciário
1. **Luís Roberto Barroso** — Presidente do Supremo Tribunal Federal (STF) e CNJ
2. **Edson Fachin** — Vice-Presidente do STF
3. **Gilmar Mendes** — Decano do STF
4. **Cármen Lúcia** — Ministra do STF e Presidente do Tribunal Superior Eleitoral (TSE)
5. **Dias Toffoli** — Ministro do STF
6. **Luiz Fux** — Ministro do STF
7. **Alexandre de Moraes** — Ministro do STF
8. **Nunes Marques** — Ministro do STF
9. **André Mendonça** — Ministro do STF
10. **Cristiano Zanin** — Ministro do STF
11. **Flávio Dino** — Ministro do STF
12. **Herman Benjamin** — Presidente do Superior Tribunal de Justiça (STJ)
13. **Mauro Campbell Marques** — Corregedor Nacional de Justiça (CNJ)
14. **Paulo Gonet Branco** — Procurador-Geral da República (PGR)
15. **Antônio Fabrício Gonçalves** — Ministro do Tribunal Superior do Trabalho (TST)

---

## 3. Aprimoramento e Expansão do Poder Executivo

Para Governadores, Prefeitos e Presidente da República, o portal estrutura métricas executivas sem contaminações legislativas:

1. **Gestão Fiscal & Solvência (Capag STN)**:
   - Classificação de Capacidade de Pagamento da Secretaria do Tesouro Nacional (Notas A, B, C, D).
   - Limite de Gastos com Pessoal da Lei de Responsabilidade Fiscal (LRF - Limite Prudencial de 54% da Receita Corrente Líquida).
2. **Cumprimento de Metas do Plano Registrado no TSE**:
   - Rastreamento sistemático das promessas registradas formalmente no plano de governo oficial confrontadas com as entregas no Portal da Transparência e RREO.
3. **Investimento Social Obrigatório**:
   - Aplicação dos pisos constitucionais em Saúde (mínimo 15% para municípios, 12% para estados) e Educação (mínimo 25%).
4. **Quadro de Cargos Comissionados**:
   - Volume de despesa em cargos em comissão (funções de confiança) vs. servidores concursados efetivos.

---

## 4. Estrutura de Tabelas no SQLite (`src/db/schema.sql`)

```sql
-- Tabela de Figuras Institucionais do Poder Judiciário e MP
CREATE TABLE IF NOT EXISTS judiciary_authorities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  court TEXT NOT NULL,           -- 'STF', 'STJ', 'TSE', 'CNJ', 'PGR'
  role TEXT NOT NULL,            -- 'Presidente', 'Ministro', 'Corregedor', 'Procurador-Geral'
  appointment_year INTEGER,
  appointed_by TEXT,             -- Presidente que indicou
  legal_academic_bg TEXT,        -- Formação jurídica de origem
  active_cases_cabinet INTEGER,  -- Acervo concluso no gabinete
  view_retention_overdue INTEGER,-- Vistas extrapoladas além de 90 dias (ER 58 STF)
  base_salary_monthly REAL,      -- Subsídio constitucional padrão
  allowances_monthly REAL,       -- Verbas indenizatórias e penduricalhos médios
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Próximos Passos de Integração na Interface
1. **Filtro de 3 Poderes no Header do Feed**:
   - Adicionar o botão comutador `[🏛️ Todos] [📜 Legislativo] [🏢 Executivo] [⚖️ Judiciário]`.
2. **Card Apple de Autoridade Judicial**:
   - Exibir acervo de processos, cumprimento da ER 58 (vistas de 90 dias) e transparência da folha de pagamento CNJ.
3. **Figurinha Colecionável "Guardião da Constituição"**:
   - Tema especial no Simulador com o histórico jurisprudencial da autoridade.
