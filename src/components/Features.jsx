import { useInView } from '../hooks/useInView'
import { AgendaMockup, PatientMockup, InvoiceMockup } from './AppMockup'

const FEATURES_GRID = [
  { icon: '🔒', title: 'Multi-utilisateurs & rôles', desc: 'Propriétaire, médecin, assistante — chacun son espace avec les droits adaptés.' },
  { icon: '☁️', title: '100 % Cloud', desc: 'Accessible depuis n\'importe quel appareil, partout. Données sauvegardées en temps réel.' },
  { icon: '💊', title: 'Ordonnances & Devis', desc: 'Génération en un clic avec impression PDF. Modèles personnalisables.' },
  { icon: '🖼️', title: 'Imagerie dentaire', desc: 'Stockez et organisez les radiographies et photos par patient.' },
  { icon: '📩', title: 'WhatsApp intégré', desc: 'Rappels de RDV automatiques par WhatsApp depuis l\'application.' },
  { icon: '📜', title: 'Certificats médicaux', desc: 'Générez vos certificats personnalisés et imprimez-les en un clic.' },
]

const SECTIONS = [
  {
    badge: 'AGENDA',
    title: 'Un calendrier pensé pour votre cabinet',
    desc: 'Vue semaine et mois, glisser-déposer, couleurs par type d\'acte. Créez un rendez-vous en 2 clics, directement depuis le calendrier.',
    points: ['Vue semaine / mois / liste', 'Coloration par type d\'acte', 'Rappels WhatsApp automatiques', 'Blocage des créneaux passés'],
    mockup: <AgendaMockup />,
    flip: false,
  },
  {
    badge: 'PATIENTS',
    title: 'Dossiers patients complets et centralisés',
    desc: 'Toute l\'histoire médicale de chaque patient au même endroit : actes, imagerie, prescriptions, devis et factures.',
    points: ['Odontogramme interactif', 'Historique complet des actes', 'Imagerie et documents attachés', 'Recherche et filtres rapides'],
    mockup: <PatientMockup />,
    flip: true,
  },
  {
    badge: 'FACTURATION',
    title: 'Facturation professionnelle et suivi des paiements',
    desc: 'Générez des factures conformes, suivez les impayés et analysez votre chiffre d\'affaires par période.',
    points: ['Factures PDF imprimables', 'Suivi des impayés', 'Statistiques CA par période', 'Devis convertibles en facture'],
    mockup: <InvoiceMockup />,
    flip: false,
  },
]

function FeatureSection({ section, index }) {
  const [ref, inView] = useInView()
  const [mockRef, mockInView] = useInView()

  return (
    <div id="screens" ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 72, alignItems: 'center',
      maxWidth: 1100, margin: '0 auto 100px',
    }}>
      {/* Text side */}
      <div style={{ order: section.flip ? 2 : 1 }}>
        <div className={`s-badge reveal${inView ? ' on' : ''}`}>
          {section.badge}
        </div>
        <h2 className={`reveal delay-1${inView ? ' on' : ''}`} style={{
          fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800,
          color: '#0C1E38', lineHeight: 1.2, letterSpacing: -.5,
          marginBottom: 16,
        }}>{section.title}</h2>
        <p className={`reveal delay-2${inView ? ' on' : ''}`} style={{
          fontSize: 16, color: '#64748B', lineHeight: 1.75, marginBottom: 28,
        }}>{section.desc}</p>
        <ul className={`reveal delay-3${inView ? ' on' : ''}`} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {section.points.map((p, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#fff', fontWeight: 800,
              }}>✓</div>
              <span style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mockup side */}
      <div ref={mockRef} className={`reveal delay-1${mockInView ? ' on' : ''}`} style={{ order: section.flip ? 1 : 2 }}>
        {section.mockup}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #screens > div, #screens > div:nth-child(2) { grid-column: 1 !important; order: unset !important; }
          #screens { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  )
}

export default function Features({ features }) {
  const [ref, inView] = useInView()
  const list = Array.isArray(features) && features.length ? features : FEATURES_GRID

  return (
    <>
      {/* Feature sections with mockups */}
      <section style={{ padding: '100px 5% 0', background: '#fff' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className={`s-badge reveal${inView ? ' on' : ''}`} style={{ marginBottom: 18 }}>FONCTIONNALITÉS</div>
          <h2 className={`reveal delay-1${inView ? ' on' : ''}`} style={{
            fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800,
            color: '#0C1E38', letterSpacing: -.8, marginBottom: 16,
          }}>
            Tout ce dont votre cabinet a besoin<br />
            <span className="g-text">dans une seule application</span>
          </h2>
          <p className={`reveal delay-2${inView ? ' on' : ''}`} style={{
            fontSize: 17, color: '#64748B', maxWidth: 500, margin: '0 auto',
          }}>
            Découvrez comment DentaCare transforme la gestion quotidienne de votre cabinet.
          </p>
        </div>

        {SECTIONS.map((s, i) => (
          <FeatureSection key={i} section={s} index={i} />
        ))}
      </section>

      {/* Feature grid */}
      <section id="features" style={{ padding: '80px 5%', background: '#F7FAFC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {list.map((f, i) => {
              const [cardRef, cardInView] = useInView()
              return (
                <div key={i} ref={cardRef} className={`reveal delay-${(i % 3) + 1}${cardInView ? ' on' : ''}`} style={{
                  background: '#fff', borderRadius: 14, padding: '24px 22px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                  transition: 'transform .2s, box-shadow .2s, border-color .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,91,126,.12)'; e.currentTarget.style.borderColor = '#38B2AC' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; e.currentTarget.style.borderColor = '#E2E8F0' }}
                >
                  <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: '#E6F3F9', border: '1px solid rgba(27,91,126,.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, marginBottom: 16,
                  }}>{f.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0C1E38', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
