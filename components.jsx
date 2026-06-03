/* Shared UI for the interactive Guide de conception.
   Exports to window at the bottom. CNSMDP Learning Lab design system. */

const CNSM = {
  red: '#9D0C15', redLight: '#B91C28', redDark: '#7A0A10', red50: '#FDF2F2', red100: '#FCE4E4',
  amber: '#C69B3A', bordeaux: '#7A1F2E',
  dark: '#2D1318', leather: '#3D3229',
  brown: '#80735D', brownLight: '#A89B82', brownDark: '#5C4A3A',
  cream: '#FAF9F5', warm: '#F4F1EB', sand: '#F5F0E8',
  parchment: '#FEFCF9', track: '#DDD5C8', warmBorder: '#D4C5B0',
  boardBg: '#2C2420', onDark: '#E8DFD0',
};

// ── Icon: Lucide-style minimal line set ─────────────────────────
function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.75, style }) {
  const S = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  const paths = {
    plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
    chevronRight: ['M9 18l6-6-6-6'],
    chevronLeft: ['M15 18l-6-6 6-6'],
    arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
    check: ['M20 6L9 17l-5-5'],
    checkCircle: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3'],
    circle: ['M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z'],
    lock: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
    menu: ['M3 6h18', 'M3 12h18', 'M3 18h18'],
    x: ['M18 6 6 18', 'M6 6l12 12'],
    globe: ['M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
    book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'],
    users: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
    user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
    film: ['M2 2h20v20H2z', 'M7 2v20', 'M17 2v20', 'M2 12h20', 'M2 7h5', 'M2 17h5', 'M17 17h5', 'M17 7h5'],
    image: ['M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M21 15l-5-5L5 21'],
    target: ['M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z', 'M12 18c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6z', 'M12 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'],
    scissors: ['M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M20 4 8.12 15.88', 'M14.47 14.48 20 20', 'M8.12 8.12 12 12'],
    puzzle: ['M19.4 13.4c.4 0 .7-.1 1-.4.5-.5.5-1.4 0-2-.3-.3-.6-.4-1-.4h-1V7.5c0-.8-.7-1.5-1.5-1.5H13V5c0-.4-.1-.7-.4-1-.5-.5-1.4-.5-2 0-.3.3-.4.6-.4 1v1H7.5C6.7 6 6 6.7 6 7.5V10H5c-.4 0-.7.1-1 .4-.5.5-.5 1.4 0 2 .3.3.6.4 1 .4h1v2.6c0 .8.7 1.4 1.5 1.4H10v1c0 .4.1.7.4 1 .5.5 1.4.5 2 0 .3-.3.4-.6.4-1v-1h2.6c.8 0 1.4-.7 1.4-1.5v-2.5z'],
    mic: ['M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z', 'M19 10v2a7 7 0 0 1-14 0v-2', 'M12 19v3'],
    play: ['M5 3l14 9-14 9V3z'],
    clock: ['M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z', 'M12 6v6l4 2'],
    feather: ['M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z', 'M16 8 2 22', 'M17.5 15H9'],
    layers: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
    sparkle: ['M12 3l1.9 5.8L20 10l-5.1 2.2L12 18l-1.9-5.8L5 10l5.1-1.2z'],
    alert: ['M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'],
    headphones: ['M3 18v-6a9 9 0 0 1 18 0v6', 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z', 'M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z'],
    quote: ['M3 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2c0 5-2 6-3 6z', 'M14 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2c0 5-2 6-3 6z'],
    flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  };
  const d = paths[name] || paths.circle;
  return React.createElement('svg', S, d.map((p, i) => React.createElement('path', { key: i, d: p })));
}

// ── HTML text helper (renders {{b}} markup) ─────────────────────
function RichText({ html, style, tag = 'div', className }) {
  return React.createElement(tag, { className, style, dangerouslySetInnerHTML: { __html: html } });
}

// ── Glyph marker: the circular symbolic badge ───────────────────
function GlyphBadge({ glyph, tone = 'red', size = 44 }) {
  const tones = {
    red: { bg: 'rgba(157,12,21,0.07)', fg: CNSM.red, br: 'rgba(157,12,21,0.18)' },
    amber: { bg: 'rgba(198,155,58,0.10)', fg: CNSM.amber, br: 'rgba(198,155,58,0.28)' },
    brown: { bg: 'rgba(128,115,93,0.10)', fg: CNSM.brownDark, br: 'rgba(128,115,93,0.22)' },
  };
  const tn = tones[tone] || tones.red;
  return React.createElement('div', {
    style: {
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: tn.bg, color: tn.fg, border: `1px solid ${tn.br}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif', fontSize: size * 0.42, fontWeight: 600, lineHeight: 1,
      boxShadow: 'inset 0 0 0 3px ' + CNSM.parchment + ', inset 0 0 0 4px ' + tn.bg,
    }
  }, glyph);
}

// ── Callout (TipTap-style) ──────────────────────────────────────
function Callout({ kind = 'note', title, children }) {
  const palette = {
    note: { fg: '#1E40AF', br: '#3B82F6', rgb: '59,130,246' },
    tip: { fg: '#15803D', br: '#22C55E', rgb: '34,197,94' },
    warning: { fg: '#C2410C', br: '#F59E0B', rgb: '245,158,11' },
    exercice: { fg: '#C2410C', br: '#F97316', rgb: '249,115,22' },
    important: { fg: CNSM.red, br: CNSM.red, rgb: '157,12,21' },
  };
  const p = palette[kind] || palette.note;
  return React.createElement('div', {
    style: {
      position: 'relative', background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`,
      borderRadius: 12, overflow: 'hidden', padding: '20px 24px 20px 28px', margin: '6px 0',
      boxShadow: `inset 0 0 0 3px ${CNSM.parchment}, inset 0 0 0 4px rgba(${p.rgb},0.22)`,
    }
  },
    React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: p.br } }),
    title && React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 11, color: p.fg, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 5 } }, title),
    React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.6, color: CNSM.leather } }, children)
  );
}

// ── Pill / chip ─────────────────────────────────────────────────
function Pill({ children, tone = 'brown', dot }) {
  const tones = {
    red: { fg: CNSM.red, bg: 'rgba(157,12,21,0.08)', br: 'rgba(157,12,21,0.22)' },
    amber: { fg: '#9A7726', bg: 'rgba(198,155,58,0.14)', br: 'rgba(198,155,58,0.4)' },
    brown: { fg: CNSM.brownDark, bg: 'rgba(128,115,93,0.1)', br: 'rgba(128,115,93,0.25)' },
  };
  const tn = tones[tone] || tones.brown;
  return React.createElement('span', {
    style: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 11px', background: tn.bg, color: tn.fg, border: `1px solid ${tn.br}`, borderRadius: 9999, fontFamily: 'Montserrat', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }
  }, dot && React.createElement('span', { style: { width: 6, height: 6, borderRadius: 9999, background: tn.fg } }), children);
}

// ── Quiz checkpoint ─────────────────────────────────────────────
function Quiz({ data, lang, label, onAnswered }) {
  const [picked, setPicked] = React.useState(null);
  const [revealed, setRevealed] = React.useState(false);
  const t = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const opts = t(data.options);
  const isCorrect = revealed && picked === data.answer;

  return React.createElement('div', {
    style: { background: 'linear-gradient(180deg, #FFFDFA, #FBF7F0)', border: `1px solid ${CNSM.warmBorder}`, borderRadius: 16, padding: '22px 24px', boxShadow: 'var(--shadow-sm)' }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
      React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CNSM.amber, fontWeight: 700 } }, label),
      React.createElement('span', { style: { flex: 1, height: 1, background: CNSM.warmBorder } })
    ),
    React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 600, fontSize: 17, color: CNSM.dark, lineHeight: 1.45, marginBottom: 14 } }, t(data.q)),
    React.createElement('div', { style: { display: 'grid', gap: 8 } },
      opts.map((opt, i) => {
        const chosen = picked === i;
        const showCorrect = revealed && i === data.answer;
        const showWrong = revealed && chosen && i !== data.answer;
        let bg = CNSM.parchment, bd = CNSM.warmBorder, fg = CNSM.leather;
        if (showCorrect) { bg = 'rgba(34,197,94,0.08)'; bd = '#22C55E'; fg = '#15803D'; }
        else if (showWrong) { bg = 'rgba(239,68,68,0.06)'; bd = '#EF4444'; fg = '#B91C1C'; }
        else if (chosen) { bg = CNSM.red50; bd = CNSM.red; }
        return React.createElement('button', {
          key: i, disabled: revealed,
          onClick: () => setPicked(i),
          style: {
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', width: '100%',
            padding: '13px 16px', borderRadius: 10, border: `1.5px solid ${bd}`, background: bg,
            fontFamily: 'Montserrat', fontSize: 14.5, color: fg, cursor: revealed ? 'default' : 'pointer',
            transition: 'all 160ms',
          }
        },
          React.createElement('span', { style: { width: 22, height: 22, flexShrink: 0, borderRadius: '50%', border: `1.5px solid ${chosen || showCorrect ? bd : CNSM.warmBorder}`, background: (chosen || showCorrect) ? bd : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            (showCorrect || (chosen && !revealed)) && React.createElement(Icon, { name: 'check', size: 13, color: showCorrect ? '#fff' : (chosen ? '#fff' : CNSM.red), strokeWidth: 3 }),
            showWrong && React.createElement(Icon, { name: 'x', size: 13, color: '#fff', strokeWidth: 3 })
          ),
          React.createElement('span', null, opt)
        );
      })
    ),
    React.createElement('div', { style: { marginTop: 14, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' } },
      !revealed
        ? React.createElement('button', {
            disabled: picked === null,
            onClick: () => { setRevealed(true); onAnswered && onAnswered(picked === data.answer); },
            style: {
              padding: '10px 20px', borderRadius: 9, border: 'none', cursor: picked === null ? 'not-allowed' : 'pointer',
              background: picked === null ? '#EEE6D7' : CNSM.red, color: picked === null ? CNSM.brownLight : '#FEFCF9',
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: 13.5, letterSpacing: '0.02em',
              boxShadow: picked === null ? 'none' : 'inset 0 0 0 1px rgba(254,252,249,0.35)',
            }
          }, label === 'Quiz' || true ? t({ fr: 'Vérifier', en: 'Check' }) : '')
        : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 13, color: isCorrect ? '#15803D' : CNSM.red } },
            React.createElement(Icon, { name: isCorrect ? 'checkCircle' : 'alert', size: 17, color: isCorrect ? '#22C55E' : CNSM.red }),
            isCorrect ? t({ fr: 'Bonne réponse', en: 'Correct' }) : t({ fr: 'Pas tout à fait', en: 'Not quite' })
          )
    ),
    revealed && React.createElement('div', {
      style: { marginTop: 12, padding: '12px 16px', background: CNSM.sand, borderRadius: 10, fontFamily: 'Montserrat', fontSize: 13.5, lineHeight: 1.55, color: CNSM.brownDark }
    }, t(data.explain))
  );
}

Object.assign(window, { CNSM, Icon, RichText, GlyphBadge, Callout, Pill, Quiz });
