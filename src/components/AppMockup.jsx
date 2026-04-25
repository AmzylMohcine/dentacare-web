import { useRef, useEffect, useState } from 'react'

/* ── ScaledMockup: fits any container width ──────────────────── */
function ScaledMockup({ children, naturalHeight }) {
  const outerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const NATURAL_W = 600

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const measure = () => {
      const w = el.getBoundingClientRect().width
      if (w <= 0) return
      setScale(Math.min(1, w / NATURAL_W))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const h = Math.round(naturalHeight * scale)
  return (
    <div ref={outerRef} style={{ width: '100%', height: h, overflow: 'hidden', borderRadius: 14 }}>
      <div style={{ width: scale < 1 ? `${(1 / scale * 100).toFixed(2)}%` : '100%', transform: scale < 1 ? `scale(${scale})` : 'none', transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

/* ── Shared: Browser chrome ──────────────────────────────────── */
function Browser({ url, children }) {
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 16px 48px rgba(0,0,0,.15)' }}>
      <div style={{ background: '#F1F5F9', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 10, color: '#64748B', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: '#10B981', fontSize: 9 }}>🔒</span> {url}
        </div>
      </div>
      {children}
    </div>
  )
}

/* ── Shared: Sidebar ─────────────────────────────────────────── */
const NAV_ITEMS = [
  { icon: '🏠', label: 'Accueil' },
  { icon: '👥', label: 'Patients' },
  { icon: '📅', label: 'Rendez-vous' },
  { icon: '🦷', label: 'Salle' },
  { icon: '🧾', label: 'Facturation' },
  { icon: '💊', label: 'Pharmacie' },
  { icon: '🖼️', label: 'Imagerie' },
  { icon: '⚙️', label: 'Paramètres' },
]

function Sidebar({ active = 0 }) {
  return (
    <div style={{ width: 186, flexShrink: 0, background: '#0C1E38', display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 12px 12px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#38B2AC,#1B5B7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>🦷</div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 10, whiteSpace: 'nowrap' }}>DentaCare</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,.3)' }}>Cabinet Principal</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '6px 0', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {NAV_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 10px', margin: '0 5px', borderRadius: 6, background: i === active ? '#1B3D6A' : 'transparent' }}>
            <span style={{ fontSize: 11, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: i === active ? 700 : 400, color: i === active ? '#fff' : 'rgba(255,255,255,.38)', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '7px 12px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg,#38B2AC,#1B5B7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>👨‍⚕️</div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>Dr. Alami</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,.3)' }}>Propriétaire</div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════════ */
const DASH_STATS = [
  { label: 'RDV sur la période', value: '89', sub: '12 en attente',    grad: 'linear-gradient(135deg,#6C5CE7,#A78BFA)', glow: '#6C5CE7' },
  { label: 'Terminés',           value: '67', sub: '22 restants',       grad: 'linear-gradient(135deg,#10B981,#34D399)', glow: '#10B981' },
  { label: 'Patients vus',       value: '247', sub: '43 traités',       grad: 'linear-gradient(135deg,#0EA5E9,#38BDF8)', glow: '#0EA5E9' },
  { label: "Chiffre d'affaires", value: '48 500 DH', sub: '3 200 impayé', grad: 'linear-gradient(135deg,#F59E0B,#FCD34D)', glow: '#F59E0B' },
]
const RDV_LIST = [
  { name: 'Amira Benali',   act: 'Détartrage', time: '09:00', color: '#38B2AC' },
  { name: 'Karim Mansouri', act: 'Extraction', time: '10:30', color: '#E34D62' },
  { name: 'Sara Lahlou',    act: 'Composite',  time: '14:00', color: '#EFA52E' },
  { name: 'Youssef Alami',  act: 'Blanchiment',time: '15:30', color: '#8A6DBB' },
]

export function DashboardMockup() {
  return (
    <ScaledMockup naturalHeight={456}>
      <Browser url="app.dentacareapp.com">
        <div style={{ display: 'flex', height: 420, background: '#EEF2F7' }}>
          <Sidebar active={0} />
          <div style={{ flex: 1, padding: 16, minWidth: 0, overflow: 'hidden' }}>
            {/* Top bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1C2D3F' }}>Tableau de bord</div>
                <div style={{ fontSize: 9, color: '#6A7E90' }}>25 Avril 2026</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['Aujourd\'hui', 'Semaine', 'Mois'].map((f, i) => (
                  <div key={f} style={{ padding: '3px 8px', borderRadius: 6, fontSize: 9, fontWeight: 600, background: i === 2 ? '#1B5B7E' : '#fff', color: i === 2 ? '#fff' : '#6A7E90', border: `1px solid ${i === 2 ? '#1B5B7E' : '#DEE5ED'}` }}>{f}</div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 12 }}>
              {DASH_STATS.map((s, i) => (
                <div key={i} style={{ borderRadius: 12, padding: '12px 10px', background: s.grad, color: '#fff', boxShadow: `0 4px 14px ${s.glow}28` }}>
                  <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.2 }}>{s.value}</div>
                  <div style={{ fontSize: 8, opacity: .85, marginTop: 3 }}>{s.label}</div>
                  <div style={{ fontSize: 7.5, opacity: .6, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Bottom grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 152px', gap: 10 }}>
              {/* RDV list */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '1px solid #DEE5ED' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#6A7E90', marginBottom: 8, textTransform: 'uppercase', letterSpacing: .5 }}>RDV du jour</div>
                {RDV_LIST.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${r.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: r.color, flexShrink: 0 }}>{r.name.split(' ').map(n => n[0]).join('')}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#1C2D3F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                      <div style={{ fontSize: 8, color: '#6A7E90' }}>{r.time} · {r.act}</div>
                    </div>
                    <div style={{ width: 3, height: 22, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '1px solid #DEE5ED' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#6A7E90', marginBottom: 8, textTransform: 'uppercase', letterSpacing: .5 }}>Accès rapide</div>
                {[
                  { icon: '📅', label: 'Nouveau RDV',     color: '#6C5CE7' },
                  { icon: '👤', label: 'Nouveau patient', color: '#0EA5E9' },
                  { icon: '🧾', label: 'Facture',          color: '#10B981' },
                  { icon: '💊', label: 'Ordonnance',       color: '#EFA52E' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 7px', borderRadius: 7, marginBottom: 5, background: `${a.color}10`, cursor: 'pointer' }}>
                    <span style={{ fontSize: 12 }}>{a.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: a.color }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Browser>
    </ScaledMockup>
  )
}

/* ══════════════════════════════════════════════════════════════
   AGENDA SEMAINE
══════════════════════════════════════════════════════════════ */
const AGENDA_CHIPS = [
  { day: 0, h: 0, label: 'Amira B. — Détartrage',  color: '#38B2AC' },
  { day: 0, h: 2, label: 'Karim M. — Extraction',   color: '#E34D62' },
  { day: 1, h: 1, label: 'Sara L. — Composite',     color: '#EFA52E' },
  { day: 2, h: 3, label: 'Youssef A. — Blanchiment',color: '#8A6DBB' },
  { day: 3, h: 0, label: 'Nadia K. — Scellement',   color: '#2BBD68' },
  { day: 3, h: 3, label: 'Omar B. — RX',             color: '#0EA5E9' },
  { day: 4, h: 2, label: 'Zineb M. — Détartrage',   color: '#38B2AC' },
]
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16]
const DAYS  = ['Lun 21', 'Mar 22', 'Mer 23', 'Jeu 24', 'Ven 25']

export function AgendaMockup() {
  return (
    <ScaledMockup naturalHeight={416}>
      <Browser url="app.dentacareapp.com/rendez-vous">
        <div style={{ display: 'flex', height: 380, background: '#EEF2F7' }}>
          <Sidebar active={2} />
          <div style={{ flex: 1, padding: '12px', minWidth: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#1C2D3F' }}>Agenda — Semaine du 21 Avril 2026</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['◀', 'Aujourd\'hui', '▶'].map(l => (
                  <div key={l} style={{ padding: '2px 8px', borderRadius: 5, fontSize: 9, fontWeight: 600, background: '#fff', color: '#6A7E90', border: '1px solid #DEE5ED', cursor: 'pointer' }}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #DEE5ED', overflow: 'hidden' }}>
              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '32px repeat(5,1fr)', borderBottom: '1px solid #EEF2F7' }}>
                <div />
                {DAYS.map(d => (
                  <div key={d} style={{ padding: '5px 4px', borderLeft: '1px solid #EEF2F7', textAlign: 'center', fontSize: 8.5, fontWeight: 700, color: d === 'Ven 25' ? '#1B5B7E' : '#6A7E90', background: d === 'Ven 25' ? '#E6F3F9' : 'transparent' }}>{d}</div>
                ))}
              </div>
              {/* Hour rows */}
              {HOURS.map((h, hi) => (
                <div key={h} style={{ display: 'grid', gridTemplateColumns: '32px repeat(5,1fr)', borderBottom: hi < HOURS.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                  <div style={{ fontSize: 7.5, color: '#CBD5E1', padding: '0 4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: 30 }}>{h}h</div>
                  {DAYS.map((_, di) => {
                    const chip = AGENDA_CHIPS.find(c => c.day === di && c.h === hi)
                    return (
                      <div key={di} style={{ borderLeft: '1px solid #F8FAFC', height: 30, position: 'relative', background: di === 4 ? '#FAFBFF' : 'transparent' }}>
                        {chip && (
                          <div style={{ position: 'absolute', inset: '2px 2px', borderRadius: 3, background: `${chip.color}18`, borderLeft: `2.5px solid ${chip.color}`, padding: '1px 4px', overflow: 'hidden' }}>
                            <div style={{ fontSize: 7.5, fontWeight: 700, color: chip.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chip.label}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Browser>
    </ScaledMockup>
  )
}

/* ══════════════════════════════════════════════════════════════
   LISTE PATIENTS
══════════════════════════════════════════════════════════════ */
const PATIENT_LIST = [
  { name: 'Amira Benali',   ddn: '12/03/1985', acte: 'Détartrage',  date: '20 Avr', color: '#38B2AC' },
  { name: 'Karim Mansouri', ddn: '05/07/1972', acte: 'Extraction',   date: '18 Avr', color: '#E34D62' },
  { name: 'Sara Lahlou',    ddn: '28/11/1990', acte: 'Composite',    date: '15 Avr', color: '#EFA52E' },
  { name: 'Youssef Alami',  ddn: '14/02/1968', acte: 'Blanchiment',  date: '10 Avr', color: '#8A6DBB' },
  { name: 'Nadia Karimi',   ddn: '30/06/1995', acte: 'Scellement',   date: '08 Avr', color: '#2BBD68' },
]

export function PatientMockup() {
  return (
    <ScaledMockup naturalHeight={396}>
      <Browser url="app.dentacareapp.com/patients">
        <div style={{ display: 'flex', height: 360, background: '#EEF2F7' }}>
          <Sidebar active={1} />
          <div style={{ flex: 1, padding: '12px 14px', minWidth: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#1C2D3F' }}>Patients <span style={{ background: '#EEF2FF', color: '#6C5CE7', padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 700 }}>247</span></div>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ padding: '4px 10px', borderRadius: 7, fontSize: 9, background: '#fff', color: '#6A7E90', border: '1px solid #DEE5ED' }}>🔍 Rechercher...</div>
                <div style={{ padding: '4px 10px', borderRadius: 7, fontSize: 9, fontWeight: 700, background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)', color: '#fff' }}>+ Nouveau patient</div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #DEE5ED', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 76px 80px 50px 44px', padding: '6px 12px', background: '#F8FAFC', borderBottom: '1px solid #DEE5ED' }}>
                {['', 'Patient', 'Né(e) le', 'Dernier acte', 'Date', ''].map((h, i) => (
                  <div key={i} style={{ fontSize: 8, fontWeight: 700, color: '#6A7E90', textTransform: 'uppercase', letterSpacing: .3 }}>{h}</div>
                ))}
              </div>
              {PATIENT_LIST.map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 76px 80px 50px 44px', padding: '7px 12px', borderBottom: i < 4 ? '1px solid #F8FAFC' : 'none', alignItems: 'center', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFBFF'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: p.color }}>{p.name.split(' ').map(n => n[0]).join('')}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#1C2D3F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 9, color: '#6A7E90' }}>{p.ddn}</div>
                  <div style={{ fontSize: 9, color: '#6A7E90' }}>{p.acte}</div>
                  <div style={{ fontSize: 9, color: '#97ABBD' }}>{p.date}</div>
                  <div style={{ display: 'inline-block', padding: '2px 6px', borderRadius: 8, fontSize: 7, fontWeight: 700, background: '#D4F5E2', color: '#1A6B50' }}>Actif</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Browser>
    </ScaledMockup>
  )
}

/* ══════════════════════════════════════════════════════════════
   DOSSIER PATIENT (detail + onglets + historique actes)
══════════════════════════════════════════════════════════════ */
const ACTES_HIST = [
  { date: '20/04/2026', acte: 'Détartrage + Fluorure', dent: '—',   prix: '350 DH', statut: 'Payé',    sc: '#D4F5E2', st: '#1A6B50' },
  { date: '05/03/2026', acte: 'Composite antérieur',   dent: '21',  prix: '900 DH', statut: 'Payé',    sc: '#D4F5E2', st: '#1A6B50' },
  { date: '10/01/2026', acte: 'Traitement endodontique', dent: '25', prix: '1 400 DH', statut: 'Impayé', sc: '#FDE4E8', st: '#E34D62' },
  { date: '22/11/2025', acte: 'Couronne céramo-métal', dent: '16',  prix: '2 800 DH', statut: 'Payé',   sc: '#D4F5E2', st: '#1A6B50' },
]
const PAT_TABS = ['Actes', 'Paiements', 'RDV', 'Factures', 'Ordonnances', 'Schéma', 'Infos']

export function PatientDetailMockup() {
  return (
    <ScaledMockup naturalHeight={480}>
      <Browser url="app.dentacareapp.com/patients/amira-benali">
        <div style={{ display: 'flex', height: 444, background: '#EEF2F7' }}>
          <Sidebar active={1} />
          <div style={{ flex: 1, padding: '12px 14px', minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

            {/* Breadcrumb */}
            <div style={{ fontSize: 9, color: '#6A7E90', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ cursor: 'pointer', color: '#1B5B7E' }}>← Patients</span>
              <span>/</span>
              <span>Amira Benali</span>
            </div>

            {/* Patient header card */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #DEE5ED', padding: '14px 16px', marginBottom: 10, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {/* Avatar */}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#38B2AC,#1B5B7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18, flexShrink: 0, boxShadow: '0 4px 12px rgba(56,178,172,.35)' }}>AB</div>

                {/* Infos */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#1C2D3F' }}>Amira Benali</span>
                    <span style={{ fontSize: 8, fontWeight: 700, background: '#D4F5E2', color: '#1A6B50', padding: '2px 7px', borderRadius: 20 }}>✓ Traitée</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 9, color: '#6A7E90', flexWrap: 'wrap' }}>
                    <span>📞 +212 6 12 34 56 78</span>
                    <span>🎂 12/03/1985</span>
                    <span>📍 Casablanca</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  <div style={{ padding: '4px 8px', borderRadius: 6, fontSize: 8, fontWeight: 600, background: '#F1F5F9', color: '#6A7E90', border: '1px solid #DEE5ED', cursor: 'pointer' }}>✏️ Modifier</div>
                  <div style={{ padding: '4px 8px', borderRadius: 6, fontSize: 8, fontWeight: 700, background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)', color: '#fff', cursor: 'pointer' }}>+ RDV</div>
                </div>
              </div>

              {/* Financial summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 12, paddingTop: 10, borderTop: '1px solid #EEF2F7' }}>
                {[
                  { l: 'Total à payer', v: '5 450 DH', c: '#1C2D3F' },
                  { l: 'Total reçu',    v: '4 050 DH', c: '#2BBD68' },
                  { l: 'Reste',         v: '1 400 DH', c: '#E34D62' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '8px', background: '#F8FAFC', borderRadius: 8 }}>
                    <div style={{ fontSize: 8, color: '#6A7E90', marginBottom: 2 }}>{s.l}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ background: '#fff', borderRadius: '10px 10px 0 0', borderBottom: '1px solid #DEE5ED', display: 'flex', overflow: 'hidden', flexShrink: 0 }}>
              {PAT_TABS.map((t, i) => (
                <div key={t} style={{ padding: '8px 10px', fontSize: 9, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#1B5B7E' : '#6A7E90', borderBottom: i === 0 ? '2.5px solid #1B5B7E' : '2.5px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t}</div>
              ))}
            </div>

            {/* Actes tab content */}
            <div style={{ flex: 1, background: '#fff', borderRadius: '0 0 10px 10px', border: '1px solid #DEE5ED', borderTop: 'none', overflow: 'hidden' }}>
              {/* Column headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 36px 70px 56px 30px', padding: '6px 12px', background: '#F8FAFC', borderBottom: '1px solid #DEE5ED' }}>
                {['Date', 'Acte', 'Dent', 'Montant', 'Statut', ''].map((h, i) => (
                  <div key={i} style={{ fontSize: 7.5, fontWeight: 700, color: '#6A7E90', textTransform: 'uppercase', letterSpacing: .3 }}>{h}</div>
                ))}
              </div>
              {ACTES_HIST.map((a, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 36px 70px 56px 30px', padding: '8px 12px', borderBottom: i < 3 ? '1px solid #F8FAFC' : 'none', alignItems: 'center' }}>
                  <div style={{ fontSize: 9, color: '#6A7E90' }}>{a.date}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#1C2D3F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.acte}</div>
                  <div style={{ fontSize: 9, color: '#6A7E90', textAlign: 'center' }}>{a.dent}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#1C2D3F' }}>{a.prix}</div>
                  <div style={{ display: 'inline-block', padding: '2px 6px', borderRadius: 8, fontSize: 7.5, fontWeight: 700, background: a.sc, color: a.st }}>{a.statut}</div>
                  <div style={{ fontSize: 12, color: '#97ABBD', textAlign: 'center', cursor: 'pointer' }}>🖨</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Browser>
    </ScaledMockup>
  )
}

/* ══════════════════════════════════════════════════════════════
   ODONTOGRAMME (schéma dentaire interactif)
══════════════════════════════════════════════════════════════ */
const CONDITIONS = {
  sain:       { l: 'Sain',              c: '#FFFFFF', b: '#CBD5E1' },
  carie:      { l: 'Carie',             c: '#FDE68A', b: '#EFA52E' },
  composite:  { l: 'Composite',         c: '#FED7AA', b: '#F97316' },
  couronne:   { l: 'Couronne',          c: '#93C5FD', b: '#3B82F6' },
  endo:       { l: 'Traitement endo',   c: '#DDD6FE', b: '#8B5CF6' },
  extraction: { l: 'À extraire',        c: '#FCA5A5', b: '#EF4444' },
  implant:    { l: 'Implant',           c: '#6EE7B7', b: '#10B981' },
  bridge:     { l: 'Bridge',            c: '#99F6E4', b: '#14B8A6' },
  manquante:  { l: 'Manquante',         c: '#F1F5F9', b: '#94A3B8' },
}
const UPPER = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28]
const LOWER = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38]

// Realistic patient schema
const CHART = {
  16: 'couronne', 22: 'carie', 25: 'endo', 28: 'manquante',
  15: 'composite', 14: 'composite',
  48: 'manquante', 38: 'extraction', 36: 'implant', 34: 'composite',
}

function Tooth({ num, selected }) {
  const cond = CONDITIONS[CHART[num] || 'sain']
  const isSel = selected === num
  return (
    <div style={{
      width: 28, height: 36, borderRadius: 5,
      background: cond.c,
      border: `${isSel ? 2.5 : 1.5}px solid ${isSel ? '#1B5B7E' : cond.b}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
      boxShadow: isSel ? '0 0 0 3px #E6F3F9' : 'none',
      transition: 'all .1s',
    }}>
      <span style={{ fontSize: 8, fontWeight: 700, color: CHART[num] === 'manquante' ? '#94A3B8' : '#334155' }}>{num}</span>
    </div>
  )
}

export function OdontogramMockup() {
  return (
    <ScaledMockup naturalHeight={448}>
      <Browser url="app.dentacareapp.com/patients/amira-benali/schema">
        <div style={{ display: 'flex', height: 412, background: '#EEF2F7' }}>
          <Sidebar active={1} />
          <div style={{ flex: 1, padding: '12px 14px', minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#1C2D3F' }}>Schéma dentaire — Amira Benali</div>
                <div style={{ fontSize: 9, color: '#6A7E90' }}>Mis à jour le 20 Avr 2026</div>
              </div>
              <div style={{ padding: '4px 10px', borderRadius: 6, fontSize: 9, fontWeight: 600, background: '#1B5B7E', color: '#fff', cursor: 'pointer' }}>🖨 Imprimer</div>
            </div>

            {/* Legend */}
            <div style={{ background: '#fff', borderRadius: 8, padding: '8px 10px', border: '1px solid #DEE5ED', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {Object.entries(CONDITIONS).slice(0, 8).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 7px', borderRadius: 5, background: v.c, border: `1.5px solid ${v.b}`, cursor: 'pointer' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 2, background: v.b, flexShrink: 0 }} />
                  <span style={{ fontSize: 7.5, fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>{v.l}</span>
                </div>
              ))}
            </div>

            {/* Dental chart */}
            <div style={{ background: '#fff', borderRadius: 10, padding: '14px 12px', border: '1px solid #DEE5ED', flex: 1 }}>
              {/* Upper jaw */}
              <div style={{ textAlign: 'center', fontSize: 8.5, fontWeight: 700, color: '#6A7E90', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Maxillaire supérieur</div>
              <div style={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'nowrap', marginBottom: 10 }}>
                {UPPER.map(t => <Tooth key={t} num={t} selected={25} />)}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '2px dashed #E2E8F0', margin: '8px 16px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '0 8px', fontSize: 8, color: '#97ABBD', fontWeight: 600 }}>ligne médiane</div>
              </div>

              {/* Lower jaw */}
              <div style={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'nowrap', marginTop: 10, marginBottom: 6 }}>
                {LOWER.map(t => <Tooth key={t} num={t} selected={25} />)}
              </div>
              <div style={{ textAlign: 'center', fontSize: 8.5, fontWeight: 700, color: '#6A7E90', textTransform: 'uppercase', letterSpacing: 1 }}>Mandibule inférieure</div>

              {/* Selected tooth info */}
              <div style={{ marginTop: 10, padding: '8px 12px', background: '#E6F3F9', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 9, color: '#1B5B7E', fontWeight: 600 }}>
                  <strong>Dent #25</strong> — Traitement endodontique
                </span>
                <span style={{ fontSize: 8, color: '#6A7E90' }}>Cliquez une condition ci-dessus pour modifier</span>
              </div>
            </div>
          </div>
        </div>
      </Browser>
    </ScaledMockup>
  )
}

/* ══════════════════════════════════════════════════════════════
   FACTURATION
══════════════════════════════════════════════════════════════ */
const INVOICES = [
  { ref: 'FAC-0042', patient: 'Amira Benali',   acte: 'Détartrage + Fluorure',  montant: '350 DH',   sc: '#D4F5E2', st: '#1A6B50', s: 'Payé' },
  { ref: 'FAC-0041', patient: 'Karim Mansouri',  acte: 'Extraction simple',       montant: '600 DH',   sc: '#D4F5E2', st: '#1A6B50', s: 'Payé' },
  { ref: 'FAC-0040', patient: 'Sara Lahlou',     acte: 'Composite antérieur',     montant: '900 DH',   sc: '#FDE4E8', st: '#E34D62', s: 'Impayé' },
  { ref: 'FAC-0039', patient: 'Youssef Alami',   acte: 'Blanchiment',             montant: '1 800 DH', sc: '#D4F5E2', st: '#1A6B50', s: 'Payé' },
]

export function InvoiceMockup() {
  return (
    <ScaledMockup naturalHeight={396}>
      <Browser url="app.dentacareapp.com/facturation">
        <div style={{ display: 'flex', height: 360, background: '#EEF2F7' }}>
          <Sidebar active={4} />
          <div style={{ flex: 1, padding: '12px 14px', minWidth: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#1C2D3F' }}>Facturation</div>
              <div style={{ padding: '4px 10px', borderRadius: 7, fontSize: 9, fontWeight: 700, background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)', color: '#fff' }}>+ Nouvelle facture</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 10 }}>
              {[
                { l: 'CA ce mois', v: '48 500 DH', c: '#2BBD68', bg: '#D4F5E2' },
                { l: 'En attente', v: '3 200 DH',  c: '#EFA52E', bg: '#FDF2CE' },
                { l: 'Factures',   v: '38',          c: '#6C5CE7', bg: '#EBE5F4' },
              ].map((c, i) => (
                <div key={i} style={{ background: c.bg, borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: c.c }}>{c.v}</div>
                  <div style={{ fontSize: 8, color: '#6A7E90', marginTop: 2 }}>{c.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #DEE5ED', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '58px 1fr 70px 48px 22px', padding: '6px 10px', background: '#F8FAFC', borderBottom: '1px solid #DEE5ED' }}>
                {['Réf.', 'Patient / Acte', 'Montant', 'Statut', ''].map((h, i) => (
                  <div key={i} style={{ fontSize: 7.5, fontWeight: 700, color: '#6A7E90', textTransform: 'uppercase', letterSpacing: .3 }}>{h}</div>
                ))}
              </div>
              {INVOICES.map((f, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '58px 1fr 70px 48px 22px', padding: '7px 10px', borderBottom: i < 3 ? '1px solid #F8FAFC' : 'none', alignItems: 'center' }}>
                  <div style={{ color: '#1B5B7E', fontWeight: 700, fontSize: 8.5 }}>{f.ref}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1C2D3F', fontSize: 9.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.patient}</div>
                    <div style={{ color: '#6A7E90', fontSize: 8 }}>{f.acte}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: '#1C2D3F', fontSize: 10 }}>{f.montant}</div>
                  <div style={{ display: 'inline-block', padding: '2px 5px', borderRadius: 7, fontSize: 7.5, fontWeight: 700, background: f.sc, color: f.st }}>{f.s}</div>
                  <div style={{ fontSize: 11, color: '#97ABBD', textAlign: 'center', cursor: 'pointer' }}>🖨</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Browser>
    </ScaledMockup>
  )
}
