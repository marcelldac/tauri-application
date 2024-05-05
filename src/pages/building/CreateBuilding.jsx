import { invoke } from '@tauri-apps/api'
import { useState } from 'react'
import { now } from '../../utils/index.js'

async function createBuilding ({ name, address, managerId }) {
  const response = await invoke('create_building', { name, address, managerId: Number(managerId), createdAt: now, updatedAt: now })
  return response
}

export default function CreateBuilding () {
  const [message, setMessage] = useState()

  const onSubmit = async (formEvent) => {
    formEvent.preventDefault()
    const data = formEvent.target.elements
    const building = {
      name: data['name'].value,
      address: data['address'].value,
      managerId: data['manager_id'].value
    }
    const response = await createBuilding(building)
    setMessage(response)
  }

  return (
    <div className='container'>
      <h1>Criar Prédio</h1>
      <form className='column' onSubmit={onSubmit}>
        <input
          id='building-name'
          name='name'
          placeholder='Digite o nome do prédio...'
        />
        <input
          id='building-address'
          name='address'
          placeholder='Digite o endereço do prédio...'
        />
        <input
          id='building-manager-id'
          name='manager_id'
          placeholder='Digite o seu nome...'
        />
        <button type='submit'>Criar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}