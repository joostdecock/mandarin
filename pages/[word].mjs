import paths from 'prebuild/slugs.mjs'
import words from 'prebuild/words.mjs'
import jsonLoader from 'scripts/loader.mjs'
import WordTrainer from 'components/trainer.js'

const en = {}
for (const i in words) en[words[i].en] = words[i]

const pickRandomNext = (app) => {
  let list = 'random'
  const lists = {
    random: Object.keys(en),
    less: app.lessOften || [],
    more: app.moreOften || [],
  }
  
  const rand = Math.random()*100
  if (rand < app.settings.more) list = 'more'
  else if (rand < (parseInt(app.settings.more) + parseInt(app.settings.less))) list = 'less'

  const key = Math.floor(Math.random()*lists[list].length)

  console.log({list, more: app.settings.more,  less: app.settings.less, lo: app.lessOften, mo: app.moreOften })

  const result = key
    ? { ...en[lists[list][key]], source: list }
    : pickRandomNext(app)

  console.log({ result })

  return result
} 
const getNext = (current, app) => {
  const next = pickRandomNext(app)
  if (next === current) return getNext(current, app)
  else return [ next, '/']
}

const WordPage = (props) => <WordTrainer getNext={getNext} slug={props.slug} />

export default WordPage


/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
  const props = await jsonLoader(params.word)
  console.log(props)

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

