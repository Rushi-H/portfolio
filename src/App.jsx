import React, { Suspense, useState, lazy } from 'react';
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail } from 'react-icons/fi';

const Portfolio3D = lazy(() => import('./portfolio-3d'));

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <>
      <div className="crt"></div>

      <div className="ui-layer">
        <header className="header">
          <div className="title-container">
            <h1>RUSHI-H</h1>
            <p>PORTFOLIO v1.0</p>
          </div>

          <nav className="nav-menu">
            <button
              className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => setActiveSection('about')}
            >
              ABOUT
            </button>
            <button
              className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveSection('projects')}
            >
              PROJECTS
            </button>
            <button
              className={`nav-btn ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveSection('experience')}
            >
              EXPERIENCE
            </button>
            <button
              className={`nav-btn ${activeSection === 'education' ? 'active' : ''}`}
              onClick={() => setActiveSection('education')}
            >
              EDUCATION
            </button>
          </nav>

          <div className="social-links">
            <a href="https://github.com/RUSHI-H" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/rushi-h/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="mailto:Revanhonkande@gmail.com" aria-label="Email">
              <Mail size={24} />
            </a>
          </div>
        </header>

        <div className="controls-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          DRAG TO ROTATE • SCROLL TO ZOOM
        </div>
      </div>

      <Suspense fallback={null}>
        <Portfolio3D activeSection={activeSection} />
      </Suspense>
    </>
  );
}

export default App;
