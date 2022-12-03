import { useState } from 'react'

const divClasses = "flex flex-col items-center justify-center rounded-lg border border-secondary aspect-square"

const AutoPlay = ({ app }) => {

  const [both, setBoth] = useState(false)
  const toggle = () => app.updateSettings('autoPlay', app.settings?.autoPlay ? false : true)

  return (
    <>
      <h2>Auto-play audio on load?</h2>
      <p>
        When training a character, should we auto-play the audio?
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className={`${divClasses} ${app.settings?.autoPlay ? 'bg-secondary' : ''}`}>
          <button onClick={toggle} className="text-center text-4xl">
            Auto<br />Play
          </button>
        </div>
        <div className={`${divClasses} ${app.settings?.autoPlay ? 'opacity-50' : ' bg-secondary border-4 text-base-100 '}`}>
          <button onClick={toggle} className="text-center text-4xl">
            Play<br />on click
          </button>
        </div>
      </div>
      <p className="text-sm lead-1">
        <em>
          Note that most browsers block audio play until the user interacts with the page.
          In other words, <b>you may need to click the first time</b>.
        </em>
      </p>
    </>
  )
}

export default AutoPlay

