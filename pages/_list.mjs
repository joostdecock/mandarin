import { useState } from 'react'
import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import words from 'prebuild/words.mjs'
import WordList from 'components/wordlist.js'

const AboutPage = () => {
  const app = useApp()

  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-4xl p-4 lg:mt-24 m-auto">
        <h1>All words</h1>
        <WordList words={words} />
      </div> 
    </Page>
  )
}

export default AboutPage

/*
*/
