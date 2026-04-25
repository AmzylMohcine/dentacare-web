/* Accurate replica of the real app UI — used across hero & feature sections */

const NAV = [
  { icon: '🏠', label: 'Accueil' },
  { icon: '👥', label: 'Patients' },
  { icon: '📅', label: 'Rendez-vous' },
  { icon: '🦷', label: 'Salle' },
  { icon: '🧾', label: 'Facturation' },
  { icon: '💊', label: 'Pharmacie' },
  { icon: '🖼️', label: 'Imagerie' },
  { icon: '📊', label: 'Stats' },
  { icon: '⚙️', label: 'Paramètres' },
]

const STATS = [
  { label: 'RDV sur la période', value: '89', sub: '12 en attente', grad: 'linear-gradient(135deg,#6C5CE7,#A78BFA)', glow: '#6C5CE7' },
  { label: 'Terminés', value: '67', sub: '22 restants', grad: 'linear-gradient(135deg,#10B981,#34D399)', glow: '#10B981' },
  { label: 'Patients vus', value: '247', sub: '43 traités', grad: 'linear-gradient(135deg,#0EA5E9,#38BDF8)', glow: '#0EA5E9' },
  { label: "Chiffre d'affaires", value: '48 500 DH', sub: '3 200 DH impayé', grad: 'linear-gradient(135deg,#F59E0B,#FCD34D)', glow: '#F59E0B' },
]

const RDV_LIST = [
  { name: 'Amira Benali', act: 'Détartrage', time: '09:00', color: '#38B2AC' },
  { name: 'Karim Mansouri', act: 'Extraction', time: '10:30', color: '#F87171' },
  { name: 'Sara Lahlou', act: 'Composite', time: '14:00', color: '#FBBF24' },
  { name: 'Youssef Alami', act: 'Blanchiment', time: '15:30', color: '#818CF8' },
]

function Sidebar({ active = 0, collapsed = false }) {
  return (
    <div style={{
      width: collapsed ? 46 : 200, flexShrink: 0,
      background: '#0C1E38', display: 'flex', flexDirection: 'column',
      padding: '12px 0', overflow: 'hidden',
      transition: 'width .3s',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 16px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg,#38B2AC,#1B5B7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🦷</div>
        {!collapsed && <span style={{ color: '#fff', fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>DentaCare<br /><span style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', fontWeight: 400 }}>Cabinet Principal</span></span>}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {NAV.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 12px', margin: '0 6px', borderRadius: 7,
            background: i === active ? '#1B3D6A' : 'transparent',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span style={{ fontSize: 11, fontWeight: i === active ? 700 : 500, color: i === active ? '#fff' : 'rgba(255,255,255,.4)', whiteSpace: 'nowrap' }}>{item.label}</span>}
          </div>
        ))}
      </div>

      {/* User badge */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#38B2AC,#1B5B7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>👨‍⚕️</div>
        {!collapsed && <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>Dr. Alami</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>Propriétaire</div>
        </div>}
      </div>
    </div>
  )
}

export function DashboardMockup({ scale = 1 }) {
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: `${100 / scale}%` }}>
      <Browser url="app.dentacareapp.com">
        <div style={{ display: 'flex', height: 420, overflow: 'hidden', background: '#F7FAFC' }}>
          <Sidebar active={0} />
          <div style={{ flex: 1, padding: 18, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0C1E38' }}>Tableau de bord</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>Aujourd'hui, 25 Avril 2026</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Aujourd\'hui', 'Semaine', 'Mois'].map((f, i) => (
                  <div key={f} style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                    background: i === 2 ? '#1B5B7E' : '#fff',
                    color: i === 2 ? '#fff' : '#64748B',
                    border: `1px solid ${i === 2 ? '#1B5B7E' : '#E2E8F0'}`,
                  }}>{f}</div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 14 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{
                  borderRadius: 12, padding: '14px 14px',
                  background: s.grad, color: '#fff',
                  boxShadow: `0 6px 18px ${s.glow}30`,
                }}>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ fontSize: 9, opacity: .8, marginTop: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 9, opacity: .6, marginTop: 3 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 12 }}>
              {/* RDV list */}
              <div style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>RDV DU JOUR</div>
                {RDV_LIST.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < 3 ? '1px solid #F8FAFC' : 'none' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: `${r.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: r.color, flexShrink: 0 }}>
                      {r.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#0C1E38' }}>{r.name}</div>
                      <div style={{ fontSize: 9, color: '#94A3B8' }}>{r.time} · {r.act}</div>
                    </div>
                    <div style={{ width: 3, height: 24, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                  </div>
                ))}
              </div>
              {/* Quick actions */}
              <div style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>ACCÈS RAPIDE</div>
                {[
                  { icon: '📅', label: 'Nouveau RDV', color: '#6C5CE7' },
                  { icon: '👤', label: 'Nouveau patient', color: '#0EA5E9' },
                  { icon: '🧾', label: 'Facture', color: '#10B981' },
                  { icon: '💊', label: 'Ordonnance', color: '#F59E0B' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 7, marginBottom: 4, background: `${a.color}10`, cursor: 'pointer' }}>
                    <span style={{ fontSize: 13 }}>{a.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: a.color }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Browser>
    </div>
  )
}

export function AgendaMockup() {
  const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  const DAYS = ['Lun 21', 'Mar 22', 'Mer 23', 'Jeu 24', 'Ven 25']
  const CHIPS = [
    { day: 0, h: 0, label: 'Amira B. — Détartrage', color: '#38B2AC', span: 1 },
    { day: 0, h: 2, label: 'Karim M. — Extraction', color: '#F87171', span: 1 },
    { day: 1, h: 1, label: 'Sara L. — Composite', color: '#FBBF24', span: 2 },
    { day: 2, h: 3, label: 'Youssef A. — Blanchiment', color: '#818CF8', span: 1 },
    { day: 3, h: 0, label: 'Nadia K. — Scellement', color: '#34D399', span: 1 },
    { day: 4, h: 2, label: 'Omar B. — Détartrage', color: '#38B2AC', span: 1 },
  ]
  return (
    <Browser url="app.dentacareapp.com/rendez-vous">
      <div style={{ display: 'flex', height: 380, overflow: 'hidden', background: '#F7FAFC' }}>
        <Sidebar active={2} collapsed />
        <div style={{ flex: 1, padding: '12px 14px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0C1E38' }}>Agenda — Semaine du 21 Avril</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['◀', 'Aujourd\'hui', '▶'].map(l => (
                <div key={l} style={{ padding: '3px 9px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0', cursor: 'pointer' }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '40px repeat(5,1fr)', background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ borderBottom: '1px solid #F1F5F9' }} />
            {DAYS.map(d => (
              <div key={d} style={{ padding: '6px 4px', borderBottom: '1px solid #F1F5F9', borderLeft: '1px solid #F1F5F9', textAlign: 'center', fontSize: 9, fontWeight: 700, color: d === 'Ven 25' ? '#1B5B7E' : '#64748B', background: d === 'Ven 25' ? '#E6F3F9' : 'transparent' }}>{d}</div>
            ))}
            {/* Hours */}
            {HOURS.map((h, hi) => (
              <>
                <div key={`h${h}`} style={{ fontSize: 8, color: '#CBD5E1', padding: '0 4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: 32, borderBottom: '1px solid #F8FAFC' }}>{h}:00</div>
                {DAYS.map((_, di) => {
                  const chip = CHIPS.find(c => c.day === di && c.h === hi)
                  return (
                    <div key={`c${di}`} style={{ borderLeft: '1px solid #F8FAFC', borderBottom: '1px solid #F8FAFC', height: 32, position: 'relative', background: di === 4 && h === 25 ? '#EFF6FB' : 'transparent' }}>
                      {chip && (
                        <div style={{
                          position: 'absolute', inset: '2px 3px', borderRadius: 4,
                          background: `${chip.color}20`, borderLeft: `3px solid ${chip.color}`,
                          padding: '1px 4px', zIndex: 1,
                        }}>
                          <div style={{ fontSize: 8, fontWeight: 600, color: chip.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chip.label}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  )
}

export function PatientMockup() {
  const PATIENTS = [
    { name: 'Amira Benali', ddn: '12/03/1985', dernier: 'Détartrage', date: '20 Avr', color: '#38B2AC', badge: 'Actif' },
    { name: 'Karim Mansouri', ddn: '05/07/1972', dernier: 'Extraction', date: '18 Avr', color: '#F87171', badge: 'Actif' },
    { name: 'Sara Lahlou', ddn: '28/11/1990', dernier: 'Composite', date: '15 Avr', color: '#FBBF24', badge: 'RDV' },
    { name: 'Youssef Alami', ddn: '14/02/1968', dernier: 'Blanchiment', date: '10 Avr', color: '#818CF8', badge: 'Actif' },
    { name: 'Nadia Karimi', ddn: '30/06/1995', dernier: 'Scellement', date: '08 Avr', color: '#34D399', badge: 'Actif' },
  ]
  return (
    <Browser url="app.dentacareapp.com/patients">
      <div style={{ display: 'flex', height: 360, overflow: 'hidden', background: '#F7FAFC' }}>
        <Sidebar active={1} collapsed />
        <div style={{ flex: 1, padding: '12px 16px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0C1E38' }}>Patients <span style={{ background: '#EEF2FF', color: '#6C5CE7', padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 700 }}>247</span></div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ padding: '5px 12px', borderRadius: 7, fontSize: 10, fontWeight: 600, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }}>🔍 Rechercher...</div>
              <div style={{ padding: '5px 12px', borderRadius: 7, fontSize: 10, fontWeight: 700, background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)', color: '#fff' }}>+ Nouveau</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 80px 60px 60px', padding: '7px 12px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['', 'Patient', 'Né(e) le', 'Dernier acte', 'Date', ''].map((h, i) => (
                <div key={i} style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {PATIENTS.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 80px 60px 60px', padding: '8px 12px', borderBottom: i < 4 ? '1px solid #F8FAFC' : 'none', alignItems: 'center', cursor: 'pointer', transition: 'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFBFF'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 24, height: 24, borderRadius: 7, background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: p.color }}>{p.name.split(' ').map(n => n[0]).join('')}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0C1E38' }}>{p.name}</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>{p.ddn}</div>
                <div style={{ fontSize: 10, color: '#64748B' }}>{p.dernier}</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>{p.date}</div>
                <div style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 10, fontSize: 8, fontWeight: 700, background: '#DCFCE7', color: '#15803D' }}>{p.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  )
}

export function InvoiceMockup() {
  return (
    <Browser url="app.dentacareapp.com/facturation">
      <div style={{ display: 'flex', height: 360, overflow: 'hidden', background: '#F7FAFC' }}>
        <Sidebar active={4} collapsed />
        <div style={{ flex: 1, padding: '12px 16px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0C1E38' }}>Facturation</div>
            <div style={{ padding: '5px 12px', borderRadius: 7, fontSize: 10, fontWeight: 700, background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)', color: '#fff' }}>+ Nouvelle facture</div>
          </div>
          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 14 }}>
            {[
              { label: 'CA ce mois', value: '48 500 DH', color: '#10B981', bg: '#DCFCE7' },
              { label: 'En attente', value: '3 200 DH', color: '#F59E0B', bg: '#FEF3C7' },
              { label: 'Factures émises', value: '38', color: '#6C5CE7', bg: '#EDE9FE' },
            ].map((c, i) => (
              <div key={i} style={{ background: c.bg, borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: c.color }}>{c.value}</div>
                <div style={{ fontSize: 9, color: '#64748B', marginTop: 2 }}>{c.label}</div>
              </div>
            ))}
          </div>
          {/* Invoice list */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            {[
              { ref: 'FAC-0042', patient: 'Amira Benali', acte: 'Détartrage + Fluorure', montant: '350 DH', statut: 'Payé', sc: '#DCFCE7', st: '#15803D' },
              { ref: 'FAC-0041', patient: 'Karim Mansouri', acte: 'Extraction simple', montant: '600 DH', statut: 'Payé', sc: '#DCFCE7', st: '#15803D' },
              { ref: 'FAC-0040', patient: 'Sara Lahlou', acte: 'Composite antérieur', montant: '900 DH', statut: 'Impayé', sc: '#FEF3C7', st: '#92400E' },
              { ref: 'FAC-0039', patient: 'Youssef Alami', acte: 'Blanchiment', montant: '1 800 DH', statut: 'Payé', sc: '#DCFCE7', st: '#15803D' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 100px 70px 60px', padding: '8px 12px', borderBottom: i < 3 ? '1px solid #F8FAFC' : 'none', alignItems: 'center', fontSize: 10 }}>
                <div style={{ color: '#1B5B7E', fontWeight: 700 }}>{f.ref}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#0C1E38', fontSize: 10 }}>{f.patient}</div>
                  <div style={{ color: '#94A3B8', fontSize: 9 }}>{f.acte}</div>
                </div>
                <div style={{ fontWeight: 700, color: '#0C1E38' }}>{f.montant}</div>
                <div style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 10, fontSize: 8, fontWeight: 700, background: f.sc, color: f.st }}>{f.statut}</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, cursor: 'pointer' }}>🖨</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  )
}

function Browser({ url, children }) {
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.18)', border: '1px solid #E2E8F0' }}>
      {/* Chrome bar */}
      <div style={{ background: '#F1F5F9', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 6, padding: '4px 12px', fontSize: 10, color: '#64748B', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#10B981', fontSize: 9 }}>🔒</span>
          <span>{url}</span>
        </div>
      </div>
      {children}
    </div>
  )
}
