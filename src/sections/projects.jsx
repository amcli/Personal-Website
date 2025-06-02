import './projects.css'

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        <div className="project-card">
          <h3><a className="project-title-link" href="https://github.com/amcli/Top-Down-2D-Unity" target="_blank">Top-Down Unity Game</a></h3>
          <p>A simple Top-Down Unity game where the player tries to find escape through a number of mazes while fending off enemies.</p> 
          <p>Implemented core game mechanics using Object-Oriented Programming and C# scripting in Visual Studio to create an input system, collision detection, rigidbodies, and enemy behavior. 
            Used Unity Engine's UI System to create immersive health bars, stamina bars, pause menus and start menus.</p>
        </div>
        <div className="project-card">
          <h3>Portfolio Website</h3>
          <p>This website--built with React and Vite and styled with CSS. I would like to add Tailwind CSS to optimize and improve appearance.</p>
        </div>
        <div className="project-card">
          <h3>Empty Project</h3>
          <p>Awaiting new projects!</p>
        </div>
        <div className="project-card">
          <h3>Empty Project</h3>
          <p>Project where??</p>
        </div>
      </div>
    </section>
  )
}