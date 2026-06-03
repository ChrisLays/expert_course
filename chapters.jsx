/* The 7 chapter renderers for the Guide de conception course.
   Globals: React, CNSM, Icon, RichText, GlyphBadge, Callout, Pill, Quiz,
            CompareToggle, WhoDoesWhat, FlipCardGrid, WordSimulator,
            EscalesJourney, WorkloadBars, Checklist. */

function useT(lang) {
  return (o) => (o && typeof o === 'object' && ('fr' in o || 'en' in o) ? o[lang] : o);
}

// shared text primitives
function Lead({ html }) {
  return React.createElement(RichText, { html, style: { fontFamily: 'Montserrat', fontSize: 19, lineHeight: 1.65, color: CNSM.brownDark, fontWeight: 400, margin: '0 0 16px' } });
}
function H2({ children }) {
  return React.createElement('h2', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 23, color: CNSM.dark, letterSpacing: '-0.01em', margin: '48px 0 18px' } }, children);
}
function P({ html, children }) {
  const style = { fontFamily: 'Montserrat', fontSize: 16, lineHeight: 1.75, color: CNSM.leather, margin: '0 0 18px' };
  return html ? React.createElement(RichText, { html, style }) : React.createElement('p', { style }, children);
}
function Divider() {
  return React.createElement('div', { style: { height: 1, background: `linear-gradient(90deg, ${CNSM.warmBorder}, transparent)`, margin: '46px 0' } });
}

// ── CH 1 ────────────────────────────────────────────────────────
function ChEssentiel({ c, lang, t, onQuiz, resources, setResources }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    React.createElement(P, { html: t(c.body) }),
    React.createElement('div', { style: { margin: '34px 0' } }, React.createElement(CompareToggle, { data: c.compare, lang })),
    React.createElement('div', { style: { margin: '30px 0' } }, React.createElement(Callout, { kind: c.callout1.kind, title: t(c.callout1.title) }, React.createElement(RichText, { html: t(c.callout1.body) }))),
    React.createElement(H2, null, t(c.bringsTitle)),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 18, margin: '10px 0 12px' } },
      t(c.brings).map((b, i) => React.createElement('div', { key: i, style: { background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 14, padding: '22px 24px' } },
        React.createElement(GlyphBadge, { glyph: ['✦', '♪', '◎'][i], tone: ['red', 'amber', 'brown'][i], size: 38 }),
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 15.5, color: CNSM.dark, marginTop: 12 } }, b[0]),
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 13.5, color: CNSM.brown, lineHeight: 1.5, marginTop: 5 } }, b[1])
      ))
    ),
    React.createElement('div', { style: { margin: '28px 0' } }, React.createElement(Callout, { kind: c.callout2.kind, title: t(c.callout2.title) }, React.createElement(RichText, { html: t(c.callout2.body) }))),
    React.createElement(Divider, null),
    React.createElement(Quiz, { data: c.quiz, lang, label: 'Quiz', onAnswered: onQuiz }),
    React.createElement(Divider, null),
    React.createElement(OpenQuestion, { data: c.openq, lang, value: resources, onChange: setResources })
  );
}

// ── CH 2 ────────────────────────────────────────────────────────
function ChAsynchrone({ c, lang, t, onQuiz }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    React.createElement(H2, null, t(c.writingTitle)),
    React.createElement(P, { html: t(c.writingBody) }),
    React.createElement('div', { style: { margin: '28px 0' } }, React.createElement(Callout, { kind: c.callout1.kind, title: t(c.callout1.title) }, React.createElement(RichText, { html: t(c.callout1.body) }))),
    React.createElement(Divider, null),
    React.createElement(WhoDoesWhat, { items: c.who, lang, title: t(c.whoTitle), sub: t(c.whoSub) }),
    React.createElement('div', { style: { margin: '32px 0 8px' } }, React.createElement(Callout, { kind: c.callout2.kind, title: t(c.callout2.title) }, React.createElement(RichText, { html: t(c.callout2.body) }))),
    React.createElement(Divider, null),
    React.createElement(Quiz, { data: c.quiz, lang, label: 'Quiz', onAnswered: onQuiz })
  );
}

// ── CH 3 ────────────────────────────────────────────────────────
function ChLivrables({ c, lang, t, gate }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    React.createElement('div', { style: { margin: '30px 0' } }, React.createElement(FlipCardGrid, { cards: c.cards, lang })),
    React.createElement('div', { style: { margin: '28px 0' } }, React.createElement(Callout, { kind: c.callout1.kind, title: t(c.callout1.title) }, React.createElement(RichText, { html: t(c.callout1.body) }))),
    React.createElement(Divider, null),
    React.createElement(H2, null, t(c.simTitle)),
    React.createElement(P, { html: t(c.simBody) }),
    React.createElement('div', { style: { margin: '24px 0' } }, React.createElement(WordSimulator, { lang })),
    React.createElement('div', { style: { margin: '24px 0' } }, React.createElement(WordFillIn, { data: c.fillin, lang, onComplete: gate })),
    React.createElement('div', { style: { margin: '28px 0 0' } }, React.createElement(Callout, { kind: c.callout2.kind, title: t(c.callout2.title) }, React.createElement(RichText, { html: t(c.callout2.body) })))
  );
}

// ── CH 4 ────────────────────────────────────────────────────────
function ChEquipe({ c, lang, t, gate }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: 18, margin: '32px 0 10px' } },
      c.items.map((it, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 16, background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 14, padding: '22px 24px' } },
        React.createElement('div', { style: { width: 42, height: 42, flexShrink: 0, borderRadius: 11, background: CNSM.sand, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: it.icon, size: 21, color: CNSM.red })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 15.5, color: CNSM.dark, lineHeight: 1.3 } }, t(it.title)),
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 13.5, color: CNSM.brown, lineHeight: 1.55, marginTop: 5 } }, t(it.body))
        )
      ))
    ),
    React.createElement('div', { style: { margin: '30px 0 0' } }, React.createElement(Callout, { kind: c.callout1.kind, title: t(c.callout1.title) }, React.createElement(RichText, { html: t(c.callout1.body) }))),
    React.createElement(Divider, null),
    React.createElement(Quiz, { data: c.quiz, lang, label: 'Quiz', onAnswered: gate })
  );
}

// ── CH 5 ────────────────────────────────────────────────────────
function ChEtapes({ c, lang, t, gate }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    React.createElement('div', { style: { display: 'flex', gap: 16, flexWrap: 'wrap', margin: '14px 0 22px' } },
      [['expert', t({ fr: 'Vous', en: 'You' })], ['ip', t({ fr: 'Nous (IP)', en: 'Us (IP)' })], ['both', t({ fr: 'Ensemble', en: 'Together' })]].map(([o, l], i) =>
        React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Montserrat', fontSize: 12.5, color: CNSM.brownDark } },
          React.createElement('span', { style: { width: 11, height: 11, borderRadius: 3, background: o === 'expert' ? CNSM.red : o === 'ip' ? CNSM.amber : CNSM.brownDark } }), l))
    ),
    React.createElement(EscalesJourney, { steps: c.steps, lang }),
    React.createElement('div', { style: { margin: '24px 0 18px' } }, React.createElement(WorkloadBars, { data: c.workload, lang })),
    React.createElement(Callout, { kind: c.callout1.kind, title: t(c.callout1.title) }, React.createElement(RichText, { html: t(c.callout1.body) })),
    React.createElement(Divider, null),
    React.createElement(Quiz, { data: c.quiz, lang, label: 'Quiz', onAnswered: gate })
  );
}

// ── CH ATELIER (5b) ─────────────────────────────────────────────
function ChAtelier({ c, lang, t, gate }) {
  const ownerColors = [CNSM.red, CNSM.amber, CNSM.brownDark];
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    // tool window mock with image slot
    React.createElement('div', {
      style: { margin: '32px 0 10px', borderRadius: 16, overflow: 'hidden', border: `1px solid ${CNSM.warmBorder}`, background: CNSM.boardBg, boxShadow: 'var(--shadow-md)' }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', background: 'linear-gradient(180deg,#3D3229,#2C2420)', borderBottom: '1px solid rgba(255,255,255,0.06)' } },
        React.createElement('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#C24A3E' } }),
        React.createElement('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#D9A441' } }),
        React.createElement('span', { style: { width: 11, height: 11, borderRadius: '50%', background: '#5F8A5A' } }),
        React.createElement('span', { style: { marginLeft: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: '#A89B82' } }, 'atelier-redaction · CNSMDP')
      ),
      React.createElement('image-slot', {
        id: 'atelier-screenshot', shape: 'rect', fit: 'cover',
        placeholder: t(c.shotCaption),
        style: { display: 'block', width: '100%', height: 360, background: '#241D19' }
      })
    ),
    React.createElement(Divider, null),
    React.createElement(H2, null, t(c.featuresTitle)),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 18, margin: '10px 0 12px' } },
      c.features.map((f, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 13, background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 14, padding: '20px 22px' } },
        React.createElement('div', { style: { width: 40, height: 40, flexShrink: 0, borderRadius: 11, background: CNSM.sand, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: f.icon, size: 20, color: CNSM.red })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 15, color: CNSM.dark, lineHeight: 1.3 } }, t(f.title)),
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 13.2, color: CNSM.brown, lineHeight: 1.5, marginTop: 5 } }, t(f.body))
        )
      ))
    ),
    React.createElement(Divider, null),
    React.createElement(H2, null, t(c.flowTitle)),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 12, margin: '10px 0 14px' } },
      c.flow.map((s, i) => React.createElement('div', { key: i, style: { position: 'relative', background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 14, padding: '22px 22px 20px' } },
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 26, color: i % 2 ? CNSM.amber : CNSM.red, letterSpacing: '-0.02em', lineHeight: 1 } }, s.n),
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14.5, color: CNSM.dark, marginTop: 10 } }, t(s.title)),
        React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 12.8, color: CNSM.brown, lineHeight: 1.5, marginTop: 5 } }, t(s.body))
      ))
    ),
    React.createElement('div', { style: { margin: '28px 0' } }, React.createElement(Callout, { kind: c.callout1.kind, title: t(c.callout1.title) }, React.createElement(RichText, { html: t(c.callout1.body) }))),
    React.createElement(Callout, { kind: c.callout2.kind, title: t(c.callout2.title) }, React.createElement(RichText, { html: t(c.callout2.body) })),
    React.createElement(Divider, null),
    // Markdown rationale
    React.createElement('div', {
      style: { borderRadius: 18, overflow: 'hidden', border: `1px solid ${CNSM.warmBorder}`, background: 'linear-gradient(180deg,#FFFDFA,#FAF6EF)', boxShadow: 'var(--shadow-sm)' }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px 14px' } },
        React.createElement('div', { style: { width: 44, height: 44, flexShrink: 0, borderRadius: 11, background: CNSM.boardBg, color: '#F4D9B5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' } }, 'M↓'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 19, color: CNSM.dark } }, t(c.markdownTitle)),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: CNSM.amber, marginTop: 3, fontWeight: 700 } }, t({ fr: 'Une source, tous les formats', en: 'One source, every format' }))
        )
      ),
      React.createElement('div', { style: { padding: '0 24px 18px' } },
        React.createElement(RichText, { html: t(c.markdownIntro), style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.62, color: CNSM.leather, margin: '0 0 12px' } }),
        React.createElement(RichText, { html: t(c.markdownWhy), style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.62, color: CNSM.leather, margin: '0 0 4px' } })
      )
    ),
    // interactive studio: one source → many formats
    React.createElement('div', { style: { marginTop: 28 } },
      React.createElement(MarkdownStudio, { data: c, lang })
    ),
    // hands-on sandbox exercise
    React.createElement(Divider, null),
    React.createElement('div', { style: { marginTop: 14 } },
      React.createElement(MarkdownSandbox, { data: c.sandbox, lang, onOpenTool: c.toolUrl, onDone: gate })
    ),
    // closing CTA
    React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginTop: 34 } },
      React.createElement('a', {
        href: c.toolUrl, target: '_blank', rel: 'noopener',
        style: { display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none', padding: '16px 30px', borderRadius: 13, background: CNSM.red, color: '#FEFCF9', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 16.5, boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.35), var(--shadow)' }
      },
        React.createElement(Icon, { name: 'feather', size: 19, color: '#fff' }),
        t(c.openLabel),
        React.createElement(Icon, { name: 'arrowRight', size: 17, color: '#fff' })
      )
    )
  );
}

// ── CH 6 ────────────────────────────────────────────────────────
function ChVigilance({ c, lang, t, checklist, setChecklist, gate }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    React.createElement('div', { style: { background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 16, padding: '20px 22px', margin: '28px 0 10px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 } },
        React.createElement(Icon, { name: 'alert', size: 19, color: '#D97706' }),
        React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B45309' } }, t({ fr: 'À ne pas négliger', en: 'Not to be overlooked' }))
      ),
      React.createElement('div', { style: { display: 'grid', gap: 12 } },
        c.watch.map((w, i) => React.createElement('div', { key: i, style: { display: 'flex', gap: 12 } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D97706', fontWeight: 700, marginTop: 2 } }, String(i + 1).padStart(2, '0')),
          React.createElement('div', null,
            React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14.5, color: CNSM.dark } }, t(w.title)),
            React.createElement('span', { style: { fontFamily: 'Montserrat', fontSize: 14.5, color: CNSM.leather, lineHeight: 1.55 } }, ' — ' + t(w.body))
          )
        ))
      )
    ),
    React.createElement(Divider, null),
    React.createElement(H2, null, t(c.checklistTitle)),
    React.createElement('div', { style: { margin: '8px 0' } },
      React.createElement(Checklist, { items: t(c.checklist), lang, doneMsg: t(c.checklistDone), value: checklist, onChange: setChecklist, onAllDone: gate })
    )
  );
}

// ── CH 7 ────────────────────────────────────────────────────────
function ChCampus({ c, lang, t, onFinish, gate }) {
  const [scores, setScores] = React.useState({});
  const answered = Object.keys(scores).length;
  const good = Object.values(scores).filter(Boolean).length;
  React.useEffect(() => { if (answered === c.recap.length && gate) gate(); }, [answered]);
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(Lead, { html: t(c.lead) }),
    React.createElement('a', {
      href: c.portalUrl, target: '_blank', rel: 'noopener',
      style: { display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', margin: '12px 0 6px', padding: '14px 22px', borderRadius: 12, background: CNSM.red, color: '#FEFCF9', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 15, boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.35), var(--shadow-sm)' }
    },
      React.createElement(Icon, { name: 'globe', size: 18, color: '#fff' }),
      t(c.portalLabel),
      React.createElement(Icon, { name: 'arrowRight', size: 16, color: '#fff' })
    ),
    React.createElement('div', { style: { margin: '28px 0' } }, React.createElement(Callout, { kind: c.callout1.kind, title: t(c.callout1.title) }, React.createElement(RichText, { html: t(c.callout1.body) }))),
    React.createElement(Divider, null),
    React.createElement(H2, null, t(c.recapTitle)),
    React.createElement(P, null, t(c.recapSub)),
    React.createElement('div', { style: { display: 'grid', gap: 16, margin: '22px 0' } },
      c.recap.map((q, i) => React.createElement(Quiz, { key: i, data: q, lang, label: `0${i + 1}`, onAnswered: (ok) => setScores((s) => ({ ...s, [i]: ok })) }))
    ),
    answered === c.recap.length && React.createElement('div', {
      style: { textAlign: 'center', padding: '30px 24px', borderRadius: 18, background: 'linear-gradient(165deg,#3D3229,#2C2420)', color: '#F0E6D6', margin: '30px 0', animation: 'fadeUp 400ms var(--ease-out)' }
    },
      React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 40, color: CNSM.amber, letterSpacing: '-0.02em' } }, `${good}/${c.recap.length}`),
      React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: 20, marginTop: 6 } }, t(c.finalTitle)),
      React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.6, color: '#D9CDBB', maxWidth: 440, margin: '8px auto 18px' } }, t(c.finalBody)),
      React.createElement('a', {
        href: window.COURSE.ch.atelier.toolUrl, target: '_blank', rel: 'noopener',
        onClick: onFinish,
        style: { display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 24px', borderRadius: 11, border: 'none', cursor: 'pointer', textDecoration: 'none', background: CNSM.red, color: '#FEFCF9', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 15, boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.35)' }
      },
        React.createElement(Icon, { name: 'feather', size: 17, color: '#fff' }),
        window.COURSE.ui.backToWorkshop[lang]
      )
    )
  );
}

const CHAPTERS = { essentiel: ChEssentiel, asynchrone: ChAsynchrone, livrables: ChLivrables, equipe: ChEquipe, etapes: ChEtapes, atelier: ChAtelier, vigilance: ChVigilance, campus: ChCampus };
Object.assign(window, { CHAPTERS });
