import { useInView } from '../hooks/useInView'

const CHECKS = [
  'Données hébergées et sécurisées (RGPD)',
  'Chiffrement SSL de bout en bout',
  'Sauvegardes automatiques quotidiennes',
  'Support réactif en français et en arabe',
  'Mises à jour continues sans interruption',
]

const STATS = [
  { v: '99.9%', l: 'Disponibilité', c: '#10B981', bg: '#F0FDF4' },
  { v: '< 2s',  l: 'Réponse',       c: '#0EA5E9', bg: '#F0F9FF' },
  { v: '5 ⭐',  l: 'Satisfaction',  c: '#F59E0B', bg: '#FFFBEB' },
]

export default function About({ content }) {
  const [leftRef,  leftInView]  = useInView()
  const [rightRef, rightInView] = useInView()

  return (
    <section id="about" style={{ padding:'100px 5%', background:'#fff' }}>
      <div className="about-grid">

        {/* Left */}
        <div ref={leftRef}>
          <div className={`s-badge reveal${leftInView ? ' on' : ''}`}>À PROPOS</div>
          <h2 className={`reveal delay-1${leftInView ? ' on' : ''}`} style={{ fontSize:'clamp(24px,3.5vw,38px)', fontWeight:800, color:'#0C1E38', lineHeight:1.2, letterSpacing:-.4, marginBottom:16 }}>
            {content?.about_title || 'Conçu pour les cabinets dentaires modernes'}
          </h2>
          <p className={`reveal delay-2${leftInView ? ' on' : ''}`} style={{ fontSize:15, color:'#64748B', lineHeight:1.8, marginBottom:24 }}>
            {content?.about_text || 'DentaCare est né d\'un besoin réel : simplifier le quotidien des praticiens et de leurs équipes. Plus de paperasse, plus de doubles saisies — tout est centralisé, sécurisé et accessible.'}
          </p>
          <ul className={`reveal delay-3${leftInView ? ' on' : ''}`} style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
            {CHECKS.map((item, i) => (
              <li key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, background:'#DCFCE7', border:'1px solid #86EFAC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#15803D', fontWeight:800 }}>✓</div>
                <span style={{ fontSize:14, color:'#334155', fontWeight:500 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div ref={rightRef} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className={`reveal${rightInView ? ' on' : ''}`} style={{
            background:'linear-gradient(135deg,#0C1E38,#1B5B7E)',
            borderRadius:18, padding:'36px 28px', color:'#fff', textAlign:'center',
            position:'relative', overflow:'hidden',
            boxShadow:'0 16px 48px rgba(12,30,56,.22)',
          }}>
            <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,178,172,.25),transparent 70%)' }} />
            <div style={{ fontSize:44, marginBottom:10 }}>🦷</div>
            <div style={{ fontSize:42, fontWeight:900, letterSpacing:-1 }}>+200</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,.55)', marginTop:4 }}>cabinets nous font confiance</div>
            <div style={{ marginTop:20, padding:'12px', background:'rgba(255,255,255,.08)', borderRadius:10, fontSize:12, fontWeight:600, color:'rgba(255,255,255,.7)' }}>
              🔗 app.dentacareapp.com
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {STATS.map((s, i) => (
              <div key={i} className={`reveal delay-${i + 1}${rightInView ? ' on' : ''}`} style={{ background:s.bg, borderRadius:12, padding:'16px 10px', textAlign:'center', border:`1.5px solid ${s.c}25` }}>
                <div style={{ fontSize:20, fontWeight:800, color:s.c }}>{s.v}</div>
                <div style={{ fontSize:10, color:'#94A3B8', marginTop:4, fontWeight:500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          max-width: 1060px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          #about { padding: 64px 5% !important; }
        }
        @media (max-width: 480px) {
          #about { padding: 48px 20px !important; }
        }
      `}</style>
    </section>
  )
}
