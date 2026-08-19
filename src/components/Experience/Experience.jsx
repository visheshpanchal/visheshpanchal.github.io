import { useEffect, useRef } from 'react'

export default function Experience({ experience }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.experience-item').forEach((el, i) => {
              el.style.opacity = '0'
              el.style.animation = `fadeInUp 0.6s ease ${i * 0.15}s forwards`
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="section experience" ref={sectionRef} aria-label="Work experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <ol className="experience__list" aria-label="Work history">
          {experience.map((job, index) => (
            <li key={`${job.company}-${index}`} className="experience-item">
              {/* Timeline dot */}
              <div className="experience-item__dot" aria-hidden="true">
                <div className="experience-item__dot-inner" />
              </div>

              {/* Card body */}
              <div className="experience-item__body">
                <div className="experience-item__header">
                  <h3 className="experience-item__role">{job.role}</h3>
                  <span className="experience-item__period">{job.period}</span>
                </div>

                <div className="experience-item__company-row">
                  <span className="experience-item__company">{job.company}</span>
                  {job.location && (
                    <span className="experience-item__location">{job.location}</span>
                  )}
                </div>

                {job.description && (
                  <p className="experience-item__desc">{job.description}</p>
                )}

                {job.bullets && job.bullets.length > 0 && (
                  <ul className="experience-item__bullets" aria-label="Responsibilities and achievements">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="experience-item__bullet">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
