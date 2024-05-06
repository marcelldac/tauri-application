import { invoke } from '@tauri-apps/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from './utils/store.js';

async function get_buildings () {
  const response = await invoke('get_buildings')
  return response
}

function logout (setUserIsLogged) {
  store.clear()
  store.save()
  setUserIsLogged(false)
}

export default function App () {
  const [buildings, setBuildings] = useState([])
  const [userIsLogged, setUserIsLogged] = useState(false)
  
  useEffect(() => {
    (async () => {
      const buildings = await get_buildings()
      const userLoggedId = await store.get('user-logged-id')
      if (userLoggedId) setUserIsLogged(true)
      setBuildings(buildings)
    })()
  }, [userIsLogged])

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Dashboard Predios</h1>
      {
      userIsLogged 
      ? <button onClick={() => { logout(setUserIsLogged) }}>Sair</button> 
      : <Link to='/login_manager'>Logar como Manager</Link>
      }
      <h2>Lista de prédios:</h2>
      {buildings ? buildings.map((building) => {
        return (
          <div key={building.id}>
            <span>{building.name}</span> | <span>{building.address}</span>
          </div>
        )
      }) : <h1>Nenhum prédio foi encontrado</h1>}
    </div>
  )
}