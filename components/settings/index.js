import AutoPlay from './autoplay.js'
import CnPy from './cnpy.js'
import CnTone from './cntone.js'
import Less from './less.js'

const Settings = ({ app }) => [
  <AutoPlay app={app} />,
  <CnPy app={app} />,
  <CnTone app={app} />,
  <Less app={app} />,
]

export default Settings
