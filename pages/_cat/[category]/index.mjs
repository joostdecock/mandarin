import { useState } from 'react'
import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import PageLink from 'components/page-link'
import paths from 'prebuild/slugs.mjs'
import categories from 'prebuild/categories.mjs'
import mandarin from 'prebuild/mandarin.mjs'
import jsonLoader from 'scripts/loader.mjs'
import { asSlug } from 'scripts/utils.mjs'
import Link from 'next/link'
import NextIcon from 'components/icons/next.js'

const TranslationButton = ({ target, word }) => (
  <Link href={asSlug(word[target])}>
    <button className={
      `btn btn-sm mx-2 btn-secondary ${target === word.type ? 'btn-ghost' : 'btn-link'}`
    }>{target}</button>
  </Link>
)

const getNext = (category, current=false) => {
  const next = categories[category][Math.floor(Math.random()*categories[category].length)].cn
  if (categories[category].length > 1 && next === current) return getNext(category, next)
  
  return next
}

const Word = ({ word }) => (
  <div className="text-center border-b-2 w-full">
    <h2 className="text-7xl">
      {word.cn}
      <span className="block text-sm opacity-50">{word.py} <span className="px-2">|</span> {word.en}</span>
    </h2>
    <p>{word.memo}</p>
  </div>
)

const CategoryPage = (props) => {

  const [ show, setShow ] = useState(false)
  const [ next, setNext ] = useState(getNext(props.category))
  const [ list, setList ] = useState(false)

  console.log(categories[props.category])
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl py-8 flex flex-col items-center justify-center px-4 gap-4 m-auto pt-4 lg:pt-24">
        <h1 className="text-center text-5xl capitalize">
          <span className="block text-xl opacity-50">Category:</span>
          {props.category}
          <span className="block text-sm opacity-50">[ {categories[props.category].length} entries ]</span>
        </h1>
        {list ? (
          <>
            {categories[props.category].map(entry => <Word word={entry} />)}
            <button 
              onClick={() => setList(false)}
              className="btn btn-secondary mt-8"
            >Hide study list</button>
          </>
        ) : (
          <>
            <Link href={`/_cat/${props.category}/${next}`}>
              <button 
                className="btn btn-secondary btn-wide btn-lg mt-8 flex flex-row justify-between"
              ><NextIcon /> <big>{next}</big>  <NextIcon /></button>
            </Link>
            <button 
              onClick={() => setNext(getNext(props.category, next))}
              className="btn btn-secondary mt-8 flex btn-ghost"
            >shuffle</button>
            <button 
              onClick={() => setList(true)}
              className="btn btn-secondary mt-8 btn-ghost"
            >Show study list</button>
          </>
        )}
      </div> 
    </Page>
  )
}

export default CategoryPage


/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
  const props = params

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
    paths: Object.keys(categories).map(cat => `/_cat/${cat}`),
    fallback: false 
  }
}

