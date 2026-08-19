import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { toSlug } from '../../utils/slug.js'

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

function ProjectCard({ project }) {
  const hasDetail = Boolean(project.detail)
  const slug = toSlug(project.name)

  const cardInner = (
    <>
      <div className="project-card__header">
        <div className="project-card__folder">
          <FolderIcon />
        </div>
        <div className="project-card__links">
          {project.github && (
            <a
              href={project.github}
              className="project-card__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              className="project-card__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__description">{project.description}</p>

      {project.tags && project.tags.length > 0 && (
        <div className="project-card__tags" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {hasDetail && (
        <div className="project-card__detail-hint">
          View details <ArrowRightIcon />
        </div>
      )}
    </>
  )

  if (hasDetail) {
    return (
      <Link
        to={`/project/${slug}`}
        className="project-card project-card--clickable"
        aria-label={`View details for ${project.name}`}
      >
        {cardInner}
      </Link>
    )
  }

  return (
    <article className="project-card" aria-label={`Project: ${project.name}`}>
      {cardInner}
    </article>
  )
}

export default function Projects({ projects, config }) {
  const [showAll, setShowAll] = useState(config.showAll || false)
  const sectionRef = useRef(null)

  const featuredProjects = projects.filter((p) => p.featured)
  const displayedProjects = showAll ? projects : featuredProjects
  const hasHidden = featuredProjects.length < projects.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.project-card').forEach((el, i) => {
              el.style.opacity = '0'
              el.style.animation = `fadeInUp 0.5s ease ${i * 0.1}s forwards`
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [showAll])

  return (
    <section id="projects" className="section" ref={sectionRef} aria-label="Projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <div className="projects__grid">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        {hasHidden && (
          <div className="projects__toggle">
            <button
              className="btn btn-ghost"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
            >
              {showAll ? 'Show Less' : `Show All Projects (${projects.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
