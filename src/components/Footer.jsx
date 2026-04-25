export default function Footer({ onAdmin }) {
  return (
    <footer style={{ background: '#0C1E38', color: '#fff' }}>
      {/* CTA strip */}
      <div style={{
        padding: '60px 5%', textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        background: 'linear-gradient(135deg,#0C1E38,#1B5B7E)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,178,172,.15), transparent 70%)',
          top: -100, right: -100, pointerEvents: 'none',
        }} />
        <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 1, marginBottom: 14 }}>PRÊT À COMMENCER ?</div>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, marginBottom: 12, letterSpacing: -.4 }}>
          Rejoignez les cabinets qui font confiance à DentaCare
        </h2>
        <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 16, marginBottom: 32 }}>Démo gratuite · Sans engagement · Réponse en 24h</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#demo" style={{
            padding: '13px 30px', borderRadius: 10,
            background: '#38B2AC', color: '#fff',
            fontSize: 15, fontWeight: 700,
            boxShadow: '0 4px 20px rgba(56,178,172,.4)',
            transition: 'transform .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >Demander une démo →</a>
          <a href="https://app.dentacareapp.com" target="_blank" rel="noopener" style={{
            padding: '13px 28px', borderRadius: 10,
            background: 'rgba(255,255,255,.1)', color: '#fff',
            border: '1px solid rgba(255,255,255,.2)',
            fontSize: 15, fontWeight: 600,
            transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
          >Accéder à l'application</a>
        </div>
      </div>

      {/* Footer body */}
      <div style={{ padding: '48px 5%', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 48, marginBottom: 40, flexWrap: 'wrap' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#38B2AC,#1B5B7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🦷</div>
              <span style={{ fontWeight: 800, fontSize: 16 }}>DentaCare</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, maxWidth: 260 }}>
              La solution SaaS complète pour la gestion de votre cabinet dentaire. Simple, sécurisée, accessible partout.
            </p>
            <div style={{ marginTop: 16, fontSize: 13, color: '#38B2AC', fontWeight: 600 }}>
              🔗 app.dentacareapp.com
            </div>
          </div>

          {/* Product */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Produit</div>
            {['Fonctionnalités', 'Agenda', 'Patients', 'Facturation', 'Imagerie'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <a href="#features" style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', transition: 'color .15s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.45)'}
                >{l}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Contact</div>
            {['Demander une démo', 'contact@dentacareapp.com', 'Support', 'À propos'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,.45)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.25)' }}>© 2026 DentaCare — Tous droits réservés</span>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.25)' }}>Politique de confidentialité</span>
            <button onClick={onAdmin} style={{
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,.04)', fontSize: 10, cursor: 'pointer',
            }}>admin</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:last-child > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}
