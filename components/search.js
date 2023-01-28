import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  InstantSearch,
  connectHits,
  connectHighlight,
  connectSearchBox,
} from 'react-instantsearch-dom'
import CloseIcon from 'components/icons/close.js'
import config from 'site/algolia.config.mjs'

const searchClient = algoliasearch(config.algolia.app, config.algolia.key)

const Hits = (props) => {
  // When we hit enter in the text field, we want to navigate to the result
  // which means we must make the result links available in the input somehow
  // so let's stuff them in a data attribute
  const links = props.hits.map((hit) => `/`+hit.cn+hit.tone)
  props.input.current.setAttribute('data-links', JSON.stringify(links))
  return props.hits.map((hit, index) => (
    <Hit
      key={hit.cn}
      {...props}
      hit={hit}
      index={index}
      len={props.hits.length}
      activeLink={links[props.active]}
    />
  ))
}

const CustomHits = connectHits(Hits)

const Highlight = ({ highlight, attribute, hit, snippet = false }) => {
  const parsedHit = highlight({
    highlightProperty: snippet ? '_snippetResult' : '_highlightResult',
    attribute,
    hit,
  })

  return parsedHit.map((part, index) =>
    part.isHighlighted ? (
      <mark className="text-base-content bg-secondary-focus bg-opacity-30" key={index}>
        {part.value}
      </mark>
    ) : (
      <span key={index}>{part.value}</span>
    )
  )
}

const CustomHighlight = connectHighlight(Highlight)

const Hit = (props) => (
  <div
    className={`
      px-2 py-1 ounded mt-1
      text-base text-base-content
      sm:rounded
      lg:px-4 lg:py-2
      hover:bg-secondary hover:bg-opacity-10 hover:text-base-content
      ${props.index === props.active ? 'bg-secondary bg-opacity-30' : 'bg-base-300 bg-opacity-10'}
    `}
  >
    <Link href={props.hit.cn+props.hit.tone} className="flex flex-row justify-between gap-2">
      <span className="text-base sm:text-xl font-bold leading-5">
        <CustomHighlight hit={props.hit} attribute="cn" />
        <span className="px-4 opacity-50 font-normal">|</span>
        <CustomHighlight hit={props.hit} attribute="py" />
        <span className="px-4 opacity-50 font-normal">|</span>
        {props.hit._highlightResult?.en ? (
          <CustomHighlight hit={props.hit} attribute="en" />
        ) : (
          props.hit.en
        )}
      </span>
    </Link>
  </div>
)

// We use this for trapping ctrl-c
const handleInputKeydown = (evt, setSearch, setActive, active, router) => {
  if (evt.key === 'Escape') setSearch(false)
  if (evt.key === 'ArrowDown') setActive((act) => act + 1)
  if (evt.key === 'ArrowUp') setActive((act) => act - 1)
  if (evt.key === 'Enter') {
    // Trigger navigation
    if (evt.target?.dataset?.links) {
      router.push(JSON.parse(evt.target.dataset.links)[active])
      setSearch(false)
    }
  }
}

const SearchBox = (props) => {
  const input = useRef(null)
  const router = useRouter()
  useHotkeys('ctrl+x', () => {
    input.current.value = ''
  })
  if (input.current && props.active < 0) input.current.focus()

  const { currentRefinement, refine, setSearch, setActive } = props

  return (
    <div className="py-8">
      <form noValidate action="" role="search" onSubmit={(evt) => evt.preventDefault()}>
        <div className="form-control">
          <div className="relative">
            <input
              ref={input}
              type="search"
              autoFocus={true}
              value={currentRefinement}
              onChange={(event) => refine(event.currentTarget.value)}
              onKeyDown={(evt) =>
                handleInputKeydown(evt, setSearch, setActive, props.active, router)
              }
              className="input lg:input-lg input-bordered input-neutral w-full pr-16"
              placeholder="Type to search"
            />
            <button
              className="absolute right-0 top-0 rounded-l-none btn btn-neutral lg:btn-lg"
              onClick={() => props.setSearch(false)}
            >
              X
            </button>
          </div>
          <label className="label hidden sm:block">
            <div className="label-text flex flex-row gap-4 justify-between">
              <div>
                <b> Escape</b> to exit
              </div>
              <div>
                <b> Up</b> or <b>Down</b> to select
              </div>
              <div>
                <b> Enter</b> to navigate
              </div>
            </div>
          </label>
        </div>
        <div
          className="overscroll-auto overflow-y-auto mt-2"
          style={{ maxHeight: 'calc(100vh - 10rem)' }}
        >
          {input.current && input.current.value.length > 0 && (
            <CustomHits hitComponent={Hit} {...props} input={input} />
          )}
        </div>
      </form>
      <div
        className={`
        bg-neutral text-neutral-content
        z-20 w-full mx-auto
        lg:bg-base-100 lg:border-base-200
        fixed bottom-0 left-0 border-t-2
        lg:hidden
      `}
      >
        <div className="px-4 py-0 flex flex-row w-full lg:py-2">
          <button className={`btn btn-ghost btn-block`} onClick={() => props.setSearch(false)}>
            <span className="px-2 pt-2 pb-2">
              <CloseIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)

const Search = (props) => {
  const [active, setActive] = useState(0)
  useHotkeys('esc', () => props.setSearch(false))
  useHotkeys('up', () => {
    if (active) setActive((act) => act - 1)
  })
  useHotkeys('down', () => {
    setActive((act) => act + 1)
  })
  useHotkeys('down', () => {
  })

  const stateProps = {
    setSearch: props.setSearch,
    setMenu: props.setMenu,
    active,
    setActive,
  }

  return (
    <InstantSearch indexName={config.algolia.index} searchClient={searchClient}>
      <CustomSearchBox {...stateProps} />
    </InstantSearch>
  )
}

export default Search
