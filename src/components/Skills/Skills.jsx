import { useEffect, useRef } from 'react'

// Category icons mapped by common names
const categoryEmoji = {
  frontend: '🎨',
  backend: '⚙️',
  tools: '🛠️',
  mobile: '📱',
  devops: '🚀',
  database: '🗄️',
  design: '✏️',
  cloud: '☁️',
  testing: '🧪',
  other: '💡',
}

function getCategoryIcon(category) {
  const key = category.toLowerCase()
  return categoryEmoji[key] || categoryEmoji.other
}

export default function Skills({ skills }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-card').forEach((el, i) => {
              el.style.opacity = '0'
              el.style.animationDelay = `${i * 0.1}s`
              el.style.animation = `fadeInUp 0.5s ease ${i * 0.1}s forwards`
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
    <section id="skills" className="section" ref={sectionRef} aria-label="Skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills__grid">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="skill-card">
              <div className="skill-card__category">
                <span className="skill-card__category-icon" aria-hidden="true">
                  {getCategoryIcon(skillGroup.category)}
                </span>
                {skillGroup.category}
              </div>
              <div className="skill-card__items">
                {skillGroup.items.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
