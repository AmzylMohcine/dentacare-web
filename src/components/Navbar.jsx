import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'L\'application', href: '#screens' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#demo' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64,
        background: scrolled ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? '#E2E8F0' : 'transparent'}`,
        transition: 'all .25s ease',
        display: 'flex', alignItems: 'center',
        padding: '0 5%',
        justifyContent: 'space-between',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,.06)' : 'none',
      }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg,#38B2AC,#1B5B7E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
          }}>🦷</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: '#0C1E38', letterSpacing: -.3 }}>DentaCare</span>
        </a>

        {/* Desktop links */}
        <div className="hide-mob" style={{ display: 'flex', gap: 4 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: '#64748B', fontSize: 14, fontWeight: 500,
              padding: '6px 12px', borderRadius: 8,
              transition: 'color .15s, background .15s',
            }}
              onMouseEnter={e => { e.target.style.color = '#0C1E38'; e.target.style.background = '#F7FAFC' }}
              onMouseLeave={e => { e.target.style.color = '#64748B'; e.target.style.background = 'transparent' }}
            >{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="hide-mob" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="https://app.dentacareapp.com" target="_blank" rel="noopener" style={{
            color: '#1B5B7E', fontSize: 14, fontWeight: 600,
            padding: '7px 14px', borderRadius: 8,
            border: '1.5px solid #E6F3F9',
            transition: 'all .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1B5B7E'; e.currentTarget.style.background = '#E6F3F9' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E6F3F9'; e.currentTarget.style.background = 'transparent' }}
          >Se connecter</a>
          <a href="#demo" style={{
            background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)',
            color: '#fff', fontSize: 14, fontWeight: 700,
            padding: '8px 20px', borderRadius: 9,
            boxShadow: '0 3px 14px rgba(27,91,126,.35)',
            transition: 'transform .15s, box-shadow .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(27,91,126,.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 14px rgba(27,91,126,.35)' }}
          >Demander une démo</a>
        </div>

        {/* Mobile burger */}
        <button className="hide-desk" onClick={() => setOpen(o => !o)} style={{
          background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#0C1E38', padding: 6,
        }}>{open ? '✕' : '☰'}</button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
          background: '#fff', borderBottom: '1px solid #E2E8F0',
          padding: '16px 5% 24px',
          animation: 'fadeIn .18s ease',
          boxShadow: '0 8px 24px rgba(0,0,0,.08)',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', color: '#64748B', fontSize: 15, fontWeight: 500,
              padding: '12px 0', borderBottom: '1px solid #F1F5F9',
            }}>{l.label}</a>
          ))}
          <a href="#demo" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 16, padding: 13, borderRadius: 10,
            background: 'linear-gradient(135deg,#1B5B7E,#38B2AC)',
            color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: 700,
          }}>Demander une démo</a>
        </div>
      )}
    </>
  )
}
