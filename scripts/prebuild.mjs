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
const getFileList = async (folder) => {
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
  const list = await getFileList(yamlRoot)

  // Setup mp3 root path
  const mp3Root = path.resolve('public/audio')
  // Get list of audio files
  const mp3s = (await getFileList(mp3Root)).map(fullPath => path.basename(fullPath))

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
    let words
    try {
      words =yaml.load(fs.readFileSync(file))
    }
    catch (err) {
      console.log(`Unable to parse ${file}:`, err)
    }
    for (const [key, info] of Object.entries(words)) {
      if (typeof sets[info.set] === 'undefined') sets[info.set] = []
      info.en = key
      info.cat = category
      pages.push(info)
      categories[category].push(info)
      sets[info.set].push(info)
      // English
      imports[info.en] = { ...info, slug: asSlug(['en'], info), type: 'en' }
      slugs.push('/'+asSlug(['en'], info))
      // Chinese
      if (typeof info.cn === 'undefined') console.log('No CN:', info)
      imports[info.cn+info.tone] = { ...info, slug: asSlug(['cn', 'tone'], info), type: 'cn' }
      slugs.push('/'+asSlug(['cn', 'tone'], info))
      mandarin.push(asSlug(['cn', 'tone'], info))
      // Pinyin
      if (!info.py) console.log('No PY:', info)
      imports[info.py] = { ...info, slug: asSlug(['py'], info), type: 'py' }
      slugs.push('/'+asSlug(['py'], info))
      if (info.also) {
        for (const alt of info.also) {
          try {
            imports[alt] = { ...info, slug: asSlug(alt, info), type: 'en', alt: info.en }
          } catch (err) {
            console.log({err, info})
          }
        }
      }
      // Check for memo
      if (!info.memo) console.log(`Missing memo for ${key}`)
      // Check for tone
      if (typeof info.tone === 'undefined') console.log(`Missing tone for ${key}`)
      // Check for MP3 
      if (!mp3s.includes(info.cn+'.mp3') && !info.r) console.log(`Missing audio for ${info.cn}`)
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

