import { useState, useEffect, useMemo, useRef } from 'react'
import { supabase } from '../lib/supabase'

const DEFAULT_SERVICES = [
  { icon: '📋', label: 'Consultation & Bilan' },
  { icon: '✨', label: 'Détartrage & Polissage' },
  { icon: '🦷', label: 'Soins de caries' },
  { icon: '🔬', label: 'Radiographie dentaire' },
  { icon: '👑', label: 'Couronnes & Bridges' },
  { icon: '🔩', label: 'Implants dentaires' },
  { icon: '🔧', label: 'Dévitalisation (endodontie)' },
  { icon: '😁', label: 'Blanchiment dentaire' },
]

const TYPE_SOINS = [
  'Consultation / Premier RDV',
  'Détartrage & Polissage',
  'Soin de carie',
  'Couronne ou Bridge',
  'Implant dentaire',
  'Dévitalisation',
  'Extraction dentaire',
  'Blanchiment',
  'Orthodontie',
  'Autre',
]

const HEURES = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
                 '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']

const TRUST = [
  { icon: '🔒', label: 'Données sécurisées' },
  { icon: '✅', label: 'Confirmation rapide' },
  { icon: '📞', label: 'Sans engagement' },
  { icon: '🕐', label: 'Réponse sous 24h' },
]

function actIcon(label) {
  const l = (label || '').toLowerCase()
  if (l.includes('détart') || l.includes('poliss') || l.includes('nettoy')) return '✨'
  if (l.includes('radio') || l.includes('rx') || l.includes('panoram')) return '🔬'
  if (l.includes('implant')) return '🔩'
  if (l.includes('couronne') || l.includes('bridge') || l.includes('inlay')) return '👑'
  if (l.includes('blanch')) return '😁'
  if (l.includes('dévi') || l.includes('endo') || l.includes('canal') || l.includes('pulp')) return '🔧'
  if (l.includes('extract') || l.includes('avuls')) return '🩺'
  if (l.includes('prothès') || l.includes('dentier') || l.includes('amovib')) return '🦾'
  if (l.includes('consult') || l.includes('bilan') || l.includes('examen')) return '📋'
  if (l.includes('ortho') || l.includes('bracket') || l.includes('align')) return '🔗'
  if (l.includes('certif')) return '📜'
  if (l.includes('composite') || l.includes('résine')) return '🎨'
  return '🦷'
}

export default function Booking({ cabinetId }) {
  const [cabinet, setCabinet]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm]         = useState({ nom:'', prenom:'', tel:'', email:'', date:'', heure:'', type_soin:'', notes:'' })
  const [sent, setSent]         = useState(false)
  const [sending, setSending]   = useState(false)
  const [err, setErr]           = useState('')
  const [focused, setFocused]   = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (!cabinetId) { setNotFound(true); setLoading(false); return }
    supabase.from('cabinet_settings').select('*').eq('booking_slug', cabinetId).limit(1).then(({ data }) => {
      if (!data || data.length === 0) { setNotFound(true); setLoading(false); return }
      setCabinet(data[0])
      setLoading(false)
    })
  }, [cabinetId])

  const services = useMemo(() => {
    if (!cabinet?.dc_catalogue) return DEFAULT_SERVICES
    try {
      const cat = typeof cabinet.dc_catalogue === 'string'
        ? JSON.parse(cabinet.dc_catalogue)
        : cabinet.dc_catalogue
      if (Array.isArray(cat) && cat.length > 0)
        return cat.slice(0, 12).map(a => ({ icon: actIcon(a.label), label: a.label }))
    } catch {}
    return DEFAULT_SERVICES
  }, [cabinet])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.tel || !form.date) { setErr('Nom, téléphone et date sont requis.'); return }
    setSending(true); setErr('')
    const { error } = await supabase.from('online_bookings').insert([{
      clinic_id:       cabinet.clinic_id,
      patient_nom:     form.nom.trim(),
      patient_prenom:  form.prenom.trim(),
      patient_tel:     form.tel.trim(),
      patient_email:   form.email.trim(),
      date_souhaitee:  form.date,
      heure_souhaitee: form.heure,
      type_soin:       form.type_soin,
      notes:           form.notes.trim(),
    }])
    if (error) { setErr('Une erreur est survenue, veuillez réessayer.'); setSending(false); return }
    setSent(true); setSending(false)
  }

  const inp = (k) => ({
    background: focused === k ? '#EFF6FB' : '#FAFBFC',
    border: `1.5px solid ${focused === k ? '#1B5B7E' : '#DEE5ED'}`,
  })
  const F = (key) => ({ onFocus: () => setFocused(key), onBlur: () => setFocused(null) })
  const today = new Date().toISOString().split('T')[0]

  /* ── Loading ── */
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F7FAFC' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:44, marginBottom:16 }}>🦷</div>
        <div style={{ color:'#64748B', fontSize:14 }}>Chargement du cabinet…</div>
      </div>
    </div>
  )

  /* ── Not found ── */
  if (notFound) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F7FAFC', padding:'20px' }}>
      <div style={{ textAlign:'center', maxWidth:400 }}>
        <div style={{ fontSize:60, marginBottom:20 }}>🔍</div>
        <h2 style={{ fontSize:22, fontWeight:800, color:'#0C1E38', marginBottom:12 }}>Cabinet introuvable</h2>
        <p style={{ color:'#64748B', fontSize:15, lineHeight:1.6 }}>Le lien utilisé est invalide ou ce cabinet n'est plus disponible en ligne.</p>
        <a href="/" style={{ display:'inline-block', marginTop:24, padding:'12px 28px', background:'linear-gradient(135deg,#1B5B7E,#38B2AC)', color:'#fff', borderRadius:10, fontSize:14, fontWeight:700 }}>← Retour à DentaCare</a>
      </div>
    </div>
  )

  const name    = cabinet.cabinet_name || 'Cabinet Dentaire'
  const doctor  = cabinet.doctor_name  || ''
  const title   = cabinet.doctor_title || 'Médecin Chirurgien Dentiste'
  const phone   = cabinet.phone        || ''
  const address = [cabinet.address1, cabinet.address2, cabinet.city].filter(Boolean).join(', ')
  const initials = name.split(' ').filter(w => /[A-Za-z]/.test(w[0])).map(w => w[0]).join('').slice(0,2).toUpperCase() || '🦷'

  const baseInp = { width:'100%', padding:'11px 14px', fontSize:14, borderRadius:9, outline:'none', color:'#0C1E38', boxSizing:'border-box', fontFamily:'inherit', transition:'border-color .15s,background .15s' }
  const labelStyle = (k) => ({ display:'block', fontSize:11, fontWeight:700, letterSpacing:.4, textTransform:'uppercase', marginBottom:6, color: focused===k ? '#1B5B7E' : '#94A3B8', transition:'color .15s' })

  return (
    <div style={{ minHeight:'100vh', background:'#F7FAFC', fontFamily:'Inter,system-ui,sans-serif' }}>

      {/* ── Top bar ── */}
      <div style={{ background:'#0C1E38', padding:'10px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
        <a href="/" style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#38B2AC,#1B5B7E)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>🦷</div>
          <span style={{ color:'rgba(255,255,255,.55)', fontSize:11, fontWeight:600 }}>Réservation en ligne · Propulsé par DentaCare</span>
        </a>
        {phone && (
          <a href={`tel:${phone}`} style={{ color:'#38B2AC', fontSize:13, fontWeight:700, whiteSpace:'nowrap' }}>📞 {phone}</a>
        )}
      </div>

      {/* ── Hero ── */}
      <div style={{ background:'linear-gradient(135deg,#0C1E38 0%,#1B5B7E 55%,#38B2AC 100%)', padding:'72px 24px 80px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,.06),transparent 65%)', top:-180, right:-120, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,178,172,.22),transparent 65%)', bottom:-80, left:-60, pointerEvents:'none' }} />

        <div style={{ position:'relative', maxWidth:680, margin:'0 auto' }}>

          {/* Logo or initials */}
          {cabinet.logo_url ? (
            <img src={cabinet.logo_url} alt={name} style={{ width:88, height:88, borderRadius:22, objectFit:'cover', margin:'0 auto 28px', display:'block', border:'3px solid rgba(255,255,255,.25)', boxShadow:'0 12px 40px rgba(0,0,0,.25)' }} />
          ) : (
            <div style={{ width:88, height:88, borderRadius:22, background:'rgba(255,255,255,.13)', border:'2px solid rgba(255,255,255,.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, fontWeight:900, color:'#fff', margin:'0 auto 28px', backdropFilter:'blur(8px)', letterSpacing:-1 }}>
              {initials}
            </div>
          )}

          {/* Open badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(56,178,172,.18)', border:'1px solid rgba(56,178,172,.4)', borderRadius:100, padding:'5px 16px', marginBottom:22 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#38B2AC', display:'inline-block', boxShadow:'0 0 0 3px rgba(56,178,172,.3)' }} />
            <span style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.9)', letterSpacing:.6 }}>DISPONIBLE · Réservation en ligne ouverte</span>
          </div>

          <h1 style={{ fontSize:'clamp(28px,5.5vw,52px)', fontWeight:900, color:'#fff', letterSpacing:-1.2, marginBottom:10, lineHeight:1.1 }}>{name}</h1>
          {doctor  && <div style={{ fontSize:19, fontWeight:700, color:'rgba(255,255,255,.85)', marginBottom:6 }}>{doctor}</div>}
          <div style={{ fontSize:14, color:'rgba(255,255,255,.5)', marginBottom:32, fontWeight:500 }}>{title}</div>

          {/* Info pills */}
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:40 }}>
            {address && (
              <div style={{ display:'flex', alignItems:'center', gap:7, background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.14)', borderRadius:100, padding:'8px 18px', backdropFilter:'blur(8px)' }}>
                <span>📍</span>
                <span style={{ fontSize:13, color:'rgba(255,255,255,.85)', fontWeight:500 }}>{address}</span>
              </div>
            )}
            {phone && (
              <a href={`tel:${phone}`} style={{ display:'flex', alignItems:'center', gap:7, background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.14)', borderRadius:100, padding:'8px 18px', backdropFilter:'blur(8px)' }}>
                <span>📞</span>
                <span style={{ fontSize:13, color:'rgba(255,255,255,.85)', fontWeight:500 }}>{phone}</span>
              </a>
            )}
          </div>

          <button onClick={() => formRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })} style={{ padding:'15px 40px', borderRadius:12, background:'#38B2AC', border:'none', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:'0 8px 28px rgba(56,178,172,.5)', transition:'transform .15s,box-shadow .15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(56,178,172,.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 8px 28px rgba(56,178,172,.5)' }}
          >Prendre un rendez-vous →</button>
        </div>
      </div>

      {/* ── Trust strip ── */}
      <div style={{ background:'#fff', borderBottom:'1px solid #F1F5F9' }}>
        <div style={{ maxWidth:800, margin:'0 auto', padding:'20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'12px 24px' }}>
          {TRUST.map((t,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:18 }}>{t.icon}</span>
              <span style={{ fontSize:13, color:'#64748B', fontWeight:600 }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <div style={{ padding:'72px 5%', maxWidth:1060, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ display:'inline-block', fontSize:10, fontWeight:800, letterSpacing:1.5, color:'#38B2AC', background:'#E6F3F9', border:'1px solid rgba(56,178,172,.3)', borderRadius:100, padding:'5px 14px', marginBottom:16 }}>NOS SOINS</div>
          <h2 style={{ fontSize:'clamp(22px,3.5vw,34px)', fontWeight:800, color:'#0C1E38', letterSpacing:-.5, marginBottom:12 }}>Soins dentaires proposés</h2>
          <p style={{ fontSize:15, color:'#64748B', maxWidth:460, margin:'0 auto', lineHeight:1.7 }}>Une prise en charge complète pour toute la famille dans un environnement moderne et bienveillant.</p>
        </div>

        <div className="book-srv-grid">
          {services.map((s,i) => (
            <div key={i} style={{ background:'#fff', borderRadius:14, padding:'18px 16px', border:'1.5px solid #E8EFF5', display:'flex', alignItems:'center', gap:14, boxShadow:'0 1px 4px rgba(0,0,0,.04)', transition:'border-color .15s,transform .15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#38B2AC'; e.currentTarget.style.transform='translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#E8EFF5'; e.currentTarget.style.transform='' }}
            >
              <div style={{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,#E6F3F9,#F0FAFB)', border:'1px solid rgba(27,91,126,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{s.icon}</div>
              <span style={{ fontSize:14, fontWeight:600, color:'#1C2D3F' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking form ── */}
      <div style={{ background:'linear-gradient(180deg,#F7FAFC,#EFF6FB)' }}>
        <div style={{ height:1, background:'linear-gradient(90deg,transparent,#DEE5ED,transparent)' }} />
        <div ref={formRef} style={{ padding:'72px 5%' }}>
          <div style={{ maxWidth:620, margin:'0 auto' }}>

            <div style={{ textAlign:'center', marginBottom:40 }}>
              <div style={{ display:'inline-block', fontSize:10, fontWeight:800, letterSpacing:1.5, color:'#1B5B7E', background:'#E6F3F9', border:'1px solid rgba(27,91,126,.2)', borderRadius:100, padding:'5px 14px', marginBottom:16 }}>RÉSERVATION</div>
              <h2 style={{ fontSize:'clamp(22px,3.5vw,34px)', fontWeight:800, color:'#0C1E38', letterSpacing:-.5, marginBottom:12 }}>Réservez votre RDV en ligne</h2>
              <p style={{ fontSize:15, color:'#64748B', maxWidth:440, margin:'0 auto', lineHeight:1.7 }}>Remplissez le formulaire. {name} vous contactera pour confirmer votre rendez-vous.</p>
            </div>

            {sent ? (
              <div style={{ textAlign:'center', padding:'56px 32px', background:'#fff', borderRadius:20, border:'1.5px solid #86EFAC', boxShadow:'0 4px 32px rgba(0,0,0,.07)', animation:'fadeUp .4s ease' }}>
                <div style={{ fontSize:60, marginBottom:18 }}>✅</div>
                <div style={{ fontSize:23, fontWeight:800, color:'#0C1E38', marginBottom:10 }}>Demande bien reçue !</div>
                <div style={{ color:'#64748B', fontSize:15, lineHeight:1.7, maxWidth:380, margin:'0 auto 8px' }}>
                  <strong style={{ color:'#0C1E38' }}>{name}</strong> va vous contacter pour confirmer votre rendez-vous.
                </div>
                <div style={{ fontSize:13, color:'#94A3B8', marginBottom:28 }}>Pensez à vérifier vos SMS et appels manqués.</div>
                {phone && (
                  <a href={`tel:${phone}`} style={{ display:'inline-block', padding:'13px 32px', background:'linear-gradient(135deg,#1B5B7E,#38B2AC)', color:'#fff', borderRadius:10, fontSize:14, fontWeight:700, boxShadow:'0 4px 16px rgba(27,91,126,.3)' }}>
                    📞 Appeler directement
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={submit} style={{ background:'#fff', borderRadius:20, padding:'36px', border:'1.5px solid #E8EFF5', boxShadow:'0 8px 40px rgba(0,0,0,.07)' }}>

                <div className="book-grid-2" style={{ marginBottom:16 }}>
                  <div>
                    <label style={labelStyle('nom')}>Nom <span style={{ color:'#38B2AC' }}>*</span></label>
                    <input value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))} {...F('nom')} placeholder="Nom de famille" style={{ ...baseInp, ...inp('nom') }} />
                  </div>
                  <div>
                    <label style={labelStyle('prenom')}>Prénom</label>
                    <input value={form.prenom} onChange={e=>setForm(f=>({...f,prenom:e.target.value}))} {...F('prenom')} placeholder="Prénom" style={{ ...baseInp, ...inp('prenom') }} />
                  </div>
                </div>

                <div className="book-grid-2" style={{ marginBottom:16 }}>
                  <div>
                    <label style={labelStyle('tel')}>Téléphone <span style={{ color:'#38B2AC' }}>*</span></label>
                    <input type="tel" value={form.tel} onChange={e=>setForm(f=>({...f,tel:e.target.value}))} {...F('tel')} placeholder="+212 6 00 00 00 00" style={{ ...baseInp, ...inp('tel') }} />
                  </div>
                  <div>
                    <label style={labelStyle('email')}>Email</label>
                    <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} {...F('email')} placeholder="email@exemple.com" style={{ ...baseInp, ...inp('email') }} />
                  </div>
                </div>

                <div className="book-grid-2" style={{ marginBottom:16 }}>
                  <div>
                    <label style={labelStyle('date')}>Date souhaitée <span style={{ color:'#38B2AC' }}>*</span></label>
                    <input type="date" min={today} value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} {...F('date')} style={{ ...baseInp, ...inp('date') }} />
                  </div>
                  <div>
                    <label style={labelStyle('heure')}>Heure préférée</label>
                    <select value={form.heure} onChange={e=>setForm(f=>({...f,heure:e.target.value}))} {...F('heure')} style={{ ...baseInp, ...inp('heure'), appearance:'none', color: form.heure ? '#0C1E38' : '#94A3B8' }}>
                      <option value="">Indifférent</option>
                      {HEURES.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={labelStyle('type')}>Type de soin souhaité</label>
                  <select value={form.type_soin} onChange={e=>setForm(f=>({...f,type_soin:e.target.value}))} {...F('type')} style={{ ...baseInp, ...inp('type'), appearance:'none', color: form.type_soin ? '#0C1E38' : '#94A3B8' }}>
                    <option value="">Sélectionner un soin…</option>
                    {TYPE_SOINS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom:24 }}>
                  <label style={labelStyle('notes')}>
                    Message <span style={{ color:'#CBD5E1', fontWeight:400, textTransform:'none', letterSpacing:0 }}>(optionnel)</span>
                  </label>
                  <textarea rows={3} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} {...F('notes')} placeholder="Décrivez votre besoin, douleur, antécédents…" style={{ ...baseInp, ...inp('notes'), resize:'vertical' }} />
                </div>

                {err && <div style={{ color:'#DC2626', fontSize:13, marginBottom:16, background:'#FEF2F2', border:'1px solid #FECACA', padding:'10px 14px', borderRadius:8 }}>⚠ {err}</div>}

                <button type="submit" disabled={sending} style={{ width:'100%', padding:'15px', background:'linear-gradient(135deg,#1B5B7E,#38B2AC)', border:'none', borderRadius:10, fontSize:15, fontWeight:700, color:'#fff', cursor: sending ? 'not-allowed' : 'pointer', fontFamily:'inherit', opacity: sending ? .7 : 1, boxShadow:'0 4px 16px rgba(27,91,126,.28)', transition:'transform .15s,box-shadow .15s' }}
                  onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(27,91,126,.38)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 16px rgba(27,91,126,.28)' }}
                >{sending ? 'Envoi en cours…' : 'Envoyer ma demande de RDV →'}</button>

                <p style={{ textAlign:'center', fontSize:12, color:'#CBD5E1', marginTop:12 }}>Confirmation par téléphone · Aucun engagement</p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ background:'#0C1E38', padding:'24px', textAlign:'center', borderTop:'1px solid rgba(255,255,255,.06)' }}>
        <a href="/" style={{ display:'inline-flex', alignItems:'center', gap:8, opacity:.5, transition:'opacity .15s' }}
          onMouseEnter={e=>e.currentTarget.style.opacity='1'}
          onMouseLeave={e=>e.currentTarget.style.opacity='.5'}
        >
          <div style={{ width:22, height:22, borderRadius:6, background:'linear-gradient(135deg,#38B2AC,#1B5B7E)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>🦷</div>
          <span style={{ color:'#fff', fontSize:12, fontWeight:600 }}>Propulsé par DentaCare</span>
        </a>
      </div>

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration: none; }
        input,select,textarea,button { font-family: inherit; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .book-srv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 12px;
        }
        .book-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .book-grid-2   { grid-template-columns: 1fr !important; }
          .book-srv-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .book-srv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
