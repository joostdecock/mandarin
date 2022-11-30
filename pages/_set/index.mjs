import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import sets from 'prebuild/sets.mjs'
import Link from 'next/link'
import PageLink from 'components/page-link'

const SetsPage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl p-4 lg:mt-24 m-auto">
        <h1>Sets</h1>
        <ul className="list list-inside list-disc leading-11 text-lg">
        {Object.keys(sets).map(set => (
          <li key={set}>
            <PageLink href={`/_set/${set}`} txt={set} className="capitalize txt-lg"/>
            <span className="text-sm text-base-300"> ({sets[set].length} words)</span>
          </li>
        ))}
        </ul>
      </div> 
    </Page>
  )
}

export default SetsPage

