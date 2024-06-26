import { useState, useEffect } from 'react'
import useApp from 'hooks/useApp.js'
import Page from 'components/wrappers/page.js'
import Layout from 'components/layouts/bare'
import { asSlug } from 'scripts/utils.mjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PlayButton from 'components/audio.mjs'
import { Spinner } from 'components/spinner.mjs'

const TranslationButton = ({ target, word }) => (
  <Link href={asSlug(word[target])}>
    <button className={
      `btn btn-sm mx-2 btn-primary ${target === word.type ? 'btn-ghost' : 'btn-link'}`
    }>{target}</button>
  </Link>
)

function showThis(type, lang, cnpy=false) {
  if (type !== lang) return true
  if (cnpy && ['cn', 'py'].includes(lang)) return true
  return false
}

const Q = 10

const TrafficLights = ({ source, picks }) => (
  <div>
    <span className="block text-center text-sm">{picks}</span>
    <span className={`rounded-full w-4 h-4 bg-success inline-block m-1 ${source === 'more' ? '' : 'opacity-30'}`}></span>
    <span className={`rounded-full w-4 h-4 bg-warning inline-block m-1 ${source === 'random' ? '' : 'opacity-30'}`}></span>
    <span className={`rounded-full w-4 h-4 bg-error inline-block m-1 ${source === 'less' ? '' : 'opacity-30'}`}></span>
  </div>
)

const WordTrainer = ({ getNext, type, preload=false }) => {

  const app = useApp()
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
  const [ show, setShow ] = useState(false)
  const [ current, setCurrent ] = useState(preload)
  const [ swiped, setSwiped ] = useState(false)

  // Swipe left triggers this
  const nextWord = async (dir=false) => {
    if (dir) setSwiped(dir)
    else setSwiped(false)
    setLoading(true)
    if (show) setShow(false)
    const newCurrent = await getNext(current[0], app)
    setCurrent(newCurrent)
    app.addPick()
    setLoading(false)
  }

  useEffect(() => {
    if (!current) nextWord(false, false)
    setLoading(false)
  }, [])

  if (!current[0]) return <p>loading</p>

  const { 
    cn,
    en,
    py,
    tone,
    memo,
    also,
    source,
  } = current[0]
  const modes = { en, cn, py }

  // Swipe right triggers this
  const revealMemo = () => setShow(true)

  // Swipe down triggers this (not used as swipe down reloads)
  const swipeDownHandler = () => {
    app.showLessOften(en)
    nextWord('down')
    app.addPick()
  }

  // Swipe up triggers this
  const swipeUpHandler = () => {
    app.showMoreOften(en)
    nextWord('up')
    app.addPick()
  }


  return (
    <Page 
      app={app} 
      title="Welcome to mandarin.joost.at" 
      layout={Layout} 
      onSwipedLeft={nextWord} 
      onSwipedRight={revealMemo}
      onSwipedUp={swipeUpHandler}
    >
      <div className="max-w-xl h-screen flex flex-col items-center justify-center px-4 gap-4 m-auto">
        <h1 className="text-center text-7xl break-all">
          {loading
            ? <Spinner className={`w-24 h-24 ${swiped === 'up' ? 'text-success' : ''} ${swiped === 'down' ? 'text-error' : ''} `} />
            : (
              <>
                <PlayButton word={cn} autoPlay={app.settings?.autoPlay} >
                  {type === 'cn' && <span className="block text-xl opacity-50">{[...''+tone].map(ch => ch).join(' ')}</span>}
                  {modes[type]}
                  {app.settings?.cnpy && type === 'cn' && <span className="block text-xl opacity-50 pt-2">{py}</span>}
                  {app.settings?.cnpy && type === 'py' && <span className="block text-xl opacity-50 pt-2">{cn}</span>}
                </PlayButton>
                {show && (
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 items-center mt-2 justify-center">
                    {type !== 'cn' && <Link className="block text-xl text-secondary underline" href={cn+tone}>{cn}</Link>}
                    {type !== 'py' && <Link className="block text-xl text-secondary underline" href={asSlug(py)}>{py}</Link>}
                    {type !== 'en' && <Link className="block text-xl text-secondary underline" href={asSlug(en)}>{en}</Link>}
                  </div>
                )}
              </>
            )}
        </h1>
        {show && !loading && (
          <div className="text-lg text-center mdx">
            {memo.split("\n").map((line, i) => <span key={i} className="block" dangerouslySetInnerHTML={{__html: line}} />)}
            {also && (
              <>
                <span className="mt-3 block font-bold">Also:</span>
                <ul>
                {also.map(alt => <li key={alt}>{alt}</li>)}
                </ul>
              </>
            )}
          </div>
        )}
        {!loading && (
          <>
            <button 
              onClick={() => setShow(!show)}
              className="btn btn-primary btn-link hidden lg:block"
            >{show ? 'Hide' : 'Show'} memo
            </button>
            <button 
              className="btn btn-primary btn-wide btn-lg mt-8 lg:block btn-outline border-2 hidden"
              onClick={nextWord}
            >next</button>
          </>
        )}
      </div> 
    </Page>
  )
}

export default WordTrainer
