import { Container, StyledTBody, StyledTHead, StyledTable } from './styles'
import { TableBody } from '../../types'
import React from 'react'
import TableHeadItem from './components/table-head-item'
import TableRow from './components/table-row'

type Props = {
  theadData: Array<string>
  tbodyData: Array<TableBody>
}

const Table = ({ theadData, tbodyData }: Props): JSX.Element => {
  return (
    <Container>
      <StyledTable>
        <StyledTHead>
          <tr>
            {theadData.map((h) => {
              return <TableHeadItem key={h} item={h} />
            })}
          </tr>
        </StyledTHead>
        <StyledTBody>
          {tbodyData.map(({ id, items }) => {
            return <TableRow key={id} data={items} />
          })}
        </StyledTBody>
      </StyledTable>
    </Container>
  )
}

export default Table
