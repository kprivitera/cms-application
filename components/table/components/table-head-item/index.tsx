import React from 'react'

type Props = {
  item: string
}

const TableHeadItem = ({ item }: Props): JSX.Element => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" title={item}>
      {item}
    </th>
  )
}

export default TableHeadItem
