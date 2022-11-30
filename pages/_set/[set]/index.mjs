import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import WordList from 'components/wordlist.js'
import sets from 'prebuild/sets.mjs'

const SetPage = (props) => {

  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl py-8 flex flex-col items-center justify-center px-4 gap-4 m-auto pt-4 lg:pt-24">
        <h1 className="text-center text-5xl capitalize">
          <span className="block text-xl opacity-50">Set:</span>
          {props.set}
          <span className="block text-sm opacity-50">[ {sets[props.set].length} entries ]</span>
        </h1>
        <WordList 
          words={sets[props.set]} 
          prefix={`/_set/${props.set}/`}
        />
      </div> 
    </Page>
  )
}

export default SetPage


/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
  const props = params

  return { props }
}


/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths() { 
  return { 
    paths: Object.keys(sets).map(set => `/_set/${set}`),
    fallback: false 
  }
}

