/* Markdown sandbox exercise + tiny markdown renderer.
   Globals: React, CNSM, Icon, RichText. Exports: MarkdownSandbox. */

// ── minimal, safe markdown → html ───────────────────────────────
function mdEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function mdInline(s) {
  // s is already HTML-escaped (so > became &gt;). Work on tokens.
  let out = s;
  // images ![alt](url)
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<span class="md-img">🖼 $1</span>');
  // links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="#" onclick="return false">$1</a>');
  // inline code `code`
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // bold italic ***x***
  out = out.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  // bold **x** or __x__
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  // italic *x* or _x_
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^_])_([^_\n]+)_/g, '$1<em>$2</em>');
  return out;
}
function mdToHtml(src) {
  const lines = mdEscape(src).split('\n');
  let html = '';
  let i = 0;
  const flushParas = [];
  while (i < lines.length) {
    let ln = lines[i];
    // heading
    const h = ln.match(/^(#{1,6})\s+(.*)$/);
    if (h) { html += `<h${h[1].length}>${mdInline(h[2])}</h${h[1].length}>`; i++; continue; }
    // hr
    if (/^\s*---+\s*$/.test(ln)) { html += '<hr/>'; i++; continue; }
    // blockquote (consecutive)
    if (/^>\s?/.test(ln)) {
      let buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(mdInline(lines[i].replace(/^>\s?/, ''))); i++; }
      html += `<blockquote>${buf.join('<br/>')}</blockquote>`; continue;
    }
    // unordered list
    if (/^[-*+]\s+\S/.test(ln)) {
      let buf = [];
      while (i < lines.length && /^[-*+]\s+\S/.test(lines[i])) { buf.push(`<li>${mdInline(lines[i].replace(/^[-*+]\s+/, ''))}</li>`); i++; }
      html += `<ul>${buf.join('')}</ul>`; continue;
    }
    // ordered list
    if (/^\d+\.\s+\S/.test(ln)) {
      let buf = [];
      while (i < lines.length && /^\d+\.\s+\S/.test(lines[i])) { buf.push(`<li>${mdInline(lines[i].replace(/^\d+\.\s+/, ''))}</li>`); i++; }
      html += `<ol>${buf.join('')}</ol>`; continue;
    }
    // blank
    if (/^\s*$/.test(ln)) { i++; continue; }
    // paragraph (gather consecutive non-empty, non-block lines)
    let buf = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6})\s/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^[-*+]\s+\S/.test(lines[i]) && !/^\d+\.\s+\S/.test(lines[i]) && !/^\s*---+\s*$/.test(lines[i])) {
      buf.push(mdInline(lines[i])); i++;
    }
    html += `<p>${buf.join('<br/>')}</p>`;
  }
  return html;
}

// ── validators per task type ────────────────────────────────────
function mdValidate(type, s) {
  if (!s) return false;
  switch (type) {
    case 'h1': return /^#(?!#)\s+\S/m.test(s);
    case 'h2': return /^##(?!#)\s+\S/m.test(s);
    case 'h3': return /^###(?!#)\s+\S/m.test(s);
    case 'bold': return /\*\*[^*\n]+\*\*/.test(s) || /__[^_\n]+__/.test(s);
    case 'italic': {
      const noBold = s.replace(/\*\*\*[^*\n]+\*\*\*/g, '').replace(/\*\*[^*\n]+\*\*/g, '').replace(/__[^_\n]+__/g, '');
      return /\*[^*\n]+\*/.test(noBold) || /(^|[^_])_[^_\n]+_/.test(noBold);
    }
    case 'list': return (s.match(/^[-*+]\s+\S/gm) || []).length >= 2;
    case 'olist': return (s.match(/^\d+\.\s+\S/gm) || []).length >= 2;
    case 'quote': return /^>\s*\S/m.test(s);
    case 'link': return /\[[^\]]+\]\([^)\s]+\)/.test(s);
    default: return false;
  }
}

function fmtTime(sec) {
  if (sec < 0) sec = 0;
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const SB_KEY = 'cnsmdp-md-sandbox-v1';
function sbLoad() { try { return JSON.parse(localStorage.getItem(SB_KEY)) || {}; } catch (e) { return {}; } }
function sbSave(o) { try { localStorage.setItem(SB_KEY, JSON.stringify(o)); } catch (e) {} }

function MarkdownSandbox({ data, lang, onOpenTool }) {
  const t = (o) => (o && typeof o === 'object' && ('fr' in o || 'en' in o) ? o[lang] : o);
  const tasks = data.tasks;
  const total = tasks.length;
  const init = sbLoad();

  const [started, setStarted] = React.useState(!!init.started);
  const [step, setStep] = React.useState(init.step || 0);
  const [done, setDone] = React.useState(!!init.done);
  const [startTs, setStartTs] = React.useState(init.startTs || null);
  const [text, setText] = React.useState('');
  const [revealed, setRevealed] = React.useState(false);
  const [tried, setTried] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [now, setNow] = React.useState(Date.now());

  React.useEffect(() => { sbSave({ started, step, done, startTs }); }, [started, step, done, startTs]);
  React.useEffect(() => {
    if (!started || done) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [started, done]);

  const task = tasks[step];
  const ok = task ? mdValidate(task.type, text) : false;
  const elapsed = startTs ? Math.floor((now - startTs) / 1000) : 0;
  const remaining = data.duration * 60 - elapsed;
  const overtime = remaining < 0;

  const begin = () => { setStarted(true); setStartTs(Date.now()); setNow(Date.now()); };
  const check = () => { setTried(true); if (ok) setRevealed(true); };
  const advance = () => {
    if (step < total - 1) { setStep(step + 1); setText(''); setRevealed(false); setTried(false); setShowHint(false); }
    else { setDone(true); }
  };
  const restart = () => { setStarted(false); setStep(0); setDone(false); setStartTs(null); setText(''); setRevealed(false); setTried(false); setShowHint(false); sbSave({}); };

  const shell = (children) => React.createElement('div', {
    style: { borderRadius: 18, overflow: 'hidden', border: `1px solid ${CNSM.warmBorder}`, background: CNSM.cream, boxShadow: 'var(--shadow-sm)' }
  }, children);

  // ── intro / start ──
  if (!started) {
    return shell(React.createElement('div', { style: { padding: '26px 28px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' } },
        React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 9999, background: 'rgba(198,155,58,0.14)', border: '1px solid rgba(198,155,58,0.4)', color: '#9A7726', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' } },
          React.createElement(Icon, { name: 'puzzle', size: 13, color: '#9A7726' }), t(data.badge)),
        React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: CNSM.brown, letterSpacing: '0.06em' } },
          React.createElement(Icon, { name: 'clock', size: 14, color: CNSM.brown }), t(data.durationLabel))
      ),
      React.createElement('h3', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 24, color: CNSM.dark, letterSpacing: '-0.02em', margin: '0 0 8px' } }, t(data.title)),
      React.createElement('p', { style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.6, color: CNSM.leather, margin: '0 0 18px', maxWidth: 560 } }, t(data.intro)),
      React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: CNSM.brown, marginBottom: 10 } }, t(data.objectivesLabel)),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 9, marginBottom: 22 } },
        t(data.objectives).map((o, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'Montserrat', fontSize: 14, color: CNSM.brownDark } },
          React.createElement('span', { style: { width: 20, height: 20, borderRadius: '50%', background: CNSM.red50, color: CNSM.red, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, React.createElement(Icon, { name: 'check', size: 12, color: CNSM.red, strokeWidth: 3 })),
          o))),
      React.createElement('button', { onClick: begin, style: { display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 24px', borderRadius: 11, border: 'none', cursor: 'pointer', background: CNSM.red, color: '#FEFCF9', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 15, boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.35)' } },
        React.createElement(Icon, { name: 'play', size: 16, color: '#fff' }), t(data.startLabel))
    ));
  }

  // ── done ──
  if (done) {
    return shell(React.createElement('div', { style: { padding: '34px 28px', textAlign: 'center', background: 'linear-gradient(165deg,#3D3229,#2C2420)', color: '#F0E6D6' } },
      React.createElement('div', { style: { width: 56, height: 56, margin: '0 auto 14px', borderRadius: '50%', background: 'rgba(34,197,94,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(Icon, { name: 'checkCircle', size: 30, color: '#4ADE80' })),
      React.createElement('h3', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 23, margin: '0 0 8px', color: '#fff' } }, t(data.doneTitle)),
      React.createElement('p', { style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.6, color: '#D9CDBB', maxWidth: 460, margin: '0 auto 16px' } }, t(data.doneBody)),
      React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C69B3A', marginBottom: 22, letterSpacing: '0.06em' } },
        React.createElement(Icon, { name: 'clock', size: 14, color: '#C69B3A' }), t(data.timeUsed) + ' · ' + fmtTime(elapsed)),
      React.createElement('div', { style: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' } },
        React.createElement('button', { onClick: restart, style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer', background: 'transparent', color: '#E8DFD0', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14 } },
          React.createElement(Icon, { name: 'circle', size: 14, color: '#E8DFD0' }), t(data.restart)),
        onOpenTool && React.createElement('a', { href: onOpenTool, target: '_blank', rel: 'noopener', style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', textDecoration: 'none', background: CNSM.red, color: '#FEFCF9', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14, boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.3)' } },
          React.createElement(Icon, { name: 'feather', size: 15, color: '#fff' }), t(data.openTool))
      )
    ));
  }

  // ── workbench ──
  const previewHtml = text.trim() ? mdToHtml(text) : '';
  return shell(React.createElement('div', null,
    // header: progress + timer
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '14px 20px', borderBottom: `1px solid ${CNSM.warmBorder}`, background: CNSM.parchment, flexWrap: 'wrap' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: CNSM.brown, fontWeight: 700 } }, `${t(data.consigne)} ${step + 1}/${total}`),
        React.createElement('div', { style: { display: 'flex', gap: 5 } },
          tasks.map((_, i) => React.createElement('span', { key: i, style: { width: i === step ? 20 : 8, height: 8, borderRadius: 9999, background: i < step ? '#22C55E' : i === step ? CNSM.red : CNSM.warmBorder, transition: 'all 220ms' } })))
      ),
      React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: overtime ? CNSM.red : CNSM.brownDark } },
        React.createElement(Icon, { name: 'clock', size: 15, color: overtime ? CNSM.red : CNSM.brown }), fmtTime(remaining))
    ),
    overtime && React.createElement('div', { style: { padding: '8px 20px', background: CNSM.red50, fontFamily: 'Montserrat', fontSize: 12.5, color: CNSM.red, textAlign: 'center' } }, t(data.timeUp)),
    // instruction
    React.createElement('div', { style: { padding: '16px 20px 12px' } },
      React.createElement(RichText, { html: t(task.instruction), className: 'sandbox-instruction', style: { fontFamily: 'Montserrat', fontSize: 16, lineHeight: 1.55, color: CNSM.dark } }),
      React.createElement('button', { onClick: () => setShowHint(!showHint), style: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, padding: 0, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', fontSize: 12.5, fontWeight: 600, color: CNSM.amber } },
        React.createElement(Icon, { name: 'sparkle', size: 13, color: CNSM.amber }), showHint ? t(data.hideExample) : t(data.showExample)),
      showHint && React.createElement('pre', { style: { margin: '8px 0 0', padding: '10px 14px', background: CNSM.boardBg, color: '#F4D9B5', borderRadius: 9, fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.5, whiteSpace: 'pre-wrap', overflowX: 'auto' } }, task.hint)
    ),
    // editor + preview
    React.createElement('div', { className: 'md-studio-split', style: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
      React.createElement('div', { style: { borderRight: `1px solid ${CNSM.warmBorder}`, display: 'flex', flexDirection: 'column' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', background: CNSM.boardBg } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A89B82' } }, t(data.editorLabel)),
          ok && React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4ADE80', fontWeight: 700 } }, React.createElement(Icon, { name: 'check', size: 12, color: '#4ADE80', strokeWidth: 3 }), t(data.detected))
        ),
        React.createElement('textarea', {
          value: text, onChange: (e) => { setText(e.target.value); setTried(false); }, spellCheck: false,
          placeholder: t(data.placeholder),
          style: { width: '100%', minHeight: 150, flex: 1, resize: 'vertical', border: 'none', outline: 'none', padding: '14px 16px', background: '#241D19', color: '#E8DFD0', fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: 1.6, boxSizing: 'border-box' }
        })
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', background: CNSM.warm } },
        React.createElement('div', { style: { padding: '9px 14px', background: CNSM.sand, borderBottom: `1px solid ${CNSM.warmBorder}` } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: CNSM.brown } }, t(data.previewLabel))),
        previewHtml
          ? React.createElement('div', { className: 'md-rendered', style: { padding: '14px 18px', flex: 1, overflow: 'auto' }, dangerouslySetInnerHTML: { __html: previewHtml } })
          : React.createElement('div', { style: { padding: '14px 18px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontSize: 13, color: CNSM.brownLight, fontStyle: 'italic', textAlign: 'center' } }, t(data.previewEmpty))
      )
    ),
    // feedback + actions
    React.createElement('div', { style: { padding: '14px 20px', borderTop: `1px solid ${CNSM.warmBorder}`, background: CNSM.parchment } },
      revealed
        ? React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', gap: 11, alignItems: 'flex-start', padding: '13px 16px', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 11, marginBottom: 13 } },
              React.createElement(Icon, { name: 'checkCircle', size: 19, color: '#22C55E', style: { flexShrink: 0, marginTop: 1 } }),
              React.createElement(RichText, { html: t(task.success), className: 'sandbox-feedback', style: { fontFamily: 'Montserrat', fontSize: 14, lineHeight: 1.55, color: '#15803D' } })),
            React.createElement('button', { onClick: advance, style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, border: 'none', cursor: 'pointer', background: CNSM.red, color: '#FEFCF9', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14.5, boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.35)' } },
              step < total - 1 ? t(data.next) : t(data.finishLabel), React.createElement(Icon, { name: 'arrowRight', size: 16, color: '#fff' }))
          )
        : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' } },
            React.createElement('button', { onClick: check, disabled: !text.trim(), style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, border: 'none', cursor: text.trim() ? 'pointer' : 'not-allowed', background: text.trim() ? CNSM.red : '#EEE6D7', color: text.trim() ? '#FEFCF9' : CNSM.brownLight, fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14.5, boxShadow: text.trim() ? 'inset 0 0 0 1px rgba(254,252,249,0.35)' : 'none' } },
              React.createElement(Icon, { name: 'check', size: 16, color: text.trim() ? '#fff' : CNSM.brownLight, strokeWidth: 2.5 }), t(data.validate)),
            tried && !ok && React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'Montserrat', fontSize: 13.5, color: CNSM.red } },
              React.createElement(Icon, { name: 'alert', size: 16, color: CNSM.red }), t(data.notYet))
          )
    )
  ));
}

Object.assign(window, { MarkdownSandbox, mdToHtml, mdValidate });
