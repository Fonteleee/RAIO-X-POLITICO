// Testes de Validação do Design System 4K (UI/UX, Tipografia, Efeitos 3D, Botões e WCAG 2.2 AAA)
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Função auxiliar para cálculo de luminância relativa e contraste WCAG 2.2
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function getRelativeLuminance(rgb) {
  const sRGB = rgb.map(val => {
    const v = val / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function getContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hexToRgb(hex1));
  const l2 = getRelativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

test('Design System 4K: Validação de Tipografia Editorial e Font Features', () => {
  const cssPath = path.join(__dirname, '..', 'css', 'style.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  // 1. Títulos com Plus Jakarta Sans
  assert.match(css, /Plus Jakarta Sans/i, 'Deve conter a fonte Plus Jakarta Sans');
  assert.match(css, /letter-spacing:\s*-0\.025em/, 'Títulos devem usar tracking ótico refinado -0.025em');
  assert.match(css, /-webkit-font-smoothing:\s*antialiased/, 'Deve usar antialiasing subpixel');
  assert.match(css, /-moz-osx-font-smoothing:\s*grayscale/, 'Deve usar grayscale antialiasing');

  // 2. Textos de corpo com Inter e OpenType features
  assert.match(css, /font-feature-settings:.*'cv02'/i, 'Deve conter cv02 para Inter');
  assert.match(css, /font-feature-settings:.*'cv03'/i, 'Deve conter cv03 para Inter');
  assert.match(css, /font-feature-settings:.*'cv04'/i, 'Deve conter cv04 para Inter');
  assert.match(css, /font-feature-settings:.*'cv11'/i, 'Deve conter cv11 para Inter');
  assert.match(css, /font-feature-settings:.*'ss01'/i, 'Deve conter ss01 para Inter');

  // 3. JetBrains Mono com tabular numbers para dados cívicos
  assert.match(css, /JetBrains Mono/i, 'Deve conter a fonte JetBrains Mono');
  assert.match(css, /font-feature-settings:.*'tnum'/i, 'Deve conter tnum para números tabulares perfeitamente alinhados');
  assert.match(css, /tabular-nums/i, 'Deve conter font-variant-numeric: tabular-nums');
});

test('Design System 4K: Efeitos 3D, Iluminação Zenital e Sombras Multicamadas', () => {
  const cssPath = path.join(__dirname, '..', 'css', 'style.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  // 1. Especular highlight zenithal (borda superior de 1px simulando luz)
  assert.match(css, /border-top:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.[78]\d*\)/i, 'Modo claro deve ter especular highlight zenithal');
  assert.match(css, /border-top:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.16\)/i, 'Modo escuro deve ter especular highlight zenithal 0.16');

  // 2. Hover elástico 3D com translateY(-3px) scale(1.006)
  assert.match(css, /translateY\(-3px\)/i, 'Card hover deve ter elevação de -3px');
  assert.match(css, /scale\(1\.006\)/i, 'Card hover deve ter escala sutil 1.006');

  // 3. Sombras em 3 camadas com dispersão suave
  assert.match(css, /box-shadow:[\s\S]*?,[\s\S]*?,[\s\S]*?;/, 'Cards devem ter sombras multicamadas (Chroma Ambient Occlusion)');
});

test('Design System 4K: Botões Táteis de Luxo e Acabamento Apple/Linear', () => {
  const cssPath = path.join(__dirname, '..', 'css', 'style.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  // 1. Chanfro luminoso interno zenital
  assert.match(css, /box-shadow:[\s\S]*?inset\s*0\s*1px\s*0\s*rgba\(255,\s*255,\s*255,\s*0\.25\)/i, 'Botões devem ter chanfro luminoso interno zenital');

  // 2. Efeito elástico ao clicar (:active)
  assert.match(css, /button:not\(:disabled\):active[\s\S]*?translateY\(1\.5px\)/i, 'Active state do botão deve ter translateY(1.5px)');
  assert.match(css, /button:not\(:disabled\):active[\s\S]*?scale\(0\.975\)/i, 'Active state do botão deve ter scale(0.975)');
  assert.match(css, /button:not\(:disabled\):active[\s\S]*?inset\s*0\s*2px\s*4px\s*rgba\(0,\s*0,\s*0,\s*0\.1[5-8]\)/i, 'Active state deve ter chanfro interno comprimido');
});

test('Design System 4K: Animações Fluidas, Micro-Zoom e Badges com Pulso Sutil', () => {
  const cssPath = path.join(__dirname, '..', 'css', 'style.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  // 1. Curva Apple/Framer Motion
  assert.match(css, /cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\)/, 'Deve usar curva fluida cubic-bezier(0.16, 1, 0.3, 1)');

  // 2. Micro-zoom suave nas fotos dos candidatos ao passar o cursor no card
  assert.match(css, /scale\(1\.0[56]\)/, 'Fotos dos candidatos devem ter micro-zoom scale(1.05 a 1.06)');

  // 3. Animação de pulso sutil em badges ativos
  assert.match(css, /@keyframes\s+.*pulse/i, 'Deve definir keyframes de pulso sutil para badges/status');

  // 4. Acessibilidade com prefers-reduced-motion
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i, 'Deve respeitar acessibilidade de movimento reduzido');
});

test('Design System 4K: Validação Rigorosa de Contraste WCAG 2.2 AAA', () => {
  const lightBg = '#f8fafc';
  const darkBg = '#090d16';

  // Deep Obsidian Slate no Modo Claro (requisito mínimo AAA: > 7:1)
  const c1 = getContrastRatio('#0f172a', lightBg);
  const c2 = getContrastRatio('#1e293b', lightBg);
  const c3 = getContrastRatio('#334155', lightBg);

  assert.ok(c1 >= 7.0, `Obsidian Slate #0f172a deve passar em WCAG AAA (obtido: ${c1.toFixed(2)})`);
  assert.ok(c2 >= 7.0, `Obsidian Slate #1e293b deve passar em WCAG AAA (obtido: ${c2.toFixed(2)})`);
  assert.ok(c3 >= 7.0, `Obsidian Slate #334155 deve passar em WCAG AAA (obtido: ${c3.toFixed(2)})`);

  // Ardósia Luminosa no Modo Escuro (requisito: contraste > 9:1)
  const cd1 = getContrastRatio('#f8fafc', darkBg);
  const cd2 = getContrastRatio('#e2e8f0', darkBg);
  const cd3 = getContrastRatio('#cbd5e1', darkBg);

  assert.ok(cd1 > 9.0, `Luminous Slate #f8fafc no Dark Mode deve ter contraste > 9:1 (obtido: ${cd1.toFixed(2)})`);
  assert.ok(cd2 > 9.0, `Luminous Slate #e2e8f0 no Dark Mode deve ter contraste > 9:1 (obtido: ${cd2.toFixed(2)})`);
  assert.ok(cd3 > 9.0, `Luminous Slate #cbd5e1 no Dark Mode deve ter contraste > 9:1 (obtido: ${cd3.toFixed(2)})`);
});
