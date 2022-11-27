/*
 * Slugify string
 */
export const asSlug = input => input.toLowerCase()
  .split(' ').join('-')
  .split('/').join('_')
