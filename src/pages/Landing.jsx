import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import DemoForm from '../components/DemoForm'
import Footer from '../components/Footer'

export default function Landing({ content, onAdmin }) {
  const features = (() => {
    try {
      const f = content?.features
      if (Array.isArray(f)) return f
      if (typeof f === 'string') return JSON.parse(f)
    } catch {}
    return null
  })()

  return (
    <>
      <Navbar onAdmin={onAdmin} />
      <Hero content={content} />
      <Features features={features} />
      <About content={content} />
      <DemoForm />
      <Footer onAdmin={onAdmin} />
    </>
  )
}
