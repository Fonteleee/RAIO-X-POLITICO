// Build do CSS do dossiê. Gerar com: npm run build:css
module.exports = {
  darkMode: 'class',
  content: ['./dossie.html', './data/*.js'],
  theme: { extend: {
    colors: { brand: { 50: '#f0fdf4', 100: '#dcfce7', 400: '#4ade80', 500: '#16a34a', 600: '#15803d', 900: '#14532d' } },
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace']
    }
  } }
};
