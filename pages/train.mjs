import words from 'prebuild/words.mjs'
import WordTrainer from 'components/trainer.js'

const en = {}
for (const i in words) en[words[i].en] = words[i]

const pickRandomNext = (app) => {
  let list = 'random'
  const lists = {
    random: en,
    less: app.lessOften || [],
    more: app.moreOften || [],
  }
  
  const rand = Math.floor(Math.random()*100)
  if (Object.keys(app.settings.more).length > 1 && rand < parseInt(app.settings.more)) list = 'more'
  else if (Object.keys(app.settings.less).length > 2 && rand < (parseInt(app.settings.more) + parseInt(app.settings.less))) list = 'less'

  const key = Math.floor(Math.random()*Object.keys(lists[list]).length)
  const result = key
    ? { ...en[Object.keys(lists[list])[key]], source: list }
    : pickRandomNext(app)

  return result
} 
const getNext = (current, app) => {
  const next = pickRandomNext(app, current)
  if (next.en === current?.en) return getNext(current, app)
  else return [ next, '/']
}

const TrainPage = (props) => <WordTrainer getNext={getNext} type='cn'/>

export default TrainPage


/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
  return { props: {} }
}
