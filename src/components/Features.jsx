import { useInView } from '../hooks/useInView'
import { AgendaMockup, PatientMockup, InvoiceMockup, PatientDetailMockup, OdontogramMockup } from './AppMockup'

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
    desc: 'Vue semaine et mois, couleurs par type d\'acte. Créez un rendez-vous en 2 clics, directement depuis le calendrier.',
    points: ['Vue semaine / mois / liste', 'Coloration par type d\'acte', 'Rappels WhatsApp automatiques', 'Blocage des créneaux passés'],
    Mockup: AgendaMockup,
    flip: false,
  },
  {
    badge: 'PATIENTS',
    title: 'Dossiers patients complets et centralisés',
    desc: 'Toute l\'histoire médicale de chaque patient au même endroit : actes, imagerie, prescriptions, devis et factures.',
    points: ['Odontogramme interactif', 'Historique complet des actes', 'Imagerie et documents attachés', 'Recherche et filtres rapides'],
    Mockup: PatientMockup,
    flip: true,
  },
  {
    badge: 'FACTURATION',
    title: 'Facturation professionnelle et suivi des paiements',
    desc: 'Générez des factures conformes, suivez les impayés et analysez votre CA par période.',
    points: ['Factures PDF imprimables', 'Suivi des impayés', 'Statistiques CA par période', 'Devis convertibles en facture'],
    Mockup: InvoiceMockup,
    flip: false,
  },
  {
    badge: 'DOSSIER PATIENT',
    title: 'Tout l\'historique médical en un coup d\'œil',
    desc: 'Actes, paiements, ordonnances : toute l\'information médicale d\'un patient centralisée dans une interface claire.',
    points: ['Historique complet des actes', 'Suivi financier par patient', 'Ordonnances et devis associés', 'Imagerie dentaire attachée'],
    Mockup: PatientDetailMockup,
    flip: true,
  },
  {
    badge: 'ODONTOGRAMME',
    title: 'Schéma dentaire interactif',
    desc: 'Un odontogramme complet pour visualiser et mettre à jour l\'état de chaque dent en temps réel.',
    points: ['10 états de dents disponibles', 'Mise à jour en un clic', 'Synchronisé avec l\'historique des actes', 'Impression du schéma'],
    Mockup: OdontogramMockup,
    flip: false,
  },
]

/* Extracted card component — fixes React hooks-in-loop violation */
function GridCard({ feature, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`reveal delay-${delay}${inView ? ' on' : ''}`} style={{
      background: '#fff', borderRadius: 14, padding: '24px 20px',
      border: '1.5px solid #E2E8F0',
      boxShadow: '0 1px 4px rgba(0,0,0,.04)',
      transition: 'transform .2s, box-shadow .2s, border-color .2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,91,126,.12)'; e.currentTarget.style.borderColor = '#38B2AC' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; e.currentTarget.style.borderColor = '#E2E8F0' }}
    >
      <div style={{ width:46, height:46, borderRadius:12, background:'#E6F3F9', border:'1px solid rgba(27,91,126,.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:14 }}>{feature.icon}</div>
      <h3 style={{ fontSize:15, fontWeight:700, color:'#0C1E38', marginBottom:8 }}>{feature.title}</h3>
      <p style={{ fontSize:13, color:'#64748B', lineHeight:1.65, margin:0 }}>{feature.desc}</p>
    </div>
  )
}

function FeatureSection({ section }) {
  const [textRef, textInView] = useInView()
  const [mockRef, mockInView] = useInView()
  const { Mockup } = section

  return (
    <div className="feat-section">
      {/* Text */}
      <div ref={textRef} className={`feat-text${section.flip ? ' feat-flip' : ''}`}>
        <div className={`s-badge reveal${textInView ? ' on' : ''}`}>{section.badge}</div>
        <h2 className={`reveal delay-1${textInView ? ' on' : ''}`} style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, color:'#0C1E38', lineHeight:1.2, letterSpacing:-.4, marginBottom:14 }}>{section.title}</h2>
        <p className={`reveal delay-2${textInView ? ' on' : ''}`} style={{ fontSize:15, color:'#64748B', lineHeight:1.75, marginBottom:24 }}>{section.desc}</p>
        <ul className={`reveal delay-3${textInView ? ' on' : ''}`} style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
          {section.points.map((p, i) => (
            <li key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,#1B5B7E,#38B2AC)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff', fontWeight:800 }}>✓</div>
              <span style={{ fontSize:14, color:'#334155', fontWeight:500 }}>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mockup */}
      <div ref={mockRef} className={`feat-mockup reveal delay-1${mockInView ? ' on' : ''}${section.flip ? ' feat-flip-mock' : ''}`}>
        <Mockup />
      </div>
    </div>
  )
}

export default function Features({ features }) {
  const [titleRef, titleInView] = useInView()
  const list = Array.isArray(features) && features.length ? features : FEATURES_GRID

  return (
    <>
      <section style={{ padding:'80px 0 0', background:'#fff' }}>
        {/* Title */}
        <div ref={titleRef} style={{ textAlign:'center', marginBottom:72, padding:'0 20px' }}>
          <div className={`s-badge reveal${titleInView ? ' on' : ''}`}>FONCTIONNALITÉS</div>
          <h2 className={`reveal delay-1${titleInView ? ' on' : ''}`} style={{ fontSize:'clamp(26px,4vw,44px)', fontWeight:800, color:'#0C1E38', letterSpacing:-.8, marginBottom:14 }}>
            Tout ce dont votre cabinet a besoin<br />
            <span className="g-text">dans une seule application</span>
          </h2>
          <p className={`reveal delay-2${titleInView ? ' on' : ''}`} style={{ fontSize:16, color:'#64748B', maxWidth:480, margin:'0 auto' }}>
            Découvrez comment DentaCare transforme la gestion quotidienne de votre cabinet.
          </p>
        </div>

        {/* Alternating sections */}
        <div id="screens" style={{ maxWidth:1100, margin:'0 auto', padding:'0 5%', minWidth:0 }}>
          {SECTIONS.map((s, i) => <FeatureSection key={i} section={s} />)}
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" style={{ padding:'80px 5%', background:'#F7FAFC' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
          {list.map((f, i) => <GridCard key={i} feature={f} delay={(i % 3) + 1} />)}
        </div>
      </section>

      <style>{`
        .feat-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 88px;
        }
        .feat-text { order: 1; }
        .feat-flip { order: 2; }
        .feat-mockup { order: 2; }
        .feat-flip-mock { order: 1; }

        @media (max-width: 900px) {
          .feat-section {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            margin-bottom: 60px !important;
          }
          /* Always: text first, mockup second */
          .feat-text, .feat-flip { order: 1 !important; }
          .feat-mockup, .feat-flip-mock { order: 2 !important; }
        }

        @media (max-width: 640px) {
          .feat-section { margin-bottom: 48px !important; gap: 24px !important; }
          #features { padding: 48px 16px !important; }
          #screens { padding: 0 3% !important; }
          .feat-mockup, .feat-flip-mock { min-width: 0; width: 100%; }
        }
      `}</style>
    </>
  )
}
