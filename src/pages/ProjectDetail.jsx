import { useParams, Link } from 'react-router-dom'
import portfolioData from '../config/portfolio.json'
import { toSlug } from '../utils/slug.js'

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function DetailSection({ title, children }) {
  return (
    <div className="pd-section">
      <h2 className="pd-section__title">{title}</h2>
      {children}
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = portfolioData.projects.find((p) => toSlug(p.name) === slug)

  if (!project) {
    return (
      <div className="pd-not-found">
        <p>Project not found.</p>
        <Link to="/" className="btn btn-primary">Back to Portfolio</Link>
      </div>
    )
  }

  const { detail } = project

  return (
    <div className="pd-page">
      {/* Top bar */}
      <div className="pd-topbar">
        <div className="container">
          <Link to="/#projects" className="pd-back">
            <ArrowLeftIcon />
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="container pd-container">

        {/* Hero header */}
        <header className="pd-header">
          <div className="pd-header__meta">
            {project.tags && project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h1 className="pd-header__name">{project.name}</h1>
          <p className="pd-header__desc">{project.description}</p>
          <div className="pd-header__links">
            {project.github && (
              <a href={project.github} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <GithubIcon /> View on GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon /> Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Detail sections — only rendered if the project has a detail object */}
        {detail && (
          <div className="pd-body">

            {detail.overview && (
              <DetailSection title="Overview">
                <p className="pd-text">{detail.overview}</p>
              </DetailSection>
            )}

            {(detail.problem || detail.solution) && (
              <DetailSection title="Problem & Solution">
                <div className="pd-two-col">
                  {detail.problem && (
                    <div className="pd-card">
                      <p className="pd-card__label">// the problem</p>
                      <p className="pd-text">{detail.problem}</p>
                    </div>
                  )}
                  {detail.solution && (
                    <div className="pd-card">
                      <p className="pd-card__label">// the solution</p>
                      <p className="pd-text">{detail.solution}</p>
                    </div>
                  )}
                </div>
              </DetailSection>
            )}

            {detail.features && detail.features.length > 0 && (
              <DetailSection title="Key Features">
                <ul className="pd-features">
                  {detail.features.map((f, i) => (
                    <li key={i} className="pd-feature-item">
                      <span className="pd-feature-icon"><CheckIcon /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}

            {detail.images && detail.images.length > 0 && (
              <DetailSection title="Screenshots">
                <div className="pd-images">
                  {detail.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      className="pd-image"
                      loading="lazy"
                    />
                  ))}
                </div>
              </DetailSection>
            )}

            {detail.challenges && (
              <DetailSection title="Challenges">
                <p className="pd-text">{detail.challenges}</p>
              </DetailSection>
            )}

            {detail.outcome && (
              <DetailSection title="Outcome">
                <div className="pd-outcome">
                  <p className="pd-text">{detail.outcome}</p>
                </div>
              </DetailSection>
            )}

          </div>
        )}

        {/* Bottom nav */}
        <div className="pd-footer-nav">
          <Link to="/#projects" className="btn btn-ghost">
            <ArrowLeftIcon /> All Projects
          </Link>
        </div>

      </div>
    </div>
  )
}
