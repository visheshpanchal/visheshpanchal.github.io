import { useEffect, useRef } from 'react'

const AcademicCapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ color: 'var(--color-primary)', flexShrink: 0 }}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ color: 'var(--color-secondary)' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default function Education({ education }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.education-card').forEach((el, i) => {
              el.style.opacity = '0'
              el.style.animation = `fadeInUp 0.55s ease ${i * 0.12}s forwards`
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

  return (
    <section id="education" className="section education" ref={sectionRef} aria-label="Education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education__list">
          {education.map((edu, index) => (
            <div key={`${edu.institution}-${index}`} className="education-card">
              <div
                className="education-card__institution"
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <AcademicCapIcon />
                {edu.institution}
              </div>

              <span className="education-card__period">{edu.period}</span>

              <p className="education-card__degree">{edu.degree}</p>

              {edu.gpa && (
                <p className="education-card__gpa" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <StarIcon />
                  GPA: {edu.gpa}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
