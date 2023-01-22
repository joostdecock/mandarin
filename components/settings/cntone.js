import { useState } from 'react'

const divClasses = "flex flex-col items-center justify-center rounded-lg border border-secondary aspect-square"

const CnTone = ({ app }) => {

  const [both, setBoth] = useState(false)
  const toggle = () => app.updateSettings('cntone', app.settings?.cntone ? false : true)

  return (
    <>
      <h2>Show Chinese and tones?</h2>
      <p>
        When training Chinese, would you like to see the tones?
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className={`${divClasses} ${app.settings?.cntone ? 'opacity-50' : ' bg-secondary border-4 text-base-100 '}`}>
          <button onClick={toggle} className="text-center text-6xl">
            水
          </button>
        </div>
        <div className={`${divClasses} ${app.settings?.cntone ? 'bg-secondary' : ''}`}>
          <button onClick={toggle} className="text-center text-6xl w-full h-full">
            <span className="block text-4xl opacity-50">3</span>
            <span>水</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default CnTone

