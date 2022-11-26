import LightIcon from 'components/icons/sun.js'
import DarkIcon from 'components/icons/moon.js'

const ThemePicker = ({ app, bottom = false }) => (
  <button className="btn btn-ghost" onClick={app.toggleTheme}>
    {app.theme==='light'
      ? <LightIcon className="h-10 w-10 text-yellow-400 text-bold"/>
      : <DarkIcon className="h-8 w-8 text-yellow-400 text-bold"/>
    }
  </button>
)

export default ThemePicker