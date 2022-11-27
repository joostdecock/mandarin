import { useSound } from 'use-sound'

const PlayButton = ({ word='404', children }) => {
  const [play] = useSound(`/audio/${word}.mp3`)
  if (!word) return children

  return <button onClick={play}>{children}</button>
}

export default PlayButton
