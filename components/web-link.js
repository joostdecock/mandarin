const WebLink = ({ href, txt }) => (
  <a href={href} className={`
    text-lg text-secondary underline
    hover:text-secondary-focus`}
  title={txt}>{txt}</a>
)

export default WebLink

