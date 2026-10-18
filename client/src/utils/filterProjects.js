/**
 * Filters an array of projects by search query and/or category.
 * @param {Array} projects
 * @param {string} query - case-insensitive partial match on title + tags
 * @param {string} category - filter to projects with at least one tag in this category
 * @returns {Array}
 */
export function filterProjects(projects, query = '', category = '') {
  const q = query.trim().toLowerCase()

  return projects.filter((project) => {
    const matchesQuery =
      q === '' ||
      project.title.toLowerCase().includes(q) ||
      (Array.isArray(project.tags) &&
        project.tags.some((tag) => tag.toLowerCase().includes(q)))

    const matchesCategory =
      category === '' ||
      (Array.isArray(project.tags) &&
        project.tags.some((tag) =>
          tag.toLowerCase() === category.toLowerCase()
        ))

    return matchesQuery && matchesCategory
  })
}
