import { DashboardMockup } from './AppMockup'

export default function Hero({ content }) {
  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: 80,
      background: 'linear-gradient(160deg, #EFF6FB 0%, #F7FAFC 40%, #fff 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle teal circle top-right */}
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,178,172,.10) 0%, transparent 65%)',
        top: -200, right: -200, pointerEvents: 'none',
      }} />
      {/* Navy circle bottom-left */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,91,126,.08) 0%, transparent 65%)',
        bottom: -100, left: -100, pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ maxWidth: 760, textAlign: 'center', padding: '80px 5% 0', position: 'relative', zIndex: 1, animation: 'fadeUp .6s ease both' }}>

        {/* Live badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#fff', border: '1.5px solid #E2E8F0',
          borderRadius: 100, padding: '6px 16px', marginBottom: 28,
          boxShadow: '0 2px 12px rgba(0,0,0,.06)',
          animation: 'badge-pop .5s ease both',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', flexShrink: 0, boxShadow: '0 0 0 3px rgba(16,185,129,.2)' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0C1E38' }}>Logiciel 100 % cloud pour cabinets dentaires</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 66px)', fontWeight: 900,
          lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 24,
          color: '#0C1E38',
        }}>
          {content?.hero_title || <>Gérez votre cabinet<br /><span className="g-text">sans effort</span></>}
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)', color: '#64748B',
          maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.7,
          animation: 'fadeUp .6s ease .15s both',
        }}>
          {content?.hero_subtitle || 'DentaCare centralise vos patients, rendez-vous, factures et ordonnances dans une application moderne et sécurisée.'}
        </p>

        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 56, animation: 'fadeUp .6s ease .25s both',
        }}>
          <a href="#demo" style={{
            padding: '14px 32px', borderRadius: 11,
            background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)',
            color: '#fff', fontSize: 15, fontWeight: 700,
            boxShadow: '0 6px 24px rgba(27,91,126,.35)',
            transition: 'transform .2s, box-shadow .2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(27,91,126,.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(27,91,126,.35)' }}
          >
            {content?.hero_cta || 'Demander une démo gratuite'} →
          </a>
          <a href="https://app.dentacareapp.com" target="_blank" rel="noopener" style={{
            padding: '14px 28px', borderRadius: 11,
            background: '#fff', border: '1.5px solid #E2E8F0',
            color: '#0C1E38', fontSize: 15, fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,.06)',
            transition: 'border-color .2s, transform .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1B5B7E'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = '' }}
          >Accéder à l'application</a>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div style={{
        width: '90%', maxWidth: 1000,
        position: 'relative', zIndex: 1,
        animation: 'fadeUp .8s ease .35s both',
      }}>
        <DashboardMockup />
        {/* Gradient fade at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to top, #F7FAFC, transparent)',
          borderRadius: '0 0 14px 14px', pointerEvents: 'none',
        }} />
      </div>

      {/* Trust strip */}
      <div style={{
        width: '100%', padding: '28px 5%',
        display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap',
        borderTop: '1px solid #F1F5F9', marginTop: 0,
        background: '#fff', position: 'relative', zIndex: 1,
      }}>
        {[
          { value: '+50', label: 'Cabinets actifs' },
          { value: '99.9%', label: 'Disponibilité' },
          { value: '< 2s', label: 'Temps de réponse' },
          { value: 'RGPD', label: 'Données protégées' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#1B5B7E' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
