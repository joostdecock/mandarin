import { useSound } from 'use-sound'
import { useEffect, useState } from 'react'

const PlayButton = ({ word='404', children, slug, autoPlay=false }) => {
  const [play, obj] = useSound(`/audio/${word}.mp3`)
  const [autoPlayedWord, setAutoPlayedWord] = useState(false)

  useEffect(() => {
    if (word && autoPlay && autoPlayedWord === word) play() 
    else setAutoPlayedWord(word)
  },[autoPlay, play, word])

  if (!word) return children

  return <button onClick={play}>{children}</button>
}

export default PlayButton
