import AutoPlay from './autoplay.js'
import CnPy from './cnpy.js'
import CnTone from './cntone.js'

const Settings = ({ app }) => [
  <AutoPlay app={app} />,
  <CnPy app={app} />,
  <CnTone app={app} />,
]

export default Settings
