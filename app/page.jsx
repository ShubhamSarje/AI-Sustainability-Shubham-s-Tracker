import Header from '@/components/Header'
import Hero from '@/components/Hero'
import KpiStrip from '@/components/KpiStrip'
import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Header />
      <Hero />
      <KpiStrip />
      <Dashboard />
      <Footer />
    </div>
  )
}
