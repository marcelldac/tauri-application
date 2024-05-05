import '/App.css'
import { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

import reactLogo from './assets/react.svg'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigateTo = useNavigate()
  const [greetMsg, setGreetMsg] = useState('')

  const login = async (email, password) => {
    const [message, status] = await invoke('login', { email, password })
    return [message, status]
  }

  const onSubmit = async (formEvent) => {
    formEvent.preventDefault()
    
    const data = formEvent.target.elements
    const email = data['email'].value
    const password = data['password'].value

    const [message, status] = await login(email, password)
    const acceptedLogin = status
    setGreetMsg(message)
    if (acceptedLogin) {
      navigateTo('/home')
    } 
  }

  return (
    <div className='container'>
      <div className='row'>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo vite' alt='Vite logo' />
        </a>
        <a href='https://tauri.app' target='_blank'>
          <img src='/tauri.svg' className='logo tauri' alt='Tauri logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <form className='column' onSubmit={onSubmit}>
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
        <button type='submit'>Greet</button>
      </form>
      <p>{greetMsg}</p>      
    </div>
  );
}

export default App;
