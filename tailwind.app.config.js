// Build do CSS do app (index, match, 404). Gerar com: npm run build:css
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './match.html', './404.html', './js/**/*.js', './data/*.js'],
  theme: { extend: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      mono: ['"SF Mono"', '"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace']
    },
    colors: { apple: {
      canvas: '#f5f5f7', canvasDark: '#000000', cardLight: '#ffffff', cardDark: '#1c1c1e',
      blue: '#0071e3', blueHover: '#0077ed', blueDark: '#2997ff', green: '#34c759',
      orange: '#ff9500', purple: '#af52de', red: '#ff3b30'
    } }
  } }
};
