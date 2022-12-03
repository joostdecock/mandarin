import { useState } from 'react'

const divClasses = "flex flex-col items-center justify-center rounded-lg border border-secondary aspect-square"

const CnPy = ({ app }) => {

  const [both, setBoth] = useState(false)
  const toggle = () => app.updateSettings('cnpy', app.settings?.cnpy ? false : true)

  return (
    <>
      <h2>Show Chinese and Pinyin side by side?</h2>
      <p>
        When training Chinese or Pinyin, would you like to see both variants?
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className={`${divClasses} ${app.settings?.cnpy ? 'opacity-50' : ' bg-secondary border-4 text-base-100 '}`}>
          <button onClick={toggle} className="text-center text-6xl">
            水
          </button>
        </div>
        <div className={`${divClasses} ${app.settings?.cnpy ? 'bg-secondary' : ''}`}>
          <button onClick={toggle} className="text-center text-6xl w-full h-full">
            <span>水</span>
            <span className="block text-2xl">shuǐ</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default CnPy

