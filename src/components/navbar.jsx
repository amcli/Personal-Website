import './navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><a className="navbar-name" href="#hero">Andrew M C Li</a></div>
      <ul className="navbar-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}