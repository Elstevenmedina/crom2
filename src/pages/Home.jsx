import { motion } from 'framer-motion'
import Features from '../components/Features/Features'
import Showcase from '../components/Showcase/Showcase'
import CategoryBanner from '../components/CategoryBanner/CategoryBanner'
import About from '../components/About/About'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

function Home() {
  return (
    <main style={{ overflow: 'hidden' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
        <Features />
      </motion.div>

      <Showcase />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
        <CategoryBanner />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
        <About />
      </motion.div>
    </main>
  )
}

export default Home
