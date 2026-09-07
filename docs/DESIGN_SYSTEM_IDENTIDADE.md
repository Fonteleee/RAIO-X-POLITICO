# Design System & Identidade Visual Proprietária: "Lente Cívica"
## Guia de Estilo, Tokens e Diretrizes UI/UX — Raio-X Político 2026

### Sumário Executivo
Para consolidar o Raio-X Político como a autoridade máxima em auditoria cívica digital no Brasil, eliminamos qualquer dependência de temas genéricos ou interfaces improvisadas. Desenvolvemos uma **identidade visual proprietária**, batizada de **"Lente Cívica"**, fundamentada em **clareza analítica, sobriedade institucional, alta densidade de dados e acessibilidade universal (WCAG 2.2 AA/AAA)**.

---

### 1. O Conceito Central: "A Lente Cívica"
* **Metáfora Visual:** Uma lente óptica de alta precisão que foca sobre a densa neblina do discurso eleitoral para revelar os fatos, números e gastos reais.
* **Personalidade da Marca:**
  * **Confiável:** Dados oficiais sem sensacionalismo.
  * **Cirúrgica:** Gráficos limpos, tipografia monoespelhada para números e métricas.
  * **Moderna:** Dark Mode imersivo nativo, cantos arredondados refinados (20px a 24px) e glassmorphism suave.

---

### 2. Paleta Cromática Institucional & Design Tokens

| Token de Cor | Hex Code | Propósito Semântico & Função no Sistema |
|---|---|---|
| **Deep Civic Navy** | `#090D16` | Fundo principal no Dark Mode. Proporciona contraste infinito com zero cansaço visual. |
| **Surface Slate Dark** | `#0F172A` | Fundo de painéis e cartões analíticos no Dark Mode. |
| **Surface Slate Light** | `#FFFFFF` / `#F8FAFC` | Superfícies principais no Light Mode. |
| **Electric Cyan** | `#06B6D4` / `#0284C7` | Cor primária de ação (CTAs, links, estados ativos e dados de transparência). |
| **Emerald Truth** | `#10B981` / `#059669` | Indicador de alta integridade, presença plena, economia de cota e fichas limpas. |
| **Amber Vigilance** | `#F59E0B` / `#D97706` | Alertas de custos aos cofres públicos, limites fiscais e atenção em comissões. |
| **Rose Judicial** | `#F43F5E` / `#E11D48` | Alertas éticos, processos, faltas injustificadas e inelegibilidade. |
| **Purple Governance** | `#8B5CF6` / `#7C3AED` | Projetos de lei, produção legislativa e conformidade constitucional. |

---

### 3. Tipografia Institucional (Dual Scale)
1. **Tipografia Primária (Interface & Leitura):** `Inter`, sans-serif.
   * Pesos utilizados: 400 (Regular para diagnósticos), 600 (Semi-bold para rótulos) e 800 (Extra-bold para títulos de destaque).
2. **Tipografia Técnica (Valores, Contas e Artigos da CF/88):** `JetBrains Mono`, monospace.
   * Utilizada em todos os números de scores, valores monetários (CEAP, orçamentos, custo por minuto) e números de leis (ex: *PL 4910/2024*). Garante escaneabilidade tabular sem variação de largura de caracteres.

---

### 4. Regras de Acessibilidade & Contraste (WCAG 2.2 AA)
1. **Eliminação de Caixas Brancas no Dark Mode:**
   * Nenhuma tag filha dentro de contêineres escuros pode herdar `bg-white` ou `bg-slate-50` sem classes correspondentes de `dark:bg-slate-800` ou `dark:bg-slate-900`.
   * Proibição expressa de usar classes inexistentes (como `slate-850`) sem definição formal no `tailwind.config`.
2. **Contraste Mínimo de Texto:**
   * Relação de contraste mínima de **4.5:1** para textos normais e **3:1** para textos grandes e componentes de interface.
   * No tema escuro: fundos escuros (`#0F172A`) utilizam textos em `#F1F5F9` (slate-100) ou `#E2E8F0` (slate-200), assegurando índice de contraste de **12.5:1** (Nível AAA).
3. **Área de Toque Mínima em Mobile:**
   * Todos os botões e abas possuem altura e largura mínimas de **44px por 44px**, garantindo usabilidade ergonômica em smartphones.
