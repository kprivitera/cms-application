import React from 'react'

type Props = {
  data: Array<string>
}

const TableRow = ({ data }: Props) => {
  return (
    <tr>
      {data.map((item) => {
        return (
          <td className="px-6 py-4" key={item}>
            {item}
          </td>
        )
      })}
    </tr>
  )
}

export default TableRow
