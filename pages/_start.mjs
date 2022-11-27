import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Head from 'next/head'
import Layout from 'components/layouts/bare'
import { Menu } from 'components/navigation/aside.js'

const AboutPage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl p-4 lg:mt-24 m-auto">
        <h1>Start learning</h1>
        <Menu />
      </div> 
    </Page>
  )
}

export default AboutPage

