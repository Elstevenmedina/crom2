import SEO from '../components/SEO'
import Features from '../components/Features/Features'
import Showcase from '../components/Showcase/Showcase'
import CategoryBanner from '../components/CategoryBanner/CategoryBanner'
import About from '../components/About/About'

function Home() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <SEO
        title="Inicio"
        description="CROM: mochilas, bolsos, cartucheras y loncheras escolares con m\u00e1s de 30 a\u00f1os de calidad. Dise\u00f1os resistentes y funcionales para estudiantes y familias."
        path="/"
      />
      <Features />
      <Showcase />
      <CategoryBanner />
      <About />
    </main>
  )
}

export default Home
