/*
 * This push the list or words to the Algolia index
 *
 * It expects the following environment vars to be set in a
 * .env file in the root folder of the repository:
 *
 * ALGOLIA_API_WRITE_KEY -> Needs permission to index/create/delete
 *
 */
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import algoliasearch from 'algoliasearch'
import config from '../algolia.config.mjs'
import words from '../prebuild/words.mjs'
dotenv.config()

/*
 * Initialize Algolia client
 */
const client = algoliasearch(config.algolia.app, process.env.ALGOLIA_API_WRITE_KEY)
const index = client.initIndex(config.algolia.index)

/*
 * Clear the index to scrub old words
 */
const clearIndex = async () => {
  console.log(`🗑️  Clearing index`)
  await index.clearObjects()
}

/*
 * Index word list
 */
const indexWordList = async () => {
  // Say hi
  console.log(`🗂️  Indexing list of words to Algolia`)

  // Index to Algolia
  await index.clearObjects()
  await index
    .saveObjects(words.map(word => ({
      en: word.en,
      cn: word.cn,
      py: word.py,
      also: word.also || [],
      memo: word.memo,
      objectID: word.cn
    })))
    .then(() => null)
    .catch((err) => console.log(err))
}

const run = async () => {
  if (process.env.VERCEL_ENV === 'production' || process.env.FORCE_ALGOLIA) {
    console.log()
    await clearIndex()
    await indexWordList()
    console.log()
  } else {
    console.log()
    console.log('Not a producion deploy. Not indexing to Algolia.')
    console.log('To force indexing, set the FORCE_ALGOLIA environment variable')
    console.log()
  }
}

run()
