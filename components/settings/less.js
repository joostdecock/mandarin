import { useState } from 'react'
import words from 'prebuild/words.mjs'

const en = {}
for (const i in words) en[words[i].en] = words[i]

const divClasses = "flex flex-col items-center justify-center rounded-lg border border-secondary aspect-square"

const spacer = <span className="px-2 font-bold opacity-50">|</span>

const Word = ({ word }) => <li key={word}>
  <b>{en[word].cn}</b>
  {spacer}
  <b>{en[word].py}</b>
  {spacer}
  <b>{en[word].en}</b>
  {spacer}
  <b>{en[word].tone}</b>
</li>

const CnTone = ({ app }) => {

  const [both, setBoth] = useState(false)
  const toggle = () => app.updateSettings('cntone', app.settings?.cntone ? false : true)

  const rest = 100 - (parseInt(app.settings.more) + parseInt(app.settings.less))

  return (
    <>
      <h2>Show less/more often</h2>
      {app.lessOften && Object.keys(app.lessOften).length > 0 && (
        <>
          <h3>Show less often</h3>
          <ul className="list list-inside list-disc">
            {Object.keys(app.lessOften).map(word => <Word key={word} word={word} />)}
          </ul>
          <button className="btn btn-secondary mt-2" onClick={() => app.setLessOften({})}>Clear list</button>
        </>
      )}
      {app.moreOften && Object.keys(app.moreOften).length > 0 && (
        <>
          <h3>Show more often</h3>
          <ul className="list list-inside list-disc">
            {Object.keys(app.moreOften).map(word => <Word key={word} word={word} />)}
          </ul>
          <button className="btn btn-secondary mt-2" onClick={() => app.setMoreOften({})}>Clear list</button>
        </>
      )}
      <p className="text-base">
        When opting to show a word less (by swiping down on it) or more (by swiping up) those words will be added to 
        a <em>show less</em> or <em>show more</em> list.
      </p>
      <p className="text-base">
        The sliders below control how often we pick the next word from each list, or pick a word that is not on the lists.
      </p>
      <div className="">
        <h5>Show words from the <em>show more</em> list {app.settings.more} times out of 100</h5>
        <input type="range" min="0" max={100 - app.settings.less} value={app.settings.more} 
          className="range primary w-full range-success" onChange={(evt) => app.updateSettings('more', evt.target.value)}/>

        <h5>Show words from the <em>show less</em> list {app.settings.less} times out of 100</h5>
        <input type="range" min="0" max={100 - app.settings.more} value={app.settings.less} 
          className="range primary w-full range-error" onChange={(evt) => app.updateSettings('less', evt.target.value)}/>

        <h5>Show other words {rest} times out of 100</h5>
        <input type="range" min="0" max={100 - app.settings.less} value={rest} disabled 
          className="range primary w-full range-warning opacity-50" />
      </div>
    </>
  )
}

export default CnTone

