import { useInView } from '../hooks/useInView'

const CHECKS = [
  'Données hébergées et sécurisées (RGPD)',
  'Chiffrement SSL de bout en bout',
  'Sauvegardes automatiques quotidiennes',
  'Support réactif en français et en arabe',
  'Mises à jour continues sans interruption',
]

export default function About({ content }) {
  const [leftRef, leftInView] = useInView()
  const [rightRef, rightInView] = useInView()

  return (
    <section id="about" style={{ padding: '100px 5%', background: '#fff' }}>
      <div style={{
        maxWidth: 1060, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'center',
      }}>
        {/* Left — text */}
        <div ref={leftRef}>
          <div className={`s-badge reveal${leftInView ? ' on' : ''}`}>À PROPOS</div>
          <h2 className={`reveal delay-1${leftInView ? ' on' : ''}`} style={{
            fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800,
            color: '#0C1E38', lineHeight: 1.2, letterSpacing: -.5, marginBottom: 18,
          }}>
            {content?.about_title || 'Conçu pour les cabinets dentaires modernes'}
          </h2>
          <p className={`reveal delay-2${leftInView ? ' on' : ''}`} style={{
            fontSize: 16, color: '#64748B', lineHeight: 1.8, marginBottom: 28,
          }}>
            {content?.about_text || 'DentaCare est né d\'un besoin réel : simplifier le quotidien des praticiens et de leurs équipes. Plus de paperasse, plus de doubles saisies — tout est centralisé, sécurisé et accessible.'}
          </p>
          <ul className={`reveal delay-3${leftInView ? ' on' : ''}`} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHECKS.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: '#DCFCE7', border: '1px solid #86EFAC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: '#15803D', fontWeight: 800,
                }}>✓</div>
                <span style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — stats */}
        <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Main card */}
          <div className={`reveal${rightInView ? ' on' : ''}`} style={{
            background: 'linear-gradient(135deg,#0C1E38,#1B5B7E)',
            borderRadius: 20, padding: '40px 36px', color: '#fff',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(12,30,56,.25)',
          }}>
            {/* Teal glow */}
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56,178,172,.3), transparent 70%)',
            }} />
            <div style={{ fontSize: 48, marginBottom: 12 }}>🦷</div>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1 }}>+50</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>cabinets nous font confiance</div>
            <div style={{ marginTop: 24, padding: '14px', background: 'rgba(255,255,255,.07)', borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.8)' }}>
              🔗 app.dentacareapp.com
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[
              { v: '99.9%', l: 'Disponibilité', c: '#10B981', bg: '#F0FDF4' },
              { v: '< 2s', l: 'Réponse', c: '#0EA5E9', bg: '#F0F9FF' },
              { v: '5 ⭐', l: 'Satisfaction', c: '#F59E0B', bg: '#FFFBEB' },
            ].map((s, i) => (
              <div key={i} className={`reveal delay-${i + 1}${rightInView ? ' on' : ''}`} style={{
                background: s.bg, borderRadius: 14, padding: '18px 12px',
                textAlign: 'center', border: `1.5px solid ${s.c}25`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}
