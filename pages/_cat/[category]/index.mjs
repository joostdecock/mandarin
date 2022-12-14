import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import WordList from 'components/wordlist.js'
import categories from 'prebuild/categories.mjs'

const CategoryPage = (props) => {

  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl py-8 flex flex-col items-center justify-center px-4 gap-4 m-auto pt-4 lg:pt-24">
        <h1 className="text-center text-5xl capitalize">
          <span className="block text-xl opacity-50">Category:</span>
          {props.category}
          <span className="block text-sm opacity-50">[ {categories[props.category].length} entries ]</span>
        </h1>
        <WordList 
          words={categories[props.category]} 
          prefix={`/_cat/${props.category}/`}
        />
      </div> 
    </Page>
  )
}

export default CategoryPage


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
    paths: Object.keys(categories).map(cat => `/_cat/${cat}`),
    fallback: false 
  }
}

