// Figuras Políticas - Gerenciamento de Estado Global e Temas (Light / Dark)

// ================= THEME TOGGLE SYSTEM (LIGHT NATIVO / DARK ALTERNATIVO) =================
    let isDarkMode = false; // Default is Light Mode (branco/cinza)

    function initTheme() {
      const savedTheme = localStorage.getItem('civic_theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }

    function toggleTheme() {
      setDarkMode(!isDarkMode);
    }

    function setDarkMode(enableDark) {
      isDarkMode = enableDark;
      const html = document.documentElement;
      const themeIcon = document.getElementById('theme-icon');
      const themeText = document.getElementById('theme-text');

      if (isDarkMode) {
        html.classList.add('dark');
        html.classList.remove('light');
        localStorage.setItem('civic_theme', 'dark');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
        if (themeText) themeText.innerText = 'Modo Claro';
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('civic_theme', 'light');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
        if (themeText) themeText.innerText = 'Modo Escuro';
      }
      lucide.createIcons();

      if (currentTab === 'comparator') {
        updateComparator();
      }
    }

    // ================= DATA STORE (CANDIDATOS COM FILIAÇÃO, DATAS DE ELEIÇÃO & PROPOSTAS DETALHADAS) =================

// State Variables
    let currentTab = 'feed';
    const currentBrandName = 'Figuras Políticas';
    const currentBrandTagline = 'Veja o que está por trás do discurso.';
    let activeFilter = 'todos';
    let selectedForCompare = ['cand-tabata-amaral', 'cand-kim-kataguiri'];
    let activeDossieCandidate = candidatesData[0];
    let singleRadarChartInstance = null;
    let comparatorRadarChartInstance = null;
