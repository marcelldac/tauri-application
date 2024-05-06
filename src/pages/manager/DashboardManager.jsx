import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../utils/store';

export default function DashboardManager () {
  const [loggedUserName, setLoggedUserName] = useState()

  useEffect(() => {
    (async () => {
      const { value: username } = await store.get('user-logged-username')
      if (username) {
        setLoggedUserName(username)
      }
    })()
  }, [])

  return(
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <p>Olá {loggedUserName}</p>
      <h1>Manager Dashboard</h1>
      <Link to='/create-building'>Criar um prédio</Link>
      <Link to='/'>Sair</Link>
    </div>
  )
}