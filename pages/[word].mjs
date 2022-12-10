import paths from 'prebuild/slugs.mjs'
import words from 'prebuild/words.mjs'
import jsonLoader from 'scripts/loader.mjs'
import WordTrainer from 'components/trainer.js'

const en = Object.keys(words)

const getNext = (current) => {
  const next = en[Math.floor(Math.random()*en.length)]
  if (next === current) return getNext(current)
  else return [words[en[next]], '/']
}

const WordPage = (props) => <WordTrainer getNext={getNext} {...props} />

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
export async function getStaticPaths() { 
  return { 
    paths,
    fallback: false 
  }
}

