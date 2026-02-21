import Features from '../components/Features/Features'
import Showcase from '../components/Showcase/Showcase'
import CategoryBanner from '../components/CategoryBanner/CategoryBanner'
import About from '../components/About/About'

function Home() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <Features />
      <Showcase />
      <CategoryBanner />
      <About />
    </main>
  )
}

export default Home
