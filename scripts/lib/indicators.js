// Contrato de dados dos indicadores oficiais (consumido pela interface).
// Formato: {valor, unidade:'%'|'R$'|'qtd', rotulo, detalhe, percentil, grupoComparacao, fonte, url, consultadoEm, ano}
const { today } = require('./data_io');

const GRUPOS = { camara: 'Deputados federais', senado: 'Senadores', governador: 'Governadores', prefeito: 'Prefeitos' };

function indicador({ valor, unidade, rotulo, detalhe, grupoComparacao, fonte, url, ano, ...extra }) {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) throw new Error(`Indicador "${rotulo}" com valor inválido`);
  return { valor, unidade, rotulo, detalhe, percentil: null, grupoComparacao, fonte, url, consultadoEm: today(), ano, ...extra };
}

function setIndicator(cand, key, ind) {
  cand.indicators = cand.indicators || {};
  if (ind) cand.indicators[key] = ind; else delete cand.indicators[key];
}

// Identificação da Casa a partir de dataVerification (gravado por verify_official.js)
function casaDe(cand) {
  const dv = cand.dataVerification;
  if (!dv || !dv.idOficial) return null;
  if (/Câmara/.test(dv.fonte)) return { casa: 'camara', id: String(dv.idOficial) };
  if (/Senado/.test(dv.fonte)) return { casa: 'senado', id: String(dv.idOficial) };
  return null;
}

const pct = (a, b) => Math.round((a / b) * 10000) / 100;
const brl = n => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct = n => n.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + '%';

module.exports = { GRUPOS, indicador, setIndicator, casaDe, pct, brl, fmtPct };
