import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import categories from 'prebuild/categories.mjs'
import Link from 'next/link'
import PageLink from 'components/page-link'

const AboutPage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl p-4 lg:mt-24 m-auto">
        <h1>Categories</h1>
        <ul className="list list-inside list-disc leading-11 text-lg">
        {Object.keys(categories).map(cat => (
          <li key={cat}>
            <PageLink href={`/_cat/${cat}`} txt={cat} className="capitalize txt-lg"/>
            <span className="text-sm text-base-300"> ({categories[cat].length} words)</span>
          </li>
        ))}
        </ul>
      </div> 
    </Page>
  )
}

export default AboutPage

