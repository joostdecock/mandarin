import { useState } from 'react'
// Stores state in local storage
import useLocalStorage from 'hooks/useLocalStorage.js'
import useTheme from 'hooks/useTheme.js'
import set from 'lodash.set'

const defaultSettings = {
  autoPlay: false,
  cnpy: false,
  cntone: true,
  lists: {},
  less: 5,
  more: 50,
}

function useApp(full = true) {

  // Persistent state
  const [theme, setTheme] = useTheme();
	const [settings, setSettings, settingsReady] = useLocalStorage('settings', defaultSettings);
  const [ lessOften, setLessOften ] = useLocalStorage('less', {})
  const [ moreOften, setMoreOften ] = useLocalStorage('more', {})

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [slug, setSlug] = useState('/')
  const [loading, setLoading] = useState(false)
  const [picks, setPicks] = useState(0)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

	// Update (part of) the settings object
	const updateSettings = (path, value) => {
    const newSettings = { ...settings }
	  set(newSettings, path, value)
    setSettings(newSettings)
	}

  // Add a work to the show less often list
  const showLessOften = (word) => {
    const newLessOften = { ...lessOften }
    newLessOften[word] = word
    setLessOften(newLessOften)
    if (moreOften[word]) {
      const newMoreOften = {...moreOften}
      delete newMoreOften[word]
      setMoreOften(newMoreOften)
    }
  }
  // Swipe up triggers this
  const showMoreOften = (word) => {
    const newMoreOften = { ...moreOften }
    newMoreOften[word] = word
    setMoreOften(newMoreOften)
    if (lessOften[word]) {
      const newLessOften = {...lessOften}
      delete newLessOften[word]
      setLessOften(newLessOften)
    }
  }
  // Increases picks counter
  const addPick = () => setPicks(picks+1)


  return {
    // State
    loading,
    primaryMenu,
    slug,
    theme,
    settings,
    moreOften, lessOften,
    picks,

    // State setters
    setLoading,
    setPrimaryMenu,
    setSlug,
    setTheme,
    startLoading: () => { setLoading(true); setPrimaryMenu(false) }, // Always close menu when navigating
    stopLoading: () => setLoading(false),
    updateSettings,
    showLessOften, showMoreOften,
    setLessOften, setMoreOften,
    setPicks, addPick,

    // State handlers
    togglePrimaryMenu,
    toggleTheme,

    // Dummy translation method
    t: s => s,
    i18n: false,
  }
}

export default useApp

