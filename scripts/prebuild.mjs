import path from 'path'
import fs from 'fs'
import rdir from 'recursive-readdir'
import yaml from 'js-yaml'
import { asSlug } from './utils.mjs'

/*
 * Helper method to get a list of yaml files in a folder.
 * Will traverse recursively to get all files from a given root folder.
 *
 * Parameters:
 *
 *  - folder: the root folder to look in
 *
 *  Exported because it's also used by the Algolia index script
 */
export const getYamlFileList = async (folder) => {
  let allFiles
  try {
    allFiles = await rdir(folder)
  } catch (err) {
    console.log(err)
    return false
  }

  // Filter out what's not a yaml file
  const files = []
  for (const file of allFiles) files.push(file)

  return files.sort()
}

/*
 * Main method that does what needs doing
 */
export const prebuildWords = async () => {
  // Say hi
  console.log()
  console.log(`Prebuilding word list`)

  // Setup yaml root path
  const yamlRoot = path.resolve('words')

  // Get list of filenames
  const list = await getYamlFileList(yamlRoot)

  // Create list of pages
  const pages = []
  const slugs = []
  const mandarin = []
  const categories = {}
  const sets = {}
  const imports = {}

  for (const file of list) {
    const category = file.split('/').pop().slice(0, -5)
    categories[category] = []
    for (const [key, info] of Object.entries(yaml.load(fs.readFileSync(file)))) {
      if (typeof sets[info.set] === 'undefined') sets[info.set] = []
      info.en = key
      info.cat = category
      pages.push(info)
      categories[category].push(info)
      sets[info.set].push(info)
      // English
      imports[info.en] = { ...info, slug: asSlug(info.en), type: 'en' }
      slugs.push('/'+asSlug(info.en))
      // Chinese
      imports[info.cn] = { ...info, slug: asSlug(info.cn), type: 'cn' }
      slugs.push('/'+asSlug(info.cn))
      mandarin.push(asSlug(info.cn))
      // Pinyin
      imports[info.py] = { ...info, slug: asSlug(info.py), type: 'py' }
      slugs.push('/'+asSlug(info.py))
      if (info.also) {
        for (const alt of info.also) {
          imports[alt] = { ...info, slug: asSlug(alt), type: 'en', alt: info.en }
        }
      }
    }
  }
  fs.writeFileSync(
    path.resolve('prebuild', `words.mjs`),
    `export default ${JSON.stringify(pages)}`
  )
  fs.writeFileSync(
    path.resolve('prebuild', `slugs.mjs`),
    `export default ${JSON.stringify(slugs)}`
  )
  fs.writeFileSync(
    path.resolve('prebuild', `mandarin.mjs`),
    `export default ${JSON.stringify(mandarin)}`
  )
  fs.writeFileSync(
    path.resolve('prebuild', `categories.mjs`),
    `export default ${JSON.stringify(categories)}`
  )
  fs.writeFileSync(
    path.resolve('prebuild', `sets.mjs`),
    `export default ${JSON.stringify(sets)}`
  )
  for (const [key, data] of Object.entries(imports)) {
    fs.writeFileSync(
      path.resolve('prebuild', `${data.slug}.json`),
      JSON.stringify(data)
    )
  }

  return pages
}

const run = async () => {
  await prebuildWords()
}

run()

