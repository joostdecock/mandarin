import Link from 'next/link'

export const InnerWordMark = ({className=""}) => <span className={className}>通通话</span>

export const WordMark = ({className}) => (
  <Link 
    href="/"
    role="button"
    className="btn btn-ghost btn-sm normal-case text-xl hover:bg-transparent font-bold px-0 -mt-1"
  >
    <InnerWordMark className={className}/>
  </Link>
)
