import { invoke } from '@tauri-apps/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

async function get_buildings () {
  const response = await invoke('get_buildings')
  return response
}

export default function App () {
  const [buildings, setBuildings] = useState([])
  
  useEffect(() => {
    (async () => {
      const buildings = await get_buildings()
      setBuildings(buildings)
    })()
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Dashboard Predios</h1>
      <Link to='login_manager'>Logar como Manager</Link>
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