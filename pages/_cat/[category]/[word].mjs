import categories from 'prebuild/categories.mjs'
import jsonLoader from 'scripts/loader.mjs'
import WordTrainer from 'components/trainer.js'
import { asSlug } from 'site/scripts/utils.mjs'

function getNext(current, cat, type) {
  const words = {}
  for (const word of categories[cat]) words[word[type]] = word
  const en = Object.keys(words)
  const next = en[Math.floor(Math.random()*en.length)]
  if (next === current) return getNext(current, cat, type)
  else return [words[next], `/_cat/${cat}/`]
}

const WordPage = (props) => <WordTrainer 
  getNext={(current) => getNext(current, props.cat, props.type)} 
  {...props} 
/>

export default WordPage


/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
  const props = await jsonLoader(params.word)

  return { props }
}


/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths(all) { 
  const paths = []
  for (const cat in categories) {
    for (const word of categories[cat]) {
      paths.push(`/_cat/${cat}/${asSlug(word.cn)}${word.tone}`)
      paths.push(`/_cat/${cat}/${asSlug(word.py)}`)
      paths.push(`/_cat/${cat}/${asSlug(word.en)}`)
    }
  }
  return { 
    paths,
    fallback: false 
  }
}

