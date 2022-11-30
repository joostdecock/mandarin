import LightIcon from 'components/icons/sun.js'
import DarkIcon from 'components/icons/moon.js'

const ThemePicker = ({ app, bottom = false }) => (
  <button className="btn btn-ghost rounded-none" onClick={app.toggleTheme}>
    {app.theme==='light'
      ? <LightIcon className="h-6 w-6 text-yellow-400 text-bold"/>
      : <DarkIcon className="h-6 w-6 text-yellow-400 text-bold"/>
    }
  </button>
)

export default ThemePicker
