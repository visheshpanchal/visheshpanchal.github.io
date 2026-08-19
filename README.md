# Portfolio

A config-driven React portfolio site. All personal data lives in JSON files — no code changes needed for typical customization.

---

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## How to Customize

### 1. Your Personal Data — `src/config/portfolio.json`

This is the **only file you need to edit** to fill in your own information.

| Field | Description |
|---|---|
| `personal` | Name, title, tagline, email, location, avatar URL, resume URL |
| `about` | Bio text and bullet-point highlights |
| `social` | GitHub, LinkedIn, Twitter, personal website URLs |
| `skills` | Array of `{ category, items[] }` objects |
| `experience` | Work history with company, role, period, location, description, bullets |
| `projects` | Projects with name, description, tags, GitHub/live links, `featured` flag |
| `education` | Institutions with degree, period, and GPA |

**Example — changing your name and email:**
```json
{
  "personal": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    ...
  }
}
```

---

### 2. Layout, Theme & Sections — `src/config/site.config.json`

Control the **visual appearance** and **which sections appear** without touching any CSS.

#### Change colors (theme)
```json
{
  "theme": {
    "primaryColor": "#6C63FF",
    "secondaryColor": "#FF6584",
    "bgColor": "#0F0F13",
    "surfaceColor": "#1A1A24",
    "textColor": "#E8E8F0",
    "mutedColor": "#888899"
  }
}
```
All values become CSS custom properties (`--color-primary`, etc.) injected at runtime.

#### Show or hide sections
```json
{
  "sections": {
    "education": { "enabled": false },
    "projects":  { "enabled": true, "showAll": true }
  }
}
```

#### Configure the navbar
```json
{
  "nav": {
    "logo": "JP",
    "sticky": true,
    "links": [
      { "label": "About", "href": "#about", "enabled": true },
      { "label": "Blog",  "href": "#blog",  "enabled": false }
    ]
  }
}
```

---

### 3. Custom CSS — `src/styles/custom.css`

This file is loaded **after** `base.css`, so any rule you write here wins.

```css
/* Example: make the navbar fully opaque */
.navbar {
  background: rgba(0, 0, 0, 0.98);
}

/* Example: increase hero name size */
.hero__name {
  font-size: 6rem;
}
```

You can override any class from `base.css` here. Prefer editing `site.config.json` for color changes though — the CSS variable approach is cleaner.

---

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── config/
│   │   ├── portfolio.json       ← YOUR DATA
│   │   └── site.config.json     ← LAYOUT & THEME
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Experience/
│   │   ├── Projects/
│   │   ├── Education/
│   │   ├── Contact/
│   │   └── Footer/
│   ├── styles/
│   │   ├── base.css             ← default styles (don't edit)
│   │   └── custom.css           ← YOUR OVERRIDES
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at localhost:5173 |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## Deploy to GitHub Pages

1. **Create a GitHub repository** and push this project to it.

2. **Set the `base` path** in `vite.config.js` to match your repo name:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',   // e.g. '/portfolio/'
     ...
   })
   ```
   If you're deploying to a custom domain or a user/org page (`username.github.io`), keep `base: './'`.

3. **Install dependencies and deploy:**
   ```bash
   npm install
   npm run deploy
   ```
   This runs `vite build` then `gh-pages -d dist`, which pushes the `dist/` folder to the `gh-pages` branch automatically.

4. In your GitHub repo settings, go to **Pages** and set the source to the `gh-pages` branch.

5. Your site will be live at `https://username.github.io/your-repo-name/` within a minute or two.

---

## Tech Stack

- **React 18** — UI components
- **Vite 5** — build tool and dev server
- **Pure CSS** — no CSS framework dependencies, fully custom dark theme
- **JSON config** — all data and theme settings are externalized
- **gh-pages** — zero-config GitHub Pages deployment
