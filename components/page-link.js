import Link from 'next/link'

const PageLink = ({ href, txt, className="" }) => (
  <Link href={href} className={`text-secondary underline
      hover:text-secondary-focus ${className}`}
    title={txt}>{txt}</Link>
)

export default PageLink

