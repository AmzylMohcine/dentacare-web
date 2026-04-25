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
    { label: 'L\'application',  href: '#screens' },
    { label: 'À propos',        href: '#about' },
    { label: 'Contact',         href: '#demo' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 60,
        background: scrolled ? 'rgba(255,255,255,.94)' : 'rgba(255,255,255,.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? '#E2E8F0' : 'transparent'}`,
        boxShadow: scrolled ? '0 1px 10px rgba(0,0,0,.06)' : 'none',
        transition: 'all .25s ease',
        display: 'flex', alignItems: 'center',
        padding: '0 4%',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <a href="/" style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#38B2AC,#1B5B7E)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🦷</div>
          <span style={{ fontWeight:800, fontSize:15, color:'#0C1E38', letterSpacing:-.3 }}>DentaCare</span>
        </a>

        {/* Desktop links */}
        <div className="hide-mob" style={{ display:'flex', gap:2 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color:'#64748B', fontSize:13, fontWeight:500, padding:'6px 11px', borderRadius:7, transition:'color .15s,background .15s', whiteSpace:'nowrap' }}
              onMouseEnter={e => { e.target.style.color='#0C1E38'; e.target.style.background='#F7FAFC' }}
              onMouseLeave={e => { e.target.style.color='#64748B'; e.target.style.background='transparent' }}
            >{l.label}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hide-mob" style={{ display:'flex', gap:8, alignItems:'center', flexShrink:0 }}>
          <a href="https://app.dentacareapp.com" target="_blank" rel="noopener" style={{ color:'#1B5B7E', fontSize:13, fontWeight:600, padding:'7px 13px', borderRadius:7, border:'1.5px solid #E6F3F9', transition:'all .15s', whiteSpace:'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#1B5B7E'; e.currentTarget.style.background='#E6F3F9' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#E6F3F9'; e.currentTarget.style.background='transparent' }}
          >Se connecter</a>
          <a href="#demo" style={{ background:'linear-gradient(135deg,#1B5B7E,#38B2AC)', color:'#fff', fontSize:13, fontWeight:700, padding:'8px 18px', borderRadius:8, boxShadow:'0 3px 12px rgba(27,91,126,.32)', transition:'transform .15s,box-shadow .15s', whiteSpace:'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 6px 18px rgba(27,91,126,.42)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 3px 12px rgba(27,91,126,.32)' }}
          >Demander une démo</a>
        </div>

        {/* Mobile burger */}
        <button className="hide-desk" onClick={() => setOpen(o => !o)} style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#0C1E38', padding:'4px 6px', lineHeight:1 }}>
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position:'fixed', top:60, left:0, right:0, zIndex:999, background:'#fff', borderBottom:'1px solid #E2E8F0', padding:'12px 20px 20px', boxShadow:'0 8px 24px rgba(0,0,0,.08)', animation:'fadeIn .18s ease' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display:'block', color:'#64748B', fontSize:15, fontWeight:500, padding:'12px 0', borderBottom:'1px solid #F1F5F9' }}>{l.label}</a>
          ))}
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:16 }}>
            <a href="https://app.dentacareapp.com" target="_blank" rel="noopener" onClick={() => setOpen(false)} style={{ display:'block', padding:'11px', borderRadius:9, textAlign:'center', border:'1.5px solid #E2E8F0', color:'#1B5B7E', fontSize:14, fontWeight:600 }}>Se connecter</a>
            <a href="#demo" onClick={() => setOpen(false)} style={{ display:'block', padding:'12px', borderRadius:9, textAlign:'center', background:'linear-gradient(135deg,#1B5B7E,#38B2AC)', color:'#fff', fontSize:14, fontWeight:700 }}>Demander une démo</a>
          </div>
        </div>
      )}
    </>
  )
}
