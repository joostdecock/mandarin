import { useState } from 'react'
import set from 'lodash.set'
// Stores state in local storage
import useLocalStorage from 'hooks/useLocalStorage.js'
import useTheme from 'hooks/useTheme'

function useApp(full = true) {

  // Persistent state
  const [theme, setTheme] = useTheme();

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [slug, setSlug] = useState('/')
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return {
    // State
    loading,
    popup,
    primaryMenu,
    slug,
    theme,

    // State setters
    setLoading,
    setPopup,
    setPrimaryMenu,
    setSlug,
    setTheme,
    startLoading: () => { setLoading(true); setPrimaryMenu(false) }, // Always close menu when navigating
    stopLoading: () => setLoading(false),

    // State handlers
    togglePrimaryMenu,
    toggleTheme,

    // Dummy translation method
    t: s => s,
    i18n: false,
  }
}

export default useApp

