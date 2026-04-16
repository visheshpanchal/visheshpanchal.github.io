import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Skills from './components/Skills/Skills.jsx'
import Experience from './components/Experience/Experience.jsx'
import Projects from './components/Projects/Projects.jsx'
import Education from './components/Education/Education.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import siteConfig from './config/site.config.json'
import portfolioData from './config/portfolio.json'
import { useTheme } from './context/ThemeContext.jsx'

function MainPage() {
  const { sections } = siteConfig
  return (
    <main>
      {sections.hero?.enabled && <Hero personal={portfolioData.personal} social={portfolioData.social} config={sections.hero} />}
      {sections.about?.enabled && <About about={portfolioData.about} personal={portfolioData.personal} />}
      {sections.skills?.enabled && <Skills skills={portfolioData.skills} />}
      {sections.experience?.enabled && <Experience experience={portfolioData.experience} />}
      {sections.projects?.enabled && <Projects projects={portfolioData.projects} config={sections.projects} />}
      {sections.education?.enabled && <Education education={portfolioData.education} />}
      {sections.contact?.enabled && <Contact personal={portfolioData.personal} social={portfolioData.social} />}
    </main>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <HashRouter>
      <Navbar
        config={siteConfig.nav}
        personal={portfolioData.personal}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
      {siteConfig.footer?.enabled && (
        <Footer config={siteConfig.footer} personal={portfolioData.personal} />
      )}
    </HashRouter>
  )
}
