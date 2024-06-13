import sets from 'prebuild/sets.mjs'
import jsonLoader from 'scripts/loader.mjs'
import WordTrainer from 'components/trainer.js'
import { asSlug } from 'site/scripts/utils.mjs'


const getNext = (current, words, set) => {
  const en = Object.keys(words)
  const next = en[Math.floor(Math.random()*en.length)]
  if (next === current) return getNext(current, words, set)
  else return [words[next], `/_set/${set}/`]
}

const WordPage = (props) => {
  const words = {}
  for (const word of sets[props.set]) words[word[props.type]] = word

  return <WordTrainer getNext={(current) => getNext(current, words, props.set)} {...props} />
}

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
  for (const set in sets) {
    for (const word of sets[set]) {
      paths.push(`/_set/${set}/${asSlug(word.cn + word.tone)}`)
      paths.push(`/_set/${set}/${asSlug(word.py)}`)
      paths.push(`/_set/${set}/${asSlug(word.en)}`)
    }
  }
  return { 
    paths,
    fallback: false 
  }
}

