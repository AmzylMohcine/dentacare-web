import { DashboardMockup } from './AppMockup'

const TRUST = [
  { value: '+50',   label: 'Cabinets actifs' },
  { value: '99.9%', label: 'Disponibilité' },
  { value: '< 2s',  label: 'Temps de réponse' },
  { value: 'RGPD',  label: 'Données protégées' },
]

export default function Hero({ content }) {
  return (
    <section style={{
      paddingTop: 64,
      background: 'linear-gradient(160deg,#EFF6FB 0%,#F7FAFC 50%,#fff 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Blobs */}
      <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,178,172,.10),transparent 65%)', top:-200, right:-150, pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(27,91,126,.07),transparent 65%)', bottom:-100, left:-100, pointerEvents:'none' }} />

      {/* Hero text */}
      <div style={{ width:'100%', maxWidth:740, textAlign:'center', padding:'72px 20px 0', position:'relative', zIndex:1, animation:'fadeUp .6s ease both' }}>

        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'#fff', border:'1.5px solid #E2E8F0',
          borderRadius:100, padding:'6px 16px', marginBottom:28,
          boxShadow:'0 2px 12px rgba(0,0,0,.06)',
          animation:'badge-pop .5s ease both',
        }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#10B981', flexShrink:0, boxShadow:'0 0 0 3px rgba(16,185,129,.2)' }} />
          <span style={{ fontSize:12, fontWeight:700, color:'#0C1E38' }}>Logiciel 100 % cloud pour cabinets dentaires</span>
        </div>

        <h1 style={{ fontSize:'clamp(32px,6vw,64px)', fontWeight:900, lineHeight:1.1, letterSpacing:-1.5, marginBottom:20, color:'#0C1E38' }}>
          {content?.hero_title || <><span>Gérez votre cabinet</span><br /><span className="g-text">sans effort</span></>}
        </h1>

        <p style={{ fontSize:'clamp(15px,2vw,18px)', color:'#64748B', maxWidth:520, margin:'0 auto 36px', lineHeight:1.75 }}>
          {content?.hero_subtitle || 'DentaCare centralise vos patients, rendez-vous, factures et ordonnances dans une application moderne et sécurisée.'}
        </p>

        <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:56 }}>
          <a href="#demo" style={{
            padding:'13px 28px', borderRadius:10,
            background:'linear-gradient(135deg,#1B5B7E,#38B2AC)',
            color:'#fff', fontSize:14, fontWeight:700,
            boxShadow:'0 6px 24px rgba(27,91,126,.35)',
            transition:'transform .2s,box-shadow .2s',
            whiteSpace:'nowrap',
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 32px rgba(27,91,126,.45)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 6px 24px rgba(27,91,126,.35)'}}
          >{content?.hero_cta || 'Demander une démo gratuite'} →</a>

          <a href="https://app.dentacareapp.com" target="_blank" rel="noopener" style={{
            padding:'13px 24px', borderRadius:10,
            background:'#fff', border:'1.5px solid #E2E8F0',
            color:'#0C1E38', fontSize:14, fontWeight:600,
            boxShadow:'0 2px 8px rgba(0,0,0,.06)',
            transition:'border-color .2s,transform .2s',
            whiteSpace:'nowrap',
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#1B5B7E';e.currentTarget.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.transform=''}}
          >Accéder à l'application</a>
        </div>
      </div>

      {/* Dashboard mockup — scales automatically */}
      <div className="hero-mockup-wrap" style={{ position:'relative', zIndex:1 }}>
        <DashboardMockup />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(to top,#F7FAFC,transparent)', borderRadius:'0 0 14px 14px', pointerEvents:'none' }} />
      </div>

      {/* Trust strip */}
      <div style={{ width:'100%', background:'#fff', borderTop:'1px solid #F1F5F9', marginTop:0, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:800, margin:'0 auto', padding:'24px 20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'16px 32px' }}>
          {TRUST.map((s,i) => (
            <div key={i} style={{ textAlign:'center', minWidth:80 }}>
              <div style={{ fontSize:20, fontWeight:900, color:'#1B5B7E' }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#94A3B8', fontWeight:500, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-mockup-wrap {
          width: 92%;
          max-width: 1000px;
        }
        @media (max-width: 640px) {
          .hero-mockup-wrap { width: 96%; }
        }
        @media (max-width: 480px) {
          .hero-mockup-wrap { width: 100%; padding: 0 8px; box-sizing: border-box; }
        }
      `}</style>
    </section>
  )
}
