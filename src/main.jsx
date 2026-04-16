import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import siteConfig from './config/site.config.json'
import './styles/base.css'
import './styles/custom.css'

document.title = siteConfig.meta.title
document.querySelector('meta[name="description"]')?.setAttribute('content', siteConfig.meta.description)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
