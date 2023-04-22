import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import _ from 'lodash'

import { GET_WORDS } from '../queries'
import Button from '../components/button'
import Table from '../components/table'

type TableBody = {
  id: string
  items: Array<string>
}

const Home: NextPage = () => {
  const [getWords, { loading, error, data }] = useLazyQuery(GET_WORDS)
  const [tableBody, setTableBody] = useState<Array<TableBody>>([])
  const words = _.get(data, 'words')

  useEffect(() => {
    if (words) {
      const createTableBody = _.map(words, ({ id, name, description }) => ({
        id,
        items: [name, description],
      }))
      setTableBody(createTableBody)
    }
  }, [words])

  return (
    <div>
      <Button onClick={async () => await getWords({ variables: { itemsByPage: 300, page: 1 } })}>Load words</Button>
      {words && <Table theadData={['name', 'description']} tbodyData={tableBody} />}
    </div>
  )
}

export default Home
