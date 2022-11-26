import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import Head from 'next/head'
import PageLink from 'components/page-link'

const Page404 = (props) => {
  const app = useApp()

  return (
    <Page app={app} title="404: Page not found" layout={Layout}>
      <div className="flex flex-col gap-4 mt-16 lg:mt-32 text-center">
        <h1>404: Page not found</h1>
        <div className="m-auto max-w-3xl px-4">
          <h2>We could not find what you are looking for</h2>
          <div className="text-left">
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Page404
