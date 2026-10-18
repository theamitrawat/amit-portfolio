# Requirements Document

## Introduction

This document defines the requirements for the frontend of Amit Rawat's personal portfolio website. The portfolio serves as a digital resume and professional showcase targeting recruiters and hiring managers. It is built with React 19, Vite, Tailwind CSS v4, Framer Motion, React Router DOM v7, Axios, and React Icons. The application features a default dark theme with blue/purple accent colors, smooth animations, and a fully responsive layout across all device sizes.

---

## Glossary

- **Portfolio_App**: The complete React frontend application for Amit Rawat's portfolio.
- **Navbar**: The persistent top navigation component present on all pages.
- **Footer**: The persistent bottom section present on all pages.
- **Hero_Section**: The first visible section on the Home page introducing Amit Rawat.
- **ProjectCard**: A reusable card component displaying a project's summary information.
- **SkillCard**: A reusable card component displaying a single technical skill with its icon.
- **SectionTitle**: A reusable heading component used to label each page section.
- **Timeline**: A reusable component displaying chronological entries for education or experience.
- **SocialLinks**: A reusable component rendering links to external social/coding profiles.
- **ContactForm**: A form component for visitors to send messages to Amit Rawat.
- **ThemeToggle**: A toggle control that switches the application between dark and light themes.
- **Loader**: A full-screen or inline loading indicator shown during page transitions or data fetching.
- **Router**: React Router DOM v7 managing client-side navigation between pages.
- **AnimationEngine**: Framer Motion library powering all UI animations and transitions.
- **ApiClient**: The Axios-based service layer used for HTTP communication with the backend.
- **DataLayer**: Static JSON/JS files in `client/src/data/` that seed the UI before backend integration.
- **Recruiter**: A hiring manager or recruiter visiting the portfolio to evaluate Amit Rawat.

---

## Requirements

### Requirement 1: Application Routing and Page Structure

**User Story:** As a Recruiter, I want clearly separated pages accessible via clean URLs, so that I can navigate directly to the section I am interested in.

#### Acceptance Criteria

1. THE Router SHALL render the following routes: `/` (Home), `/projects` (Projects List), `/projects/:id` (Project Details), `/about` (About), `/resume` (Resume), `/contact` (Contact), and a wildcard `*` route (404 Not Found).
2. WHEN a Recruiter navigates to any path that does not exactly match one of the seven defined routes, THE Router SHALL render the 404 Not Found page.
3. THE Navbar SHALL be rendered as the first element in the DOM body before the main content area on every page.
4. THE Footer SHALL be rendered as the last element in the DOM body after the main content area on every page.
5. WHEN a route transition occurs, THE AnimationEngine SHALL apply a fade page-transition animation completing within 200–400ms.
6. WHILE a page is loading or data is being fetched, THE Loader SHALL be displayed.
7. IF a data fetch fails, THEN THE Portfolio_App SHALL hide the Loader and display a user-facing error message in place of the expected content.

---

### Requirement 2: Navbar Component

**User Story:** As a Recruiter, I want a clear and persistent navigation bar, so that I can move between sections and pages without getting lost.

#### Acceptance Criteria

1. THE Navbar SHALL display Amit Rawat's name or logo as a home link on the left side.
2. THE Navbar SHALL display navigation links to: Home, Projects, About, Resume, and Contact.
3. WHEN the viewport width is below 768px, THE Navbar SHALL collapse navigation links into a hamburger menu icon.
4. WHEN the hamburger menu icon is clicked or keyboard-activated, THE Navbar SHALL display a dropdown overlay menu containing all five navigation links.
5. WHEN a navigation link is clicked or keyboard-activated, THE Navbar SHALL close the dropdown overlay and navigate to the target route using client-side navigation.
6. WHEN the user scrolls down more than 60px, THE Navbar SHALL apply a non-transparent background so the navigation text remains readable over page content.
7. THE Navbar SHALL render the ThemeToggle control on the right side.
8. THE Navbar SHALL indicate the currently active route by applying a visually distinct style (e.g., increased font weight, underline, or different color) to the corresponding link that is not applied to inactive links.
9. WHEN the viewport resizes to 768px or wider while the mobile dropdown is open, THE Navbar SHALL close the dropdown and display the navigation links inline.

---

### Requirement 3: Home Page — Hero Section

**User Story:** As a Recruiter, I want an engaging introduction at the top of the page, so that I immediately understand who Amit Rawat is and what he does.

#### Acceptance Criteria

1. THE Hero_Section SHALL display Amit Rawat's name as the primary heading rendered in an `<h1>` element.
2. THE Hero_Section SHALL display a short tagline or role description (e.g., "Full Stack Developer") of no more than 60 characters.
3. THE Hero_Section SHALL display a brief bio of two to three sentences.
4. THE Hero_Section SHALL display a profile photo or avatar image with a non-empty descriptive `alt` attribute; IF the image fails to load, THEN a placeholder avatar SHALL be displayed.
5. THE Hero_Section SHALL display a primary call-to-action button that navigates to `/projects` using client-side navigation.
6. THE Hero_Section SHALL display a secondary call-to-action button that navigates to `/contact` using client-side navigation.
7. THE Hero_Section SHALL display SocialLinks for GitHub, LinkedIn, and LeetCode profiles, each opening in a new browser tab with `rel="noopener noreferrer"`.
8. WHEN the Hero_Section mounts, THE AnimationEngine SHALL animate the heading, bio, buttons, and image using staggered entrance animations with a stagger interval of 50–150ms, completing within 800ms total.

---

### Requirement 4: Home Page — About Me Section

**User Story:** As a Recruiter, I want a brief overview of Amit Rawat's background on the Home page, so that I get a quick impression before deciding to visit the full About page.

#### Acceptance Criteria

1. THE About_Me_Section SHALL display a summary paragraph of 40–80 words covering Amit Rawat's professional background, technical focus areas, and personal interests.
2. THE About_Me_Section SHALL display a link or button that navigates to the `/about` route using client-side navigation.
3. WHEN the About_Me_Section enters the viewport by at least 10%, THE AnimationEngine SHALL trigger a fade-in animation that fires once per page load.

---

### Requirement 5: Home Page — Technical Skills Section

**User Story:** As a Recruiter, I want to see Amit Rawat's technical skills at a glance, so that I can quickly assess his technology stack.

#### Acceptance Criteria

1. THE Technical_Skills_Section SHALL display skills grouped into the following four categories sourced from the DataLayer: Frontend, Backend, Tools & DevOps, and Databases.
2. EACH skill in THE Technical_Skills_Section SHALL be rendered using a SkillCard that displays the skill name alongside a visible icon from the React Icons library.
3. THE Technical_Skills_Section SHALL use a responsive grid layout: a minimum of two columns on mobile (< 768px), a minimum of three columns on tablet (768–1024px), and a minimum of four columns on desktop (> 1024px).
4. WHEN a SkillCard enters the viewport, THE AnimationEngine SHALL animate it into view with each card delayed by 50–100ms relative to the previous card, completing the full sequence within 800ms.

---

### Requirement 6: Home Page — Featured Projects Section

**User Story:** As a Recruiter, I want to see Amit Rawat's best projects highlighted on the Home page, so that I can quickly gauge the quality of his work.

#### Acceptance Criteria

1. THE Featured_Projects_Section SHALL display a maximum of three ProjectCards sourced from the DataLayer where the project entry has `featured: true`.
2. EACH ProjectCard SHALL display: project title, short description of no more than 150 characters, up to five technology tags, a thumbnail image (showing a placeholder if no image URL is provided in the DataLayer), a link to the `/projects/:id` route for that project, and a GitHub repository link rendered only when a GitHub URL is present in the DataLayer.
3. THE Featured_Projects_Section SHALL display a "View All Projects" button that navigates to the `/projects` route.
4. WHEN a ProjectCard enters the viewport, THE AnimationEngine SHALL animate it into view with a staggered delay, firing once per page load.

---

### Requirement 7: Home Page — Education Section

**User Story:** As a Recruiter, I want to see Amit Rawat's educational background, so that I can verify his academic qualifications.

#### Acceptance Criteria

1. THE Education_Section SHALL render education entries sourced from the DataLayer using the Timeline component.
2. EACH Timeline entry SHALL display: institution name, degree or qualification title, year range in YYYY–YYYY or YYYY–Present format, and an optional description of no more than 300 characters.
3. WHEN the Education_Section scrolls into the viewport, THE AnimationEngine SHALL animate Timeline entries into view in top-to-bottom order with a stagger delay of 100–200ms per entry, firing once per page load.
4. IF the DataLayer contains no education entries, THEN THE Education_Section SHALL display a "No education entries available" fallback message instead of a blank section.

---

### Requirement 8: Home Page — Experience Section

**User Story:** As a Recruiter, I want to see Amit Rawat's professional experience, so that I can evaluate his work history.

#### Acceptance Criteria

1. THE Experience_Section SHALL render experience entries sourced from the DataLayer using the Timeline component.
2. EACH Timeline entry SHALL display: company or organization name, role title, duration as a start–end date range (e.g., "Jan 2022 – Present"), and a list of at least one key responsibility or achievement.
3. WHEN the Experience_Section scrolls into the viewport, THE AnimationEngine SHALL animate Timeline entries into view sequentially in top-to-bottom order, firing once per page load.
4. IF the DataLayer contains no experience entries, THEN THE Experience_Section SHALL display a "No experience entries available" fallback message instead of a blank section.

---

### Requirement 9: Home Page — Certificates Section

**User Story:** As a Recruiter, I want to see Amit Rawat's certifications, so that I can assess any additional validated skills.

#### Acceptance Criteria

1. THE Certificates_Section SHALL display each certificate as a card showing: certificate title, issuing organization, issue date in MMM YYYY format (e.g., "Jun 2023"), and a verification link rendered only when a URL is present in the DataLayer entry.
2. WHEN a Recruiter activates a verification link, THE Portfolio_App SHALL open the URL in a new browser tab with `rel="noopener noreferrer"`; IF no verification URL is present, no link element SHALL be rendered.
3. WHEN the Certificates_Section scrolls into the viewport, THE AnimationEngine SHALL animate the certificate cards into view with a staggered entrance completing within 800ms, firing once per page load.

---

### Requirement 10: Home Page — Coding Profiles Section

**User Story:** As a Recruiter, I want to see links to Amit Rawat's coding profiles, so that I can review his practical problem-solving activity.

#### Acceptance Criteria

1. THE Coding_Profiles_Section SHALL render the SocialLinks component displaying links to: GitHub, LeetCode, and GeeksforGeeks.
2. EACH profile link SHALL display the platform name, an icon sourced from the React Icons library, and a stat or description of no more than 60 characters (e.g., "500+ problems solved on LeetCode").
3. WHEN a Recruiter activates a profile link, THE Portfolio_App SHALL open the URL in a new browser tab without granting access to the originating page context (i.e., using `rel="noopener noreferrer"`).

---

### Requirement 11: Home Page — Resume Download CTA Section

**User Story:** As a Recruiter, I want a clear call-to-action to download Amit Rawat's resume, so that I can save it for offline review.

#### Acceptance Criteria

1. THE Resume_CTA_Section SHALL display a heading rendered in an `<h2>` element and a description of no more than 20 words encouraging the Recruiter to download the resume.
2. THE Resume_CTA_Section SHALL render a Button component labeled "Download Resume".
3. WHEN the "Download Resume" button is activated, THE Portfolio_App SHALL trigger a browser attachment-download of the resume PDF with the filename `Amit_Rawat_Resume.pdf`.
4. IF the resume PDF fetch fails, THEN THE Portfolio_App SHALL display an error message, disable the "Download Resume" button, and provide a fallback link that navigates to the `/resume` route.

---

### Requirement 12: Home Page — Contact Section

**User Story:** As a Recruiter, I want to send a message to Amit Rawat directly from the Home page, so that I can reach out without navigating away.

#### Acceptance Criteria

1. THE Home_Contact_Section SHALL render the ContactForm component.
2. THE ContactForm SHALL include: a full name field (required, max 100 characters), an email address field (required, valid RFC 5322 format, max 254 characters), a subject field (required, max 150 characters), and a message field (required, min 20 characters, max 2000 characters).
3. WHEN the ContactForm is submitted with all fields valid, THE ContactForm SHALL disable the submit button during the request and send the data to the backend contact endpoint via the ApiClient.
4. WHEN the contact request succeeds, THE ContactForm SHALL display a success confirmation message that persists until the user begins a new form interaction, and SHALL reset all fields to empty.
5. IF the contact request fails, THEN THE ContactForm SHALL display an error message indicating the reason for the failure, re-enable the submit button for retry, and SHALL NOT clear user-entered data.
6. WHEN a required field is left empty and the form is submitted, THE ContactForm SHALL display an inline validation error beneath the offending field and SHALL NOT initiate a contact request.
7. WHEN the email field contains an invalid format and the form is submitted, THE ContactForm SHALL display an inline validation error beneath the email field and SHALL NOT initiate a contact request.

---

### Requirement 13: Home Page — Footer

**User Story:** As a Recruiter, I want a footer with quick links and social profiles, so that I can navigate efficiently from any scroll position.

#### Acceptance Criteria

1. THE Footer SHALL display Amit Rawat's name and a tagline of no more than 80 characters.
2. THE Footer SHALL display quick navigation links to all five main pages: Home, Projects, About, Resume, and Contact.
3. THE Footer SHALL render the SocialLinks component with icons for GitHub, LinkedIn, and LeetCode, each opening in a new browser tab with `rel="noopener noreferrer"`.
4. THE Footer SHALL display a copyright notice where the year is computed at runtime from the current date (e.g., `© 2024 Amit Rawat`).

---

### Requirement 14: Projects Page

**User Story:** As a Recruiter, I want to browse all of Amit Rawat's projects in one place, so that I can get a comprehensive view of his portfolio.

#### Acceptance Criteria

1. WHEN the Projects_Page mounts, THE Projects_Page SHALL display all projects sourced from the DataLayer as a grid of ProjectCards with no active filter or search query.
2. WHEN the Recruiter types in the search input, THE Projects_Page SHALL filter the displayed ProjectCards to those whose title or technology tags contain the typed string as a case-insensitive partial match.
3. WHEN the Recruiter activates a technology category filter, THE Projects_Page SHALL display only ProjectCards whose technology tags include a tag belonging to that category as defined in the DataLayer.
4. WHEN both a search query and a category filter are active simultaneously, THE Projects_Page SHALL display only ProjectCards that satisfy both conditions.
5. WHEN no projects match the current filter or search query, THE Projects_Page SHALL display a "No projects found" message.
6. WHEN a ProjectCard is activated, THE Router SHALL navigate to the `/projects/:id` route for the selected project.
7. WHEN the Projects_Page mounts, THE AnimationEngine SHALL stagger the entrance animation of ProjectCards completing within 800ms.

---

### Requirement 15: Project Details Page

**User Story:** As a Recruiter, I want to read the full details of a specific project, so that I can understand Amit Rawat's contribution and the technologies used.

#### Acceptance Criteria

1. THE Project_Details_Page SHALL display the following required fields sourced from the DataLayer: project title, full description, technology tags, challenge or problem statement, solution approach, and a link to the GitHub repository.
2. IF the project data includes a live demo URL, THEN THE Project_Details_Page SHALL render a live demo link; otherwise no demo link element SHALL be rendered.
3. WHEN the Project_Details_Page mounts with a valid project ID, THE Portfolio_App SHALL retrieve and display the corresponding project data from the DataLayer.
4. IF the project data includes image URLs, THEN THE Project_Details_Page SHALL render those images; ELSE THE Project_Details_Page SHALL display a placeholder image.
5. IF the provided project ID does not correspond to any known project in the DataLayer, THEN THE Router SHALL render the 404 Not Found page.
6. WHEN the Recruiter activates the "Back to Projects" link, THE Router SHALL navigate to the `/projects` route using client-side navigation.
7. WHEN the Project_Details_Page mounts, THE AnimationEngine SHALL animate the content into view within 800ms.

---

### Requirement 16: About Page

**User Story:** As a Recruiter, I want a dedicated page to learn more about Amit Rawat, so that I can make an informed hiring decision.

#### Acceptance Criteria

1. THE About_Page SHALL display a profile photo with a non-empty descriptive `alt` attribute, a biography of at least 100 words, at least one statement of professional interests, and at least one professional goal.
2. THE About_Page SHALL display all skill categories sourced from the DataLayer using the same SkillCard layout and grid configuration as the Home page Technical Skills section.
3. THE About_Page SHALL display all education entries sourced from the DataLayer using the Timeline component, each showing: institution name, degree or qualification title, year range in YYYY–YYYY or YYYY–Present format, and optional description.
4. THE About_Page SHALL display all experience entries sourced from the DataLayer using the Timeline component, each showing: company or organization name, role title, duration as a start–end date range, and at least one responsibility or achievement.
5. WHEN each section of the About_Page enters the viewport during scroll, THE AnimationEngine SHALL animate that section into view within 800ms, firing once per page load per section.

---

### Requirement 17: Resume Page

**User Story:** As a Recruiter, I want to view and download Amit Rawat's resume, so that I can review it in detail.

#### Acceptance Criteria

1. THE Resume_Page SHALL display the resume as an embedded PDF viewer.
2. WHEN the Resume_Page mounts, THE Resume_Page SHALL display a "Download Resume" button.
3. WHEN the "Download Resume" button is activated, THE Portfolio_App SHALL initiate a browser download of the resume PDF with the filename `Amit_Rawat_Resume.pdf`.
4. IF the resume PDF file is unavailable, THEN THE Resume_Page SHALL display an error message containing a mailto link to Amit Rawat's email address so the Recruiter can request the resume directly.
5. WHILE the PDF viewer is loading, THE Resume_Page SHALL display the Loader component; IF the PDF fails to load, THEN THE Resume_Page SHALL display the fallback defined in criterion 4.

---

### Requirement 18: Contact Page

**User Story:** As a Recruiter, I want a dedicated contact page, so that I can reach Amit Rawat conveniently.

#### Acceptance Criteria

1. WHEN the Contact_Page mounts, THE Contact_Page SHALL render the ContactForm component applying the same field rules, validation, and submission behavior defined in Requirement 12.
2. WHEN the Contact_Page mounts, THE Contact_Page SHALL display a dedicated contact information section on the same page containing: Amit Rawat's email address as a clickable mailto link, a LinkedIn profile hyperlink, and a GitHub profile hyperlink.
3. WHEN the Contact_Page mounts, THE Contact_Page SHALL render the SocialLinks component displaying icons and links for all platforms defined in Requirement 10.

---

### Requirement 19: 404 Not Found Page

**User Story:** As a Recruiter, I want a friendly error page when I navigate to a non-existent route, so that I am not confused and can return to the portfolio easily.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render the 404 Not Found page for any route that does not match the seven defined routes in Requirement 1.
2. WHEN the 404 Not Found page renders, THE 404_Page SHALL display a heading containing "404" or "Page Not Found" and an explanation of no more than 50 words.
3. WHEN the Recruiter activates the home navigation control, THE 404_Page SHALL navigate to the root route `/` using client-side navigation without a full page reload.

---

### Requirement 20: Theme Toggle

**User Story:** As a Recruiter, I want to switch between dark and light themes, so that I can view the portfolio in my preferred visual mode.

#### Acceptance Criteria

1. WHEN no stored theme preference exists in localStorage, THE Portfolio_App SHALL apply the dark theme on initial load.
2. WHEN the ThemeToggle is activated, IF the current theme is dark THEN THE Portfolio_App SHALL switch to light theme; IF the current theme is light THEN THE Portfolio_App SHALL switch to dark theme; and SHALL persist the new preference to localStorage.
3. WHEN the ThemeToggle is activated, THE Portfolio_App SHALL persist the selected theme value to the `theme` key in localStorage.
4. WHEN the Portfolio_App initializes, THE Portfolio_App SHALL read the `theme` key from localStorage and set a `data-theme` attribute on the `<html>` element before the first render, preventing a flash of incorrect theme.
5. THE Portfolio_App SHALL expose the current theme value and the toggle function via a React context; WHEN the theme changes, all components consuming the context SHALL re-render with the updated theme.

---

### Requirement 21: Responsive Design

**User Story:** As a Recruiter, I want the portfolio to look and function correctly on any device, so that I can review it whether I am on a desktop, tablet, or phone.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use Tailwind CSS v4 responsive utility classes to implement layouts for three breakpoints: mobile (< 768px), tablet (768px – 1024px), and desktop (> 1024px).
2. WHILE the viewport width is below 768px, THE Portfolio_App SHALL display a single-column layout for the Skills, Projects, and Experience grid sections.
3. WHILE the viewport width is between 768px and 1024px, THE Portfolio_App SHALL display a two-column layout for the Skills, Projects, and Experience grid sections.
4. WHILE the viewport width is above 1024px, THE Portfolio_App SHALL display three or more columns for the Skills, Projects, and Experience grid sections.
5. THE Portfolio_App SHALL not display horizontal scrollbars at any viewport width from 320px upward.
6. WHILE the viewport width is below 768px, EACH interactive element (button, link, input) SHALL have a minimum touch target size of 44×44 CSS pixels.
7. THE Portfolio_App SHALL set a `max-width` on all media and image elements so they do not overflow their containing layout column at any viewport width.

---

### Requirement 22: Accessibility

**User Story:** As a Recruiter using an assistive technology, I want the portfolio to be navigable and readable, so that I can access all content regardless of my ability.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<header>`) for all major structural regions.
2. EACH image in THE Portfolio_App SHALL include an `alt` attribute; decorative images SHALL use `alt=""` and informative images SHALL use a descriptive text value.
3. EACH interactive element in THE Portfolio_App SHALL be reachable and activatable via keyboard Tab and Enter/Space keys, and SHALL display a CSS outline or equivalent visible focus indicator when focused.
4. THE Portfolio_App SHALL maintain a minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text (≥ 18pt or ≥ 14pt bold) between foreground and background colors, per WCAG 2.1 AA.
5. EACH input field in THE ContactForm SHALL have a corresponding `<label>` element associated via matching `htmlFor` and `id` attributes.
6. WHEN the mobile menu is open, THE Navbar SHALL trap keyboard focus within the menu; WHEN the menu is closed, keyboard focus SHALL be returned to the hamburger icon that opened it.
7. Icon-only interactive controls (e.g., ThemeToggle, social icon links) SHALL include an `aria-label` attribute describing the control's action or destination.
8. THE Portfolio_App SHALL include a skip-navigation link as the first focusable element that moves keyboard focus to the `<main>` content region when activated.
9. WHEN THE ContactForm displays a success or error message, THE message container SHALL have `role="status"` or `aria-live="polite"` so screen readers announce the update.

---

### Requirement 23: Animation Standards

**User Story:** As a Recruiter, I want smooth and professional animations that enhance readability, so that the portfolio feels polished without being distracting.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use the AnimationEngine (Framer Motion) exclusively for all UI animations and transitions.
2. WHEN a section element enters the viewport by at least 20%, THE AnimationEngine SHALL trigger the section's entrance animation once per page load.
3. WHEN the user's device reports `prefers-reduced-motion: reduce`, THE Portfolio_App SHALL set all animation durations to 0ms and suppress positional and opacity transitions throughout the application.
4. ALL entrance animations SHALL complete within 800ms from the start of the animation, where the 800ms cap applies per individual element including any stagger offset accumulated before that element begins animating.

---

### Requirement 24: Data Layer and API Integration

**User Story:** As a developer, I want a static data layer that seeds the UI now and can be replaced by API calls later, so that the frontend works independently of the backend during development.

#### Acceptance Criteria

1. THE DataLayer SHALL provide static JavaScript export files in `client/src/data/` for each of the following domains: projects, skills, education, experience, certificates, and coding profiles.
2. WHILE the backend API is unavailable, THE Portfolio_App SHALL read all display data exclusively from the DataLayer files.
3. IF the backend API is available, THE ApiClient SHALL be used for dynamic operations (contact form submission and project data fetching), replacing the corresponding DataLayer reads.
4. THE ApiClient SHALL be defined in `client/src/services/` and SHALL export a named async function for each API operation: `submitContactForm`, `fetchProjects`, and `fetchProjectById`.
5. IF an ApiClient request returns a network error or a non-2xx HTTP status, THEN THE Portfolio_App SHALL display a user-facing error message and SHALL NOT expose raw error objects or stack traces in the UI.

---

### Requirement 25: Project Folder Structure

**User Story:** As a developer, I want a well-organized folder structure, so that the codebase remains maintainable and scalable.

#### Acceptance Criteria

1. THE Portfolio_App source code SHALL be organized under `client/src/` with the following top-level subdirectories: `assets/`, `components/`, `pages/`, `services/`, `hooks/`, `context/`, `utils/`, and `data/`; root-level files `main.jsx`, `App.jsx`, and global stylesheets SHALL reside directly under `client/src/`.
2. EACH reusable UI component (Navbar, Footer, Button, ProjectCard, SkillCard, SectionTitle, Timeline, SocialLinks, ContactForm, ThemeToggle, Loader) SHALL reside in `client/src/components/`.
3. EACH page component (Home, Projects, ProjectDetails, About, Resume, Contact, NotFound) SHALL reside in `client/src/pages/`.
4. THE ApiClient and all service modules SHALL reside in `client/src/services/`.
5. THE ThemeContext and any other React context providers SHALL reside in `client/src/context/`.
6. Custom React hooks SHALL reside in `client/src/hooks/`; pure utility/helper functions SHALL reside in `client/src/utils/`; and all static data export files SHALL reside in `client/src/data/`.
