import { useState } from 'react'
import Link from 'next/link'
import PageLink from 'components/page-link'
import orderBy from 'lodash.orderby'
import DownIcon from 'components/icons/down.js'
import { asSlug } from 'site/scripts/utils.mjs'

function sortWords(order, reverse) {

  return reverse
    ? list.reverse()
    : list
}

const titles = {
  cn: 'Chinese',
  py: 'Pinyin',
  en: 'English',
  set: 'Set',
}

const SortIcon = ({order, reverse, col, setReverse, setOrder}) => {
  if (order !== col) return (
    <button 
      className="btn btn-sm btn-ghost"
      onClick={() => {
        setReverse(false)
        setOrder(col)
      }}
    >
      {titles[col]}
    </button>
  )
  
  return (
    <button 
      className="btn btn-sm btn-ghost"
      onClick={() => setReverse(!reverse)}
    >
      {titles[col]}
      { reverse 
        ? <DownIcon className="h-6 w-6 ml-2"/> 
        : <DownIcon className="h-6 w-6 ml-2 rotate-180"/> 
      }
    </button>
  )
}

const WordList = ({ words, prefix='/' }) => {

  const [order, setOrder] = useState('cn')
  const [reverse, setReverse] = useState(false)

  const list = orderBy(words, order)
  if (reverse) list.reverse()

  const sortIconProps = { order, reverse, setOrder, setReverse }

  return (
    <table className="table table-fixed text-xl border" >
      <thead>
        <tr>
          <th>#</th>
          <th className="w-1/4"><SortIcon {...sortIconProps} col="cn" /></th>
          <th className="w-1/4"><SortIcon {...sortIconProps} col="py" /></th>
          <th className="w-1/4"><SortIcon {...sortIconProps} col="en" /></th>
          <th className="w-1/4"><SortIcon {...sortIconProps} col="set" /></th>
        </tr>
      </thead>
      <tbody>
    {list.map((word, i) => (
      <tr key={word}>
        <td>{i+1}</td>
        <td><PageLink href={prefix+word.cn} txt={word.cn} className="capitalize txt-lg"/></td>
        <td><PageLink href={prefix+asSlug(word.py)} txt={word.py} /></td>
        <td><PageLink href={prefix+asSlug(word.en)} txt={word.en} /></td>
        <td>{word.set}</td>
      </tr>
    ))}
      </tbody>
    </table>
  )
}

export default WordList
