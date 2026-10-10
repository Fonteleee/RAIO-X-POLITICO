// Figuras Políticas - Navegação para o dossiê (página dedicada dossie.html).
// O antigo modal com radar e notas foi removido: o dossiê exibe apenas indicadores oficiais com fonte.

function openDossie(candId, initialSubTab = 'visao-geral') {
  const isProto = window.location.pathname.includes('/prototypes/');
  const base = 'dossie.html';
  const target = `${isProto ? '../' : ''}${base}?id=${encodeURIComponent(candId)}&tab=${encodeURIComponent(initialSubTab)}`;
  window.location.href = target;
}

function openDossieModal(candId, initialSubTab = 'visao-geral') {
  openDossie(candId, initialSubTab);
}

function closeDossieModal() {
  const modal = document.getElementById('dossie-modal');
  if (modal) modal.classList.add('hidden');
}

// Votação popular em propostas foi desativada (não é dado oficial). Mantida como no-op para compatibilidade.
function voteProposal() {}

window.openDossie = window.openDossie || openDossie;
window.openDossieModal = openDossieModal;
window.closeDossieModal = closeDossieModal;
