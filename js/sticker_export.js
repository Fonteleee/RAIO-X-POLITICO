/* Figuras Políticas - Pipeline robusto de exportação de figurinhas (v2)
 * Sobrescreve downloadExportedImage / shareToInstagram / copyCardImageToClipboard de stickers.js.
 * Resolve: texto cortado/achatado (fontes não carregadas, truncate, line-height), formatos 9:16 e 1:1
 * reais, resoluções reais 1080p/4K e compartilhamento Instagram com fallback (iOS perde o "gesto do usuário"
 * após render demorado, o que fazia navigator.share falhar silenciosamente).
 */
(function () {
  'use strict';

  var CARD_W = 360;
  var MAX_PIXELS = 16000000; // limite seguro de canvas no iOS Safari

  function isDarkCard() {
    return (typeof exportVisualTheme !== 'undefined' && exportVisualTheme === 'twitter') ||
      (typeof isExportComparison !== 'undefined' && isExportComparison === true);
  }

  function cardBgColor() {
    return isDarkCard() ? '#070b16' : '#ffffff';
  }

  async function waitAssets(target) {
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { /* noop */ }
    var imgs = Array.prototype.slice.call(target.querySelectorAll('img'));
    await Promise.all(imgs.map(function (img) {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise(function (res) {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
        setTimeout(res, 2500);
      });
    }));
    await new Promise(function (r) { setTimeout(r, 80); });
  }

  // Corrige no CLONE (nunca na tela) o que o html2canvas desenha mal.
  function fixClone(doc) {
    var el = doc.getElementById('export-card-target');
    if (!el) return;
    el.style.width = CARD_W + 'px';
    el.style.minWidth = CARD_W + 'px';
    el.style.maxWidth = CARD_W + 'px';
    el.style.transform = 'none';
    el.style.margin = '0';
    el.style.boxShadow = 'none';
    var all = el.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var n = all[i];
      var cs = doc.defaultView.getComputedStyle(n);
      // truncate (overflow hidden + ellipsis + nowrap) cortava nomes ao meio
      if (cs.textOverflow === 'ellipsis' || (cs.overflow === 'hidden' && cs.whiteSpace === 'nowrap')) {
        n.style.overflow = 'visible';
        n.style.textOverflow = 'clip';
        n.style.whiteSpace = 'normal';
        n.style.wordBreak = 'break-word';
        n.style.maxWidth = '100%';
      }
      // line-height apertado cortava o topo/pé das letras
      var lh = parseFloat(cs.lineHeight);
      var fs = parseFloat(cs.fontSize);
      if (!isNaN(lh) && !isNaN(fs) && lh < fs * 1.2) {
        n.style.lineHeight = '1.25';
      }
      // line-clamp não é suportado pelo html2canvas
      if (cs.webkitLineClamp && cs.webkitLineClamp !== 'none') {
        n.style.webkitLineClamp = 'unset';
        n.style.display = 'block';
        n.style.overflow = 'visible';
        n.style.maxHeight = 'none';
      }
      n.style.letterSpacing = cs.letterSpacing === 'normal' ? 'normal' : cs.letterSpacing;
    }
  }

  async function renderStickerCanvas(resolution) {
    var target = document.getElementById('export-card-target');
    if (!target) throw new Error('Figurinha não encontrada');
    await waitAssets(target);

    var outW = resolution === '4k' ? 2160 : 1080;
    var fmt = (typeof exportFormat !== 'undefined') ? exportFormat : 'stories';
    var outH = fmt === 'feed' ? outW : Math.round(outW * 16 / 9);
    // reduz se estourar limite de memória
    var px = outW * outH;
    var k = px > MAX_PIXELS ? Math.sqrt(MAX_PIXELS / px) : 1;
    outW = Math.floor(outW * k); outH = Math.floor(outH * k);

    var rect = target.getBoundingClientRect();
    var cardH = Math.max(rect.height, target.scrollHeight);
    // escala para que o cartão fique nítido no tamanho final
    var fit = Math.min((outW * 0.92) / CARD_W, (outH * 0.94) / cardH);
    var renderScale = Math.min(Math.max(fit, 1), 8);

    var card = await html2canvas(target, {
      backgroundColor: null,
      scale: renderScale,
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: CARD_W,
      windowWidth: Math.max(CARD_W, document.documentElement.clientWidth),
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      onclone: function (doc) { fixClone(doc); }
    });

    var out = document.createElement('canvas');
    out.width = outW; out.height = outH;
    var ctx = out.getContext('2d');
    var dark = isDarkCard();
    var g = ctx.createLinearGradient(0, 0, outW, outH);
    if (dark) { g.addColorStop(0, '#0b1224'); g.addColorStop(1, '#030712'); }
    else { g.addColorStop(0, '#eef2ff'); g.addColorStop(1, '#e2e8f0'); }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, outW, outH);

    var drawW = outW * 0.92;
    var drawH = drawW * (card.height / card.width);
    if (drawH > outH * 0.94) { drawH = outH * 0.94; drawW = drawH * (card.width / card.height); }
    var dx = (outW - drawW) / 2, dy = (outH - drawH) / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(card, dx, dy, drawW, drawH);
    card.width = 0; card.height = 0;
    return out;
  }

  function canvasToBlob(canvas) {
    return new Promise(function (resolve) { canvas.toBlob(resolve, 'image/png'); });
  }

  function stickerFileName(resolution) {
    var resLabel = resolution === '4k' ? '4K-UltraHD' : 'FullHD-1080p';
    var fmt = (typeof exportFormat !== 'undefined' && exportFormat === 'feed') ? '1x1' : '9x16';
    var cand = (typeof activeExportCandidate !== 'undefined' && activeExportCandidate)
      ? activeExportCandidate.name.toLowerCase().replace(/\s+/g, '-') : 'candidato';
    return 'figurinha-' + cand + '-' + fmt + '-' + resLabel + '.png';
  }

  function saveBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function setBtn(btn, html) { if (btn) { btn.innerHTML = html; if (window.lucide) lucide.createIcons(); } }

  // Pré-visualização com botão de compartilhar (novo gesto do usuário => navigator.share funciona no iOS)
  function showSharePreview(blob, file, name) {
    var old = document.getElementById('sticker-share-preview');
    if (old) old.remove();
    var url = URL.createObjectURL(blob);
    var wrap = document.createElement('div');
    wrap.id = 'sticker-share-preview';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:100;background:rgba(2,6,23,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;overflow:auto';
    wrap.innerHTML =
      '<img src="' + url + '" alt="Figurinha pronta" style="max-width:100%;max-height:68vh;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.6)">' +
      '<p style="color:#e2e8f0;font:600 13px system-ui;text-align:center;margin:0">Figurinha pronta! Toque em <b>Compartilhar</b> e escolha Instagram (ou segure a imagem para salvar).</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">' +
      '<button id="sp-share" style="padding:12px 20px;border-radius:999px;background:linear-gradient(90deg,#ec4899,#ef4444,#eab308);color:#fff;font:700 14px system-ui;border:0">Compartilhar</button>' +
      '<button id="sp-save" style="padding:12px 20px;border-radius:999px;background:#2563eb;color:#fff;font:700 14px system-ui;border:0">Baixar</button>' +
      '<button id="sp-close" style="padding:12px 20px;border-radius:999px;background:#334155;color:#fff;font:700 14px system-ui;border:0">Fechar</button>' +
      '</div>';
    document.body.appendChild(wrap);
    function close() { wrap.remove(); URL.revokeObjectURL(url); }
    wrap.querySelector('#sp-close').onclick = close;
    wrap.querySelector('#sp-save').onclick = function () { saveBlob(blob, name); };
    wrap.querySelector('#sp-share').onclick = async function () {
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Figuras Políticas', text: 'Confira a análise deste político no Figuras Políticas!' });
        } else { saveBlob(blob, name); }
      } catch (e) { if (e && e.name !== 'AbortError') saveBlob(blob, name); }
    };
  }

  // Em hospedagem estática (GitHub Pages) não existe /api/proxy-image: usa proxy público com CORS.
  var _origAvatar = window.getCorsSafeAvatar;
  window.getCorsSafeAvatar = function (url, name) {
    var isStatic = /github\.io$/i.test(location.hostname);
    if (isStatic && url && /^https?:\/\//i.test(url) && !url.includes('ui-avatars.com') && !url.includes('Portrait_Placeholder')) {
      return 'https://images.weserv.nl/?url=' + encodeURIComponent(url.replace(/^https?:\/\//i, '')) + '&w=256&h=256&fit=cover&a=top';
    }
    return _origAvatar ? _origAvatar(url, name) : url;
  };

  window.downloadExportedImage = async function (resolution) {
    resolution = resolution || 'fhd';
    var btn = document.getElementById(resolution === '4k' ? 'btn-dl-4k' : 'btn-dl-fhd');
    var original = btn ? btn.innerHTML : '';
    setBtn(btn, '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Renderizando ' + resolution.toUpperCase() + '...');
    try {
      var canvas = await renderStickerCanvas(resolution);
      var blob = await canvasToBlob(canvas);
      canvas.width = 0; canvas.height = 0;
      if (!blob) throw new Error('blob vazio');
      saveBlob(blob, stickerFileName(resolution));
    } catch (err) {
      console.error('Erro na exportação:', err);
      alert('Ocorreu uma instabilidade ao gerar a imagem. Tente novamente.');
    } finally {
      setBtn(btn, original);
    }
  };

  window.shareToInstagram = async function () {
    var btn = document.getElementById('btn-share-insta');
    var original = btn ? btn.innerHTML : '';
    setBtn(btn, '<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i> Gerando...');
    try {
      var canvas = await renderStickerCanvas('fhd');
      var blob = await canvasToBlob(canvas);
      canvas.width = 0; canvas.height = 0;
      if (!blob) throw new Error('blob vazio');
      var name = stickerFileName('fhd');
      var file = new File([blob], name, { type: 'image/png' });
      var shared = false;
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Figuras Políticas', text: 'Confira a análise deste político no Figuras Políticas!' });
          shared = true;
        }
      } catch (e) {
        if (e && e.name === 'AbortError') shared = true; // usuário cancelou
      }
      if (!shared) showSharePreview(blob, file, name);
    } catch (err) {
      console.error(err);
      alert('Erro ao processar imagem para o Instagram. Tente o botão Baixar.');
    } finally {
      setBtn(btn, original);
    }
  };

  window.copyCardImageToClipboard = async function () {
    var btn = document.getElementById('btn-copy-img');
    var original = btn ? btn.innerHTML : '';
    setBtn(btn, '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Copiando...');
    try {
      var canvas = await renderStickerCanvas('fhd');
      var blob = await canvasToBlob(canvas);
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setBtn(btn, '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Copiado!');
      setTimeout(function () { setBtn(btn, original); }, 2000);
    } catch (err) {
      console.error(err);
      setBtn(btn, original);
      alert('Não foi possível copiar. Use o botão Baixar.');
    }
  };
})();
