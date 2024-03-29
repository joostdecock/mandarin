import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
// Layouts components
import LayoutWrapper from 'components/wrappers/layout'
import Docs from 'components/layouts/docs'

/* This component should wrap all page content */
const PageWrapper = ({
  title = 'FIXME: No title set',
  noSearch = false,
  onSwipedLeft = false,
  onSwipedRight = false,
  onSwipedUp = false,
  onSwipedDown = false,
  app = false,
  layout = Docs,
  crumbs = false,
  children = [],
}) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipedLeft
      ? onSwipedLeft
      : () => (app.primaryMenu ? app.setPrimaryMenu(false) : null),
    onSwipedRight: onSwipedRight
      ? onSwipedRight
      : () => (app.primaryMenu ? null : app.setPrimaryMenu(true)),
    onSwipedUp: onSwipedUp ? onSwipedUp : () => null,
    onSwipedDown: onSwipedDown ? onSwipedDown : () => null,
    trackMouse: true,
  })

  const router = useRouter()
  const slug = router.asPath.slice(1)

  useEffect(() => app.setSlug(slug), [slug])

  // Trigger search with Ctrl+k
  useHotkeys('ctrl+k', (evt) => {
    evt.preventDefault()
    setSearch(true)
  })

  const [search, setSearch] = useState(false)

  const childProps = {
    app: app,
    title: title,
    crumbs: crumbs,
    search,
    setSearch,
    toggleSearch: () => setSearch(!search),
    noSearch: noSearch,
  }

  const Layout = layout

  return (
    <div
      ref={swipeHandlers.ref}
      onMouseDown={swipeHandlers.onMouseDown}
      data-theme={app.theme}
      key={app.theme} // This forces the data-theme update
    >
      <LayoutWrapper {...childProps}>
        {Layout ? <Layout {...childProps}>{children}</Layout> : children}
      </LayoutWrapper>
    </div>
  )
}

export default PageWrapper
