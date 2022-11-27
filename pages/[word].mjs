import { useState, useEffect } from 'react'
import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import PageLink from 'components/page-link'
import paths from 'prebuild/slugs.mjs'
import mandarin from 'prebuild/mandarin.mjs'
import jsonLoader from 'scripts/loader.mjs'
import { asSlug } from 'scripts/utils.mjs'
import Link from 'next/link'
import NextIcon from 'components/icons/next.js'
import { useRouter } from 'next/router'

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

  const router = useRouter()
  const [ show, setShow ] = useState(false)
  const [ next, setNext ] = useState(false)

  useEffect(() => {
    setNext(getNext(props.slug))
    setShow(false)
  }, [props.slug])

  const nextWord = () => {
    if (show) setShow(false)
    else router.push(`/`+getNext(props.slug))
  }

  const revealMemo = () => setShow(true)
  

  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout} onSwipedLeft={nextWord} onSwipedRight={revealMemo}>
      <div className="max-w-xl h-screen flex flex-col items-center justify-center px-4 gap-4 m-auto">
        <h1 className="text-center text-7xl">{props[props.type]}
        {show && (
          <div className="flex flex-row gap-4 items-center mt-2">
            <Link className="block text-sm text-secondary underline" href={asSlug(props.py)}>{props.py}</Link>
            <span className="px-2 text-sm">|</span>
            <Link className="block text-sm text-secondary underline" href={asSlug(props.en)}>{props.en}</Link>
          </div>
        )}
        </h1>
        {show && <p className="text-lg text-center">{props.memo}</p>}
        <button 
          onClick={() => setShow(!show)}
          className="btn btn-secondary btn-link hidden lg:block"
        >{show ? 'Hide' : 'Show'} memo
        </button>
        <button 
          className="btn btn-secondary btn-wide btn-lg mt-8 lg:flex flex-row justify-between btn-outline border-2 hidden"
          onClick={nextWord}
        ><NextIcon /> next  <NextIcon /></button>
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
  return { 
    paths,
    fallback: false 
  }
}

