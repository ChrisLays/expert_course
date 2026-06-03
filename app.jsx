/* App shell: cover, sidebar, topbar, lesson player, persistence.
   Globals: React, CNSM, Icon, COURSE, CHAPTERS. */

const STORE_KEY = 'cnsmdp-guide-conception-v1';
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveState(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {}
}

function App() {
  const init = loadState();
  const [lang, setLang] = React.useState(init.lang || 'fr');
  const [view, setView] = React.useState(init.view != null ? init.view : 'cover'); // 'cover' | 0..6
  const [completed, setCompleted] = React.useState(init.completed || []);
  const [checklist, setChecklist] = React.useState(init.checklist || {});
  const [resources, setResources] = React.useState(init.resources || ['', '', '']);
  const [passed, setPassed] = React.useState(init.passed || []); // chapter indices whose exercise is answered
  const [drawer, setDrawer] = React.useState(false);
  const [scrollPct, setScrollPct] = React.useState(0);
  const scrollRef = React.useRef(null);
  const t = (o) => (o && typeof o === 'object' && ('fr' in o || 'en' in o) ? o[lang] : o);
  const nav = COURSE.nav;
  const totalCh = nav.length;

  React.useEffect(() => { saveState({ lang, view, completed, checklist, resources, passed }); }, [lang, view, completed, checklist, resources, passed]);

  // reset scroll on chapter change
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; setScrollPct(0); }, [view]);

  const markComplete = (idx) => setCompleted((c) => (c.includes(idx) ? c : [...c, idx]));

  const goTo = (v) => { setView(v); setDrawer(false); };
  // gate: every chapter requires its exercise to be answered before advancing.
  // `passed` is sticky + persisted, so a chapter stays unlocked after reload.
  const markPassed = (idx) => { setPassed((p) => (p.includes(idx) ? p : [...p, idx])); markComplete(idx); };
  const gateOk = (idx) => passed.includes(idx);
  const nextLocked = typeof view === 'number' && !gateOk(view);
  const goNext = () => {
    if (typeof view === 'number') {
      if (!gateOk(view)) return;
      markComplete(view);
      if (view < totalCh - 1) goTo(view + 1); else goTo('cover');
    }
  };
  const goPrev = () => { if (typeof view === 'number' && view > 0) goTo(view - 1); };

  const onScroll = (e) => {
    const el = e.target;
    const max = el.scrollHeight - el.clientHeight;
    const pct = max > 0 ? (el.scrollTop / max) * 100 : 100;
    setScrollPct(pct);
  };

  // ── Wordmark ──
  const Wordmark = ({ small }) => React.createElement('div', { style: { display: 'flex', flexDirection: 'column', lineHeight: 1 } },
    !small && React.createElement('div', { style: { fontFamily: 'Montserrat', fontSize: 8.5, color: CNSM.brown, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 4 } }, 'CNSMDP'),
    React.createElement('div', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: small ? 19 : 22, color: '#1A1A1A', letterSpacing: '-0.025em' } },
      'Conservatoire', React.createElement('span', { style: { fontWeight: 500, color: '#1A1A1A', marginLeft: 5 } }, 'de Paris'))
  );

  const LangToggle = () => React.createElement('div', { style: { display: 'inline-flex', background: CNSM.sand, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 9999, padding: 3 } },
    ['fr', 'en'].map((l) => React.createElement('button', {
      key: l, onClick: () => setLang(l),
      style: { padding: '5px 13px', borderRadius: 9999, border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 11.5, letterSpacing: '0.05em', background: lang === l ? CNSM.dark : 'transparent', color: lang === l ? '#FEFCF9' : CNSM.brown, transition: 'all 180ms' }
    }, l.toUpperCase()))
  );

  // ════════════════ COVER ════════════════
  if (view === 'cover') {
    const m = COURSE.meta;
    const started = completed.length > 0;
    return React.createElement('div', { style: { minHeight: '100vh', background: CNSM.sand, display: 'flex', flexDirection: 'column' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px clamp(20px,5vw,56px)', borderBottom: `1px solid ${CNSM.warmBorder}` } },
        React.createElement(Wordmark, null), React.createElement(LangToggle, null)),
      React.createElement('div', { style: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(28px,6vw,72px) clamp(20px,5vw,56px)' } },
        React.createElement('div', { className: 'cover-grid', style: { display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 'clamp(28px,5vw,64px)', maxWidth: 1140, width: '100%', alignItems: 'center' } },
          // left
          React.createElement('div', { className: 'cover-left' },
            React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: CNSM.red, marginBottom: 18 } }, t(m.kicker)),
            React.createElement('h1', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 'clamp(34px,5vw,54px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: CNSM.dark, margin: '0 0 20px' } }, t(m.title)),
            React.createElement('p', { style: { fontFamily: 'Montserrat', fontSize: 'clamp(16px,1.6vw,19px)', lineHeight: 1.6, color: CNSM.brownDark, margin: '0 0 16px', maxWidth: 520 } }, t(m.subtitle)),
            React.createElement('p', { style: { fontFamily: 'Montserrat', fontSize: 15, lineHeight: 1.65, color: CNSM.brown, margin: '0 0 28px', maxWidth: 520 } }, t(m.intro)),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' } },
              React.createElement('button', {
                onClick: () => goTo(started ? Math.min(Math.max(...completed) + 1, totalCh - 1) : 0),
                style: { display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 26px', borderRadius: 12, border: 'none', cursor: 'pointer', background: CNSM.red, color: '#FEFCF9', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 16, boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.35), var(--shadow)' }
              }, t(started ? m.resume : m.start), React.createElement(Icon, { name: 'arrowRight', size: 18, color: '#fff' })),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: CNSM.brown } },
                React.createElement('span', null, t(m.chaptersLabel)),
                React.createElement('span', { style: { width: 4, height: 4, borderRadius: 9999, background: CNSM.warmBorder } }),
                React.createElement('span', null, t(m.minutesLabel))
              )
            )
          ),
          // right: chapter list card
          React.createElement('div', { className: 'cover-right', style: { background: CNSM.parchment, border: `1px solid ${CNSM.warmBorder}`, borderRadius: 20, padding: '12px', boxShadow: 'var(--shadow-card-outlined)' } },
            React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CNSM.brown, padding: '12px 14px 8px' } }, t(COURSE.ui.contents)),
            nav.map((ch, i) => {
              const done = completed.includes(i);
              return React.createElement('button', {
                key: ch.id, onClick: () => goTo(i),
                style: { display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', background: 'none', border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${CNSM.warm}`, cursor: 'pointer', padding: '12px 14px', borderRadius: 10 },
                onMouseEnter: (e) => e.currentTarget.style.background = CNSM.warm,
                onMouseLeave: (e) => e.currentTarget.style.background = 'none',
              },
                React.createElement('span', { style: { width: 30, height: 30, flexShrink: 0, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? 'rgba(34,197,94,0.12)' : CNSM.sand, color: done ? '#22C55E' : CNSM.brown, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 13 } },
                  done ? React.createElement(Icon, { name: 'check', size: 15, color: '#22C55E', strokeWidth: 3 }) : String(ch.num).padStart(2, '0')),
                React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 14.5, color: CNSM.leather, flex: 1 } }, t(ch.label)),
                React.createElement(Icon, { name: 'chevronRight', size: 15, color: CNSM.warmBorder })
              );
            })
          )
        )
      )
    );
  }

  // ════════════════ LESSON ════════════════
  const ch = nav[view];
  const cdata = COURSE.ch[ch.id];
  const Renderer = CHAPTERS[ch.id];
  const overallPct = Math.round((completed.length / totalCh) * 100);

  const Sidebar = ({ inDrawer }) => React.createElement('aside', {
    style: {
      width: 300, flexShrink: 0, background: CNSM.cream, borderRight: `1px solid ${CNSM.warmBorder}`,
      display: 'flex', flexDirection: 'column', height: '100%',
      ...(inDrawer ? {} : {}),
    }
  },
    React.createElement('div', { style: { padding: '18px 20px 14px' } },
      React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CNSM.brown, marginBottom: 12 } }, t(COURSE.ui.contents)),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement('div', { style: { flex: 1, height: 6, background: CNSM.sand, borderRadius: 9999, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: `${overallPct}%`, background: CNSM.amber, borderRadius: 9999, transition: 'width 400ms' } })),
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: CNSM.brownDark, fontWeight: 700 } }, `${overallPct}%`)
      )
    ),
    React.createElement('nav', { style: { flex: 1, overflowY: 'auto', padding: '4px 12px 16px' } },
      nav.map((item, i) => {
        const active = i === view;
        const done = completed.includes(i);
        const blocked = nextLocked && i > view;
        return React.createElement('button', {
          key: item.id, onClick: () => { if (!blocked) goTo(i); }, disabled: blocked,
          title: blocked ? t({ fr: 'Répondez à l’exercice de ce chapitre pour continuer', en: 'Answer this chapter’s exercise to continue' }) : undefined,
          style: {
            display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', cursor: blocked ? 'not-allowed' : 'pointer',
            padding: '11px 12px', borderRadius: 10, marginBottom: 2, opacity: blocked ? 0.45 : 1,
            border: 'none', background: active ? CNSM.parchment : 'transparent',
            boxShadow: active ? `inset 0 0 0 1px ${CNSM.warmBorder}` : 'none',
            position: 'relative',
          }
        },
          active && React.createElement('span', { style: { position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 9999, background: CNSM.red } }),
          blocked && React.createElement('span', { style: { position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' } }, React.createElement(Icon, { name: 'lock', size: 12, color: CNSM.brownLight })),
          React.createElement('span', { style: { width: 28, height: 28, flexShrink: 0, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? 'rgba(34,197,94,0.12)' : active ? CNSM.red : CNSM.sand, color: done ? '#22C55E' : active ? '#fff' : CNSM.brown, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 12 } },
            done ? React.createElement(Icon, { name: 'check', size: 14, color: '#22C55E', strokeWidth: 3 }) : String(item.num).padStart(2, '0')),
          React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: active ? 600 : 500, fontSize: 13.5, color: active ? CNSM.dark : CNSM.brownDark, lineHeight: 1.3 } }, t(item.label))
        );
      })
    ),
    React.createElement('div', { style: { padding: '14px 16px', borderTop: `1px solid ${CNSM.warmBorder}` } },
      React.createElement('button', { onClick: () => goTo('cover'), style: { display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', fontSize: 12.5, color: CNSM.brown } },
        React.createElement(Icon, { name: 'chevronLeft', size: 15, color: CNSM.brown }), t({ fr: "Page d'accueil", en: 'Home page' }))
    )
  );

  return React.createElement('div', { style: { height: '100vh', display: 'flex', flexDirection: 'column', background: CNSM.sand, overflow: 'hidden' } },
    // topbar
    React.createElement('header', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '0 clamp(14px,3vw,28px)', height: 62, flexShrink: 0, background: CNSM.parchment, borderBottom: `1px solid ${CNSM.warmBorder}`, position: 'relative', zIndex: 30 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('button', { className: 'menu-btn', onClick: () => setDrawer(true), style: { display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 } }, React.createElement(Icon, { name: 'menu', size: 22, color: CNSM.dark })),
        React.createElement(Wordmark, { small: true })
      ),
      React.createElement('div', { className: 'topbar-title', style: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: CNSM.brown, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
        `${t(COURSE.ui.chapter)} ${ch.num} · ${t(COURSE.meta.kicker)}`),
      React.createElement(LangToggle, null)
    ),
    // reading progress
    React.createElement('div', { style: { height: 3, background: CNSM.warm, flexShrink: 0, position: 'relative', zIndex: 30 } },
      React.createElement('div', { style: { height: '100%', width: `${scrollPct}%`, background: `linear-gradient(90deg,${CNSM.red},${CNSM.redLight})` } })),
    // body
    React.createElement('div', { style: { flex: 1, display: 'flex', minHeight: 0 } },
      React.createElement('div', { className: 'sidebar-desktop', style: { height: '100%' } }, React.createElement(Sidebar, null)),
      // drawer
      drawer && React.createElement('div', { className: 'drawer-overlay', onClick: () => setDrawer(false), style: { position: 'fixed', inset: 0, background: 'rgba(45,19,24,0.4)', zIndex: 40 } },
        React.createElement('div', { onClick: (e) => e.stopPropagation(), style: { position: 'absolute', top: 0, left: 0, bottom: 0, animation: 'slideIn 240ms var(--ease-out)' } }, React.createElement(Sidebar, { inDrawer: true }))
      ),
      // main scroll
      React.createElement('main', { ref: scrollRef, onScroll, style: { flex: 1, overflowY: 'auto', minWidth: 0 } },
        React.createElement('article', { style: { maxWidth: 820, margin: '0 auto', padding: 'clamp(36px,4.5vw,68px) clamp(24px,4.5vw,60px) 72px' } },
          // chapter header
          React.createElement('div', { style: { marginBottom: 38 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 } },
              React.createElement('span', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 13, color: CNSM.red, letterSpacing: '0.04em' } }, `${String(ch.num).padStart(2, '0')} / ${String(totalCh).padStart(2, '0')}`),
              React.createElement('span', { style: { flex: 1, height: 1, background: CNSM.warmBorder } }),
              React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: CNSM.brown } }, t(cdata.kicker))
            ),
            React.createElement('h1', { style: { fontFamily: 'Montserrat', fontWeight: 800, fontSize: 'clamp(28px,3.4vw,38px)', lineHeight: 1.12, letterSpacing: '-0.025em', color: CNSM.dark, margin: 0 } }, t(cdata.title))
          ),
          // chapter body
          React.createElement(Renderer, { c: cdata, lang, t, checklist, setChecklist, resources, setResources, gate: () => markPassed(view), onQuiz: () => markPassed(view), onFinish: () => { markPassed(view); goTo('cover'); } }),
          // footer nav
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 60, paddingTop: 32, borderTop: `1px solid ${CNSM.warmBorder}` } },
            view > 0
              ? React.createElement('button', { onClick: goPrev, style: navBtnStyle('ghost') }, React.createElement(Icon, { name: 'chevronLeft', size: 17, color: CNSM.brownDark }), React.createElement('span', null, t(COURSE.ui.prev)))
              : React.createElement('span', null),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              nav.map((_, i) => {
                const forwardBlocked = nextLocked && i > view;
                return React.createElement('button', { key: i, onClick: () => { if (!forwardBlocked) goTo(i); }, disabled: forwardBlocked, 'aria-label': `chapter ${i + 1}`, style: { width: i === view ? 22 : 8, height: 8, borderRadius: 9999, border: 'none', cursor: forwardBlocked ? 'not-allowed' : 'pointer', padding: 0, opacity: forwardBlocked ? 0.4 : 1, background: i === view ? CNSM.red : completed.includes(i) ? CNSM.amber : CNSM.warmBorder, transition: 'all 220ms' } });
              })
            ),
            nextLocked
              ? React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 11, fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14.5, background: '#EEE6D7', color: CNSM.brownLight, cursor: 'not-allowed' }, title: t({ fr: 'Complétez l’exercice pour continuer', en: 'Complete the exercise to continue' }) },
                  React.createElement(Icon, { name: 'lock', size: 16, color: CNSM.brownLight }),
                  React.createElement('span', null, t(view < totalCh - 1 ? COURSE.ui.next : COURSE.ui.finish)))
              : React.createElement('button', { onClick: goNext, style: navBtnStyle('primary') },
                  React.createElement('span', null, t(view < totalCh - 1 ? COURSE.ui.next : COURSE.ui.finish)),
                  React.createElement(Icon, { name: 'arrowRight', size: 17, color: '#fff' })
                )
          )
        )
      )
    )
  );
}

function navBtnStyle(variant) {
  const base = { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 11, cursor: 'pointer', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 14.5, border: 'none' };
  if (variant === 'primary') return { ...base, background: CNSM.red, color: '#FEFCF9', boxShadow: 'inset 0 0 0 1px rgba(254,252,249,0.35)' };
  return { ...base, background: 'transparent', color: CNSM.brownDark, border: `1px solid ${CNSM.warmBorder}` };
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
