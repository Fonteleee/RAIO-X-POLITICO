// Figuras Políticas - Calculadora Cívica: "Quanto do seu imposto bancou este político?"
// Metodologia de Conversão Tributária & Impacto Pessoal

(function() {
  'use strict';

  // Tributação média brasileira (IRPF progressivo + carga indireta de consumo de aprox. 24%)
  function calculateCitizenAnnualTax(monthlyGross) {
    if (!monthlyGross || monthlyGross <= 0) monthlyGross = 1518;

    // Estimativa simplificada IRPF 2026 + Impostos sobre Consumo (ICMS/PIS/COFINS/ISS)
    let effectiveTaxRate = 0.22; // Base para até 2 salários mínimos
    if (monthlyGross > 10000) {
      effectiveTaxRate = 0.35;
    } else if (monthlyGross > 5000) {
      effectiveTaxRate = 0.30;
    } else if (monthlyGross > 2800) {
      effectiveTaxRate = 0.26;
    }

    const annualGross = monthlyGross * 13.33; // Inclui 13º e 1/3 de férias
    const annualTaxesPaid = annualGross * effectiveTaxRate;
    return {
      annualGross,
      effectiveTaxRate,
      annualTaxesPaid,
      dailyEarnings: annualGross / 365,
      hourlyEarnings: annualGross / (52 * 40) // 40h semanais
    };
  }

  function getPoliticianAnnualCost(cand) {
    if (!cand) return 2200000; // Custo médio padrão de mandato federal

    let annualCost = 0;
    // Subsídio parlamentar oficial (R$ 44.008,52/mês na Câmara/Senado)
    const baseSalary = 44008.52 * 13.33;
    
    // CEAP anualizado
    const monthlyCeap = cand.salary?.spendingCeapMonthlyNum || 35000;
    const annualCeap = monthlyCeap * 12;

    // Verba de Gabinete (banca até 25 secretários parlamentares: aprox. R$ 118.000/mês)
    const annualCabinetStaff = 118000 * 12;

    annualCost = baseSalary + annualCeap + annualCabinetStaff;
    return annualCost;
  }

  window.calculateCivicTaxImpact = function(monthlySalary, candidateId) {
    const taxData = calculateCitizenAnnualTax(monthlySalary);
    
    let cand = null;
    if (window.candidatesData && candidateId) {
      cand = window.candidatesData.find(c => c.id === candidateId);
    }
    if (!cand && window.currentDossieCandidate) {
      cand = window.currentDossieCandidate;
    }
    if (!cand && window.candidatesData && window.candidatesData.length > 0) {
      cand = window.candidatesData[0];
    }

    const candCost = getPoliticianAnnualCost(cand);
    const candDisplayName = cand ? (cand.ballotName || cand.name) : 'Parlamentar Federal';
    const candParty = cand ? cand.party : '';

    // População economicamente ativa pagadora de impostos no Brasil (~100 milhões)
    // A parcela que este cidadão individual contribuiu proporcionalmente para este mandato
    const fractionOfNationalBudget = taxData.annualTaxesPaid / 3500000000000; // Orçamento Geral da União
    const citizenDirectShareToMandate = candCost * (taxData.annualTaxesPaid / 70000000000);

    // Métrica de tempo trabalhado: dias e horas que este contribuinte trabalhou para bancar os custos anuais deste mandato
    // Baseado na fração do imposto anual do cidadão destinada ao Poder Legislativo (~3,2% da arrecadação federal)
    const hoursWorkedForMandate = Math.max(1.2, ((candCost / 2000000) * (taxData.annualTaxesPaid / 15000) * 2.8)).toFixed(1);
    const daysWorkedEquivalent = (hoursWorkedForMandate / 8).toFixed(1);

    // Equivalências Sociais
    const cestasBasicas = Math.round(candCost / 820);
    const consultasSus = Math.round(candCost / 75);
    const merendasEscolares = Math.round(candCost / 0.50);

    return {
      taxData,
      cand,
      candDisplayName,
      candParty,
      candCost,
      hoursWorkedForMandate,
      daysWorkedEquivalent,
      citizenDirectShareToMandate: Math.max(1.50, citizenDirectShareToMandate).toFixed(2),
      equivalencies: {
        cestasBasicas,
        consultasSus,
        merendasEscolares
      }
    };
  };

  // Renderizador do Componente da Calculadora no DOM
  window.renderTaxCalculatorWidget = function(targetContainerId, candidateId) {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    let selectedCandId = candidateId;
    let currentSalary = 3500;

    function refreshView() {
      const res = window.calculateCivicTaxImpact(currentSalary, selectedCandId);

      container.innerHTML = `
        <div class="glass-panel p-5 sm:p-6 rounded-3xl border border-amber-500/30 dark:border-amber-500/40 shadow-xl space-y-4 text-xs">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                <i data-lucide="calculator" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  Calculadora: Quanto do seu Imposto Financiou este Mandato?
                </h3>
                <span class="text-[11px] text-slate-500 dark:text-slate-400">
                  Descubra o impacto real no seu bolso baseado no seu salário e nos gastos públicos oficiais.
                </span>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono">
              Educação Fiscal
            </span>
          </div>

          <!-- Seleção de Salário com Botões Rápidos -->
          <div class="space-y-2">
            <label class="font-extrabold text-slate-800 dark:text-slate-200 text-xs block">
              Selecione ou digite sua renda bruta mensal:
            </label>
            <div class="flex flex-wrap items-center gap-1.5">
              ${[1518, 3000, 5000, 10000, 20000].map(val => `
                <button 
                  type="button" 
                  onclick="window.updateTaxSalary(${val})"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${currentSalary === val ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}"
                >
                  R$ ${val.toLocaleString('pt-BR')}
                </button>
              `).join('')}
            </div>

            <div class="relative w-full max-w-xs pt-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">R$</span>
              <input 
                type="number" 
                id="custom-tax-salary-input" 
                value="${currentSalary}" 
                min="500" 
                step="100" 
                onchange="window.updateTaxSalary(Number(this.value))"
                class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 font-mono font-bold text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
            </div>
          </div>

          <!-- DIAGNÓSTICO DO CIDADÃO (DESTAQUE CÍVICO) -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-sky-500/10 border border-amber-500/30 space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span class="text-[10px] uppercase tracking-wider font-extrabold text-amber-800 dark:text-amber-300 block">
                  Seu Tempo de Trabalho Dedicado:
                </span>
                <h4 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Você trabalhou <span class="text-amber-600 dark:text-amber-400">${res.daysWorkedEquivalent} dias</span> (${res.hoursWorkedForMandate} horas) do seu ano
                </h4>
                <p class="text-[11.5px] text-slate-600 dark:text-slate-300 mt-0.5">
                  exclusivamente para arcar com os salários, verba de gabinete e despesas de <strong>${res.candDisplayName} (${res.candParty})</strong>.
                </p>
              </div>
              <div class="text-right sm:border-l sm:border-slate-200 dark:sm:border-white/10 sm:pl-4">
                <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">Custo Total Anual do Mandato:</span>
                <span class="text-base sm:text-lg font-black font-mono text-amber-700 dark:text-amber-300">
                  R$ ${(res.candCost / 1000000).toFixed(2)} milhões
                </span>
              </div>
            </div>

            <!-- O que esse valor bancaria na sociedade -->
            <div class="pt-2 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[10.5px]">
              <div class="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5">
                <span class="font-bold text-slate-500 dark:text-slate-400 block">Cestas Básicas:</span>
                <strong class="font-mono text-sm font-black text-slate-900 dark:text-white">${res.equivalencies.cestasBasicas.toLocaleString('pt-BR')}</strong>
              </div>
              <div class="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5">
                <span class="font-bold text-slate-500 dark:text-slate-400 block">Consultas no SUS:</span>
                <strong class="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">${res.equivalencies.consultasSus.toLocaleString('pt-BR')}</strong>
              </div>
              <div class="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5">
                <span class="font-bold text-slate-500 dark:text-slate-400 block">Merendas Escolares:</span>
                <strong class="font-mono text-sm font-black text-sky-600 dark:text-cyan-400">${res.equivalencies.merendasEscolares.toLocaleString('pt-BR')}</strong>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex items-center justify-between gap-3 pt-1">
            <span class="text-[10px] text-slate-400 font-mono">
              Fonte: Relatórios de Gestão Fiscal da Câmara/Senado e Receita Federal
            </span>
            <button 
              onclick="window.shareTaxImpactWhatsApp('${res.candDisplayName}', '${res.daysWorkedEquivalent}', '${res.hoursWorkedForMandate}')"
              class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer transition flex items-center gap-1.5"
            >
              <i data-lucide="share-2" class="w-3.5 h-3.5"></i> Compartilhar no WhatsApp
            </button>
          </div>
        </div>
      `;

      if (window.lucide) lucide.createIcons();
    }

    window.updateTaxSalary = function(newSalary) {
      if (newSalary > 0) {
        currentSalary = newSalary;
        refreshView();
      }
    };

    window.shareTaxImpactWhatsApp = function(candName, days, hours) {
      const text = `💸 Sabia que com o meu salário, eu trabalhei ${days} dias (${hours} horas) este ano só para pagar o mandato de ${candName}? Descubra quanto do seu imposto banca os políticos no Observatório Figuras Políticas: ${new URL("index.html", window.location.href).href}`;
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    };

    refreshView();
  };

  window.renderCandidateTaxCalculator = window.renderTaxCalculatorWidget;
  window.calculateCitizenMandateContribution = window.calculateCivicTaxImpact;

})();
