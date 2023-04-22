import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

const authRetry = async () => {
  try {
    const response = await axiosClient.post('/', { query: 'mutation { refresh }' }, { withCredentials: true })
    const { data } = response.data as { data: { refresh: string } }
    localStorage.setItem('token', data.refresh)
    return data.refresh
  } catch (_error) {
    return Promise.reject(_error)
  }
}

export default authRetry
