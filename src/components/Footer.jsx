export default function Footer() {
  return (
    <footer style={{ background: '#0C1E38', color: '#fff' }}>

      {/* CTA strip */}
      <div style={{ padding:'60px 20px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,.07)', background:'linear-gradient(135deg,#0C1E38,#1B5B7E)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,178,172,.14),transparent 70%)', top:-80, right:-80, pointerEvents:'none' }} />
        <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,.45)', letterSpacing:1, marginBottom:12 }}>PRÊT À COMMENCER ?</div>
        <h2 style={{ fontSize:'clamp(20px,3.5vw,36px)', fontWeight:800, marginBottom:10, letterSpacing:-.3, maxWidth:600, margin:'0 auto 10px' }}>
          Rejoignez les cabinets qui font confiance à DentaCare
        </h2>
        <p style={{ color:'rgba(255,255,255,.5)', fontSize:15, marginBottom:28, marginTop:10 }}>Démo gratuite · Sans engagement · Réponse en 24h</p>
        <div className="footer-ctas">
          <a href="#demo" className="footer-btn-pri">Demander une démo →</a>
          <a href="https://app.dentacareapp.com" target="_blank" rel="noopener" className="footer-btn-sec">Accéder à l'application</a>
        </div>
      </div>

      {/* Footer links */}
      <div style={{ padding:'44px 5% 0', maxWidth:1100, margin:'0 auto' }}>
        <div className="footer-cols">

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:14 }}>
              <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#38B2AC,#1B5B7E)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🦷</div>
              <span style={{ fontWeight:800, fontSize:15 }}>DentaCare</span>
            </div>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.38)', lineHeight:1.7, maxWidth:240 }}>
              La solution SaaS complète pour la gestion de votre cabinet dentaire.
            </p>
            <div style={{ marginTop:14, fontSize:12, color:'#38B2AC', fontWeight:600 }}>🔗 app.dentacareapp.com</div>
          </div>

          {/* Produit */}
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.28)', textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Produit</div>
            {['Fonctionnalités', 'Agenda', 'Patients', 'Facturation', 'Imagerie'].map(l => (
              <div key={l} style={{ marginBottom:9 }}>
                <a href="#features" style={{ fontSize:13, color:'rgba(255,255,255,.42)', transition:'color .15s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.42)'}
                >{l}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.28)', textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Contact</div>
            {['Demander une démo', 'contact@dentacareapp.com', 'Support', 'À propos'].map(l => (
              <div key={l} style={{ marginBottom:9 }}>
                <span style={{ fontSize:13, color:'rgba(255,255,255,.42)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span style={{ fontSize:12, color:'rgba(255,255,255,.22)' }}>© 2026 DentaCare — Tous droits réservés</span>
          <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,.22)' }}>Politique de confidentialité</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-ctas {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .footer-btn-pri {
          padding: 12px 26px;
          border-radius: 9px;
          background: #38B2AC;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 4px 18px rgba(56,178,172,.38);
          transition: transform .15s;
          white-space: nowrap;
        }
        .footer-btn-pri:hover { transform: translateY(-2px); }
        .footer-btn-sec {
          padding: 12px 24px;
          border-radius: 9px;
          background: rgba(255,255,255,.09);
          color: #fff;
          border: 1px solid rgba(255,255,255,.18);
          font-size: 14px;
          font-weight: 600;
          transition: background .15s;
          white-space: nowrap;
        }
        .footer-btn-sec:hover { background: rgba(255,255,255,.16); }

        .footer-cols {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 36px;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,.07);
          padding: 22px 0 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        @media (max-width: 720px) {
          .footer-cols {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-cols {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .footer-ctas {
            flex-direction: column;
            align-items: stretch;
            padding: 0 20px;
          }
          .footer-btn-pri, .footer-btn-sec {
            text-align: center;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </footer>
  )
}
