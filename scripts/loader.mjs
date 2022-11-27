// We need fs and path to read from disk
import fs from 'fs'
import path from 'path'

/*
 * Summary: Loads JSON from disk and returns it as JS
 */

const jsonLoader = async (slug) => {
  const json = await fs.promises.readFile(
    path.resolve(`prebuild/${slug}.json`),
    'utf-8'
  )

  return JSON.parse(json)
}

export default jsonLoader
