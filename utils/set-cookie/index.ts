type Params<T> = {
  name: string
  value: T
  days?: number | null
}

const setCookie = <T>({ name, value, days = null }: Params<T>) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export default setCookie
