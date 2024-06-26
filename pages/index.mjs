import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import WebLink from 'components/web-link'
import PageLink from 'components/page-link'
import Link from 'next/link'
import DownIcon from 'components/icons/down.js'
import words from 'prebuild/words.mjs'

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
      <div className="m-0 p-0 w-full h-screen flex flex-col items-center justify-around bg-base-100">
        <div>
          <h1
            className={`font-black text-center text-primary text-7xl  `}
            style={{ textShadow: '5px 5px 15px #00000066' }}
          >
            普通话
          </h1>
          <h2
            className={`font-black text-center border-0 text-primary text-3xl`}
            style={{ textShadow: '5px 5px 15px #00000066' }}
          >
            Mandarin Chinese
          </h2>
        </div>
        <div className="w-64 flex flex-col gap-8">
          <div>
          <DownIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 animate-bounce w-full m-auto"/>
          <Link href="/_train">
            <button className="btn btn-primary btn-lg w-full">
              Start learning
            </button>
          </Link>
          </div>
          <div>
            <Link href="/_about" className="btn w-full btn-link btn-neutral text-base-content">
              About this site
            </Link>
            <Link href="/_help" className="btn w-full btn-link btn-neutral text-base-content">
                Help & Support
            </Link>
          </div>
        </div>
        <p className="text-base text-center font-black text-xl lg:text-2x xl:text-4xl mb-8">
          How hard can it be?
          <span className="block text-sm opacity-50 lg:text-xl xl:text-2xl">( famous last words )</span>
        </p>
      </div>
    </Page>
  )
}

export default HomePage

