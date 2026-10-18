# Implementation Plan: amit-portfolio-frontend

## Overview

Build Amit Rawat's personal portfolio frontend from scratch on top of the existing Vite + React 19 scaffold. All dependencies are already installed. Tasks follow the priority order: project setup → data layer → context/hooks/utils → layout components → shared components → pages → routing → animations/polish → tests.

## Tasks

- [ ] 1. Project setup — Tailwind v4, theme CSS variables, folder structure
  - [ ] 1.1 Wire Tailwind CSS v4 into Vite and create global stylesheet
    - Add `@tailwindcss/vite` plugin to `vite.config.js`
    - Replace `client/src/index.css` with Tailwind v4 `@import "tailwindcss"` directive
    - Define all CSS custom properties for dark and light themes on `[data-theme="dark"]` and `[data-theme="light"]` selectors (colors: background, surface, accent-primary, accent-secondary, text-primary, text-secondary, border)
    - Set `data-theme="dark"` as default on `<html>` in `client/index.html`
    - _Requirements: 20.1, 20.4, 25.1_
  - [ ] 1.2 Scaffold all required source directories
    - Create empty `.gitkeep` files (or index files) in: `src/components/`, `src/pages/`, `src/services/`, `src/hooks/`, `src/context/`, `src/utils/`, `src/data/`
    - _Requirements: 25.1, 25.2, 25.3, 25.4, 25.5, 25.6_


- [ ] 2. Data layer — static JS data files
  - [ ] 2.1 Create `src/data/projects.js` with sample project entries
    - Export an array of at least 3 project objects matching the Project data model (id, title, shortDescription ≤150 chars, description, tags, thumbnailUrl, imageUrls, githubUrl, liveUrl, featured, challenge, solution)
    - Mark at least 1 entry as `featured: true`
    - _Requirements: 24.1, 24.2, 6.1, 6.2_
  - [ ] 2.2 Create `src/data/skills.js` with skill entries
    - Export an array of skill objects (name, icon, category) covering all four categories: Frontend, Backend, Tools & DevOps, Databases
    - Use React Icons component name strings for `icon` field (e.g., `"SiReact"`)
    - _Requirements: 24.1, 5.1, 5.2_
  - [ ] 2.3 Create `src/data/education.js`, `src/data/experience.js`, `src/data/certificates.js`, `src/data/codingProfiles.js`
    - Education: institution, degree, dateRange (YYYY–YYYY or YYYY–Present), optional description ≤300 chars
    - Experience: company, role, duration, responsibilities array (≥1 item)
    - Certificates: title, issuer, date ("MMM YYYY"), verificationUrl (nullable)
    - Coding profiles: platform, url, icon, stat (≤60 chars) for GitHub, LeetCode, GeeksforGeeks
    - _Requirements: 24.1, 7.2, 8.2, 9.1, 10.1, 10.2_


- [ ] 3. Utils — pure helper functions
  - [ ] 3.1 Implement `src/utils/validateContactForm.js`
    - Export `validateContactForm(data)` returning `{ valid: boolean, errors: Record<string, string> }`
    - Validate: name required + ≤100 chars, email required + valid format + ≤254 chars, subject required + ≤150 chars, message required + ≥20 chars + ≤2000 chars
    - _Requirements: 12.2, 12.6, 12.7_
  - [ ]* 3.2 Write property test for `validateContactForm` (Property 12)
    - **Property 12: Contact form validation rejects invalid inputs**
    - **Validates: Requirements 12.2, 12.6, 12.7**
    - Use fast-check to generate random inputs that violate at least one constraint; assert `valid === false` with non-empty errors for each offending field
    - Tag: `// Feature: amit-portfolio-frontend, Property 12: Contact form validation rejects invalid inputs`
  - [ ] 3.3 Implement `src/utils/filterProjects.js`
    - Export `filterProjects(projects, query, category)` — case-insensitive partial match on `title` + `tags`; when `category` is set, filter to projects with at least one tag in that category; both conditions applied as AND
    - _Requirements: 14.2, 14.3, 14.4_
  - [ ]* 3.4 Write property tests for `filterProjects` (Properties 10 & 11)
    - **Property 10: Project search filter correctness**
    - **Property 11: Category filter correctness**
    - **Validates: Requirements 14.2, 14.3, 14.4**
    - Tag: `// Feature: amit-portfolio-frontend, Property 10: ...` and `Property 11: ...`
  - [ ] 3.5 Implement `src/utils/formatDate.js` and `src/utils/truncate.js`
    - `formatDate(dateString)` normalizes to "MMM YYYY"
    - `truncate(str, max)` trims with ellipsis at character boundary
    - _Requirements: 9.1, 6.2_
  - [ ]* 3.6 Write unit tests for `formatDate` and `truncate`
    - Cover empty string, already-short string, exact-length boundary, over-length, various date formats
    - _Requirements: 9.1, 6.2_


- [ ] 4. Context and custom hooks
  - [ ] 4.1 Implement `src/context/ThemeContext.jsx`
    - Create `ThemeContext` and `ThemeProvider` component
    - Initialize from `localStorage.getItem('theme')` defaulting to `'dark'`
    - On toggle: update state, `localStorage.setItem('theme', value)`, `document.documentElement.setAttribute('data-theme', value)`
    - Export `ThemeProvider` and `ThemeContext`
    - _Requirements: 20.1, 20.2, 20.3, 20.5_
  - [ ]* 4.2 Write property test for ThemeContext (Property 13)
    - **Property 13: Theme toggle round-trip**
    - **Validates: Requirements 20.2, 20.3**
    - Use fast-check with `fc.constantFrom('dark', 'light')` — toggle twice, assert theme returns to original and localStorage matches
    - Tag: `// Feature: amit-portfolio-frontend, Property 13: Theme toggle round-trip`
  - [ ] 4.3 Implement `src/hooks/useTheme.js`, `src/hooks/useScrollY.js`, `src/hooks/useInView.js`
    - `useTheme()` — convenience wrapper around `useContext(ThemeContext)`
    - `useScrollY()` — returns `window.scrollY` updating on scroll event with cleanup
    - `useInView(ref, threshold)` — `IntersectionObserver` wrapper, returns boolean, fires once
    - _Requirements: 2.6, 23.2_


- [ ] 5. Services — ApiClient
  - [ ] 5.1 Implement `src/services/ApiClient.js`
    - Create Axios instance with `baseURL: import.meta.env.VITE_API_URL`
    - Export `submitContactForm(data)` → POST `/api/contact`
    - Export `fetchProjects()` → GET `/api/projects`
    - Export `fetchProjectById(id)` → GET `/api/projects/:id`
    - On non-2xx or network error: catch and throw `{ message: string, status: number }` — no raw errors or stack traces
    - _Requirements: 24.3, 24.4, 24.5_
  - [ ]* 5.2 Write unit tests for ApiClient error normalization
    - Mock Axios adapter to return 4xx/5xx and network errors; assert thrown object shape matches `{ message, status }`
    - _Requirements: 24.5_


- [ ] 6. Layout components — Navbar and Footer
  - [ ] 6.1 Implement `src/components/Navbar.jsx`
    - Display logo/name as `<Link to="/">` on the left; nav links (Home, Projects, About, Resume, Contact) inline on desktop
    - On mobile (< 768px): show hamburger icon; clicking opens a dropdown overlay with all five links; close on link click or resize to ≥768px (Requirement 2.3, 2.4, 2.5, 2.9)
    - Use `useScrollY()` hook; apply solid background class when `scrollY > 60` (Requirement 2.6)
    - Use `useLocation()` to mark active link with distinct style (Requirement 2.8)
    - Trap focus in mobile menu when open; return focus to hamburger on close (Requirement 22.6)
    - Render `<ThemeToggle />` on the right (Requirement 2.7)
    - Include skip-navigation `<a href="#main-content">` as first focusable element (Requirement 22.8)
    - _Requirements: 2.1–2.9, 22.6, 22.8_
  - [ ]* 6.2 Write property test for active nav link invariant (Property 3)
    - **Property 3: Active nav link invariant**
    - **Validates: Requirements 2.8**
    - Use fast-check with `fc.constantFrom('/', '/projects', '/about', '/resume', '/contact')` — assert exactly one nav link has active class per route
    - Tag: `// Feature: amit-portfolio-frontend, Property 3: Active nav link invariant`
  - [ ] 6.3 Implement `src/components/Footer.jsx`
    - Display name + tagline (≤80 chars); quick nav links to all 5 pages; `<SocialLinks>` for GitHub, LinkedIn, LeetCode; runtime copyright year via `new Date().getFullYear()`
    - All external links: `target="_blank" rel="noopener noreferrer"`
    - _Requirements: 13.1–13.4, 1.4_


- [ ] 7. Shared / reusable components
  - [ ] 7.1 Implement `src/components/ThemeToggle.jsx`
    - Icon-only button consuming `useTheme()`; toggles between dark and light; `aria-label` describing current action
    - _Requirements: 20.2, 22.7_
  - [ ] 7.2 Implement `src/components/Button.jsx` and `src/components/SectionTitle.jsx`
    - `Button`: variants primary/secondary/ghost; optional `href` renders `<a>`; optional `download` attribute; `disabled` prop; keyboard-accessible
    - `SectionTitle`: renders `<h2>` + optional subtitle with consistent spacing
    - _Requirements: 22.3, 11.2_
  - [ ] 7.3 Implement `src/components/Loader.jsx` and `src/components/SocialLinks.jsx`
    - `Loader`: spinner; `fullScreen` prop toggles full-screen overlay vs inline; accessible with `aria-busy`
    - `SocialLinks`: renders icon + label per link entry; all external: `target="_blank" rel="noopener noreferrer"`; each link has `aria-label`
    - _Requirements: 1.6, 3.7, 10.3, 13.3, 22.7_
  - [ ]* 7.4 Write property test for external link safety (Property 2)
    - **Property 2: External links are safe**
    - **Validates: Requirements 3.7, 9.2, 10.3, 13.3**
    - Use fast-check to generate random arrays of link objects; render `<SocialLinks>`; assert every `<a>` with external href has `target="_blank"` and `rel="noopener noreferrer"`
    - Tag: `// Feature: amit-portfolio-frontend, Property 2: External links are safe`
  - [ ] 7.5 Implement `src/components/SkillCard.jsx`
    - Renders skill name + icon (dynamically import from `react-icons` by name string); accessible with visible icon
    - _Requirements: 5.2, 16.2_
  - [ ]* 7.6 Write property test for skills rendering (Property 4)
    - **Property 4: Skills render from DataLayer**
    - **Validates: Requirements 5.1, 5.2, 16.2**
    - Use fast-check to generate random skill arrays; render the skills section; assert every skill name appears and an icon element is present
    - Tag: `// Feature: amit-portfolio-frontend, Property 4: Skills render from DataLayer`
  - [ ] 7.7 Implement `src/components/ProjectCard.jsx`
    - Render title, `truncate(shortDescription, 150)`, up to 5 tech tags, thumbnail (placeholder on null/error), link to `/projects/:id`, GitHub link only when `githubUrl` is non-null
    - `<img>` must have descriptive `alt`; `onError` swaps to placeholder
    - _Requirements: 6.2, 15.1, 15.2_
  - [ ]* 7.8 Write property test for ProjectCard rendering (Property 6)
    - **Property 6: ProjectCard renders required fields conditionally**
    - **Validates: Requirements 6.2, 15.1, 15.2**
    - Use fast-check to generate random project objects; render `<ProjectCard>`; assert all required fields appear and GitHub link appears iff `githubUrl !== null`
    - Tag: `// Feature: amit-portfolio-frontend, Property 6: ProjectCard renders required fields conditionally`
  - [ ] 7.9 Implement `src/components/Timeline.jsx`
    - Accepts `entries` array and `type` prop (`'education'` | `'experience'`)
    - Education entry: institution, degree, dateRange, optional description
    - Experience entry: company, role, duration, responsibilities list (≥1 bullet)
    - Renders "No education entries available" / "No experience entries available" when `entries` is empty
    - _Requirements: 7.2, 7.4, 8.2, 8.4_
  - [ ]* 7.10 Write property tests for Timeline entries (Properties 7 & 8)
    - **Property 7: Education Timeline entries**
    - **Property 8: Experience Timeline entries**
    - **Validates: Requirements 7.2, 8.2, 16.3, 16.4**
    - Use fast-check to generate random education/experience arrays; render `<Timeline>`; assert all fields appear; assert empty-array fallback message appears
    - Tag: `// Feature: amit-portfolio-frontend, Property 7: ...` and `Property 8: ...`
  - [ ] 7.11 Implement `src/components/ContactForm.jsx`
    - Controlled form: name, email, subject, message fields; each has `<label htmlFor>` + `id`
    - On submit: run `validateContactForm`; show inline errors without API call if invalid
    - If valid: disable submit, call `ApiClient.submitContactForm`; on success show confirmation (`role="status"`) + reset fields; on error re-enable + show error message (`aria-live="polite"`), preserve data
    - _Requirements: 12.1–12.7, 22.5, 22.9_
  - [ ]* 7.12 Write unit tests for ContactForm
    - Test inline error display, submit button disabled during request, success state resets fields, error state preserves data
    - _Requirements: 12.2–12.7_
  - [ ]* 7.13 Write property test for ContactForm label association (Property 16)
    - **Property 16: ContactForm inputs have associated labels**
    - **Validates: Requirements 22.5**
    - Render `<ContactForm>`; assert every `<input>` and `<textarea>` has a `<label>` with matching `htmlFor`/`id`
    - Tag: `// Feature: amit-portfolio-frontend, Property 16: ContactForm inputs have associated labels`

