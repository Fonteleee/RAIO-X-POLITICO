const fs = require('fs');
const readline = require('readline');

const path = 'C:/Users/victo/.gemini/antigravity/brain/3fbf6091-378d-4a93-abc5-ca10d361fd13/.system_generated/logs/transcript.jsonl';
const fileStream = fs.createReadStream(path);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let currentTask = null;
const tasks = [];

rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    const time = obj.created_at || '';
    if (!time.startsWith('2026-09-06') && !time.startsWith('2026-09-07')) return;

    if (obj.type === 'USER_INPUT') {
      if (currentTask) {
        tasks.push(currentTask);
      }
      currentTask = {
        prompt: (obj.content || '').slice(0, 90),
        startTime: time,
        stepStart: obj.step_index,
        stepEnd: obj.step_index,
        modelSteps: 0,
        toolCalls: 0,
        contentChars: 0,
        thinkingChars: 0,
        toolResultChars: 0,
        largeOutputs: [],
        toolsUsed: {}
      };
    } else if (currentTask) {
      currentTask.stepEnd = obj.step_index;
      if (obj.type === 'PLANNER_RESPONSE') {
        currentTask.modelSteps++;
        if (obj.thinking) currentTask.thinkingChars += obj.thinking.length;
        if (obj.content) currentTask.contentChars += obj.content.length;
        if (obj.tool_calls) {
          currentTask.toolCalls += obj.tool_calls.length;
          for (const tc of obj.tool_calls) {
            const name = tc.name || (tc.function && tc.function.name) || 'unknown';
            currentTask.toolsUsed[name] = (currentTask.toolsUsed[name] || 0) + 1;
          }
        }
      }
      if (obj.type === 'TOOL_CALL_RESULT') {
        const len = (obj.content || '').length;
        currentTask.toolResultChars += len;
        if (len > 30000) {
          currentTask.largeOutputs.push({ step: obj.step_index, len });
        }
      }
    }
  } catch (e) {}
});

rl.on('close', () => {
  if (currentTask) tasks.push(currentTask);
  console.log('======================================================================');
  console.log('📊 AUDITORIA COMPLETA DE CONSUMO DE TOKENS NA SESSÃO DE HOJE (06-07/SET)');
  console.log('======================================================================\n');
  console.log(`Total de Tarefas/Interações do Usuário hoje: ${tasks.length}\n`);

  let grandTotalChars = 0;
  let grandTotalThinking = 0;
  let grandTotalToolResults = 0;
  let grandTotalModelSteps = 0;
  let grandTotalToolCalls = 0;

  tasks.forEach((t, i) => {
    const totalChars = t.contentChars + t.thinkingChars + t.toolResultChars;
    const estTokens = Math.round(totalChars / 4);
    grandTotalChars += totalChars;
    grandTotalThinking += t.thinkingChars;
    grandTotalToolResults += t.toolResultChars;
    grandTotalModelSteps += t.modelSteps;
    grandTotalToolCalls += t.toolCalls;

    console.log(`[Tarefa ${i+1}] "${t.prompt.replace(/\r?\n/g, ' ')}"`);
    console.log(`  • Passos no histórico: ${t.stepStart} a ${t.stepEnd} (${t.modelSteps} turnos, ${t.toolCalls} ferramentas)`);
    console.log(`  • Volume de Caracteres: ${totalChars.toLocaleString()} chars (~${estTokens.toLocaleString()} tokens de contexto)`);
    console.log(`  • Divisão: Thinking: ${t.thinkingChars.toLocaleString()} | Tool Results: ${t.toolResultChars.toLocaleString()} | Resposta: ${t.contentChars.toLocaleString()}`);
    console.log(`  • Top ferramentas: ${Object.entries(t.toolsUsed).sort((a,b)=>b[1]-a[1]).slice(0, 4).map(([k,v]) => `${k}:${v}`).join(', ')}`);
    if (t.largeOutputs.length > 0) {
      console.log(`  • ⚠️ Saídas de ferramentas gigantes (>30KB): ${t.largeOutputs.length} ocorrências`);
    }
    console.log('');
  });

  const grandTokens = Math.round(grandTotalChars / 4);
  console.log('======================================================================');
  console.log(`TOTAL DO DIA: ~${grandTokens.toLocaleString()} tokens estimados`);
  console.log(`• Turnos do Modelo: ${grandTotalModelSteps}`);
  console.log(`• Chamadas de Ferramentas: ${grandTotalToolCalls}`);
  console.log(`• Thinking do Modelo: ${grandTotalThinking.toLocaleString()} chars (~${Math.round(grandTotalThinking/4).toLocaleString()} tokens)`);
  console.log(`• Retornos de Ferramentas: ${grandTotalToolResults.toLocaleString()} chars (~${Math.round(grandTotalToolResults/4).toLocaleString()} tokens)`);
  console.log('======================================================================');
});
