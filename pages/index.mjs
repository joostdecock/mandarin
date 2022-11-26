import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import WebLink from 'components/web-link'
import PageLink from 'components/page-link'
import Link from 'next/link'
import Bg from 'components/bg.js'

const HomePage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <Head>
        <meta property="og:title" content="mandarin.joost.at" key="title" />
        <meta property="og:type" content="article" key="type" />
        <meta
          property="og:description"
          content="A website to help me learn Mandarin Chinese that might help you too"
          key="description"
        />
        <meta property="og:article:author" content="Joost De Cock" key="author" />
        <meta property="og:image" content="https://mandarin.joost.at/og/og.png" key="image" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://mandarin.joost.at/" key="url" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="mandarin.joost.at" key="site" />
      </Head>
      <Bg className="m-0 p-0 w-full h-screen flex flex-col items-center justify-around" theme={app.theme}>
        <div>
          <h1
            className={`font-black text-center text-primary-content text-7xl  `}
            style={{ textShadow: '5px 5px 15px #00000066' }}
          >
            普通话
          </h1>
          <h2
            className={`font-black text-center border-0 text-primary-content text-3xl`}
            style={{ textShadow: '5px 5px 15px #00000066' }}
          >
            Mandarin Chinese
          </h2>
        </div>
        <div className="w-64 flex flex-col gap-8">
          <Link href="/start">
            <button className="btn btn-primary btn-lg w-full">
              Start learning
            </button>
          </Link>
          <Link href="/about">
            <button className="btn btn-lg w-full btn-outline btn-neutral">
              About this site
            </button>
          </Link>
        </div>
        <p className="text-base text-center font-black text-xl lg:text-2x xl:text-4xl">
          How hard can it be?
          <span className="block text-sm opacity-50 lg:text-xl xl:text-2xl">( famous last words )</span>
        </p>
      </Bg>
    </Page>
  )
}

export default HomePage

