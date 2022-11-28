import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import WebLink from 'components/web-link'
import PageLink from 'components/page-link'
import Link from 'next/link'
import Bg from 'components/bg.js'
import DownIcon from 'components/icons/down.js'

const tutors = {
  jing: {
    url: 'https://preply.com/en/tutor/1545267',
    about: [
      'Jing is patient, knowledgeable, has great English and is fun to hang out with.',
      'If you prefer to learn from a friend, Jing is the tutor for you.',
    ]
  },
}

const Tutors = () => (
  <div>
    {Object.keys(tutors).map(t => (
      <div>
        <h3 className="capitalize mb-0 pb-0 border-b-2 pb-2 border-dashed">{t}</h3>
        <div key={t} className="flex flex-col lg:flex-row gap-8 items-center p-4">
          <div className="w-4/5 lg:w-1/3">
            <a href={tutors[t].img}>
              <img src={`/img/tutor-${t}.jpg`} className="mask mask-squircle box-shadow" />
            </a>
          </div>
          <div className="w-full lg:w-2/3">
            {tutors[t].about.map(p => <p className="pt-0">{p}</p>)}
            <p className="text-center">
            </p>
          </div>
        </div>
        <a href={tutors[t].url} className="btn btn-secondary w-full">{t} on Preply</a>
      </div>
    ))}
  </div>
)


const HelpPage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl p-4 lg:mt-24 m-auto">
        <h1>Help and Support</h1>
        <h2>Did you find a mistake?</h2>
        <p className="text-lg">
          If you see something that needs improvement, <WebLink 
          href="https://github.com/joostdecock/mandarin" 
          txt="the source code of this website is available on Github" />.
          Pull requests welcome!
        </p>
        <h2>Help with the website</h2>
        <p>
          The main portion of this website are pages that let you train words.
          There are very few controls:
        </p>
        <div className="block lg:hidden">
          <p>On mobile, use the following gestures to navigate:</p>
          <h4><em>Swipe left</em> moves to the next word</h4>
          <p>Use this when you are confident you know the word.</p>
          <h4><em>Swipe right</em> reveals the notes and translation</h4>
          <p>Use this is when are not sure you know the word.</p>
          <h4><em>Tab the title</em> to hear the pronounciation</h4>
          <p>Note that this will play an audio clip.</p>
        </div>
        <div className="hidden lg:block">
          <ol className="list list-inside list-decimal text-xl">
            <li>
              <b>The <code className="border px-2 py-1 bg-base-200 rounded-lg">Next</code> button moves to the next word</b>
              <span className='block text-base-300 text-sm pt-1 pb-3'>Use this when you are confident you know the word.</span>
            </li>
            <li>
              <b>The <code className="border px-2 py-1 bg-base-200 rounded-lg">Show notes</code> button reveals the notes and translation</b>
              <span className='block text-base-300 text-sm pt-1 pb-3'>Use this when you are not sure you know the word.</span>
            </li>
            <li>
              <b>Click on the main word/title to hear the pronounciation</b>
              <span className='block text-base-300 text-sm pt-1 pb-3'>Note that this will play an audio clip.</span>
            </li>
          </ol>
        </div>
        <h2>Help with learning Chinese</h2>
        <p>
          Apart from the material on this website, I cannot help you with that. 
          <br/>
          However I can recommend excellent tutors with whom I have first-hand experience:
        </p>
        <Tutors />
        <p className="mt-8 px-4 border-l-2">
          <em>
          These are not affiliate links are anything like that. 
          There is nothing in this for me. 
          I just want to save you the trouble of finding a good tutor.
          </em>
        </p>
      </div> 
    </Page>
  )
}

export default HelpPage

