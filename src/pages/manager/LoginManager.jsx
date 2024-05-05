import '../../App.css'
import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { Link, useNavigate } from 'react-router-dom'

const login = async (email, password) => {
  const [message, status] = await invoke('login', { email, password })
  return [message, status]
}

const getManagers = async (setManagers) => {
  const managers = await invoke('get_managers')
  setManagers(managers)
}

const createManager = async (username, password, email, createdAt, updatedAt) => {
  const manager = await invoke('create_manager', { username, password, email, createdAt, updatedAt })
  console.log(manager)
}

export default function CreateManager() {
  const navigateTo = useNavigate()
  const [greetMsg, setGreetMsg] = useState('')
  const [managers, setManagers] = useState()

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

  useEffect(() => {
    getManagers(setManagers)
    createManager(
      'johndoe',
      'johndoe123',
      'john@mail.com',
      new Date().toISOString(),
      new Date().toISOString()
    )
  }, [])

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
