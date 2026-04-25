import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Landing from './pages/Landing'
import Admin from './pages/Admin'

const DEFAULT_CONTENT = {
  hero_title: 'La solution complète pour votre cabinet dentaire',
  hero_subtitle: 'Gérez vos patients, rendez-vous, traitements et finances depuis une seule plateforme intuitive.',
  hero_cta: 'Demander une démo',
  about_title: 'Conçu pour les cabinets dentaires modernes',
  about_text: 'DentaCare est né d\'un besoin réel : simplifier le quotidien des praticiens et de leurs équipes. Plus de paperasse, plus de doubles saisies — tout est centralisé, sécurisé et accessible.',
  contact_email: 'contact@dentacareapp.com',
  footer_text: '© 2026 DentaCare. Tous droits réservés.',
}

function getPage() {
  return window.location.pathname === '/admin' ? 'admin' : 'landing'
}

export default function App() {
  const [page, setPage] = useState(getPage)
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    const onPop = () => setPage(getPage())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    supabase.from('site_content').select('*').then(({ data }) => {
      if (!data) return
      const map = { ...DEFAULT_CONTENT }
      data.forEach(row => { map[row.key] = row.value })
      setContent(map)
    })
  }, [])

  const goAdmin = () => {
    window.history.pushState({}, '', '/admin')
    setPage('admin')
  }

  const goLanding = () => {
    window.history.pushState({}, '', '/')
    setPage('landing')
  }

  if (page === 'admin') return <Admin onBack={goLanding} />
  return <Landing content={content} />
}
