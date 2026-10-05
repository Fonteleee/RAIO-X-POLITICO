/* Figuras PolÃ­ticas - Pipeline robusto de exportaÃ§Ã£o de figurinhas (v2)
 * Sobrescreve downloadExportedImage / shareToInstagram / copyCardImageToClipboard de stickers.js.
 * Resolve: texto cortado/achatado (fontes nÃ£o carregadas, truncate, line-height), formatos 9:16 e 1:1
 * reais, resoluÃ§Ãµes reais 1080p/4K e compartilhamento Instagram com fallback (iOS perde o "gesto do usuÃ¡rio"
 * apÃ³s render demorado, o que fazia navigator.share falhar silenciosamente).
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
      // line-height apertado cortava o topo/pÃ© das letras
      var lh = parseFloat(cs.lineHeight);
      var fs = parseFloat(cs.fontSize);
      if (!isNaN(lh) && !isNaN(fs) && lh < fs * 1.2) {
        n.style.lineHeight = '1.25';
      }
      // line-clamp nÃ£o Ã© suportado pelo html2canvas
      if (cs.webkitLineClamp && cs.webkitLineClamp !== 'none') {
        n.style.webkitLineClamp = 'unset';
        n.style.display = 'block';
        n.style.overflow = 'visible';
        n.style.maxHeight = 'none';
      }
      n.style.letterSpacing = cs.letterSpacing === 'normal' ? 'normal' : cs.letterSpacing;
    }
  }

  var SKIP_PROPS = { 'width': 1, 'height': 1, 'inline-size': 1, 'block-size': 1, 'perspective-origin': 1,
    'transform-origin': 1, 'transition': 1, 'animation': 1, 'cursor': 1 };

  function inlineStyles(src, dst) {
    var cs = window.getComputedStyle(src);
    var tag = src.tagName;
    var replaced = tag === 'IMG' || tag === 'CANVAS' || tag === 'SVG' || tag === 'svg';
    for (var i = 0; i < cs.length; i++) {
      var p = cs[i];
      if (SKIP_PROPS[p] && !replaced) continue;
      if (p.indexOf('transition') === 0 || p.indexOf('animation') === 0) continue;
      dst.style.setProperty(p, cs.getPropertyValue(p), cs.getPropertyPriority(p));
    }
  }

  function cloneWithStyles(srcRoot) {
    var dstRoot = srcRoot.cloneNode(true);
    var srcNodes = [srcRoot].concat(Array.prototype.slice.call(srcRoot.querySelectorAll('*')));
    var dstNodes = [dstRoot].concat(Array.prototype.slice.call(dstRoot.querySelectorAll('*')));
    for (var i = 0; i < srcNodes.length; i++) {
      var s = srcNodes[i], d = dstNodes[i];
      if (!d || !d.style) continue;
      inlineStyles(s, d);
      if (s.tagName === 'CANVAS') {
        var img = document.createElement('img');
        try { img.src = s.toDataURL('image/png'); } catch (e) { /* noop */ }
        var r = s.getBoundingClientRect();
        img.style.cssText = d.style.cssText;
        img.style.width = (s.clientWidth || r.width) + 'px';
        img.style.height = (s.clientHeight || r.height) + 'px';
        d.parentNode.replaceChild(img, d);
        dstNodes[i] = img;
      } else if (s.tagName === 'IMG') {
        d.src = s.currentSrc || s.src;
        d.removeAttribute('loading');
        d.removeAttribute('srcset');
        d.crossOrigin = 'anonymous';
      }
    }
    dstRoot.style.width = CARD_W + 'px';
    dstRoot.style.minWidth = CARD_W + 'px';
    dstRoot.style.maxWidth = CARD_W + 'px';
    dstRoot.style.transform = 'none';
    dstRoot.style.margin = '0';
    dstRoot.style.boxShadow = 'none';
    return dstRoot;
  }

  async function buildIsolatedFrame(target) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.cssText = 'position:fixed;left:-10000px;top:0;width:' + (CARD_W + 40) + 'px;height:2400px;border:0;pointer-events:none';
    document.body.appendChild(iframe);
    var doc = iframe.contentDocument;
    var fontLinks = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]'))
      .filter(function (l) { return /fonts\.googleapis|fontshare|bunny/i.test(l.href); })
      .map(function (l) { return '<link rel="stylesheet" href="' + l.href + '">'; }).join('');
    doc.open();
    doc.write('<!doctype html><html><head><meta charset="utf-8">' + fontLinks +
      '<style>html,body{margin:0;padding:0;background:transparent}*{box-sizing:border-box}</style></head><body></body></html>');
    doc.close();
    var clone = cloneWithStyles(target);
    doc.body.appendChild(clone);
    try { if (doc.fonts && doc.fonts.ready) await Promise.race([doc.fonts.ready, new Promise(function (r) { setTimeout(r, 3000); })]); } catch (e) { /* noop */ }
    var imgs = Array.prototype.slice.call(doc.images);
    await Promise.all(imgs.map(function (im) {
      if (im.complete) return Promise.resolve();
      return new Promise(function (res) { im.onload = res; im.onerror = res; setTimeout(res, 4000); });
    }));
    fixClone(doc);
    await new Promise(function (r) { setTimeout(r, 60); });
    return { iframe: iframe, clone: clone };
  }

  window.__stickerDebug = { render: renderStickerCanvas, frame: buildIsolatedFrame, wait: waitAssets };

  async function renderStickerCanvas(resolution) {
    var target = document.getElementById('export-card-target');
    if (!target) throw new Error('Figurinha nÃ£o encontrada');
    await waitAssets(target);

    var fmt = (typeof exportFormat !== 'undefined') ? exportFormat : 'stories';
    var outW = resolution === '4k' ? 2160 : 1080;
    var outH = fmt === 'feed' ? outW : (fmt === 'portrait' ? Math.round(outW * 5 / 4) : Math.round(outW * 16 / 9));
    // reduz se estourar limite de memÃ³ria
    var px = outW * outH;
    var k = px > MAX_PIXELS ? Math.sqrt(MAX_PIXELS / px) : 1;
    outW = Math.floor(outW * k); outH = Math.floor(outH * k);

    var frame = await buildIsolatedFrame(target);
    var card;
    try {
      var cardH = Math.max(frame.clone.scrollHeight, frame.clone.getBoundingClientRect().height);
      var fit = Math.min((outW * 0.92) / CARD_W, (outH * 0.94) / cardH);
      var renderScale = Math.min(Math.max(fit, 1), 8);
      card = await html2canvas(frame.clone, {
        backgroundColor: null,
        scale: renderScale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: CARD_W,
        height: Math.ceil(cardH),
        windowWidth: CARD_W + 40,
        windowHeight: Math.ceil(cardH) + 40
      });
    } finally {
      if (frame.iframe.parentNode) frame.iframe.parentNode.removeChild(frame.iframe);
    }

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

  // PrÃ©-visualizaÃ§Ã£o com botÃ£o de compartilhar (novo gesto do usuÃ¡rio => navigator.share funciona no iOS)
  function showSharePreview(blob, file, name) {
    var old = document.getElementById('sticker-share-preview');
    if (old) old.remove();
    var url = URL.createObjectURL(blob);
    var wrap = document.createElement('div');
    wrap.id = 'sticker-share-preview';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(2,6,23,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;overflow:auto';
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
          await navigator.share({ files: [file], title: 'Figuras PolÃ­ticas', text: 'Confira a anÃ¡lise deste polÃ­tico no Figuras PolÃ­ticas!' });
        } else { saveBlob(blob, name); }
      } catch (e) { if (e && e.name !== 'AbortError') saveBlob(blob, name); }
    };
  }

  // Em hospedagem estÃ¡tica (GitHub Pages) nÃ£o existe /api/proxy-image: usa proxy pÃºblico com CORS.
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
      console.error('Erro na exportaÃ§Ã£o:', err);
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
          await navigator.share({ files: [file], title: 'Figuras PolÃ­ticas', text: 'Confira a anÃ¡lise deste polÃ­tico no Figuras PolÃ­ticas!' });
          shared = true;
        }
      } catch (e) {
        if (e && e.name === 'AbortError') shared = true; // usuÃ¡rio cancelou
      }
      if (!shared) showSharePreview(blob, file, name);
    } catch (err) {
      console.error(err);
      alert('Erro ao processar imagem para o Instagram. Tente o botÃ£o Baixar.');
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
      alert('NÃ£o foi possÃ­vel copiar. Use o botÃ£o Baixar.');
    }
  };
})();
