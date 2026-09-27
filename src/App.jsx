import Hero from './sections/hero'
import About from './sections/about'
import Experience from './sections/experience'
import Projects from './sections/projects'
import Contact from './sections/contact'
import Navbar from './components/navbar'
import Footer from './components/footer'
import DiscordPresence from './components/discord_presence'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <DiscordPresence />
    </div>

  )
}

export default App