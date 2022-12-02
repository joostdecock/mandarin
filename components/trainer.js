import { useState, useEffect } from 'react'
import useApp from 'hooks/useApp.js'
import Page from 'components/wrappers/page.js'
import Layout from 'components/layouts/bare'
import { asSlug } from 'scripts/utils.mjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PlayButton from 'components/audio.mjs'

const TranslationButton = ({ target, word }) => (
  <Link href={asSlug(word[target])}>
    <button className={
      `btn btn-sm mx-2 btn-secondary ${target === word.type ? 'btn-ghost' : 'btn-link'}`
    }>{target}</button>
  </Link>
)

const WordTrainer = ({ 
  getNext,
  cn,
  en,
  py,
  type,
  memo,
  also,
  slug,
}) => {

  const router = useRouter()
  const [ show, setShow ] = useState(false)
  const [ next, setNext ] = useState(false)

  useEffect(() => {
    setNext(getNext(slug))
    setShow(false)
  }, [slug])

  const nextWord = () => {
    if (show) setShow(false)
    const next = getNext(slug)
    router.push(`/`+asSlug(next[type]))
  }

  const revealMemo = () => setShow(true)
  const modes = { en, cn, py }
  const app = useApp()

  return (
    <Page 
      app={app} 
      title="Welcome to mandarin.joost.at" 
      layout={Layout} 
      onSwipedLeft={nextWord} 
      onSwipedRight={revealMemo}
    >
      <div className="max-w-xl h-screen flex flex-col items-center justify-center px-4 gap-4 m-auto">
        <h1 className="text-center text-7xl break-all">
          <PlayButton word={cn}>
            {modes[type]}
          </PlayButton>
        {show && (
          <div className="flex flex-row gap-8 items-center mt-2 justify-center">
            {type !== 'cn' && <Link className="block text-4xl text-secondary underline" href={cn}>{cn}</Link>}
            {type !== 'py' && <Link className="block text-4xl text-secondary underline" href={asSlug(py)}>{py}</Link>}
            {type !== 'en' && <Link className="block text-4xl text-secondary underline" href={asSlug(en)}>{en}</Link>}
          </div>
        )}
        </h1>
        {show && (
          <div className="text-lg text-center mdx">
            {memo.split("\n").map((line, i) => <span key={i} className="block" dangerouslySetInnerHTML={{__html: line}} />)}
          </div>
        )}
        <button 
          onClick={() => setShow(!show)}
          className="btn btn-secondary btn-link hidden lg:block"
        >{show ? 'Hide' : 'Show'} memo
        </button>
        <button 
          className="btn btn-secondary btn-wide btn-lg mt-8 lg:block btn-outline border-2 hidden"
          onClick={nextWord}
        >next</button>
      </div> 
    </Page>
  )
}

export default WordTrainer
