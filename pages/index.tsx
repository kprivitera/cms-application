import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import type { NextPage } from 'next'

import { LOGIN_USER } from '../queries'
import Button from '../components/button'
import ContentBlock from '../components/content-block'
import authRetry from '../utils/auth-retry'
import setCookie from '../utils/set-cookie'

type Login = {
  username: string
  password: string
}

const Home: NextPage = () => {
  const router = useRouter()

  const [loginUser] = useMutation(LOGIN_USER)
  const { register, handleSubmit } = useForm()

  const onLogin = async (data: Login) => {
    try {
      const authToken = await loginUser({
        variables: { password: data.password, username: data.username },
      })
      const authTokenValue = _.get(authToken, 'data.authenticate')

      localStorage.setItem('token', authTokenValue)
      setCookie<boolean>({ name: 'isAuthenticated', value: true })

      jwt.verify(authTokenValue, 'secret')
      router.push('/home')
    } catch (error) {
      console.log('error loggin in')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authRetry()
        setCookie<boolean>({ name: 'isAuthenticated', value: true })
        router.push('/home')
      } catch (error) {
        setCookie<boolean>({ name: 'isAuthenticated', value: false })
      }
    }
    fetchData()
  }, [])

  return (
    <ContentBlock>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Welcome</h1>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit((data) => onLogin(data))}>
            <label htmlFor="username">Username</label>
            <input
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="username"
              {...register('username')}
            />
            <label htmlFor="password">Password</label>
            <input
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="password"
              {...register('password')}
            />
            <Button onClick={handleSubmit((data) => onLogin(data))}>Login</Button>
          </form>
        </div>
      </main>
    </ContentBlock>
  )
}

export default Home
