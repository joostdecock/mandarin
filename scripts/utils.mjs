/*
 * Slugify string
 *
 * @param {string|array} input - The input to slugify, or keys of the info object to slugify
 * @param {object} info - The full info object to help find incorrect data when an error occurs
 * @return {string} slug - The slugified input
 */
export const asSlug = (input, info) => {
  if (Array.isArray(input)) input = input.map(key => info[key]).join('')
  let result
  try {
    result = input.toLowerCase()
      .split(' ').join('-')
      .split('/').join('_')
  }
  catch (err) {
    console.log({err, input, info})
  }

  return result
}

