import '../../App.css'
import { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { Link, useNavigate } from 'react-router-dom'
import { store } from '../../utils/store'

const login = async (email, password) => {
  try {
    const [message, status] = await invoke('login', { email, password })
    store.set('user-logged-email', { value: message[0].email })
    store.set('user-logged-username', { value: message[0].username })
    store.set('user-logged-id', { value: message[0].id })
    await store.save()
    return [message, status]
  } catch (error) {
    const [message, status] = error
    return [message, status]
  }
}

/* const getManagers = async (setManagers) => {
  const managers = await invoke('get_managers')
  setManagers(managers)
} */

/* const createManager = async (username, password, email) => {
  const manager = await invoke('create_manager', { username, password, email, createdAt: now, updatedAt: now })
  return manager
} */

export default function CreateManager() {
  const navigateTo = useNavigate()
  const [greetMsg, setGreetMsg] = useState('')

  const onSubmit = async (formEvent) => {
    formEvent.preventDefault()
    const data = formEvent.target.elements
    const email = data['email'].value
    const password = data['password'].value
    const [message, status] = await login(email, password)
    const acceptedLogin = status
    setGreetMsg(message)
    if (acceptedLogin) {
      navigateTo('/manager_dashboard')
    }
  }

  /* useEffect(() => {
      getManagers(setManagers)
      createManager('johndoe', 'johndoe123', 'john@mail.com')
  }, []) */

  return (
    <div className='container'>
      <Link to='/'>Voltar</Link>
      <form className='column' onSubmit={onSubmit}>
        <h1>Logar como manager</h1>
        <input
          id='user-email'
          name='email'
          placeholder='Digite seu e-mail...'
        />
        <input
          id='user-password'
          name='password'
          placeholder='Digite sua senha...'
        />
        <button type='submit'>Login</button>
      </form>
      <p>{greetMsg}</p>
    </div>
  );
}
