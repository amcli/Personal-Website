import Hero from './sections/hero'
import About from './sections/about'
import Projects_Experience from './sections/projects_experience'
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
      <Projects_Experience />
      <Contact />
      <Footer />
      <DiscordPresence />
    </div>

  )
}

export default App