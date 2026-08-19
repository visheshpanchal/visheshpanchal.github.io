import { createContext, useContext, useEffect, useState } from 'react'
import siteConfig from '../config/site.config.json'

const ThemeContext = createContext(null)

function applyTheme(themeName) {
  const theme = siteConfig.themes[themeName]
  if (!theme) return
  const root = document.documentElement
  root.setAttribute('data-theme', themeName)
  root.style.setProperty('--color-primary', theme.primaryColor)
  root.style.setProperty('--color-secondary', theme.secondaryColor)
  root.style.setProperty('--color-bg', theme.bgColor)
  root.style.setProperty('--color-surface', theme.surfaceColor)
  root.style.setProperty('--color-text', theme.textColor)
  root.style.setProperty('--color-muted', theme.mutedColor)
  root.style.setProperty('--font-body', theme.fontBody)
  root.style.setProperty('--font-mono', theme.fontMono)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return saved && siteConfig.themes[saved] ? saved : siteConfig.defaultTheme ?? 'dark'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
