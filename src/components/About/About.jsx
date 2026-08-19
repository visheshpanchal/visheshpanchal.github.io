import { useEffect, useRef, useState } from 'react'

const CheckIcon = () => (
  <svg
    className="about__highlight-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const UserIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export default function About({ about, personal }) {
  const sectionRef = useRef(null)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              el.style.animationDelay = `${i * 0.1}s`
              el.classList.add('animate')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const bioParagraphs = about.bio
    ? about.bio.split('\n').filter(Boolean)
    : [about.bio]

  const hasAvatar = personal.avatar && !imgError

  return (
    <section id="about" className="section about" ref={sectionRef} aria-label="About">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className={`about__layout${hasAvatar ? ' about__layout--with-photo' : ''}`}>

          {/* Photo column */}
          {hasAvatar && (
            <div className="about__photo-col animate-on-scroll">
              <div className="about__photo-wrap">
                <img
                  src={personal.avatar}
                  alt={personal.name || 'Profile photo'}
                  className="about__photo"
                  onError={() => setImgError(true)}
                />
                {/* Decorative ring */}
                <div className="about__photo-ring" aria-hidden="true" />
              </div>
            </div>
          )}

          {/* Content column */}
          <div className="about__content">
            {/* Bio */}
            <div className="about__bio animate-on-scroll">
              {bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Highlights */}
            {about.highlights && about.highlights.length > 0 && (
              <div className="animate-on-scroll">
                <p className="about__highlights-title">// highlights</p>
                <ul className="about__highlights" aria-label="Personal highlights">
                  {about.highlights.map((item, i) => (
                    <li key={i} className="about__highlight-item">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Info cards column */}
          <div className="about__info">
            {personal.location && (
              <div className="about__info-card animate-on-scroll">
                <p className="about__info-label">Location</p>
                <p className="about__info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPinIcon />
                  {personal.location}
                </p>
              </div>
            )}

            {personal.email && (
              <div className="about__info-card animate-on-scroll">
                <p className="about__info-label">Email</p>
                <a
                  href={`mailto:${personal.email}`}
                  className="about__info-value"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}
                >
                  <MailIcon />
                  {personal.email}
                </a>
              </div>
            )}

            {personal.title && (
              <div className="about__info-card animate-on-scroll">
                <p className="about__info-label">Role</p>
                <p className="about__info-value">{personal.title}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
