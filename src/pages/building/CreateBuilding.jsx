import { invoke } from '@tauri-apps/api'
import { useState } from 'react'
import { now } from '../../utils/index.js'
import { store } from '../../utils/store.js'

async function createBuilding ({ name, address, managerId }) {
  const response = await invoke('create_building', { name, address, managerId: Number(managerId), createdAt: now, updatedAt: now })
  return response
}

export default function CreateBuilding () {
  const [message, setMessage] = useState()

  const onSubmit = async (formEvent) => {
    formEvent.preventDefault()
    const data = formEvent.target.elements
    const { value: userLoggedId } = await store.get('user-logged-id')
    if(!userLoggedId) {
      setMessage('Você precisa estar logado para criar um prédio.')
      return
    }
    const building = {
      name: data['name'].value,
      address: data['address'].value,
      managerId: userLoggedId
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
        <button type='submit'>Criar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}