import './App.css'
import Hero from './sections/hero'
import About from './sections/about'
import Projects from './sections/projects'
import Contact from './sections/contact'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {
  return (
    <div clasName="app-container">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
    
  )
}

export default App