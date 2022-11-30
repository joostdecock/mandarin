import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemePicker from 'components/theme-picker.js'
import CloseIcon from 'components/icons/close.js'
import MenuIcon from 'components/icons/menu.js'
import SearchIcon from 'components/icons/search.js'
import { WordMark } from 'components/wordmark.js'

const NavBtn = ({ href, txt }) => (
  <Link href={href}>
    <button className="btn btn-ghost rounded-none">{txt}</button>
  </Link>
)

const Header = ({ app, setSearch }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const curScrollPos = typeof window !== 'undefined' ? window.pageYOffset : 0
        if (curScrollPos >= prevScrollPos) {
          if (show && curScrollPos > 20) setShow(false)
        } else setShow(true)
        setPrevScrollPos(curScrollPos)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, show])

  return (
    <header
      className={`
      fixed bottom-0 lg:bottom-auto lg:top-0 left-0
      bg-primary
      w-full
      z-30
      transition-transform
      ${show ? '' : 'fixed bottom-0 lg:top-0 left-0 translate-y-20 lg:-translate-y-20'}
      drop-shadow-xl
    `}
    >
      <div className="m-auto max-w-6xl">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content">
          <div className="flex flex-row items-center">
            <button
              className={`
                  btn btn-ghost
                  text-neutral-content bg-transparent
                  rounded-none
                  lg:hidden
                `}
              onClick={app.togglePrimaryMenu}
            >
              {app.primaryMenu ? <CloseIcon /> : <MenuIcon />}
            </button>
            <div className="hidden lg:flex flex-row gap-4 items-center">
              <NavBtn href="/_list" txt="All words" />
              <NavBtn href="/_cat" txt="Categories" />
              <NavBtn href="/_set" txt="Sets" />
              <NavBtn href="/_about" txt="About this site" />
              <NavBtn href="/_help" txt="Help &amp; Support" />
            </div>
          </div>
          <div className="flex flex-row items-center lg:hidden">
            <button
              onClick={() => setSearch(true)}
              className="btn btn-ghost rounded-none"
            >
              <SearchIcon />
            </button>
            <ThemePicker app={app} />
          </div>
          <div className="hidden lg:flex flex-row items-center">
            <button
              className={`
                btn btn-ghost btn-sm h-12
                hidden lg:flex
                flex-row gap-4
                justify-between
                rounded-none
              `}
              onClick={() => setSearch(true)}
            >
              <SearchIcon />
              <span className="normal-case text-base font-medium">Ctrl K</span>
            </button>
            <ThemePicker app={app} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
