import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import Settings from 'components/settings/index.js'

const SettingsPage = () => {
  const app = useApp()
  return (
    <Page app={app} title="Welcome to mandarin.joost.at" layout={Layout}>
      <div className="max-w-xl p-4 lg:mt-24 m-auto mb-8">
        <h1>Settings</h1>
        <p>Your preferences will be stored locally on your device.</p>
        <Settings app={app} /> 
      </div> 
    </Page>
  )
}

export default SettingsPage

