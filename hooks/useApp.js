import { useState } from 'react'
// Stores state in local storage
import useLocalStorage from 'hooks/useLocalStorage.js'
import useTheme from 'hooks/useTheme.js'
import set from 'lodash.set'

const defaultSettings = {
  autoPlay: false,
  cnpy: false,
  lists: {}
}

function useApp(full = true) {

  // Persistent state
  const [theme, setTheme] = useTheme();
	const [settings, setSettings, settingsReady] = useLocalStorage('settings', defaultSettings);

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [slug, setSlug] = useState('/')
  const [loading, setLoading] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

	// Update (part of) the settings object
	const updateSettings = (path, value) => {
    const newSettings = { ...settings }
	  set(newSettings, path, value)
    setSettings(newSettings)
	}

  return {
    // State
    loading,
    primaryMenu,
    slug,
    theme,
    settings,

    // State setters
    setLoading,
    setPrimaryMenu,
    setSlug,
    setTheme,
    startLoading: () => { setLoading(true); setPrimaryMenu(false) }, // Always close menu when navigating
    stopLoading: () => setLoading(false),
    updateSettings,

    // State handlers
    togglePrimaryMenu,
    toggleTheme,

    // Dummy translation method
    t: s => s,
    i18n: false,
  }
}

export default useApp

