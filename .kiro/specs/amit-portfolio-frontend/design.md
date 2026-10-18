# Design Document — amit-portfolio-frontend

## Overview

Single-page application built with React 19 + Vite. Client-side routing via React Router DOM v7. Framer Motion handles all animations. Tailwind CSS v4 provides utility-first styling. Axios is used for API calls (contact form, project fetching). Static data in `src/data/` seeds the UI when the backend is absent.

Default theme is dark (blue/purple accents). Theme preference is stored in `localStorage` and applied via `data-theme` on `<html>` before first render.

---

## Architecture

```
client/src/
├── main.jsx              # Entry point — applies theme from localStorage, mounts app
├── App.jsx               # Router config, layout shell (Navbar + Outlet + Footer)
├── index.css             # Tailwind v4 import + CSS custom properties for themes
├── assets/               # Static images, icons
├── components/           # Reusable UI components
├── pages/                # Route-level page components
├── services/             # ApiClient (Axios)
├── hooks/                # Custom hooks
├── context/              # ThemeContext
├── utils/                # Pure helpers (validation, date formatting)
└── data/                 # Static JS data files
```

**Data flow:**
1. Pages read from `src/data/` files directly (static).
2. `ApiClient` is called for: contact form submission, `fetchProjects`, `fetchProjectById`.
3. `ThemeContext` is consumed by any component needing the current theme or toggle function.
4. All loading/error states are managed locally in each page component.

---

## Routing Configuration (`App.jsx`)

```
<BrowserRouter>
  <ThemeProvider>
    <Navbar />
    <main>
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/projects"     element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/about"        element={<About />} />
        <Route path="/resume"       element={<Resume />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="*"             element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </ThemeProvider>
</BrowserRouter>
```

Page transitions: wrap `<Routes>` output with Framer Motion `<AnimatePresence>` using a fade variant (opacity 0→1, 200–400ms). Respect `prefers-reduced-motion` by setting duration to 0ms.

---

## Components and Interfaces

### Layout
| Component | Props | Responsibility |
|-----------|-------|----------------|
| `Navbar` | — | Logo, nav links, hamburger menu, ThemeToggle. Active link via `useLocation`. Scroll listener for solid bg at >60px. Focus trap when mobile menu open. |
| `Footer` | — | Name/tagline, quick nav links, SocialLinks, runtime copyright year. |

### Shared / Reusable
| Component | Props | Responsibility |
|-----------|-------|----------------|
| `Button` | `variant`, `onClick`, `href`, `download`, `disabled`, `children` | Primary/secondary/ghost button with optional link/download behavior. |
| `SectionTitle` | `title`, `subtitle?` | `<h2>` heading with optional subtitle, consistent spacing. |
| `ProjectCard` | `project` | Title, short description (≤150 chars), tech tags (≤5), thumbnail/placeholder, link to `/projects/:id`, optional GitHub link. |
| `SkillCard` | `skill` | Skill name + React Icons icon. |
| `Timeline` | `entries`, `type` | Chronological list; each entry: title, subtitle, dateRange, optional description/bullets. Renders fallback when `entries` is empty. |
| `SocialLinks` | `links`, `showStats?` | Icon + label links, all `target="_blank" rel="noopener noreferrer"`. |
| `ContactForm` | `onSuccess?` | Controlled form with inline validation. Calls `ApiClient.submitContactForm`. Fields: name, email, subject, message. |
| `ThemeToggle` | — | Reads/writes ThemeContext. Icon-only with `aria-label`. |
| `Loader` | `fullScreen?` | Spinner; full-screen overlay or inline. |

### Pages
| Page | Key sections / notes |
|------|---------------------|
| `Home` | Hero, AboutMe snippet, TechnicalSkills, FeaturedProjects, Education, Experience, Certificates, CodingProfiles, ResumeCTA, ContactSection |
| `Projects` | Search input, category filter chips, ProjectCard grid, "No results" fallback |
| `ProjectDetails` | Full project info sourced by ID from DataLayer/ApiClient; 404 redirect on unknown ID |
| `About` | Photo + bio, skills grid, education Timeline, experience Timeline |
| `Resume` | Embedded PDF viewer + download button; error/fallback state |
| `Contact` | ContactForm + contact info panel + SocialLinks |
| `NotFound` | 404 heading, short message, home link |

---

## Data Models

### Project (`src/data/projects.js`)
```js
{
  id: string,          // URL slug
  title: string,
  shortDescription: string,   // ≤150 chars
  description: string,        // full markdown or plain text
  tags: string[],             // technology tags
  thumbnailUrl: string | null,
  imageUrls: string[],
  githubUrl: string | null,
  liveUrl: string | null,
  featured: boolean,
  challenge: string,
  solution: string,
}
```

### Skill (`src/data/skills.js`)
```js
{
  name: string,
  icon: string,        // React Icons component name e.g. "SiReact"
  category: 'Frontend' | 'Backend' | 'Tools & DevOps' | 'Databases',
}
```

### Education (`src/data/education.js`)
```js
{
  institution: string,
  degree: string,
  dateRange: string,   // "YYYY–YYYY" | "YYYY–Present"
  description: string | null,   // ≤300 chars
}
```

### Experience (`src/data/experience.js`)
```js
{
  company: string,
  role: string,
  duration: string,    // "MMM YYYY – MMM YYYY | Present"
  responsibilities: string[],   // ≥1 item
}
```

### Certificate (`src/data/certificates.js`)
```js
{
  title: string,
  issuer: string,
  date: string,        // "MMM YYYY"
  verificationUrl: string | null,
}
```

### Coding Profile (`src/data/codingProfiles.js`)
```js
{
  platform: string,
  url: string,
  icon: string,        // React Icons name
  stat: string,        // ≤60 chars
}
```

---

## Context

### `ThemeContext` (`src/context/ThemeContext.jsx`)
```js
{
  theme: 'dark' | 'light',
  toggleTheme: () => void,
}
```
- Initialized from `localStorage.getItem('theme')` (default: `'dark'`).
- On change: updates state, writes `localStorage.setItem('theme', value)`, sets `document.documentElement.setAttribute('data-theme', value)`.
- `main.jsx` runs the `data-theme` init script synchronously before React hydration to prevent flash.

---

## Services (`src/services/ApiClient.js`)

```js
// Base URL from import.meta.env.VITE_API_URL
export async function submitContactForm(data)     // POST /api/contact
export async function fetchProjects()             // GET  /api/projects
export async function fetchProjectById(id)        // GET  /api/projects/:id
```

All functions throw a normalized `{ message: string, status: number }` error on non-2xx or network failure. Raw error objects/stack traces are never surfaced to the UI.

---

## Custom Hooks (`src/hooks/`)

| Hook | Purpose |
|------|---------|
| `useTheme()` | Convenience wrapper around `useContext(ThemeContext)` |
| `useScrollY()` | Returns current scroll position — used by Navbar for solid-bg threshold |
| `useInView(ref, threshold)` | Wrapper around `IntersectionObserver` — used to trigger Framer Motion animations once per page load |

---

## Utils (`src/utils/`)

| Helper | Purpose |
|--------|---------|
| `validateContactForm(data)` | Returns `{ valid: boolean, errors: Record<string, string> }` |
| `filterProjects(projects, query, category)` | Case-insensitive partial-match on title + tags, plus category intersection |
| `formatDate(dateString)` | Normalizes date strings to "MMM YYYY" |
| `truncate(str, max)` | Truncates with ellipsis at character boundary |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

---

### Property 1: Unknown routes render NotFound

*For any* URL path that does not match the seven defined routes (`/`, `/projects`, `/projects/:id`, `/about`, `/resume`, `/contact`), the Router SHALL render the NotFound (404) page.

**Validates: Requirements 1.2, 19.1**

---

### Property 2: External links are safe

*For any* link rendered by `SocialLinks`, certificate verification cards, or coding profile cards that has an `href` pointing to an external URL, the element SHALL have `target="_blank"` and `rel="noopener noreferrer"`.

**Validates: Requirements 3.7, 9.2, 10.3, 13.3**

---

### Property 3: Active nav link invariant

*For any* currently active route, exactly the nav link matching that route SHALL have the active visual style applied, and all other nav links SHALL not have that style applied.

**Validates: Requirements 2.8**

---

### Property 4: Skills render from DataLayer

*For any* skill object in the DataLayer, a `SkillCard` displaying the skill's name and a visible icon SHALL be rendered in the Technical Skills section.

**Validates: Requirements 5.1, 5.2, 16.2**

---

### Property 5: Featured projects constraint

*For any* array of project objects in the DataLayer, the Featured Projects section SHALL display only projects where `featured === true`, and SHALL display at most 3 such projects.

**Validates: Requirements 6.1**

---

### Property 6: ProjectCard renders required fields conditionally

*For any* project object, `ProjectCard` SHALL render: title, short description (truncated to 150 chars), up to 5 technology tags, a thumbnail or placeholder image, and a link to `/projects/:id`. A GitHub link SHALL be rendered if and only if `githubUrl` is non-null.

**Validates: Requirements 6.2, 15.1, 15.2**

---

### Property 7: Education Timeline entries

*For any* education entry in the DataLayer, the `Timeline` component SHALL render: institution name, degree title, date range, and optionally description when present.

**Validates: Requirements 7.2, 16.3**

---

### Property 8: Experience Timeline entries

*For any* experience entry in the DataLayer, the `Timeline` component SHALL render: company name, role title, duration, and at least one responsibility item.

**Validates: Requirements 8.2, 16.4**

---

### Property 9: Certificate card renders conditionally

*For any* certificate object in the DataLayer, the card SHALL render: title, issuing organization, date in "MMM YYYY" format. A verification link SHALL be rendered if and only if `verificationUrl` is non-null.

**Validates: Requirements 9.1, 9.2**

---

### Property 10: Project search filter correctness

*For any* search query string and array of projects, `filterProjects` SHALL return only projects whose `title` or any element of `tags` contains the query as a case-insensitive substring.

**Validates: Requirements 14.2**

---

### Property 11: Category filter correctness

*For any* category filter and array of projects, `filterProjects` SHALL return only projects that have at least one tag belonging to the selected category. When both a search query and a category filter are active, only projects satisfying both conditions SHALL be returned.

**Validates: Requirements 14.3, 14.4**

---

### Property 12: Contact form validation rejects invalid inputs

*For any* form submission where at least one field violates its constraint (empty required field, invalid email format, name > 100 chars, email > 254 chars, subject > 150 chars, message < 20 or > 2000 chars), `validateContactForm` SHALL return `valid: false` with a non-empty error message for each offending field, and no API call SHALL be made.

**Validates: Requirements 12.2, 12.6, 12.7**

---

### Property 13: Theme toggle round-trip

*For any* current theme value, toggling the theme twice SHALL return the theme to its original value, and after each toggle the `theme` key in `localStorage` SHALL match the current theme.

**Validates: Requirements 20.2, 20.3**

---

### Property 14: Project lookup by ID

*For any* valid project `id` present in the DataLayer, the `ProjectDetails` page SHALL render the project data corresponding to that exact `id`.

**Validates: Requirements 15.3**

---

### Property 15: All images have alt attributes

*For any* `<img>` element rendered in the application, an `alt` attribute SHALL be present. Informative images SHALL have a non-empty `alt` value; decorative images SHALL use `alt=""`.

**Validates: Requirements 22.2, 3.4**

---

### Property 16: ContactForm inputs have associated labels

*For any* `<input>` or `<textarea>` rendered inside `ContactForm`, there SHALL exist a `<label>` element whose `htmlFor` matches the input's `id`.

**Validates: Requirements 22.5**

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| `fetchProjects` / `fetchProjectById` network or non-2xx | Hide Loader, show inline error message; no stack trace in UI |
| `submitContactForm` failure | Re-enable submit button, show error message, preserve user data |
| `submitContactForm` success | Show success message, reset form fields |
| PDF unavailable on Resume page | Show error with mailto fallback link |
| Image load failure | Replace with placeholder via `onError` handler |
| Unknown project ID | Redirect to NotFound via `<Navigate replace to="*" />` |
| `prefers-reduced-motion` | All Framer Motion durations set to `0` via global variant override |

---

## Testing Strategy

**Unit tests** (Vitest + React Testing Library):
- `validateContactForm` — example-based tests for each field rule
- `filterProjects` — example + edge cases (empty query, no matches, combined filter)
- `formatDate`, `truncate` — pure function examples
- `ThemeContext` — toggle behavior, localStorage persistence
- `Timeline` — empty entries fallback message
- `ContactForm` — inline validation display, submit disable, success/error state

**Property-based tests** (fast-check, minimum 100 iterations each):
- Property 1: Random unknown paths → NotFound renders
- Property 2: Random external link sets → all have correct `rel`/`target`
- Property 3: Random active routes → exactly one nav link active
- Property 4: Random skill arrays → all skills rendered as SkillCards
- Property 5: Random project arrays with mixed `featured` flags → Featured section constraint holds
- Property 6: Random project objects → ProjectCard field rendering correctness
- Property 7: Random education arrays → Timeline renders required fields
- Property 8: Random experience arrays → Timeline renders required fields
- Property 9: Random certificate objects → card renders conditionally
- Property 10: Random (query, projects) pairs → filterProjects output is correct subset
- Property 11: Random (category, query, projects) triples → combined filter is intersection
- Property 12: Random form inputs (invalid) → validateContactForm returns correct errors
- Property 13: Any theme value → double-toggle round-trip
- Property 14: Random valid project IDs → correct project rendered
- Property 15: Render any page component → all `<img>` elements have `alt`
- Property 16: Render ContactForm → all inputs have matching labels

Tag format for each property test: `// Feature: amit-portfolio-frontend, Property N: <property_text>`

**Integration / smoke tests:**
- App mounts with default dark theme when localStorage is empty
- Navbar renders on every page; Footer renders on every page
- Route transitions render correct page components
- PDF viewer renders on Resume page; download button present
- ApiClient error normalization (mock Axios adapters)
