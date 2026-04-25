import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const PWD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH || ''

const hashStr = async (str) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const DEFAULT_CONTENT = {
  hero_title: 'La gestion de cabinet dentaire, réinventée.',
  hero_subtitle: 'DentaCare centralise vos patients, rendez-vous, factures et ordonnances dans une application simple et sécurisée.',
  hero_cta: 'Demander une démo gratuite',
  about_title: 'Conçu pour les cabinets dentaires modernes',
  about_text: 'DentaCare est né d\'un besoin réel : simplifier le quotidien des praticiens et de leurs équipes. Plus de paperasse, plus de doubles saisies — tout est centralisé, sécurisé et accessible.',
  contact_email: 'contact@dentacareapp.com',
  footer_text: '© 2026 DentaCare. Tous droits réservés.',
  features: JSON.stringify([
    { icon: '📅', title: 'Agenda intelligent', desc: 'Gérez vos rendez-vous avec une vue calendrier hebdomadaire et mensuelle.' },
    { icon: '🦷', title: 'Dossier patient complet', desc: 'Historique, odontogramme, imagerie et documents centralisés.' },
    { icon: '💊', title: 'Prescriptions & devis', desc: 'Créez et imprimez prescriptions, devis et certificats en un clic.' },
    { icon: '💰', title: 'Facturation intégrée', desc: 'Générez des factures professionnelles et suivez vos paiements.' },
    { icon: '👥', title: 'Multi-utilisateurs', desc: 'Gérez votre équipe avec des rôles distincts (médecin, assistante).' },
    { icon: '📊', title: 'Tableau de bord', desc: 'Visualisez vos statistiques clés et suivez la croissance de votre cabinet.' },
  ]),
}

const FIELDS = [
  { key: 'hero_title', label: 'Titre hero', type: 'text' },
  { key: 'hero_subtitle', label: 'Sous-titre hero', type: 'textarea' },
  { key: 'hero_cta', label: 'Bouton CTA', type: 'text' },
  { key: 'about_title', label: 'Titre section "À propos"', type: 'text' },
  { key: 'about_text', label: 'Texte "À propos"', type: 'textarea' },
  { key: 'contact_email', label: 'Email de contact', type: 'text' },
  { key: 'footer_text', label: 'Texte footer', type: 'text' },
]

export default function Admin({ onBack }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('adminAuthed') === '1')
  const [pwd, setPwd] = useState('')
  const [authErr, setAuthErr] = useState('')
  const [content, setContent] = useState({})
  const [features, setFeatures] = useState([])
  const [saving, setSaving] = useState({})
  const [saved, setSaved] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authed) loadContent()
  }, [authed])

  const handleAuth = async (e) => {
    e.preventDefault()
    const h = await hashStr(pwd)
    if (h === PWD_HASH) {
      sessionStorage.setItem('adminAuthed', '1')
      setAuthed(true)
      setAuthErr('')
    } else {
      setAuthErr('Mot de passe incorrect')
    }
    setPwd('')
  }

  const loadContent = async () => {
    setLoading(true)
    const { data } = await supabase.from('site_content').select('*')
    const map = { ...DEFAULT_CONTENT }
    if (data) data.forEach(row => { map[row.key] = row.value })
    setContent(map)
    try { setFeatures(JSON.parse(map.features)) } catch { setFeatures([]) }
    setLoading(false)
  }

  const saveField = async (key) => {
    setSaving(s => ({ ...s, [key]: true }))
    await supabase.from('site_content').upsert({ key, value: content[key] }, { onConflict: 'key' })
    setSaving(s => ({ ...s, [key]: false }))
    setSaved(s => ({ ...s, [key]: true }))
    setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000)
  }

  const saveFeatures = async () => {
    const value = JSON.stringify(features)
    setSaving(s => ({ ...s, features: true }))
    await supabase.from('site_content').upsert({ key: 'features', value }, { onConflict: 'key' })
    setContent(c => ({ ...c, features: value }))
    setSaving(s => ({ ...s, features: false }))
    setSaved(s => ({ ...s, features: true }))
    setTimeout(() => setSaved(s => ({ ...s, features: false })), 2000)
  }

  const updateFeature = (i, field, val) => {
    setFeatures(f => f.map((item, idx) => idx === i ? { ...item, [field]: val } : item))
  }

  const addFeature = () => {
    setFeatures(f => [...f, { icon: '⭐', title: 'Nouvelle fonctionnalité', desc: 'Description...' }])
  }

  const removeFeature = (i) => {
    setFeatures(f => f.filter((_, idx) => idx !== i))
  }

  const logout = () => {
    sessionStorage.removeItem('adminAuthed')
    setAuthed(false)
  }

  if (!authed) return (
    <div style={S.authWrap}>
      <div style={S.authCard}>
        <div style={S.authLogo}>🦷</div>
        <h2 style={S.authTitle}>Administration DentaCare</h2>
        <form onSubmit={handleAuth} style={S.authForm}>
          <input
            type="password"
            placeholder="Mot de passe admin"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            style={S.authInput}
            autoFocus
          />
          {authErr && <p style={S.authErr}>{authErr}</p>}
          <button type="submit" style={S.authBtn}>Connexion</button>
        </form>
        <button onClick={onBack} style={S.backLink}>← Retour au site</button>
      </div>
    </div>
  )

  return (
    <div style={S.wrap}>
      <header style={S.header}>
        <div style={S.headerLeft}>
          <span style={S.headerLogo}>🦷</span>
          <span style={S.headerTitle}>Admin DentaCare</span>
        </div>
        <div style={S.headerRight}>
          <button onClick={onBack} style={S.btnSecondary}>← Voir le site</button>
          <button onClick={logout} style={S.btnDanger}>Déconnexion</button>
        </div>
      </header>

      <main style={S.main}>
        {loading ? (
          <p style={S.loading}>Chargement…</p>
        ) : (
          <>
            <section style={S.section}>
              <h2 style={S.sectionTitle}>Contenu de la page</h2>
              <div style={S.fields}>
                {FIELDS.map(({ key, label, type }) => (
                  <div key={key} style={S.fieldRow}>
                    <label style={S.label}>{label}</label>
                    <div style={S.fieldInner}>
                      {type === 'textarea' ? (
                        <textarea
                          value={content[key] || ''}
                          onChange={e => setContent(c => ({ ...c, [key]: e.target.value }))}
                          style={S.textarea}
                          rows={3}
                        />
                      ) : (
                        <input
                          type="text"
                          value={content[key] || ''}
                          onChange={e => setContent(c => ({ ...c, [key]: e.target.value }))}
                          style={S.input}
                        />
                      )}
                      <button
                        onClick={() => saveField(key)}
                        disabled={saving[key]}
                        style={saved[key] ? S.btnSaved : S.btnSave}
                      >
                        {saving[key] ? '…' : saved[key] ? '✓ Sauvegardé' : 'Sauvegarder'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={S.section}>
              <h2 style={S.sectionTitle}>Fonctionnalités</h2>
              <p style={S.hint}>Modifiez les cartes de fonctionnalités affichées sur la page d'accueil.</p>
              <div style={S.featureList}>
                {features.map((f, i) => (
                  <div key={i} style={S.featureCard}>
                    <div style={S.featureRow}>
                      <input
                        value={f.icon}
                        onChange={e => updateFeature(i, 'icon', e.target.value)}
                        style={{ ...S.input, width: 60, textAlign: 'center', fontSize: 22 }}
                        placeholder="Icône"
                      />
                      <input
                        value={f.title}
                        onChange={e => updateFeature(i, 'title', e.target.value)}
                        style={{ ...S.input, flex: 1 }}
                        placeholder="Titre"
                      />
                      <button onClick={() => removeFeature(i)} style={S.btnRemove}>✕</button>
                    </div>
                    <textarea
                      value={f.desc}
                      onChange={e => updateFeature(i, 'desc', e.target.value)}
                      style={S.textarea}
                      rows={2}
                      placeholder="Description"
                    />
                  </div>
                ))}
              </div>
              <div style={S.featureActions}>
                <button onClick={addFeature} style={S.btnSecondary}>+ Ajouter une carte</button>
                <button
                  onClick={saveFeatures}
                  disabled={saving.features}
                  style={saved.features ? S.btnSaved : S.btnSave}
                >
                  {saving.features ? '…' : saved.features ? '✓ Sauvegardé' : 'Sauvegarder les fonctionnalités'}
                </button>
              </div>
            </section>

            <section style={S.section}>
              <h2 style={S.sectionTitle}>Demandes de démo</h2>
              <DemoRequests />
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function DemoRequests() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setRows(data || []); setLoading(false) })
  }, [])

  if (loading) return <p style={S.loading}>Chargement…</p>
  if (!rows.length) return <p style={{ color: '#888' }}>Aucune demande pour l'instant.</p>

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={S.table}>
        <thead>
          <tr>
            {['Date', 'Nom', 'Cabinet', 'Email', 'Tél', 'Message'].map(h => (
              <th key={h} style={S.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={S.tr}>
              <td style={S.td}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</td>
              <td style={S.td}>{r.nom}</td>
              <td style={S.td}>{r.cabinet}</td>
              <td style={S.td}><a href={`mailto:${r.email}`} style={{ color: '#2563eb' }}>{r.email}</a></td>
              <td style={S.td}>{r.tel}</td>
              <td style={{ ...S.td, maxWidth: 260, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{r.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const S = {
  authWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' },
  authCard: { background: '#fff', borderRadius: 16, padding: '48px 40px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', textAlign: 'center', minWidth: 340 },
  authLogo: { fontSize: 48, marginBottom: 12 },
  authTitle: { fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 28 },
  authForm: { display: 'flex', flexDirection: 'column', gap: 12 },
  authInput: { padding: '12px 16px', fontSize: 16, border: '1.5px solid #e2e8f0', borderRadius: 8, outline: 'none' },
  authErr: { color: '#ef4444', fontSize: 14, margin: 0 },
  authBtn: { padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  backLink: { marginTop: 20, background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14 },
  wrap: { minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  header: { background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  headerLogo: { fontSize: 24 },
  headerTitle: { fontWeight: 700, fontSize: 18, color: '#1e293b' },
  headerRight: { display: 'flex', gap: 10 },
  main: { maxWidth: 900, margin: '0 auto', padding: '32px 24px' },
  loading: { color: '#94a3b8', fontSize: 16 },
  section: { background: '#fff', borderRadius: 12, padding: 28, marginBottom: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: '#1e293b', margin: '0 0 20px' },
  hint: { color: '#64748b', fontSize: 14, margin: '-12px 0 16px' },
  fields: { display: 'flex', flexDirection: 'column', gap: 16 },
  fieldRow: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#475569' },
  fieldInner: { display: 'flex', gap: 10, alignItems: 'flex-start' },
  input: { flex: 1, padding: '10px 12px', fontSize: 14, border: '1.5px solid #e2e8f0', borderRadius: 8, outline: 'none', background: '#f8fafc' },
  textarea: { flex: 1, padding: '10px 12px', fontSize: 14, border: '1.5px solid #e2e8f0', borderRadius: 8, outline: 'none', resize: 'vertical', background: '#f8fafc', fontFamily: 'inherit' },
  btnSave: { padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' },
  btnSaved: { padding: '10px 18px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, cursor: 'default', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' },
  btnSecondary: { padding: '8px 16px', background: '#f1f5f9', color: '#475569', border: '1.5px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  btnDanger: { padding: '8px 16px', background: '#fef2f2', color: '#ef4444', border: '1.5px solid #fecaca', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  featureList: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 },
  featureCard: { border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, background: '#f8fafc' },
  featureRow: { display: 'flex', gap: 8, alignItems: 'center' },
  btnRemove: { padding: '8px 12px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13 },
  featureActions: { display: 'flex', gap: 10, alignItems: 'center' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 12px', background: '#f1f5f9', color: '#475569', fontWeight: 600, borderBottom: '1px solid #e2e8f0' },
  td: { padding: '10px 12px', borderBottom: '1px solid #f1f5f9', color: '#334155', verticalAlign: 'top' },
  tr: { transition: 'background 0.1s' },
}
