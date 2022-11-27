import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import WebLink from 'components/web-link'
import PageLink from 'components/page-link'
import Link from 'next/link'
import Bg from 'components/bg.js'
import DownIcon from 'components/icons/down.js'

const AboutPage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl p-4 lg:mt-24 m-auto">
        <h1>About this site</h1>
        <p className="text-lg">
          Hi there, and welcome to <PageLink href="/" txt="mandarin.joost.at"/>. 
          My name is Joost, and in late 2022 I decided I would like to learn Mandarin/Chinese.
        </p>
        <p className="text-lg">
          I wanted to be able to pratice <PageLink href="/words" txt="my list of Chinese words" /> in 
          an easy and low-friction way, so that is why I built this site.
        </p>
        <p className="text-lg">
          I guess the thing that sets this site apart from other (and better) reference
          material for learning Chineses is that I have included my personal notes 
          for remembering the characters.
        </p>
        
        <h2>Why?</h2>
        <p className="text-lg">
          Honestly, it is all <WebLink 
          href="https://en.wikipedia.org/wiki/Naomi_Wu" txt="Naomi Wu" />&apos;s fault.
          Naomi is a maker from Shenzhen who is vocal about a number of things I care about,
          and it is refreshing to get the unfiltered vantage point of a Chinese citizen. 
        </p>
        <p className="text-lg">
          We don&quot;t have a lot of access to such authentic Chinese voices. 
          Most of our reporting is filtered through a Western vantage point after all.
          There are obviously a lot of Chinese people out there, but they tend to speak Chinese.
        </p>
        <p className="text-lg">
          So I decided I would try to learn their language,  so that in turn I could
          could learn more about China and its people.
        </p>
        <h2>Isn&apos;t China bad though?</h2>
        <p className="text-lg">
          There is a line in <WebLink href="https://www.youtube.com/watch?v=tL10hwl7OZ0" 
          txt="this great song by The Goats"/> that says:
          <blockquote className="my-4 px-2 text-2xl text-base-300">
            <em>We don&apos;t hate the people, but the goverment&apos;s a drag</em>
          </blockquote>
          If you have a hot take that <WebLink href="https://en.wikipedia.org/wiki/Chinese_Communist_Party" 
          txt="the CCP" /> is not a force for good, please save it. 
          I fail to see how that is relevant when learning a langauge that is spoken by a billion people.
        </p>
        <h2>Did you find a mistake?</h2>
        <p className="text-lg">
          If you see something that needs improvement, <WebLink 
          href="https://github.com/joostdecock/mandarin" 
          txt="the source code of this website is available on Github" />.
          Pull requests welcome!
        </p>
        
      
      </div> 
    </Page>
  )
}

export default AboutPage

