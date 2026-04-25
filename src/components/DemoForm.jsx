import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useInView } from '../hooks/useInView'

const FIELDS = [
  { key: 'nom',     label: 'Nom complet',          placeholder: 'Dr. Prénom Nom',      type: 'text',  required: true },
  { key: 'cabinet', label: 'Nom du cabinet',        placeholder: 'Cabinet Dentaire ...', type: 'text',  required: true },
  { key: 'email',   label: 'Email professionnel',   placeholder: 'contact@cabinet.ma',  type: 'email', required: true },
  { key: 'tel',     label: 'Téléphone',             placeholder: '+212 6...',           type: 'tel',   required: false },
]

export default function DemoForm() {
  const [titleRef, titleInView] = useInView()
  const [formRef, formInView] = useInView()
  const [form, setForm] = useState({ nom: '', cabinet: '', email: '', tel: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')
  const [focused, setFocused] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.email || !form.cabinet) { setErr('Nom, email et cabinet sont requis.'); return }
    setSending(true); setErr('')
    const { error } = await supabase.from('demo_requests').insert([{
      nom: form.nom, cabinet: form.cabinet, email: form.email,
      tel: form.tel, message: form.message, created_at: new Date().toISOString(),
    }])
    if (error) { setErr('Une erreur est survenue, réessayez.'); setSending(false); return }
    setSent(true); setSending(false)
  }

  return (
    <section id="demo" style={{ padding: '100px 5%', background: '#F7FAFC', position: 'relative', overflow: 'hidden' }}>
      {/* Teal blob */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,178,172,.08), transparent 70%)',
        top: -100, right: -100, pointerEvents: 'none',
      }} />

      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 56 }}>
        <div className={`s-badge reveal${titleInView ? ' on' : ''}`}>CONTACT</div>
        <h2 className={`reveal delay-1${titleInView ? ' on' : ''}`} style={{
          fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800,
          color: '#0C1E38', letterSpacing: -.8, marginBottom: 14,
        }}>
          Prêt à transformer votre cabinet ?<br />
          <span className="g-text">Demandez une démo gratuite</span>
        </h2>
        <p className={`reveal delay-2${titleInView ? ' on' : ''}`} style={{
          fontSize: 17, color: '#64748B', maxWidth: 440, margin: '0 auto',
        }}>
          On vous contacte sous 24h pour une présentation personnalisée de l'application.
        </p>
      </div>

      <div ref={formRef} className={`reveal delay-1${formInView ? ' on' : ''}`}
        style={{ maxWidth: 560, margin: '0 auto' }}>

        {sent ? (
          <div style={{
            textAlign: 'center', padding: '56px 40px',
            background: '#fff', borderRadius: 20,
            border: '1.5px solid #86EFAC',
            boxShadow: '0 4px 24px rgba(0,0,0,.08)',
            animation: 'fadeUp .4s ease',
          }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0C1E38', marginBottom: 8 }}>Demande envoyée !</div>
            <div style={{ color: '#64748B', fontSize: 15 }}>Nous vous contacterons dans les 24 heures.</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{
            background: '#fff', borderRadius: 20, padding: '40px 36px',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 8px 40px rgba(0,0,0,.08)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {FIELDS.map((f) => (
                <div key={f.key} style={{ marginBottom: 18 }}>
                  <label style={{
                    display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: .4,
                    textTransform: 'uppercase', marginBottom: 7,
                    color: focused === f.key ? '#1B5B7E' : '#94A3B8',
                    transition: 'color .15s',
                  }}>{f.label}{f.required && <span style={{ color: '#38B2AC' }}> *</span>}</label>
                  <input
                    type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused(null)}
                    style={{
                      width: '100%', padding: '11px 14px', fontSize: 14,
                      border: `1.5px solid ${focused === f.key ? '#1B5B7E' : '#E2E8F0'}`,
                      borderRadius: 10, outline: 'none', color: '#0C1E38',
                      background: focused === f.key ? '#EFF6FB' : '#FAFBFC',
                      boxSizing: 'border-box', fontFamily: 'inherit',
                      transition: 'border-color .15s, background .15s',
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{
                display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: .4,
                textTransform: 'uppercase', marginBottom: 7,
                color: focused === 'message' ? '#1B5B7E' : '#94A3B8',
                transition: 'color .15s',
              }}>Message <span style={{ color: '#CBD5E1', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnel)</span></label>
              <textarea rows={3} placeholder="Parlez-nous de votre cabinet, vos besoins..." value={form.message}
                onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                style={{
                  width: '100%', padding: '11px 14px', fontSize: 14,
                  border: `1.5px solid ${focused === 'message' ? '#1B5B7E' : '#E2E8F0'}`,
                  borderRadius: 10, outline: 'none', resize: 'vertical',
                  color: '#0C1E38', background: focused === 'message' ? '#EFF6FB' : '#FAFBFC',
                  boxSizing: 'border-box', fontFamily: 'inherit',
                  transition: 'border-color .15s, background .15s',
                }}
              />
            </div>

            {err && (
              <div style={{
                color: '#DC2626', fontSize: 13, marginBottom: 16,
                background: '#FEF2F2', border: '1px solid #FECACA',
                padding: '10px 14px', borderRadius: 8,
              }}>⚠ {err}</div>
            )}

            <button type="submit" disabled={sending} style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)',
              border: 'none', borderRadius: 11, fontSize: 15, fontWeight: 700,
              color: '#fff', cursor: sending ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', opacity: sending ? .7 : 1,
              boxShadow: '0 4px 16px rgba(27,91,126,.3)',
              transition: 'transform .15s, box-shadow .15s',
            }}
              onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,91,126,.4)' } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(27,91,126,.3)' }}
            >
              {sending ? 'Envoi en cours…' : 'Envoyer ma demande →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: '#CBD5E1', marginTop: 14 }}>
              Aucun engagement. Réponse sous 24h.
            </p>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 540px) {
          #demo form > div:first-child { grid-template-columns: 1fr !important; }
          #demo form { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  )
}
