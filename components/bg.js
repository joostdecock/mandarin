const classes = {
  light: 'from-pink-300 via-fucshia-300 to-violet-300',
  dark: 'from-fuchsia-900 via-purple-900 to-violet-900'
}

const Bg = ({ theme, className, children }) => (
  <div className={`bg-gradient-to-tr ${classes[theme]} ${className}`}>{children}</div>
)

export default Bg

