/* Interactive widgets for the Guide de conception course.
   Depends on globals: React, CNSM, Icon, RichText, GlyphBadge, Pill. */

// ── 1. Compare toggle: Informer vs Former ───────────────────────
function CompareToggle({ data, lang }) {
  const t = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const [side, setSide] = React.useState('b'); // default highlight "Former"
  const cards = [
    { key: 'a', tone: 'brown', icon: 'play', d: data.a },
    { key: 'b', tone: 'red', icon: 'feather', d: data.b },
  ];
  return React.createElement('div', { style: { margin: '8px 0' } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18, color: CNSM.dark } }, t(data.title)),
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 13.5, color: CNSM.brown, marginTop: 2 } }, t(data.sub))
      ),
      React.createElement('div', { style: { display: 'inline-flex', background: CNSM.sand, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 9999, padding: 3 } },
        cards.map((c) => React.createElement('button', {
          key: c.key, onClick: () => setSide(c.key),
          style: {
            padding: '7px 16px', borderRadius: 9999, border: 'none', cursor: 'pointer',
            fontFamily: 'Montserrat', fontWeight: 600, fontSize: 12.5,
            background: side === c.key ? (c.key === 'b' ? CNSM.red : CNSM.brownDark) : 'transparent',
            color: side === c.key ? '#FEFCF9' : CNSM.brown, transition: 'all 200ms',
          }
        }, t(c.d.label)))
      )
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 } },
      cards.map((c) => {
        const active = side === c.key;
        const isFormer = c.key === 'b';
        return React.createElement('div', {
          key: c.key,
          style: {
            position: 'relative', borderRadius: 16, padding: '20px 22px', transition: 'all 250ms',
            background: active ? (isFormer ? 'linear-gradient(165deg,#9D0C15,#7A0A10)' : 'linear-gradient(165deg,#5C4A3A,#3D3229)') : CNSM.parchment,
            border: `1px solid ${active ? 'transparent' : CNSM.warmBorder}`,
            color: active ? '#FEFCF9' : CNSM.leather,
            boxShadow: active ? 'var(--shadow-md)' : 'none',
            opacity: active ? 1 : 0.7, transform: active ? 'translateY(-2px)' : 'none',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 } },
            React.createElement('div', { style: { width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'rgba(255,255,255,0.14)' : CNSM.sand } },
              React.createElement(Icon, { name: c.icon, size: 19, color: active ? '#fff' : CNSM.brown })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 17 } }, t(c.d.label)),
              React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.8, marginTop: 2 } }, t(c.d.tag))
            )
          ),
          React.createElement('div', { style: { display: 'grid', gap: 9 } },
            t(c.d.points).map((pt, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 9, alignItems: 'flex-start', fontFamily: 'Montserrat', fontSize: 13.5, lineHeight: 1.45 } },
              React.createElement('span', { style: { marginTop: 6, width: 5, height: 5, borderRadius: 9999, flexShrink: 0, background: active ? (isFormer ? '#F0C9A0' : CNSM.amber) : CNSM.warmBorder } }),
              React.createElement('span', { style: { opacity: active ? 0.95 : 0.85 } }, pt)
            ))
          )
        );
      })
    )
  );
}

// ── 2. Who-does-what frieze (Expert ↔ IP) ───────────────────────
function WhoDoesWhat({ items, lang, title, sub }) {
  const t = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const [step, setStep] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setStep((s) => (s + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length, paused]);
  const ownerMeta = {
    expert: { label: t({ fr: 'Expert', en: 'Expert' }), color: CNSM.red, icon: 'user' },
    ip: { label: t({ fr: 'Ingénieur pédagogique', en: 'Learning engineer' }), color: CNSM.amber, icon: 'layers' },
    both: { label: t({ fr: 'Ensemble', en: 'Together' }), color: CNSM.brownDark, icon: 'users' },
  };
  return React.createElement('div', null,
    React.createElement('div', { style: { marginBottom: 16 } },
      React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18, color: CNSM.dark } }, title),
      React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 13.5, color: CNSM.brown, marginTop: 2 } }, sub)
    ),
    // rail
    React.createElement('div', { style: { position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 12 } },
      React.createElement('div', { style: { position: 'absolute', top: 21, left: '8%', right: '8%', height: 2, background: CNSM.warmBorder, zIndex: 0 } }),
      items.map((it, i) => {
        const m = ownerMeta[it.owner];
        const active = i === step;
        return React.createElement('button', {
          key: i, onClick: () => { setStep(i); setPaused(true); },
          style: { position: 'relative', zIndex: 1, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', padding: 0 }
        },
          React.createElement('div', {
            style: {
              width: 44, height: 44, margin: '0 auto', borderRadius: '50%',
              background: active ? m.color : CNSM.parchment,
              border: `2px solid ${active ? m.color : CNSM.warmBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 250ms', transform: active ? 'scale(1.08)' : 'scale(1)',
              boxShadow: active ? '0 4px 14px rgba(0,0,0,0.12)' : 'none',
            }
          }, React.createElement(Icon, { name: m.icon, size: 20, color: active ? '#fff' : CNSM.brownLight })),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: active ? m.color : CNSM.brownLight, marginTop: 8, fontWeight: 700 } }, m.label)
        );
      })
    ),
    // active detail
    React.createElement('div', {
      key: step,
      style: { marginTop: 18, padding: '20px 22px', borderRadius: 14, background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, animation: 'fadeUp 360ms var(--ease-out)' }
    },
      (() => {
        const it = items[step]; const m = ownerMeta[it.owner];
        return React.createElement(React.Fragment, null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
            React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18, color: CNSM.dark } }, t(it.title)),
            React.createElement(Pill, { tone: it.owner === 'expert' ? 'red' : it.owner === 'ip' ? 'amber' : 'brown', dot: true }, t(it.by))
          ),
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.6, color: CNSM.leather } }, t(it.body))
        );
      })()
    )
  );
}

// ── 3. Flip cards: the 5 deliverables ───────────────────────────
function FlipCard({ card, lang, index, flipped, onFlip }) {
  const t = (o) => (o && typeof o === 'object' ? o[lang] : o);
  return React.createElement('div', {
    onClick: onFlip,
    style: { perspective: 1200, cursor: 'pointer', height: 250 }
  },
    React.createElement('div', {
      style: {
        position: 'relative', width: '100%', height: '100%', transition: 'transform 600ms var(--ease-std)',
        transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none',
      }
    },
      // front
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          opacity: flipped ? 0 : 1, transition: 'opacity 0s linear 300ms',
          borderRadius: 16, background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`,
          padding: '22px 22px', display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 30, color: CNSM.red, letterSpacing: '-0.03em', lineHeight: 1 } }, card.glyph),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: CNSM.brownLight, marginTop: 4 } }, 'Livrable')
        ),
        React.createElement('div', { style: { marginTop: 'auto' } },
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18, color: CNSM.dark, lineHeight: 1.25 } }, t(card.title)),
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 13, color: CNSM.brown, marginTop: 4 } }, t(card.short))
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: CNSM.amber, fontWeight: 700 } },
          React.createElement(Icon, { name: 'arrowRight', size: 13, color: CNSM.amber }),
          t({ fr: 'Retourner', en: 'Flip' })
        )
      ),
      // back
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          opacity: flipped ? 1 : 0, transition: 'opacity 0s linear 300ms',
          transform: 'rotateY(180deg)', borderRadius: 16,
          background: 'linear-gradient(165deg,#3D3229,#2C2420)', border: '1px solid #2C2420',
          padding: '20px 22px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }
      },
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14.5, color: '#F0C9A0', marginBottom: 8 } }, t(card.title)),
        React.createElement(RichText, { html: t(card.body), className: 'flip-back-body no-sb', style: { fontFamily: 'Montserrat', fontSize: 12.8, lineHeight: 1.5, color: '#E8DFD0', flex: 1, overflow: 'auto' } })
      )
    )
  );
}

function FlipCardGrid({ cards, lang }) {
  const [flipped, setFlipped] = React.useState({});
  return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 } },
    cards.map((c, i) => React.createElement(FlipCard, {
      key: i, card: c, lang, index: i, flipped: !!flipped[i],
      onFlip: () => setFlipped((f) => ({ ...f, [i]: !f[i] })),
    }))
  );
}

// ── 4. Word-volume simulator (slider) ───────────────────────────
function WordSimulator({ lang }) {
  const t = (o) => o[lang];
  const [min, setMin] = React.useState(60); // target minutes, 10..1200
  const lo = Math.round(min * 90);
  const hi = Math.round(min * 120);
  const readLo = Math.round(min * 90 / 150);
  const readHi = Math.round(min * 120 / 150);
  const fmt = (n) => n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US');
  const hh = Math.floor(min / 60), mm = min % 60;
  const durLabel = hh > 0 ? `${hh}h${mm > 0 ? String(mm).padStart(2, '0') : ''}` : `${mm} min`;
  // closest format
  let fmtLabel;
  if (min <= 20) fmtLabel = t({ fr: '1 leçon courte', en: '1 short lesson' });
  else if (min <= 45) fmtLabel = t({ fr: '1 chapitre', en: '1 chapter' });
  else if (min <= 120) fmtLabel = t({ fr: '1 partie', en: '1 part' });
  else if (min <= 300) fmtLabel = t({ fr: 'Un cours complet', en: 'A full course' });
  else fmtLabel = t({ fr: 'Un cursus en plusieurs parties', en: 'A multi-part curriculum' });
  const pct = ((min - 10) / (1200 - 10)) * 100;

  const Stat = ({ k, v, sub, accent }) => React.createElement('div', {
    style: { background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 12, padding: '14px 16px' }
  },
    React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: CNSM.brown } }, k),
    React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 23, color: accent || CNSM.dark, marginTop: 4, letterSpacing: '-0.02em' } }, v),
    React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 11.5, color: CNSM.brown, marginTop: 3 } }, sub)
  );

  return React.createElement('div', {
    style: { background: 'linear-gradient(180deg,#FFFDFA,#FAF6EF)', border: `1px solid ${CNSM.warmBorder}`, borderRadius: 18, padding: '24px 26px', boxShadow: 'var(--shadow-sm)' }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 } },
      React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CNSM.brown } }, t({ fr: 'Durée pédagogique cible', en: 'Target learning duration' })),
      React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 26, color: CNSM.red, letterSpacing: '-0.02em' } }, durLabel)
    ),
    // slider
    React.createElement('div', { style: { position: 'relative', padding: '10px 0 4px' } },
      React.createElement('input', {
        type: 'range', min: 10, max: 1200, step: 5, value: min,
        onChange: (e) => setMin(parseInt(e.target.value, 10)),
        className: 'cnsm-range', style: { width: '100%' }
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: CNSM.brownLight, letterSpacing: '0.1em', marginTop: 2 } },
        ['10 min', '2h', '5h', '10h', '20h'].map((l, i) => React.createElement('span', { key: i }, l))
      )
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 12, marginTop: 18 } },
      React.createElement(Stat, { k: t({ fr: 'Script brut conseillé', en: 'Suggested raw script' }), v: `${fmt(lo)}–${fmt(hi)}`, sub: t({ fr: 'mots · 90 à 120 mots/min', en: 'words · 90 to 120 words/min' }), accent: CNSM.red }),
      React.createElement(Stat, { k: t({ fr: 'Temps de lecture du script', en: 'Script reading time' }), v: `${readLo}–${readHi} min`, sub: t({ fr: 'lecture ≈ 150 mots/min', en: 'reading ≈ 150 words/min' }) }),
      React.createElement(Stat, { k: t({ fr: 'Format le plus proche', en: 'Closest format' }), v: fmtLabel, sub: t({ fr: 'repère de structuration', en: 'structuring benchmark' }), accent: CNSM.amber })
    )
  );
}

// ── 4b. Fill-in: enter duration → words ─────────────────────────
function WordFillIn({ data, lang }) {
  const t = (o) => (o && typeof o === 'object' && ('fr' in o || 'en' in o) ? o[lang] : o);
  const [hrs, setHrs] = React.useState('');
  const [mins, setMins] = React.useState('');
  const h = Math.max(0, parseInt(hrs, 10) || 0);
  const m = Math.max(0, parseInt(mins, 10) || 0);
  const totalMin = h * 60 + m;
  const has = totalMin > 0;
  const lo = Math.round(totalMin * 90);
  const hi = Math.round(totalMin * 120);
  const fmt = (n) => n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US');
  const pages = (((lo + hi) / 2) / 450); // ~450 words / page
  const read = Math.round((lo + hi) / 2 / 150);
  const breakdown = t(data.breakdown).replace('{pages}', pages.toFixed(pages < 10 ? 1 : 0)).replace('{read}', read);

  const numInput = (val, set, ph, max) => React.createElement('input', {
    type: 'number', min: 0, max, value: val, placeholder: ph, className: 'no-spin',
    onChange: (e) => set(e.target.value),
    style: { width: 64, textAlign: 'center', padding: '8px 6px', borderRadius: 10, border: `1.5px solid ${has ? CNSM.red : CNSM.warmBorder}`, background: CNSM.parchment, outline: 'none', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 19, color: CNSM.dark, MozAppearance: 'textfield' }
  });

  return React.createElement('div', {
    style: { borderRadius: 18, overflow: 'hidden', border: `1px solid ${CNSM.warmBorder}`, background: 'linear-gradient(180deg,#FFFDFA,#FAF6EF)', boxShadow: 'var(--shadow-sm)' }
  },
    React.createElement('div', { style: { padding: '22px 26px 18px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 } },
        React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 9999, background: 'rgba(157,12,21,0.07)', border: '1px solid rgba(157,12,21,0.18)', color: CNSM.red, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' } },
          React.createElement(Icon, { name: 'feather', size: 13, color: CNSM.red }), t(data.badge)),
        React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 17, color: CNSM.dark } }, t(data.title))
      ),
      React.createElement('p', { style: { fontFamily: 'Montserrat', fontSize: 14.5, lineHeight: 1.6, color: CNSM.leather, margin: '0 0 18px' } }, t(data.intro)),
      // cloze sentence
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontFamily: 'Montserrat', fontSize: 17, color: CNSM.brownDark } },
        React.createElement('span', null, t(data.pre)),
        numInput(hrs, setHrs, '0', 99),
        React.createElement('span', { style: { fontWeight: 600, color: CNSM.brown } }, t(data.hUnit)),
        numInput(mins, setMins, '00', 59),
        React.createElement('span', { style: { fontWeight: 600, color: CNSM.brown } }, t(data.mUnit))
      )
    ),
    // result panel
    React.createElement('div', { style: { padding: '18px 26px', borderTop: `1px solid ${CNSM.warmBorder}`, background: has ? 'rgba(157,12,21,0.04)' : CNSM.sand, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', transition: 'background 200ms' } },
      React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 15, color: CNSM.brown } }, t(data.mid)),
      has
        ? React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 10 } },
              React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 30, color: CNSM.red, letterSpacing: '-0.02em' } }, `${fmt(lo)}–${fmt(hi)}`),
              React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 14, color: CNSM.brownDark, fontWeight: 600 } }, t(data.resultUnit))
            ),
            React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: CNSM.brown, marginTop: 4, letterSpacing: '0.02em' } }, breakdown)
          )
        : React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 18, fontStyle: 'italic', color: CNSM.brownLight } }, t(data.empty))
    ),
    React.createElement('div', { style: { padding: '10px 26px 16px', fontFamily: 'Montserrat', fontSize: 12.5, color: CNSM.brown } }, t(data.detail))
  );
}

// ── 5. Escales journey: 6 collaboration steps ───────────────────
function EscalesJourney({ steps, lang }) {
  const t = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const [open, setOpen] = React.useState(0);
  const ownerTone = { expert: 'red', ip: 'amber', both: 'brown' };
  return React.createElement('div', { style: { display: 'grid', gap: 10 } },
    steps.map((s, i) => {
      const isOpen = open === i;
      const tone = ownerTone[s.owner];
      const accent = s.owner === 'expert' ? CNSM.red : s.owner === 'ip' ? CNSM.amber : CNSM.brownDark;
      return React.createElement('div', {
        key: i,
        style: {
          position: 'relative', borderRadius: 14, overflow: 'hidden',
          background: CNSM.parchment, border: `1px solid ${isOpen ? 'rgba(128,115,93,0.4)' : CNSM.warmBorder}`,
          boxShadow: isOpen ? 'var(--shadow-md)' : 'none', transition: 'all 220ms',
        }
      },
        React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: isOpen ? accent : 'transparent', transition: 'all 220ms' } }),
        React.createElement('button', {
          onClick: () => setOpen(isOpen ? -1 : i),
          style: { width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 18px 16px 22px', display: 'flex', alignItems: 'center', gap: 14 }
        },
          React.createElement('div', {
            style: { width: 38, height: 38, flexShrink: 0, borderRadius: 10, background: isOpen ? accent : CNSM.sand, color: isOpen ? '#fff' : CNSM.brown, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 15, transition: 'all 220ms' }
          }, String(i + 1).padStart(2, '0')),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
              React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 16, color: CNSM.dark } }, t(s.title)),
              React.createElement(Pill, { tone, dot: true }, t(s.by))
            )
          ),
          React.createElement('span', { style: { transition: 'transform 220ms', transform: isOpen ? 'rotate(90deg)' : 'none', flexShrink: 0 } },
            React.createElement(Icon, { name: 'chevronRight', size: 18, color: CNSM.brownLight })
          )
        ),
        React.createElement('div', {
          style: { maxHeight: isOpen ? 160 : 0, overflow: 'hidden', transition: 'max-height 300ms var(--ease-std)' }
        },
          React.createElement('div', { style: { padding: '0 18px 18px 74px', fontFamily: 'Montserrat', fontSize: 14.5, lineHeight: 1.6, color: CNSM.leather } }, t(s.body))
        )
      );
    })
  );
}

// ── 5b. Workload bars ───────────────────────────────────────────
function WorkloadBars({ data, lang }) {
  const t = (o) => o[lang];
  const total = data.reduce((a, b) => a + b.h, 0);
  const max = Math.max(...data.map((d) => d.h));
  return React.createElement('div', {
    style: { background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 16, padding: '22px 24px' }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 } },
      React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CNSM.brown } }, t({ fr: 'Votre temps · cours de 4–5 h', en: 'Your time · 4–5 h course' })),
      React.createElement('div', null,
        React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 26, color: CNSM.red } }, `~${total}h`),
        React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 12, color: CNSM.brown, marginLeft: 6 } }, t({ fr: 'au total', en: 'total' }))
      )
    ),
    React.createElement('div', { style: { display: 'grid', gap: 11 } },
      data.map((d, i) => React.createElement('div', { key: i, style: { display: 'grid', gridTemplateColumns: '130px 1fr 38px', alignItems: 'center', gap: 12 } },
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 13, color: CNSM.brownDark, fontWeight: 500 } }, t(d.label)),
        React.createElement('div', { style: { height: 12, background: CNSM.sand, borderRadius: 9999, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: `${(d.h / max) * 100}%`, borderRadius: 9999, background: i === 1 ? 'linear-gradient(90deg,#9D0C15,#B91C28)' : CNSM.amber, transition: 'width 700ms var(--ease-out)' } })
        ),
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: CNSM.brownDark, textAlign: 'right', fontWeight: 700 } }, `${d.h}h`)
      ))
    )
  );
}

// ── 6. Checklist (persisted) ────────────────────────────────────
function Checklist({ items, lang, doneMsg, value, onChange }) {
  const toggle = (i) => {
    const next = { ...value, [i]: !value[i] };
    onChange(next);
  };
  const doneCount = items.filter((_, i) => value[i]).length;
  const allDone = doneCount === items.length;
  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'grid', gap: 8 } },
      items.map((label, i) => {
        const checked = !!value[i];
        return React.createElement('button', {
          key: i, onClick: () => toggle(i),
          style: {
            display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', width: '100%',
            padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
            background: checked ? 'rgba(34,197,94,0.06)' : CNSM.parchment,
            border: `1px solid ${checked ? 'rgba(34,197,94,0.4)' : CNSM.warmBorder}`,
            transition: 'all 180ms',
          }
        },
          React.createElement('span', {
            style: {
              width: 24, height: 24, flexShrink: 0, borderRadius: 7,
              border: `1.5px solid ${checked ? '#22C55E' : CNSM.warmBorder}`,
              background: checked ? '#22C55E' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 180ms',
            }
          }, checked && React.createElement(Icon, { name: 'check', size: 15, color: '#fff', strokeWidth: 3 })),
          React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 14.5, color: checked ? CNSM.brown : CNSM.leather, textDecoration: checked ? 'line-through' : 'none', textDecorationColor: 'rgba(128,115,93,0.5)' } }, label)
        );
      })
    ),
    React.createElement('div', { style: { marginTop: 14, display: 'flex', alignItems: 'center', gap: 12 } },
      React.createElement('div', { style: { flex: 1, height: 8, background: CNSM.sand, borderRadius: 9999, overflow: 'hidden' } },
        React.createElement('div', { style: { height: '100%', width: `${(doneCount / items.length) * 100}%`, background: allDone ? '#22C55E' : CNSM.amber, borderRadius: 9999, transition: 'width 300ms' } })
      ),
      React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: CNSM.brownDark, fontWeight: 700 } }, `${doneCount}/${items.length}`)
    ),
    allDone && React.createElement('div', { style: { marginTop: 12, display: 'flex', alignItems: 'center', gap: 9, padding: '12px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 10, animation: 'fadeUp 360ms var(--ease-out)' } },
      React.createElement(Icon, { name: 'checkCircle', size: 19, color: '#22C55E' }),
      React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14, color: '#15803D' } }, doneMsg)
    )
  );
}

Object.assign(window, { CompareToggle, WhoDoesWhat, FlipCardGrid, WordSimulator, WordFillIn, EscalesJourney, WorkloadBars, Checklist });

// ── Open question: list 3 resources (gates next chapter) ────────
function OpenQuestion({ data, lang, value, onChange }) {
  const t = (o) => (o && typeof o === 'object' && ('fr' in o || 'en' in o) ? o[lang] : o);
  const vals = [0, 1, 2].map((i) => (value && value[i]) || '');
  const MIN = 8;
  const isFilled = (s) => s.trim().length >= MIN;
  const doneCount = vals.filter(isFilled).length;
  const allDone = doneCount >= 1;
  const ph = t(data.placeholders);
  const set = (i, v) => { const next = [...vals]; next[i] = v; onChange(next); };

  return React.createElement('div', {
    style: { borderRadius: 18, overflow: 'hidden', border: `1px solid ${allDone ? 'rgba(34,197,94,0.4)' : CNSM.warmBorder}`, background: 'linear-gradient(180deg,#FFFDFA,#FAF6EF)', boxShadow: 'var(--shadow-sm)', transition: 'border-color 240ms' }
  },
    React.createElement('div', { style: { padding: '22px 24px 6px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 } },
        React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 9999, background: 'rgba(198,155,58,0.14)', border: '1px solid rgba(198,155,58,0.4)', color: '#9A7726', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' } },
          React.createElement(Icon, { name: 'globe', size: 13, color: '#9A7726' }), t(data.badge))
      ),
      React.createElement('h3', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 21, color: CNSM.dark, letterSpacing: '-0.02em', margin: '0 0 8px' } }, t(data.title)),
      React.createElement(RichText, { html: t(data.intro), style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.62, color: CNSM.leather, margin: '0 0 4px' } })
    ),
    React.createElement('div', { style: { padding: '14px 24px 6px', display: 'grid', gap: 12 } },
      [0, 1, 2].map((i) => {
        const filled = isFilled(vals[i]);
        return React.createElement('div', { key: i, style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
          React.createElement('span', { style: { width: 30, height: 30, flexShrink: 0, marginTop: 6, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: filled ? '#22C55E' : CNSM.sand, color: filled ? '#fff' : CNSM.brown, border: `1px solid ${filled ? '#22C55E' : CNSM.warmBorder}`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 13, transition: 'all 200ms' } },
            filled ? React.createElement(Icon, { name: 'check', size: 15, color: '#fff', strokeWidth: 3 }) : (i + 1)),
          React.createElement('textarea', {
            value: vals[i], onChange: (e) => set(i, e.target.value), rows: 2, spellCheck: true,
            placeholder: ph[i],
            style: { flex: 1, resize: 'vertical', minHeight: 52, padding: '11px 14px', borderRadius: 11, border: `1.5px solid ${filled ? 'rgba(34,197,94,0.45)' : CNSM.warmBorder}`, background: filled ? 'rgba(34,197,94,0.05)' : CNSM.parchment, outline: 'none', fontFamily: 'Montserrat', fontSize: 14, lineHeight: 1.5, color: CNSM.leather, boxSizing: 'border-box', transition: 'all 180ms' }
          })
        );
      })
    ),
    React.createElement('div', { style: { padding: '8px 24px 20px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' } },
      React.createElement('div', { style: { flex: 1, minWidth: 120, height: 8, background: CNSM.sand, borderRadius: 9999, overflow: 'hidden' } },
        React.createElement('div', { style: { height: '100%', width: `${(doneCount / 3) * 100}%`, background: allDone ? '#22C55E' : CNSM.amber, borderRadius: 9999, transition: 'width 300ms' } })),
      React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: CNSM.brownDark, fontWeight: 700 } }, `${doneCount}/3 ${t(data.progress)}`)
    ),
    React.createElement('div', { style: { padding: '0 24px 20px' } },
      allDone
        ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, padding: '12px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 11, animation: 'fadeUp 360ms var(--ease-out)' } },
            React.createElement(Icon, { name: 'checkCircle', size: 18, color: '#22C55E' }),
            React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14, color: '#15803D' } }, t(data.success)))
        : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, padding: '12px 16px', background: CNSM.sand, border: `1px dashed ${CNSM.warmBorder}`, borderRadius: 11 } },
            React.createElement(Icon, { name: 'lock', size: 16, color: CNSM.brown }),
            React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 13.5, color: CNSM.brownDark } }, t(data.lockedHint)))
    )
  );
}

Object.assign(window, { OpenQuestion });

// ── 7. Markdown Studio: one source → many formats ───────────────
function MarkdownStudio({ data, lang }) {
  const t = (o) => (o && typeof o === 'object' && ('fr' in o || 'en' in o) ? o[lang] : o);
  const [fmt, setFmt] = React.useState('web');
  const src = t(data.mdSource);
  const content = t(data.mdContent);
  const active = data.mdFormats.find((f) => f.id === fmt);

  // syntax highlight a markdown line
  const mdLine = (ln, i) => {
    const colors = { sym: '#C69B3A', text: '#E8DFD0', muted: '#A89B82', link: '#7FB0E0' };
    let el;
    if (ln.t === 'h1') el = React.createElement('span', null, React.createElement('span', { style: { color: colors.sym } }, '# '), React.createElement('span', { style: { color: '#F4D9B5', fontWeight: 700 } }, ln.md.slice(2)));
    else if (ln.t === 'li') el = React.createElement('span', null, React.createElement('span', { style: { color: colors.sym } }, '- '), React.createElement('span', { style: { color: colors.text } }, ln.md.slice(2)));
    else if (ln.t === 'quote') el = React.createElement('span', { style: { color: colors.muted, fontStyle: 'italic' } }, React.createElement('span', { style: { color: colors.sym } }, '> '), ln.md.slice(2));
    else if (ln.t === 'media') el = React.createElement('span', { style: { color: colors.link } }, ln.md);
    else {
      // bold ** **
      const parts = ln.md.split(/(\*\*[^*]+\*\*)/g);
      el = React.createElement('span', { style: { color: colors.text } }, parts.map((p, j) => /^\*\*.+\*\*$/.test(p)
        ? React.createElement('span', { key: j }, React.createElement('span', { style: { color: colors.sym } }, '**'), React.createElement('span', { style: { color: '#fff', fontWeight: 700 } }, p.slice(2, -2)), React.createElement('span', { style: { color: colors.sym } }, '**'))
        : React.createElement('span', { key: j }, p)));
    }
    return React.createElement('div', { key: i, style: { display: 'flex', gap: 14, padding: '2px 0' } },
      React.createElement('span', { style: { color: 'rgba(168,155,130,0.4)', userSelect: 'none', width: 16, textAlign: 'right', flexShrink: 0 } }, i + 1),
      React.createElement('span', null, el)
    );
  };

  return React.createElement('div', {
    style: { borderRadius: 18, overflow: 'hidden', border: `1px solid ${CNSM.warmBorder}`, background: CNSM.cream, boxShadow: 'var(--shadow-sm)' }
  },
    // format selector
    React.createElement('div', { style: { padding: '16px 18px 12px', borderBottom: `1px solid ${CNSM.warmBorder}` } },
      React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: CNSM.brown, marginBottom: 11 } }, t(data.mdStudioHint)),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 7 } },
        data.mdFormats.map((f) => {
          const on = f.id === fmt;
          return React.createElement('button', {
            key: f.id, onClick: () => setFmt(f.id),
            style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 9999, cursor: 'pointer', border: `1px solid ${on ? CNSM.red : CNSM.warmBorder}`, background: on ? CNSM.red : CNSM.parchment, color: on ? '#FEFCF9' : CNSM.brownDark, fontFamily: 'Montserrat', fontWeight: 600, fontSize: 13, transition: 'all 160ms' }
          },
            React.createElement(Icon, { name: f.icon, size: 14, color: on ? '#fff' : CNSM.red }),
            t(f.label)
          );
        })
      )
    ),
    // split: source + rendered
    React.createElement('div', { className: 'md-studio-split', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 } },
      // left — markdown source
      React.createElement('div', { style: { background: CNSM.boardBg, padding: '16px 18px', borderRight: `1px solid ${CNSM.warmBorder}` } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          React.createElement('span', { style: { width: 26, height: 26, borderRadius: 7, background: 'rgba(244,217,181,0.12)', color: '#F4D9B5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12 } }, 'M↓'),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A89B82' } }, t(data.mdSourceLabel))
        ),
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7 } }, src.map(mdLine)),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' } },
          t(data.mdSyntaxLegend).map((s, i) => React.createElement('span', { key: i, style: { display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#A89B82' } },
            React.createElement('span', { style: { color: '#C69B3A' } }, s[0]),
            React.createElement('span', null, s[1])
          ))
        )
      ),
      // right — rendered medium
      React.createElement('div', { style: { background: CNSM.warm, padding: 16, display: 'flex', flexDirection: 'column' } },
        React.createElement('div', { key: fmt, style: { flex: 1, animation: 'fadeUp 320ms var(--ease-out)' } },
          React.createElement(MediumPreview, { format: fmt, content, lang })
        )
      )
    ),
    // explanation
    React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '15px 20px', borderTop: `1px solid ${CNSM.warmBorder}`, background: CNSM.parchment } },
      React.createElement('div', { style: { width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: CNSM.sand, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(Icon, { name: active.icon, size: 17, color: CNSM.red })),
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 13.5, color: CNSM.dark, marginBottom: 2 } }, t(active.label)),
        React.createElement(RichText, { html: t(active.why), style: { fontFamily: 'Montserrat', fontSize: 13.5, lineHeight: 1.55, color: CNSM.leather } })
      )
    )
  );
}

// rendered illustration of the same content per medium
function MediumPreview({ format, content, lang }) {
  const c = content;
  const card = (children, extra) => React.createElement('div', { style: { borderRadius: 12, overflow: 'hidden', height: '100%', minHeight: 256, ...extra } }, children);

  if (format === 'web') {
    return card(React.createElement('div', { style: { background: '#fff', height: '100%' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px', background: '#F3F1EC', borderBottom: '1px solid #E3DED4' } },
        ['#E06C5E', '#E0B44E', '#6FAE66'].map((cl, i) => React.createElement('span', { key: i, style: { width: 9, height: 9, borderRadius: '50%', background: cl } })),
        React.createElement('span', { style: { marginLeft: 8, flex: 1, height: 16, borderRadius: 9999, background: '#fff', border: '1px solid #E3DED4', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#9B8F7C', display: 'flex', alignItems: 'center', padding: '0 9px' } }, 'campus.cnsmdp · web')),
      React.createElement('div', { style: { padding: '16px 18px' } },
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 19, color: CNSM.dark, letterSpacing: '-0.02em' } }, c.title),
        React.createElement('p', { style: { fontFamily: 'Montserrat', fontSize: 13, lineHeight: 1.55, color: CNSM.leather, margin: '8px 0' } }, c.body),
        React.createElement('ul', { style: { margin: '6px 0', paddingLeft: 0, listStyle: 'none' } }, c.list.map((l, i) => React.createElement('li', { key: i, style: { display: 'flex', gap: 8, fontFamily: 'Montserrat', fontSize: 13, color: CNSM.leather, padding: '2px 0' } }, React.createElement('span', { style: { color: CNSM.red } }, '•'), l))),
        React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 8, padding: '8px 12px', borderRadius: 9999, background: CNSM.red50, border: `1px solid ${CNSM.red100}` } },
          React.createElement('span', { style: { width: 22, height: 22, borderRadius: '50%', background: CNSM.red, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement(Icon, { name: 'play', size: 11, color: '#fff' })),
          React.createElement('span', { style: { display: 'flex', gap: 2, alignItems: 'center' } }, [6, 11, 8, 14, 9, 5, 12].map((h, i) => React.createElement('span', { key: i, style: { width: 2.5, height: h, borderRadius: 2, background: CNSM.red, opacity: 0.6 } }))),
          React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 11, color: CNSM.red, fontWeight: 600 } }, c.media))
      )
    ));
  }

  if (format === 'interactif') {
    return card(React.createElement('div', { style: { background: 'linear-gradient(180deg,#FFFDFA,#FBF7F0)', height: '100%', padding: '16px 18px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 } },
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: CNSM.amber, fontWeight: 700 } }, lang === 'fr' ? 'Activité' : 'Activity'),
        React.createElement('span', { style: { flex: 1, height: 1, background: CNSM.warmBorder } })),
      React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14.5, color: CNSM.dark, marginBottom: 10, lineHeight: 1.3 } }, lang === 'fr' ? 'Quelles caractéristiques du jeu baroque ?' : 'Which features of baroque playing?'),
      React.createElement('div', { style: { display: 'grid', gap: 7 } },
        [...c.list, lang === 'fr' ? 'vibrato continu' : 'continuous vibrato'].map((opt, i) => {
          const good = i < 2;
          return React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, border: `1.5px solid ${good ? '#22C55E' : CNSM.warmBorder}`, background: good ? 'rgba(34,197,94,0.07)' : CNSM.parchment } },
            React.createElement('span', { style: { width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${good ? '#22C55E' : CNSM.warmBorder}`, background: good ? '#22C55E' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, good && React.createElement(Icon, { name: 'check', size: 11, color: '#fff', strokeWidth: 3 })),
            React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 12.5, color: good ? '#15803D' : CNSM.brownDark } }, opt));
        })
      )
    ));
  }

  if (format === 'video') {
    const lines = [['00:00', c.title, true], ['00:06', c.body, false], ['00:18', '« ' + c.quote.replace(/[«»""]/g, '').trim() + ' »', false]];
    return card(React.createElement('div', { style: { background: '#1A1614', height: '100%', padding: '14px 16px', position: 'relative' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 } },
        React.createElement('span', { style: { width: 8, height: 8, borderRadius: '50%', background: '#E0524A' } }),
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E0524A', fontWeight: 700 } }, lang === 'fr' ? 'Script · prompteur' : 'Script · prompter')),
      React.createElement('div', { style: { display: 'grid', gap: 11 } },
        lines.map((ln, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 12 } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#C69B3A', flexShrink: 0, paddingTop: 2 } }, ln[0]),
          React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: ln[2] ? 15 : 13, fontWeight: ln[2] ? 700 : 400, color: ln[2] ? '#F4D9B5' : '#D8CFC0', lineHeight: 1.45 } }, ln[1])))
      ),
      React.createElement('div', { style: { position: 'absolute', right: 14, bottom: 12, display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#7C7268' } },
        React.createElement('span', { style: { width: 24, height: 24, borderRadius: '50%', border: '1.5px solid #C69B3A', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement(Icon, { name: 'play', size: 10, color: '#C69B3A' })),
        lang === 'fr' ? 'capsule 3 min' : '3 min capsule')
    ));
  }

  if (format === 'pdf') {
    return card(React.createElement('div', { style: { background: CNSM.brown50, height: '100%', padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      React.createElement('div', { style: { background: '#fff', width: '88%', height: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', padding: '20px 22px', display: 'flex', flexDirection: 'column' } },
        React.createElement('div', { style: { fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 17, color: '#222', textAlign: 'center', marginBottom: 4 } }, c.title),
        React.createElement('div', { style: { width: 40, height: 2, background: CNSM.red, margin: '6px auto 12px' } }),
        React.createElement('p', { style: { fontFamily: 'Georgia, serif', fontSize: 11.5, lineHeight: 1.65, color: '#333', textAlign: 'justify', margin: 0 } }, c.body + ' ' + c.body),
        React.createElement('div', { style: { margin: '8px 0' } }, c.list.map((l, i) => React.createElement('div', { key: i, style: { fontFamily: 'Georgia, serif', fontSize: 11.5, color: '#333', display: 'flex', gap: 7 } }, '—', l))),
        React.createElement('div', { style: { marginTop: 'auto', paddingTop: 10, borderTop: '1px solid #E5E5E5', display: 'flex', justifyContent: 'space-between', fontFamily: 'Georgia, serif', fontSize: 9, color: '#999' } }, React.createElement('span', null, 'CNSMDP'), React.createElement('span', null, '1 / 12'))
      )
    ));
  }

  if (format === 'wiki') {
    return card(React.createElement('div', { style: { background: '#fff', height: '100%', display: 'flex' } },
      React.createElement('div', { style: { width: '38%', background: '#F7F6F3', borderRight: '1px solid #E8E5DE', padding: '14px 12px' } },
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9B8F7C', marginBottom: 9 } }, lang === 'fr' ? 'Sommaire' : 'Contents'),
        [c.title, lang === 'fr' ? 'Ornementation' : 'Ornamentation', lang === 'fr' ? 'Tempérament' : 'Temperament', lang === 'fr' ? 'Sources' : 'Sources'].map((p, i) => React.createElement('div', { key: i, style: { fontFamily: 'Montserrat', fontSize: 11, color: i === 0 ? CNSM.red : '#3A6EA5', padding: '4px 0', fontWeight: i === 0 ? 700 : 400, textDecoration: i === 0 ? 'none' : 'underline', textDecorationColor: 'rgba(58,110,165,0.3)' } }, p))),
      React.createElement('div', { style: { flex: 1, padding: '14px 16px' } },
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 16, color: CNSM.dark } }, c.title),
        React.createElement('p', { style: { fontFamily: 'Montserrat', fontSize: 12, lineHeight: 1.5, color: CNSM.leather, margin: '7px 0' } }, c.body),
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B8F7C', marginTop: 10, marginBottom: 5 } }, lang === 'fr' ? 'Voir aussi' : 'See also'),
        [lang === 'fr' ? 'Articulation' : 'Articulation', 'C.P.E. Bach'].map((l, i) => React.createElement('div', { key: i, style: { fontFamily: 'Montserrat', fontSize: 11, color: '#3A6EA5', textDecoration: 'underline', textDecorationColor: 'rgba(58,110,165,0.3)', padding: '2px 0' } }, '↳ ' + l)))
    ));
  }

  if (format === 'ebook') {
    return card(React.createElement('div', { style: { background: CNSM.brownDark, height: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      React.createElement('div', { style: { background: '#F6F1E7', width: '78%', height: '100%', borderRadius: 6, padding: '18px 18px 12px', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 8.5, color: '#A8987C', letterSpacing: '0.1em' } }, 'EPUB'),
          React.createElement('span', { style: { display: 'flex', gap: 5, alignItems: 'baseline', color: '#A8987C' } }, React.createElement('span', { style: { fontSize: 9 } }, 'A'), React.createElement('span', { style: { fontSize: 13 } }, 'A'))),
        React.createElement('div', { style: { fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 16, color: '#2A2218' } }, c.title),
        React.createElement('p', { style: { fontFamily: 'Georgia, serif', fontSize: 12.5, lineHeight: 1.7, color: '#3A3024', margin: '9px 0' } }, c.body),
        React.createElement('p', { style: { fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 12, color: '#6A5C46', margin: 0 } }, c.quote),
        React.createElement('div', { style: { marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#A8987C' } },
          React.createElement('div', { style: { flex: 1, height: 3, background: '#E0D6C4', borderRadius: 9999, marginRight: 10, overflow: 'hidden' } }, React.createElement('div', { style: { width: '72%', height: '100%', background: CNSM.amber } })),
          '72%')
      )
    ));
  }

  // papier
  return card(React.createElement('div', { style: { background: '#EFE7D6', height: '100%', padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
    React.createElement('div', { style: { background: '#FBF7EC', width: '86%', height: '100%', padding: '20px 22px', boxShadow: '0 3px 14px rgba(80,60,30,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #E4D8BE' } },
      React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: CNSM.bordeaux, marginBottom: 12 } }, lang === 'fr' ? 'Livret' : 'Booklet'),
      React.createElement('div', { style: { fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 19, color: '#2A1F16', letterSpacing: '0.01em', lineHeight: 1.2 } }, c.title),
      React.createElement('div', { style: { fontFamily: 'serif', fontSize: 14, color: CNSM.amber, margin: '10px 0' } }, '❧'),
      React.createElement('p', { style: { fontFamily: 'Georgia, serif', fontSize: 11.5, lineHeight: 1.7, color: '#473A2A', margin: 0 } }, c.body),
      React.createElement('p', { style: { fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 11.5, color: '#6A5640', marginTop: 'auto' } }, '— ' + c.cite)
    )
  ));
}

Object.assign(window, { MarkdownStudio, MediumPreview });
