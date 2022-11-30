import categories from 'prebuild/categories.mjs'
import Link from 'next/link'
import PageLink from 'components/page-link'

export const Menu = () => (
  <>
    <h2>Help & Info</h2>
    <ul className="list list-inside list-disc leading-11 text-lg">
      <li><PageLink href="/" txt="Home page"/></li>
      <li><PageLink href="/_about" txt="About this website"/></li>
      <li><PageLink href="/_help" txt="Help & Support"/></li>
    </ul>
    <h2>Practice random words</h2>
    <Link href={`/开始`}>
      <button className="btn btn-secondary w-full my-4">Start here</button>
    </Link> 
    <h2>Content</h2>
    <ul className="list list-inside list-disc leading-11 text-lg">
      <li><PageLink href="/_list" txt="All words"/></li>
      <li><PageLink href="/_cat" txt="Categories"/></li>
      <li><PageLink href="/_set" txt="Sets"/></li>
    </ul>
    <h2>Words per category</h2>
    <ul className="list list-inside list-disc leading-11 text-lg">
    {Object.keys(categories).map(cat => (
      <li key={cat}>
        <PageLink href={`/_cat/${cat}`} txt={cat} className="capitalize txt-lg"/>
        <span className="text-sm text-base-300"> ({categories[cat].length} words)</span>
      </li>
    ))}
    </ul>
  </>
)

const Aside = ({ app, slug, mobileOnly = false, before = [], after = [] }) => (
  <aside
    className={`
    fixed top-0 right-0 h-screen w-screen
    overflow-y-auto z-20
    bg-base-100 text-base-content
    ${app.primaryMenu ? '' : 'translate-x-[-120%]'} transition-transform
    px-6 pb-20 pt-8 shrink-0

    lg:sticky lg:relative lg:transform-none
    lg:justify-center
    lg:border-r-2 lg:border-base-200 lg:bg-base-200 lg:bg-opacity-50
    ${mobileOnly ? 'block lg:hidden' : ''}
    w-full
  `}
  >
    <div><Menu /></div>
  </aside>
)

export default Aside
