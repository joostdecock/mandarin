import Page from 'components/wrappers/page.js'
import useApp from 'hooks/useApp.js'
import Layout from 'components/layouts/bare'
import paths from 'prebuild/slugs.mjs'
import words from 'prebuild/words.mjs'
import jsonLoader from 'scripts/loader.mjs'
import PlayButton from 'components/audio.mjs'
import Link from 'next/link'
import { asSlug } from 'scripts/utils.mjs'

const en = {}
for (const i in words) en[words[i].en] = words[i]

const WordPage = ({ cn, tone, py, set, memo, also, en, cat, slug, type }) => {
  const app = useApp()
  const modes = { en, cn, py }

  return (
    <Page 
      app={app} 
      title="Welcome to mandarin.joost.at" 
      layout={Layout} 
    >
      <h1 className="text-center text-5xl break-all mt-24">
        <PlayButton word={cn} autoPlay={app.settings?.autoPlay}>
          {type === 'cn' && <span className="block text-xl opacity-50">{[...''+tone].map(ch => ch).join(' ')}</span>}
          {modes[type]}
          {app.settings?.cnpy && type === 'cn' && <span className="block text-xl opacity-50 pt-2">{py}</span>}
          {app.settings?.cnpy && type === 'py' && <span className="block text-xl opacity-50 pt-2">{cn}</span>}
        </PlayButton>
        <div className="flex flex-row gap-8 items-center mt-2 justify-center">
          {type !== 'cn' && <Link className="block text-xl text-secondary underline" href={cn+tone}>{cn}</Link>}
          {type !== 'py' && <Link className="block text-xl text-secondary underline" href={asSlug(py)}>{py}</Link>}
          {type !== 'en' && <Link className="block text-xl text-secondary underline" href={asSlug(en)}>{en}</Link>}
        </div>
      </h1>
      <div className="text-sm text-center mdx">
        {typeof memo === 'string' 
          ? memo.split("\n").map((line, i) => <span key={i} className="block" dangerouslySetInnerHTML={{__html: line}} />)
          : null
        }
        {also && (
          <>
            <span className="mt-3 block font-bold">Also:</span>
            <ul>
            {also.map(alt => <li key={alt}>{alt}</li>)}
            </ul>
          </>
        )}
      </div>
    </Page>
  )
}

export default WordPage


/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
  const props = await jsonLoader(params.word)

  return { props }
}


/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths() { 
  return { 
    paths,
    fallback: false 
  }
}

