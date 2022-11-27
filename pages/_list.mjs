import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import words from 'prebuild/words.mjs'
import Link from 'next/link'
import PageLink from 'components/page-link'

const AboutPage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl p-4 lg:mt-24 m-auto">
        <h1>All words</h1>
        <table className="table text-xl table-auto border" >
          <thead>
            <tr>
              <th>Chinese</th>
              <th>Pinyin</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
        {Object.keys(words).map(word => (
          <tr key={word}>
            <td><PageLink href={`/${words[word].cn}`} txt={words[word].cn} className="capitalize txt-lg"/></td>
            <td>{words[word].py}</td>
            <td>{words[word].en}</td>
          </tr>
        ))}
          </tbody>
        </table>
      </div> 
    </Page>
  )
}

export default AboutPage

