const fs = require('fs');
const readline = require('readline');

const path = 'C:/Users/victo/.gemini/antigravity/brain/3fbf6091-378d-4a93-abc5-ca10d361fd13/.system_generated/logs/transcript.jsonl';
const fileStream = fs.createReadStream(path);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let runningChars = 0;
let tasksAcc = [];
let cur = null;

rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    const time = obj.created_at || '';
    const len = line.length;
    runningChars += len;

    if (!time.startsWith('2026-09-06') && !time.startsWith('2026-09-07')) return;

    if (obj.type === 'USER_INPUT') {
      if (cur) tasksAcc.push(cur);
      cur = {
        prompt: (obj.content || '').slice(0, 75).replace(/\r?\n/g, ' '),
        startStep: obj.step_index,
        turns: 0,
        accumulatedInputChars: 0,
        outputChars: 0
      };
    } else if (cur) {
      if (obj.type === 'PLANNER_RESPONSE') {
        cur.turns++;
        cur.accumulatedInputChars += runningChars;
        cur.outputChars += (obj.thinking || '').length + (obj.content || '').length;
      }
    }
  } catch (e) {}
});

rl.on('close', () => {
  if (cur) tasksAcc.push(cur);

  console.log('======================================================================');
  console.log('📈 CONSUMO ACUMULADO REAL (INPUT TOKENS FATURADOS) NA SESSÃO DE HOJE');
  console.log('======================================================================\n');
  
  let grandEstInputTokens = 0;
  tasksAcc.forEach((t, idx) => {
    if (t.turns === 0) return;
    const estInputTokens = Math.round(t.accumulatedInputChars / 4);
    grandEstInputTokens += estInputTokens;
    const avgContext = Math.round((t.accumulatedInputChars / t.turns) / 4);
    console.log(`[Tarefa ${idx+1}] "${t.prompt}"`);
    console.log(`  • Turnos: ${t.turns} | Janela de Contexto Média: ~${avgContext.toLocaleString()} tokens`);
    console.log(`  • Volume Faturado: ~${estInputTokens.toLocaleString()} tokens (${((estInputTokens/1000000)).toFixed(2)}M tokens)\n`);
  });

  console.log('======================================================================');
  console.log(`TOTAL DE INPUT TOKENS FATURADOS HOJE: ~${grandEstInputTokens.toLocaleString()} (~${(grandEstInputTokens/1000000).toFixed(1)} Milhões de tokens)`);
  console.log('======================================================================');
});
