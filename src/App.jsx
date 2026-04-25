import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Landing from './pages/Landing'
import Admin from './pages/Admin'
import Booking from './pages/Booking'

const DEFAULT_CONTENT = {
  hero_title: 'La solution complète pour votre cabinet dentaire',
  hero_subtitle: 'Gérez vos patients, rendez-vous, traitements et finances depuis une seule plateforme intuitive.',
  hero_cta: 'Demander une démo',
  about_title: 'Conçu pour les cabinets dentaires modernes',
  about_text: 'DentaCare est né d\'un besoin réel : simplifier le quotidien des praticiens et de leurs équipes. Plus de paperasse, plus de doubles saisies — tout est centralisé, sécurisé et accessible.',
  contact_email: 'contact@dentacareapp.com',
  footer_text: '© 2026 DentaCare. Tous droits réservés.',
}

function getRoute() {
  const path = window.location.pathname
  if (path === '/admin') return { page: 'admin', cabinetId: null }
  const m = path.match(/^\/rdv\/([^/]+)$/)
  if (m) return { page: 'booking', cabinetId: m[1] }
  return { page: 'landing', cabinetId: null }
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    const onPop = () => setRoute(getRoute())
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
    setRoute({ page: 'admin', cabinetId: null })
  }

  const goLanding = () => {
    window.history.pushState({}, '', '/')
    setRoute({ page: 'landing', cabinetId: null })
  }

  if (route.page === 'admin')   return <Admin onBack={goLanding} />
  if (route.page === 'booking') return <Booking cabinetId={route.cabinetId} />
  return <Landing content={content} />
}
