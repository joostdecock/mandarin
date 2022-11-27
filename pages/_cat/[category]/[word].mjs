import { useState } from 'react'
import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import PageLink from 'components/page-link'
import mandarin from 'prebuild/mandarin.mjs'
import categories from 'prebuild/categories.mjs'
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

const getNext = (current) => {
  const next = mandarin[Math.floor(Math.random()*mandarin.length)]
  if (next === current) return getNext(current)
  else return next
}

const WordPage = (props) => {

  const [ show, setShow ] = useState(false)
  const [ next, setNext ] = useState(getNext(props.slug))


  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl h-screen flex flex-col items-center justify-center px-4 gap-4 m-auto">
        <h1 className="text-center text-7xl">{props[props.type]}</h1>
        {show && <p className="text-lg text-center">{props.memo}</p>}
        <button 
          onClick={() => setShow(!show)}
          className="btn btn-secondary btn-outline"
        >{show ? 'Hide' : 'Show'} memo
        </button>
        <Link href={`/${next}`}>
          <button 
            className="btn btn-secondary btn-wide btn-lg mt-8 flex flex-row justify-between"
          ><NextIcon /> <big>{next}</big>  <NextIcon /></button>
        </Link>
        <button 
          onClick={() => setNext(getNext(next))}
          className="btn btn-secondary mt-8 flex btn-ghost"
        >shuffle</button>
        <div>
          <TranslationButton target="en" word={props} />
          <TranslationButton target="cn" word={props} />
          <TranslationButton target="py" word={props} />
        </div>
      </div> 
    </Page>
  )
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
export async function getStaticPaths() { 
  const paths = []
  for (const [cat, entries] of Object.entries(categories)) {
    paths.push(...entries.map(entry => `/_cat/${cat}/${entry.cn}`))
  }
  return { 
    paths,
    fallback: false 
  }
}

